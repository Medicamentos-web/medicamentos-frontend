class VotingQuestion {
  const VotingQuestion({
    required this.id,
    required this.title,
    required this.description,
    required this.date,
    this.source,
  });

  final String id;
  final String title;
  final String description;
  final String date;
  final String? source;

  factory VotingQuestion.fromJson(Map<String, dynamic> json) {
    return VotingQuestion(
      id: json['id'] as String,
      title: json['title'] as String,
      description: json['description'] as String,
      date: json['date'] as String,
      source: json['source'] as String?,
    );
  }
}

class ChatMessage {
  const ChatMessage({
    required this.text,
    required this.isUser,
    required this.timestamp,
    this.audioPath,
  });

  final String text;
  final bool isUser;
  final DateTime timestamp;
  final String? audioPath;

  ChatMessage copyWith({String? audioPath}) {
    return ChatMessage(
      text: text,
      isUser: isUser,
      timestamp: timestamp,
      audioPath: audioPath ?? this.audioPath,
    );
  }
}
