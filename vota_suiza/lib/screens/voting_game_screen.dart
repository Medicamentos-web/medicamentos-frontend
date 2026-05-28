import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../providers/settings_provider.dart';
import '../providers/voting_provider.dart';
import '../utils/constants.dart';
import '../widgets/achievement_overlay.dart';

class VotingGameScreen extends ConsumerStatefulWidget {
  const VotingGameScreen({super.key});

  @override
  ConsumerState<VotingGameScreen> createState() => _VotingGameScreenState();
}

class _VotingGameScreenState extends ConsumerState<VotingGameScreen> {
  bool _showAchievement = false;
  String? _achievementType;

  @override
  Widget build(BuildContext context) {
    final state = ref.watch(votingGameProvider);
    final settings = ref.watch(settingsProvider);

    ref.listen(votingGameProvider, (prev, next) {
      if (next.newAchievement != null &&
          next.newAchievement != prev?.newAchievement) {
        setState(() {
          _showAchievement = true;
          _achievementType = next.newAchievement;
        });
      }
    });

    return Scaffold(
      appBar: AppBar(
        title: const Text('Simulación de voto'),
      ),
      body: Stack(
        children: [
          SingleChildScrollView(
            padding: const EdgeInsets.all(20),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                if (state.question != null) ...[
                  Card(
                    child: Padding(
                      padding: const EdgeInsets.all(16),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            state.question!.title,
                            style: Theme.of(context)
                                .textTheme
                                .titleLarge
                                ?.copyWith(fontWeight: FontWeight.bold),
                          ),
                          const SizedBox(height: 8),
                          Text(state.question!.description),
                          const SizedBox(height: 4),
                          Text(
                            'Fecha: ${state.question!.date}',
                            style: Theme.of(context).textTheme.bodySmall,
                          ),
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(height: 24),
                  Text(
                    'Selecciona tu voto:',
                    style: Theme.of(context).textTheme.titleMedium,
                  ),
                  const SizedBox(height: 12),
                  ...VoteOption.values.map((option) {
                    final selected = state.selectedOption == option;
                    return Padding(
                      padding: const EdgeInsets.only(bottom: 8),
                      child: ChoiceChip(
                        label: Text(option.label),
                        selected: selected,
                        onSelected: state.hasVoted
                            ? null
                            : (_) => ref
                                .read(votingGameProvider.notifier)
                                .selectOption(option),
                      ),
                    );
                  }),
                  const SizedBox(height: 16),
                  _UserInfoChips(settings: settings),
                  const SizedBox(height: 32),
                  if (!state.hasVoted && state.selectedOption != null)
                    _BallotDragArea(
                      onDragStarted: () =>
                          ref.read(votingGameProvider.notifier).startDrag(),
                      onBallotDropped: () =>
                          ref.read(votingGameProvider.notifier).onBallotDropped(),
                      isSubmitting: state.isSubmitting,
                    ),
                  if (state.hasVoted)
                    Card(
                      color: Colors.green.shade50,
                      child: const Padding(
                        padding: EdgeInsets.all(20),
                        child: Column(
                          children: [
                            Icon(Icons.check_circle, color: Colors.green, size: 48),
                            SizedBox(height: 8),
                            Text(
                              '¡Voto registrado!',
                              style: TextStyle(
                                fontSize: 18,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            SizedBox(height: 4),
                            Text(
                              'Tu voto anónimo ha sido enviado a las estadísticas.',
                              textAlign: TextAlign.center,
                            ),
                          ],
                        ),
                      ),
                    ),
                ] else
                  const Center(child: CircularProgressIndicator()),
              ],
            ),
          ),
          if (_showAchievement && _achievementType != null)
            AchievementOverlay(
              achievementType: _achievementType!,
              onDismiss: () => setState(() => _showAchievement = false),
            ),
        ],
      ),
    );
  }
}

class _UserInfoChips extends StatelessWidget {
  const _UserInfoChips({required this.settings});

  final UserSettings settings;

