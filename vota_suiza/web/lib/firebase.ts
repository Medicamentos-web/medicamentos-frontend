import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import {
  getAuth,
  signInAnonymously,
  onAuthStateChanged,
  Auth,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
  serverTimestamp,
  doc,
  setDoc,
  getDocs,
  arrayUnion,
  Firestore,
} from "firebase/firestore";

function isFirebaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  );
}

let _app: FirebaseApp | null = null;

function getApp(): FirebaseApp {
  if (!isFirebaseConfigured()) {
    throw new Error(
      "Firebase no está configurado. Define las variables NEXT_PUBLIC_FIREBASE_* en .env.local"
    );
  }
  if (_app) return _app;
  if (getApps().length) {
    _app = getApps()[0];
    return _app;
  }
  _app = initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  });
  return _app;
}

export function getFirebaseAuth(): Auth {
  return getAuth(getApp());
}

export function getDb(): Firestore {
  return getFirestore(getApp());
}

export async function ensureAuth() {
  const auth = getFirebaseAuth();
  if (auth.currentUser) return auth.currentUser;
  const cred = await signInAnonymously(auth);
  return cred.user;
}

export function onAuthReady(cb: (uid: string) => void): () => void {
  if (!isFirebaseConfigured()) {
    console.warn("[VotaSuiza] Firebase no configurado — auth deshabilitada");
    return () => {};
  }
  try {
    const auth = getFirebaseAuth();
    return onAuthStateChanged(auth, async (user) => {
      if (user) cb(user.uid);
      else {
        const u = await signInAnonymously(auth);
        cb(u.user.uid);
      }
    });
  } catch (e) {
    console.warn("[VotaSuiza] Error inicializando auth:", e);
    return () => {};
  }
}

export async function submitVote(data: {
  ageRange: string;
  canton: string;
  language: string;
  voteOption: string;
  questionId?: string;
}) {
  if (!isFirebaseConfigured()) {
    throw new Error("Firebase no configurado. Configura .env.local primero.");
  }
  await ensureAuth();
  await addDoc(collection(getDb(), "votes"), {
    ...data,
    timestamp: serverTimestamp(),
  });
}

export function watchVotes(
  canton: string,
  cb: (votes: Record<string, unknown>[]) => void
): () => void {
  if (!isFirebaseConfigured()) {
    console.warn("[VotaSuiza] watchVotes — Firebase no configurado");
    cb([]);
    return () => {};
  }
  try {
    let q = query(collection(getDb(), "votes"));
    if (canton !== "ALL") {
      q = query(collection(getDb(), "votes"), where("canton", "==", canton));
    }
    return onSnapshot(q, (snap) => {
      cb(snap.docs.map((d) => d.data()));
    });
  } catch (e) {
    console.warn("[VotaSuiza] Error watchVotes:", e);
    cb([]);
    return () => {};
  }
}

export async function trackDialogue(uid: string, partyId: string) {
  if (!isFirebaseConfigured()) return;
  await setDoc(
    doc(getDb(), "users", uid),
    { dialoguedParties: arrayUnion(partyId) },
    { merge: true }
  );
}

export async function unlockAchievement(
  uid: string,
  type: string,
  title: string,
  description: string
): Promise<boolean> {
  if (!isFirebaseConfigured()) return false;
  const existing = await getDocs(
    query(
      collection(getDb(), "users", uid, "achievements"),
      where("type", "==", type)
    )
  );
  if (!existing.empty) return false;
  await addDoc(collection(getDb(), "users", uid, "achievements"), {
    type,
    title,
    description,
    unlockedAt: serverTimestamp(),
  });
  return true;
}

export interface VoteStats {
  ageRange: string;
  yes: number;
  no: number;
  abstention: number;
  total: number;
}

export function calcStats(votes: Record<string, unknown>[]): VoteStats[] {
  const ranges = [
    { code: "under_18", label: "< 18" },
    { code: "18_29", label: "18-29" },
    { code: "30_44", label: "30-44" },
    { code: "45_59", label: "45-59" },
    { code: "60_plus", label: "60+" },
  ];

  return ranges.map(({ code, label }) => {
    const group = votes.filter((v) => v.ageRange === code);
    const total = group.length;
    return {
      ageRange: label,
      yes: total
        ? (group.filter((v) => v.voteOption === "yes").length / total) * 100
        : 0,
      no: total
        ? (group.filter((v) => v.voteOption === "no").length / total) * 100
        : 0,
      abstention: total
        ? (group.filter((v) => v.voteOption === "abstention").length / total) *
          100
        : 0,
      total,
    };
  });
}
