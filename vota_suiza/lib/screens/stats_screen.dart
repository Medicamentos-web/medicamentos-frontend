import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../providers/settings_provider.dart';
import '../providers/voting_provider.dart';
import '../utils/constants.dart';
import '../widgets/stats_bar_chart.dart';

class StatsScreen extends ConsumerWidget {
  const StatsScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final statsAsync = ref.watch(voteStatsProvider);
    final selectedCanton = ref.watch(statsCantonFilterProvider);
    final settings = ref.watch(settingsProvider);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Estadísticas anónimas'),
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.all(16),
            child: Row(
              children: [
                const Text('Filtrar por cantón: '),
                const SizedBox(width: 8),
                DropdownButton<String>(
                  value: selectedCanton,
                  items: [
                    const DropdownMenuItem(
                      value: 'ALL',
                      child: Text('Todos'),
                    ),
                    ...swissCantons.map(
                      (c) => DropdownMenuItem(value: c, child: Text(c)),
                    ),
                  ],
                  onChanged: (value) {
                    if (value != null) {
                      ref.read(statsCantonFilterProvider.notifier).state = value;
                    }
                  },
                ),
              ],
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            child: Text(
              'Resultados agrupados por rango de edad (datos anónimos, sin identificadores personales).',
              style: Theme.of(context).textTheme.bodySmall,
            ),
          ),
          const SizedBox(height: 8),
          Expanded(
            child: statsAsync.when(
              loading: () => const Center(child: CircularProgressIndicator()),
              error: (e, _) => Center(child: Text('Error: $e')),
              data: (stats) => StatsBarChart(stats: stats),
            ),
          ),
          _SettingsPanel(settings: settings),
        ],
      ),
    );
  }
}

class _SettingsPanel extends ConsumerWidget {
  const _SettingsPanel({required this.settings});

  final dynamic settings;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Container(
      padding: const EdgeInsets.all(16),
      color: Theme.of(context).colorScheme.surfaceContainerHighest,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Tu perfil anónimo (para votar)',
            style: Theme.of(context).textTheme.titleSmall,
          ),
          const SizedBox(height: 8),
          Row(
            children: [
              Expanded(
                child: DropdownButtonFormField<AgeRange>(
                  value: settings.ageRange,
                  decoration: const InputDecoration(
                    labelText: 'Rango de edad',
                    isDense: true,
                  ),
                  items: AgeRange.values
                      .map((r) => DropdownMenuItem(
                            value: r,
                            child: Text(r.label),
                          ))
                      .toList(),
                  onChanged: (v) {
                    if (v != null) {
                      ref.read(settingsProvider.notifier).setAgeRange(v);
                    }
                  },
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: DropdownButtonFormField<String>(
                  value: settings.canton,
                  decoration: const InputDecoration(
                    labelText: 'Cantón',
                    isDense: true,
                  ),
                  items: swissCantons
                      .map((c) => DropdownMenuItem(value: c, child: Text(c)))
                      .toList(),
                  onChanged: (v) {
                    if (v != null) {
                      ref.read(settingsProvider.notifier).setCanton(v);
                    }
                  },
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