  @override
  Widget build(BuildContext context) {
    return Wrap(
      spacing: 8,
      children: [
        Chip(
          label: Text('Edad: ${settings.ageRange.label}'),
          avatar: const Icon(Icons.person, size: 16),
        ),
        Chip(
          label: Text('Cantón: ${settings.canton}'),
          avatar: const Icon(Icons.map, size: 16),
        ),
      ],
    );
  }
}

class _BallotDragArea extends StatefulWidget {
  const _BallotDragArea({
    required this.onDragStarted,
    required this.onBallotDropped,
    required this.isSubmitting,
  });

  final VoidCallback onDragStarted;
  final VoidCallback onBallotDropped;
  final bool isSubmitting;

  @override
  State<_BallotDragArea> createState() => _BallotDragAreaState();
}

class _BallotDragAreaState extends State<_BallotDragArea> {
  bool _dropped = false;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text(
          'Arrastra la papeleta hasta la urna',
          style: Theme.of(context).textTheme.titleMedium,
        ),
        const SizedBox(height: 8),
        Text(
          '¡Vota en menos de 10 segundos para la insignia "Votante rápido"!',
          style: Theme.of(context).textTheme.bodySmall?.copyWith(
                color: Colors.orange.shade800,
              ),
          textAlign: TextAlign.center,
        ),
        const SizedBox(height: 24),
        SizedBox(
          height: 200,
          child: Stack(
            alignment: Alignment.center,
            children: [
              Align(
                alignment: Alignment.bottomCenter,
                child: DragTarget<String>(
                  onWillAcceptWithDetails: (_) => !widget.isSubmitting && !_dropped,
                  onAcceptWithDetails: (_) {
                    setState(() => _dropped = true);
                    widget.onBallotDropped();
                  },
                  builder: (context, candidateData, rejectedData) {
                    final isHovering = candidateData.isNotEmpty;
                    return AnimatedContainer(
                      duration: const Duration(milliseconds: 200),
                      width: 100,
                      height: 120,
                      decoration: BoxDecoration(
                        color: isHovering
                            ? Colors.brown.shade400
                            : Colors.brown.shade300,
                        borderRadius: BorderRadius.circular(8),
                        border: Border.all(
                          color: isHovering ? Colors.amber : Colors.brown.shade700,
                          width: isHovering ? 3 : 1,
                        ),
                      ),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Icon(
                            Icons.inbox,
                            size: 40,
                            color: Colors.brown.shade900,
                          ),
                          const SizedBox(height: 4),
                          Text(
                            'URNA',
                            style: TextStyle(
                              fontWeight: FontWeight.bold,
                              color: Colors.brown.shade900,
                            ),
                          ),
                        ],
                      ),
                    );
                  },
                ),
              ),
              if (!_dropped)
                Align(
                  alignment: Alignment.topCenter,
                  child: Draggable<String>(
                    data: 'ballot',
                    onDragStarted: widget.onDragStarted,
                    feedback: Material(
                      elevation: 8,
                      borderRadius: BorderRadius.circular(4),
                      child: Container(
                        width: 80,
                        height: 50,
                        decoration: BoxDecoration(
                          color: Colors.white,
                          border: Border.all(color: Colors.grey.shade400),
                          borderRadius: BorderRadius.circular(4),
                        ),
                        child: const Center(
                          child: Text(
                            'SÍ / NO',
                            style: TextStyle(fontWeight: FontWeight.bold),
                          ),
                        ),
                      ),
                    ),
                    childWhenDragging: Opacity(
                      opacity: 0.3,
                      child: _BallotWidget(),
                    ),
                    child: _BallotWidget(),
                  ),
                ),
            ],
          ),
        ),
        if (widget.isSubmitting)
          const Padding(
            padding: EdgeInsets.only(top: 16),
            child: CircularProgressIndicator(),
          ),
      ],
    );
  }
}

class _BallotWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      width: 80,
      height: 50,
      decoration: BoxDecoration(
        color: Colors.white,
        border: Border.all(color: Colors.grey.shade400, width: 2),
        borderRadius: BorderRadius.circular(4),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.1),
            blurRadius: 4,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: const Center(
        child: Text(
          'PAPELETA',
          style: TextStyle(fontWeight: FontWeight.bold, fontSize: 11),
        ),
      ),
    );
  }
}
