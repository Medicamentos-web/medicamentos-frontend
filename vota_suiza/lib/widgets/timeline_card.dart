import 'package:flutter/material.dart';

import '../models/history_event.dart';

class TimelineCard extends StatefulWidget {
  const TimelineCard({
    super.key,
    required this.event,
    required this.partyColor,
    required this.isLast,
  });

  final HistoryEvent event;
  final Color partyColor;
  final bool isLast;

  @override
  State<TimelineCard> createState() => _TimelineCardState();
}

class _TimelineCardState extends State<TimelineCard> {
  bool _expanded = false;

  void _showRelationModal() {
    if (widget.event.relatedProposal == null) return;

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (ctx) => Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Icon(Icons.link, color: widget.partyColor),
                const SizedBox(width: 8),
                Text(
                  'Relación con propuesta actual',
                  style: Theme.of(ctx).textTheme.titleLarge,
                ),
              ],
            ),
            const SizedBox(height: 16),
            Text(
              widget.event.relatedProposal!,
              style: Theme.of(ctx).textTheme.bodyLarge,
            ),
            const SizedBox(height: 24),
            SizedBox(
              width: double.infinity,
              child: FilledButton(
                onPressed: () => Navigator.pop(ctx),
                child: const Text('Entendido'),
              ),
            ),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return IntrinsicHeight(
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          SizedBox(
            width: 60,
            child: Column(
              children: [
                Container(
                  width: 16,
                  height: 16,
                  decoration: BoxDecoration(
                    color: widget.partyColor,
                    shape: BoxShape.circle,
                  ),
                ),
                if (!widget.isLast)
                  Expanded(
                    child: Container(
                      width: 2,
                      color: widget.partyColor.withValues(alpha: 0.3),
                    ),
                  ),
              ],
            ),
          ),
          Expanded(
            child: Card(
              margin: const EdgeInsets.only(bottom: 16, right: 16),
              child: InkWell(
                onTap: () => setState(() => _expanded = !_expanded),
                borderRadius: BorderRadius.circular(12),
                child: Padding(
                  padding: const EdgeInsets.all(16),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        '${widget.event.year}',
                        style: TextStyle(
                          color: widget.partyColor,
                          fontWeight: FontWeight.bold,
                          fontSize: 14,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        widget.event.title,
                        style: Theme.of(context).textTheme.titleMedium?.copyWith(
                              fontWeight: FontWeight.bold,
                            ),
                      ),
                      if (_expanded) ...[
                        const SizedBox(height: 8),
                        Text(widget.event.description),
                        if (widget.event.relatedProposal != null) ...[
                          const SizedBox(height: 12),
                          OutlinedButton.icon(
                            onPressed: _showRelationModal,
                            icon: const Icon(Icons.link, size: 18),
                            label: const Text('Ver relación con propuesta actual'),
                          ),
                        ],
                      ],
                    ],
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
