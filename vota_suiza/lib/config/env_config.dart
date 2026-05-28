import 'package:flutter_dotenv/flutter_dotenv.dart';

class EnvConfig {
  EnvConfig._();

  static String get geminiApiKey => dotenv.env['GEMINI_API_KEY'] ?? '';
  static String get googleTtsApiKey => dotenv.env['GOOGLE_TTS_API_KEY'] ?? '';
  static String get elevenLabsApiKey => dotenv.env['ELEVENLABS_API_KEY'] ?? '';

  static String get defaultElevenLabsVoiceId =>
      dotenv.env['ELEVENLABS_DEFAULT_VOICE_ID'] ?? '21m00Tcm4TlvDq8ikWAM';

  static const geminiEndpoint =
      'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent';
  static const ttsEndpoint =
      'https://texttospeech.googleapis.com/v1/text:synthesize';
  static const elevenLabsEndpoint =
      'https://api.elevenlabs.io/v1/text-to-speech';
}
