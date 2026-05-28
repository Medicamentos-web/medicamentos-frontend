import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../models/party_character.dart';
import '../models/voting_question.dart' show ChatMessage;
import '../utils/constants.dart';
import 'auth_provider.dart';
import 'service_providers.dart';
import 'settings_provider.dart';

class ChatState {
  const ChatState({
    this.messages = const [],
    this.isLoading = false,
    this.error,
  });

  final List<ChatMessage> messages;
  final bool isLoading;
  final String? error;

  ChatState copyWith({
    List<ChatMessage>? messages,
    bool? isLoading,
    String? error,
  }) {
    return ChatState(
      messages: messages ?? this.messages,
      isLoading: isLoading ?? this.isLoading,
      error: error,
    );
  }
}

class ChatNotifier extends StateNotifier<ChatState> {
  ChatNotifier(this._ref, this._party) : super(const ChatState());

  final Ref _ref;
  final PartyCharacter _party;
  final List<Map<String, String>> _history = [];

  Future<void> sendMessage(String text) async {
    if (text.trim().isEmpty) return;

    final settings = _ref.read(settingsProvider);
    final userMsg = ChatMessage(
      text: text,
      isUser: true,
      timestamp: DateTime.now(),
    );

    state = state.copyWith(
      messages: [...state.messages, userMsg],
      isLoading: true,
      error: null,
    );

    _history.add({'role': 'user', 'text': text});

    try {
      final loader = _ref.read(dataLoaderProvider);
      final gemini = _ref.read(geminiServiceProvider);
      final tts = _ref.read(ttsServiceProvider);
      final audio = _ref.read(audioPlayerProvider);

      final promptFile = _party.promptFile ?? 'assets/prompts/${_party.id}.json';
      final promptData = await loader.loadPartyPrompt(promptFile);
      final systemPrompt = promptData['systemPrompt'] as String;

      final responseText = await gemini.generateResponse(
        systemPrompt: systemPrompt,
        userMessage: text,
        languageCode: settings.language.code,
        conversationHistory: _history.length > 1 ? _history.sublist(0, _history.length - 1) : null,
      );

      _history.add({'role': 'model', 'text': responseText});

      String? audioPath;
      if (settings.language.supportsTts) {
        audioPath = await tts.synthesize(
          text: responseText,
          language: settings.language,
          voiceId: _party.elevenLabsVoiceId,
        );
      }

      final botMsg = ChatMessage(
        text: responseText,
        isUser: false,
        timestamp: DateTime.now(),
        audioPath: audioPath,
      );

      state = state.copyWith(
        messages: [...state.messages, botMsg],
        isLoading: false,
      );

      if (audioPath != null) {
        await audio.playFile(audioPath);
      }

      await _checkAchievements();
    } catch (e) {
      state = state.copyWith(isLoading: false, error: e.toString());
    }
  }

  Future<void> _checkAchievements() async {
    final userId = _ref.read(userIdProvider);
    if (userId == null) return;

    final firebase = _ref.read(firebaseServiceProvider);
    final notification = _ref.read(notificationServiceProvider);

    await firebase.trackDialogueParty(userId, _party.id);

    final unlocked = await firebase.unlockAchievement(
      userId: userId,
      type: AchievementType.primerDialogo,
      title: AchievementType.label(AchievementType.primerDialogo),
      description: 'Has iniciado tu primer diálogo con un partido político.',
    );
    if (unlocked) {
      await notification.showAchievementNotification(
        title: '¡Logro desbloqueado!',
        body: AchievementType.label(AchievementType.primerDialogo),
      );
    }

    final dialogued = await firebase.getDialoguedParties(userId);
    final allParties = await _ref.read(dataLoaderProvider).loadParties();
    if (dialogued.length >= allParties.length) {
      final allUnlocked = await firebase.unlockAchievement(
        userId: userId,
        type: AchievementType.todosPartidos,
        title: AchievementType.label(AchievementType.todosPartidos),
        description: 'Has dialogado con todos los partidos.',
      );
      if (allUnlocked) {
        await notification.showAchievementNotification(
          title: '¡Logro desbloqueado!',
          body: AchievementType.label(AchievementType.todosPartidos),
        );
      }
    }
  }

  Future<void> replayAudio(ChatMessage message) async {
    if (message.audioPath != null) {
      await _ref.read(audioPlayerProvider).playFile(message.audioPath!);
    }
  }
}

final chatProvider = StateNotifierProvider.family<ChatNotifier, ChatState, PartyCharacter>(
  (ref, party) => ChatNotifier(ref, party),
);
