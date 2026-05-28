import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../services/audio_player_service.dart';
import '../services/data_loader_service.dart';
import '../services/firebase_service.dart';
import '../services/gemini_service.dart';
import '../services/notification_service.dart';
import '../services/tts_service.dart';

final dataLoaderProvider = Provider<DataLoaderService>((ref) {
  return DataLoaderService();
});

final geminiServiceProvider = Provider<GeminiService>((ref) {
  return GeminiService();
});

final ttsServiceProvider = Provider<TtsService>((ref) {
  return TtsService();
});

final firebaseServiceProvider = Provider<FirebaseService>((ref) {
  return FirebaseService();
});

final audioPlayerProvider = Provider<AudioPlayerService>((ref) {
  final service = AudioPlayerService();
  ref.onDispose(service.dispose);
  return service;
});

final notificationServiceProvider = Provider<NotificationService>((ref) {
  return NotificationService();
});
