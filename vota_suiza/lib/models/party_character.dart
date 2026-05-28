import '../utils/constants.dart';

/// Personalidad del personaje virtual del partido.
enum PersonalityTone {
  formal,
  cercano,
  tecnico;

  static PersonalityTone fromString(String value) {
    return PersonalityTone.values.firstWhere(
      (p) => p.name == value,
      orElse: () => PersonalityTone.formal,
    );
  }
}

class PartyCharacter {
  const PartyCharacter({
    required this.id,
    required this.partyName,
    required this.description,
    required this.personality,
    required this.primaryColor,
    required this.avatarUrl,
    required this.initials,
    required this.languages,
    this.promptFile,
    this.avatarAsset,
    this.elevenLabsVoiceId,
  });

  final String id;
  final String partyName;
  final String description;
  final PersonalityTone personality;
  final String primaryColor;
  final String avatarUrl;
  final String initials;
  final List<AppLanguage> languages;
  final String? promptFile;
  final String? avatarAsset;
  final String? elevenLabsVoiceId;

  factory PartyCharacter.fromJson(Map<String, dynamic> json) {
    return PartyCharacter(
      id: json['id'] as String,
      partyName: json['partyName'] as String,
      description: json['description'] as String,
      personality: PersonalityTone.fromString(json['personality'] as String),
      primaryColor: json['primaryColor'] as String,
      avatarUrl: json['avatarUrl'] as String? ?? '',
      initials: json['initials'] as String,
      languages: (json['languages'] as List<dynamic>)
          .map((l) => AppLanguage.fromCode(l as String))
          .toList(),
      promptFile: json['promptFile'] as String?,
      avatarAsset: json['avatarAsset'] as String?,
      elevenLabsVoiceId: json['elevenLabsVoiceId'] as String?,
    );
  }

  Map<String, dynamic> toJson() => {
        'id': id,
        'partyName': partyName,
        'description': description,
        'personality': personality.name,
        'primaryColor': primaryColor,
        'avatarUrl': avatarUrl,
        'initials': initials,
        'languages': languages.map((l) => l.code).toList(),
        'promptFile': promptFile,
      };
}
