import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../providers/data_providers.dart';
import '../widgets/timeline_card.dart';

class TimelineScreen extends ConsumerWidget {
  const TimelineScreen({
    super.key,
    required this.partyId,
    required this.partyName,
    required this.partyColor,
  });

  final String partyId;
  final String partyName;
  final Color partyColor;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final historyAsync = ref.watch(partyHistoryProvider(partyId));

    return Scaffold(
      appBar: AppBar(
        title: Text('Historia — $partyName'),
        backgroundColor: partyColor,
        foregroundColor: Colors.white,
      ),
      body: historyAsync.when(
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (e, _) => Center(child: Text('Error: $e')),
        data: (history) {
          if (history == null || history.events.isEmpty) {
            return const Center(
              child: Text('No hay eventos históricos disponibles.'),
            );
          }

          final events = history.events
            ..sort((a, b) => b.year.compareTo(a.year));

          return ListView.builder(
            padding: const EdgeInsets.only(top: 24),
            itemCount: events.length,
            itemBuilder: (context, index) {
              return TimelineCard(
                event: events[index],
                partyColor: partyColor,
                isLast: index == events.length - 1,
              );
            },
          );
        },
      ),
    );
  }
}
