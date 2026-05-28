import '../utils/constants.dart';

class VoteRecord {
  const VoteRecord({
    required this.ageRange,
    required this.canton,
    required this.language,
    required this.voteOption,
    required this.timestamp,
    this.questionId,
  });

  final String ageRange;
  final String canton;
  final String language;
  final String voteOption;
  final DateTime timestamp;
  final String? questionId;

  factory VoteRecord.fromFirestore(Map<String, dynamic> data) {
    return VoteRecord(
      ageRange: data['ageRange'] as String,
      canton: data['canton'] as String,
      language: data['language'] as String,
      voteOption: data['voteOption'] as String,
      timestamp: (data['timestamp'] as dynamic).toDate() as DateTime,
      questionId: data['questionId'] as String?,
    );
  }

  Map<String, dynamic> toFirestore() => {
        'ageRange': ageRange,
        'canton': canton,
        'language': language,
        'voteOption': voteOption,
        'timestamp': timestamp,
        'questionId': questionId,
      };

  VoteOption get option => VoteOption.values.firstWhere(
        (o) => o.code == voteOption,
        orElse: () => VoteOption.abstention,
      );
}

class VoteStats {
  const VoteStats({
    required this.ageRange,
    required this.yesPercent,
    required this.noPercent,
    required this.abstentionPercent,
    required this.totalVotes,
  });

  final String ageRange;
  final double yesPercent;
  final double noPercent;
  final double abstentionPercent;
  final int totalVotes;
}
