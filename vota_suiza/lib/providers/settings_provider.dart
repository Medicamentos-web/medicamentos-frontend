import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../utils/constants.dart';

class UserSettings {
  const UserSettings({
    this.language = AppLanguage.de,
    this.ageRange = AgeRange.age18to29,
    this.canton = 'ZH',
  });

  final AppLanguage language;
  final AgeRange ageRange;
  final String canton;

  UserSettings copyWith({
    AppLanguage? language,
    AgeRange? ageRange,
    String? canton,
  }) {
    return UserSettings(
      language: language ?? this.language,
      ageRange: ageRange ?? this.ageRange,
      canton: canton ?? this.canton,
    );
  }
}

class SettingsNotifier extends StateNotifier<UserSettings> {
  SettingsNotifier() : super(const UserSettings());

  void setLanguage(AppLanguage language) {
    state = state.copyWith(language: language);
  }

  void setAgeRange(AgeRange ageRange) {
    state = state.copyWith(ageRange: ageRange);
  }

  void setCanton(String canton) {
    state = state.copyWith(canton: canton);
  }
}

final settingsProvider =
    StateNotifierProvider<SettingsNotifier, UserSettings>((ref) {
  return SettingsNotifier();
});
