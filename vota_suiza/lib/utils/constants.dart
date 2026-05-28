/// Idiomas soportados por la app.
enum AppLanguage {
  de('de', 'Deutsch'),
  fr('fr', 'Français'),
  it('it', 'Italiano'),
  rm('rm', 'Rumantsch');

  const AppLanguage(this.code, this.label);
  final String code;
  final String label;

  static AppLanguage fromCode(String code) {
    return AppLanguage.values.firstWhere(
      (l) => l.code == code,
      orElse: () => AppLanguage.de,
    );
  }

  bool get supportsTts => this != AppLanguage.rm;
}

/// Rangos de edad para estadísticas anónimas.
enum AgeRange {
  under18('under_18', '< 18'),
  age18to29('18_29', '18-29'),
  age30to44('30_44', '30-44'),
  age45to59('45_59', '45-59'),
  age60plus('60_plus', '60+');

  const AgeRange(this.code, this.label);
  final String code;
  final String label;
}

/// Cantones suizos (principales).
const swissCantons = [
  'AG', 'AI', 'AR', 'BE', 'BL', 'BS', 'FR', 'GE', 'GL', 'GR',
  'JU', 'LU', 'NE', 'NW', 'OW', 'SG', 'SH', 'SO', 'SZ', 'TG',
  'TI', 'UR', 'VD', 'VS', 'ZG', 'ZH',
];

/// Tipos de logros.
class AchievementType {
  AchievementType._();

  static const primerDialogo = 'primer_dialogo';
  static const todosPartidos = 'todos_partidos';
  static const votoEmitido = 'voto_emitido';
  static const expertoConstitucion = 'experto_constitucion';
  static const votanteRapido = 'votante_rapido';

  static const all = [
    primerDialogo,
    todosPartidos,
    votoEmitido,
    expertoConstitucion,
    votanteRapido,
  ];

  static String label(String type) => switch (type) {
        primerDialogo => 'Primer diálogo',
        todosPartidos => 'Conocedor de partidos',
        votoEmitido => 'Voto emitido',
        expertoConstitucion => 'Experto constitucional',
        votanteRapido => 'Votante rápido',
        _ => type,
      };
}

/// Opciones de voto.
enum VoteOption {
  yes('yes', 'Sí'),
  no('no', 'No'),
  abstention('abstention', 'Abstención');

  const VoteOption(this.code, this.label);
  final String code;
  final String label;
}
