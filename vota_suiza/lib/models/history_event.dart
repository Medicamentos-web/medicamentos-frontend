class HistoryEvent {
  const HistoryEvent({
    required this.year,
    required this.title,
    required this.description,
    this.imageUrl,
    this.relatedProposal,
  });

  final int year;
  final String title;
  final String description;
  final String? imageUrl;
  final String? relatedProposal;

  factory HistoryEvent.fromJson(Map<String, dynamic> json) {
    return HistoryEvent(
      year: json['year'] as int,
      title: json['title'] as String,
      description: json['description'] as String,
      imageUrl: json['imageUrl'] as String?,
      relatedProposal: json['relatedProposal'] as String?,
    );
  }
}

class PartyHistory {
  const PartyHistory({
    required this.partyId,
    required this.events,
  });

  final String partyId;
  final List<HistoryEvent> events;

  factory PartyHistory.fromJson(Map<String, dynamic> json) {
    return PartyHistory(
      partyId: json['partyId'] as String,
      events: (json['events'] as List<dynamic>)
          .map((e) => HistoryEvent.fromJson(e as Map<String, dynamic>))
          .toList(),
    );
  }
}
