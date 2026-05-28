import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../models/achievement.dart';
import '../services/firebase_service.dart';
import 'service_providers.dart';

final authInitProvider = FutureProvider<void>((ref) async {
  final firebase = ref.watch(firebaseServiceProvider);
  await firebase.signInAnonymously();
});

final userIdProvider = Provider<String?>((ref) {
  ref.watch(authInitProvider);
  return ref.watch(firebaseServiceProvider).userId;
});

final achievementsProvider = StreamProvider<List<Achievement>>((ref) {
  final userId = ref.watch(userIdProvider);
  if (userId == null) return const Stream.empty();
  return ref.watch(firebaseServiceProvider).watchAchievements(userId);
});

final unlockedAchievementTypesProvider = FutureProvider<Set<String>>((ref) async {
  final userId = ref.watch(userIdProvider);
  if (userId == null) return {};
  return ref.watch(firebaseServiceProvider).getUnlockedTypes(userId);
});
