import { initializeApp, getApps } from "firebase/app";
import {
  getAuth,
  signInAnonymously,
  onAuthStateChanged,
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
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

function getApp() {
  return getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
}

export function getFirebaseAuth() {
  return getAuth(getApp());
}

export function getDb() {
  return getFirestore(getApp());
}

export async function ensureAuth() {
  const auth = getFirebaseAuth();
  if (auth.currentUser) return auth.currentUser;
  const cred = await signInAnonymously(auth);
  return cred.user;
}

export function onAuthReady(cb: (uid: string) => void) {
  const auth = getFirebaseAuth();
  return onAuthStateChanged(auth, async (user) => {
    if (user) cb(user.uid);
    else {
      const u = await signInAnonymously(auth);
      cb(u.user.uid);
    }
  });
}

export async function submitVote(data: {
  ageRange: string;
  canton: string;
  language: string;
  voteOption: string;
  questionId?: string;
}) {
  await ensureAuth();
  await addDoc(collection(getDb(), "votes"), {
    ...data,
    timestamp: serverTimestamp(),
  });
}

export function watchVotes(
  canton: string,
  cb: (votes: Record<string, unknown>[]) => void
) {
  let q = query(collection(getDb(), "votes"));
  if (canton !== "ALL") {
    q = query(collection(getDb(), "votes"), where("canton", "==", canton));
  }
  return onSnapshot(q, (snap) => {
    cb(snap.docs.map((d) => d.data()));
  });
}

export async function trackDialogue(uid: string, partyId: string) {
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
) {
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
      yes: total ? (group.filter((v) => v.voteOption === "yes").length / total) * 100 : 0,
      no: total ? (group.filter((v) => v.voteOption === "no").length / total) * 100 : 0,
      abstention: total
        ? (group.filter((v) => v.voteOption === "abstention").length / total) * 100
        : 0,
      total,
    };
  });
}
