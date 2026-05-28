import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../models/vote.dart';
import '../models/voting_question.dart';
import '../utils/constants.dart';
import 'auth_provider.dart';
import 'service_providers.dart';
import 'settings_provider.dart';

class VotingGameState {
  const VotingGameState({
    this.question,
    this.selectedOption,
    this.hasVoted = false,
    this.ballotDropped = false,
    this.dragStartTime,
    this.isSubmitting = false,
    this.newAchievement,
  });

  final VotingQuestion? question;
  final VoteOption? selectedOption;
  final bool hasVoted;
  final bool ballotDropped;
  final DateTime? dragStartTime;
  final bool isSubmitting;
  final String? newAchievement;

  VotingGameState copyWith({
    VotingQuestion? question,
    VoteOption? selectedOption,
    bool? hasVoted,
    bool? ballotDropped,
    DateTime? dragStartTime,
    bool? isSubmitting,
    String? newAchievement,
  }) {
    return VotingGameState(
      question: question ?? this.question,
      selectedOption: selectedOption ?? this.selectedOption,
      hasVoted: hasVoted ?? this.hasVoted,
      ballotDropped: ballotDropped ?? this.ballotDropped,
      dragStartTime: dragStartTime ?? this.dragStartTime,
      isSubmitting: isSubmitting ?? this.isSubmitting,
      newAchievement: newAchievement,
    );
  }
}

class VotingGameNotifier extends StateNotifier<VotingGameState> {
  VotingGameNotifier(this._ref) : super(const VotingGameState()) {
    _loadQuestion();
  }

  final Ref _ref;

  Future<void> _loadQuestion() async {
    final questions = await _ref.read(dataLoaderProvider).loadVotingQuestions();
    if (questions.isNotEmpty) {
      state = state.copyWith(question: questions.first);
    }
  }

  void selectOption(VoteOption option) {
    state = state.copyWith(selectedOption: option);
  }

  void startDrag() {
    state = state.copyWith(dragStartTime: DateTime.now());
  }

  Future<void> onBallotDropped() async {
    if (state.selectedOption == null) return;

    state = state.copyWith(ballotDropped: true, isSubmitting: true);

    final settings = _ref.read(settingsProvider);
    final firebase = _ref.read(firebaseServiceProvider);
    final notification = _ref.read(notificationServiceProvider);
    final userId = _ref.read(userIdProvider);

    await firebase.submitVote(
      ageRange: settings.ageRange.code,
      canton: settings.canton,
      language: settings.language.code,
      voteOption: state.selectedOption!,
      questionId: state.question?.id,
    );

    String? newAchievement;
    if (userId != null) {
      final voteUnlocked = await firebase.unlockAchievement(
        userId: userId,
        type: AchievementType.votoEmitido,
        title: AchievementType.label(AchievementType.votoEmitido),
        description: 'Has participado en la simulación de votación.',
      );
      if (voteUnlocked) {
        newAchievement = AchievementType.votoEmitido;
        await notification.showAchievementNotification(
          title: '¡Logro desbloqueado!',
          body: AchievementType.label(AchievementType.votoEmitido),
        );
      }

      if (state.dragStartTime != null) {
        final elapsed = DateTime.now().difference(state.dragStartTime!);
        if (elapsed.inSeconds < 10) {
          final fastUnlocked = await firebase.unlockAchievement(
            userId: userId,
            type: AchievementType.votanteRapido,
            title: AchievementType.label(AchievementType.votanteRapido),
            description: 'Has votado en menos de 10 segundos.',
          );
          if (fastUnlocked) {
            newAchievement = AchievementType.votanteRapido;
            await notification.showAchievementNotification(
              title: '¡Logro desbloqueado!',
              body: AchievementType.label(AchievementType.votanteRapido),
            );
          }
        }
      }
    }

    state = state.copyWith(
      hasVoted: true,
      isSubmitting: false,
      newAchievement: newAchievement,
    );
  }

  void reset() {
    state = const VotingGameState();
    _loadQuestion();
  }
}

final votingGameProvider =
    StateNotifierProvider<VotingGameNotifier, VotingGameState>((ref) {
  return VotingGameNotifier(ref);
});

final statsCantonFilterProvider = StateProvider<String>((ref) => 'ALL');

final voteStatsProvider = StreamProvider<List<VoteStats>>((ref) {
  final canton = ref.watch(statsCantonFilterProvider);
  final firebase = ref.watch(firebaseServiceProvider);

  return firebase.watchVotes(canton: canton).map(firebase.calculateStats);
});
