import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';

import '../models/achievement.dart';
import '../models/vote.dart';
import '../utils/constants.dart';

class FirebaseService {
  FirebaseService({
    FirebaseAuth? auth,
    FirebaseFirestore? firestore,
  })  : _auth = auth ?? FirebaseAuth.instance,
        _firestore = firestore ?? FirebaseFirestore.instance;

  final FirebaseAuth _auth;
  final FirebaseFirestore _firestore;

  User? get currentUser => _auth.currentUser;

  Future<User> signInAnonymously() async {
    if (_auth.currentUser != null) return _auth.currentUser!;
    final credential = await _auth.signInAnonymously();
    return credential.user!;
  }

  String? get userId => _auth.currentUser?.uid;

  // --- Votos anónimos ---

  Future<void> submitVote({
    required String ageRange,
    required String canton,
    required String language,
    required VoteOption voteOption,
    String? questionId,
  }) async {
    await _firestore.collection('votes').add({
      'ageRange': ageRange,
      'canton': canton,
      'language': language,
      'voteOption': voteOption.code,
      'timestamp': FieldValue.serverTimestamp(),
      'questionId': questionId,
    });
  }

  Stream<List<VoteRecord>> watchVotes({String? canton, String? questionId}) {
    Query<Map<String, dynamic>> query = _firestore.collection('votes');

    if (canton != null && canton != 'ALL') {
      query = query.where('canton', isEqualTo: canton);
    }
    if (questionId != null) {
      query = query.where('questionId', isEqualTo: questionId);
    }

    return query.snapshots().map(
          (snapshot) => snapshot.docs
              .map((doc) => VoteRecord.fromFirestore(doc.data()))
              .toList(),
        );
  }

  // --- Logros ---

  Stream<List<Achievement>> watchAchievements(String userId) {
    return _firestore
        .collection('users')
        .doc(userId)
        .collection('achievements')
        .snapshots()
        .map(
          (snapshot) => snapshot.docs
              .map((doc) => Achievement.fromFirestore(doc.data(), doc.id))
              .toList(),
        );
  }

  Future<bool> unlockAchievement({
    required String userId,
    required String type,
    required String title,
    required String description,
  }) async {
    final existing = await _firestore
        .collection('users')
        .doc(userId)
        .collection('achievements')
        .where('type', isEqualTo: type)
        .limit(1)
        .get();

    if (existing.docs.isNotEmpty) return false;

    await _firestore
        .collection('users')
        .doc(userId)
        .collection('achievements')
        .add({
      'type': type,
      'title': title,
      'description': description,
      'unlockedAt': FieldValue.serverTimestamp(),
    });

    return true;
  }

  Future<Set<String>> getUnlockedTypes(String userId) async {
    final snapshot = await _firestore
        .collection('users')
        .doc(userId)
        .collection('achievements')
        .get();
    return snapshot.docs.map((d) => d.data()['type'] as String).toSet();
  }

  Future<void> trackDialogueParty(String userId, String partyId) async {
    await _firestore.collection('users').doc(userId).set(
      {'dialoguedParties': FieldValue.arrayUnion([partyId])},
      SetOptions(merge: true),
    );
  }

  Future<List<String>> getDialoguedParties(String userId) async {
    final doc = await _firestore.collection('users').doc(userId).get();
    if (!doc.exists) return [];
    final data = doc.data();
    if (data == null || data['dialoguedParties'] == null) return [];
    return List<String>.from(data['dialoguedParties'] as List);
  }

  List<VoteStats> calculateStats(List<VoteRecord> votes) {
    final grouped = <String, List<VoteRecord>>{};
    for (final vote in votes) {
      grouped.putIfAbsent(vote.ageRange, () => []).add(vote);
    }

    return AgeRange.values.map((range) {
      final group = grouped[range.code] ?? [];
      if (group.isEmpty) {
        return VoteStats(
          ageRange: range.label,
          yesPercent: 0,
          noPercent: 0,
          abstentionPercent: 0,
          totalVotes: 0,
        );
      }

      final total = group.length;
      final yes = group.where((v) => v.voteOption == VoteOption.yes.code).length;
      final no = group.where((v) => v.voteOption == VoteOption.no.code).length;
      final abst = group
          .where((v) => v.voteOption == VoteOption.abstention.code)
          .length;

      return VoteStats(
        ageRange: range.label,
        yesPercent: (yes / total) * 100,
        noPercent: (no / total) * 100,
        abstentionPercent: (abst / total) * 100,
        totalVotes: total,
      );
    }).toList();
  }
}
