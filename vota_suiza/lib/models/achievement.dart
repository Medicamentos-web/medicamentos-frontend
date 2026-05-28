class Achievement {
  const Achievement({
    required this.id,
    required this.type,
    required this.title,
    required this.description,
    required this.unlockedAt,
  });

  final String id;
  final String type;
  final String title;
  final String description;
  final DateTime unlockedAt;

  factory Achievement.fromFirestore(Map<String, dynamic> data, String id) {
    return Achievement(
      id: id,
      type: data['type'] as String,
      title: data['title'] as String,
      description: data['description'] as String,
      unlockedAt: (data['unlockedAt'] as dynamic).toDate() as DateTime,
    );
  }

  Map<String, dynamic> toFirestore() => {
        'type': type,
        'title': title,
        'description': description,
        'unlockedAt': unlockedAt,
      };
}
