import 'dart:convert';
import 'dart:io';
import 'dart:typed_data';

import 'package:crypto/crypto.dart';
import 'package:http/http.dart' as http;
import 'package:path_provider/path_provider.dart';

import '../config/env_config.dart';
import '../utils/constants.dart';

class TtsCacheService {
  static const _cacheDirName = 'tts_cache';

  Future<String?> getCachedAudioPath(
    String text,
    AppLanguage language, {
    String? voiceId,
  }) async {
    final file = await _cacheFile(text, language, voiceId: voiceId);
    if (await file.exists()) return file.path;
    return null;
  }

  Future<String> saveToCache(
    String text,
    AppLanguage language,
    Uint8List audioBytes, {
    String? voiceId,
  }) async {
    final file = await _cacheFile(text, language, voiceId: voiceId);
    await file.writeAsBytes(audioBytes);
    return file.path;
  }

  Future<File> _cacheFile(
    String text,
    AppLanguage language, {
    String? voiceId,
  }) async {
    final dir = await getApplicationDocumentsDirectory();
    final cacheDir = Directory('${dir.path}/$_cacheDirName');
    if (!await cacheDir.exists()) {
      await cacheDir.create(recursive: true);
    }
    final key = '$text|${language.code}|${voiceId ?? 'default'}';
    final hash = md5.convert(utf8.encode(key)).toString();
    return File('${cacheDir.path}/$hash.mp3');
  }
}

class TtsService {
  TtsService({
    http.Client? client,
    TtsCacheService? cacheService,
  })  : _client = client ?? http.Client(),
        _cache = cacheService ?? TtsCacheService();

  final http.Client _client;
  final TtsCacheService _cache;

  static const _googleVoiceMap = {
    'de': {'languageCode': 'de-DE', 'name': 'de-DE-Wavenet-B'},
    'fr': {'languageCode': 'fr-FR', 'name': 'fr-FR-Wavenet-B'},
    'it': {'languageCode': 'it-IT', 'name': 'it-IT-Wavenet-B'},
  };

  Future<String?> synthesize({
    required String text,
    required AppLanguage language,
    String? voiceId,
  }) async {
    if (!language.supportsTts) return null;

    final cached =
        await _cache.getCachedAudioPath(text, language, voiceId: voiceId);
    if (cached != null) return cached;

    Uint8List? audioBytes;

    if (EnvConfig.elevenLabsApiKey.isNotEmpty) {
      audioBytes = await _synthesizeElevenLabs(
        text: text,
        voiceId: voiceId ?? EnvConfig.defaultElevenLabsVoiceId,
      );
    }

    audioBytes ??= await _synthesizeGoogle(text: text, language: language);
    if (audioBytes == null) return null;

    return _cache.saveToCache(text, language, audioBytes, voiceId: voiceId);
  }

  Future<Uint8List?> _synthesizeElevenLabs({
    required String text,
    required String voiceId,
  }) async {
    try {
      final url = Uri.parse('${EnvConfig.elevenLabsEndpoint}/$voiceId');
      final response = await _client.post(
        url,
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': EnvConfig.elevenLabsApiKey,
          'Accept': 'audio/mpeg',
        },
        body: json.encode({
          'text': text,
          'model_id': 'eleven_multilingual_v2',
          'voice_settings': {
            'stability': 0.5,
            'similarity_boost': 0.75,
          },
        }),
      );

      if (response.statusCode == 200) {
        return response.bodyBytes;
      }
    } catch (_) {}
    return null;
  }

  Future<Uint8List?> _synthesizeGoogle({
    required String text,
    required AppLanguage language,
  }) async {
    final apiKey = EnvConfig.googleTtsApiKey;
    if (apiKey.isEmpty) return null;

    final voice = _googleVoiceMap[language.code];
    if (voice == null) return null;

    final body = {
      'input': {'text': text},
      'voice': {
        'languageCode': voice['languageCode'],
        'name': voice['name'],
      },
      'audioConfig': {'audioEncoding': 'MP3'},
    };

    final url = Uri.parse('${EnvConfig.ttsEndpoint}?key=$apiKey');
    final response = await _client.post(
      url,
      headers: {'Content-Type': 'application/json'},
      body: json.encode(body),
    );

    if (response.statusCode != 200) return null;

    final data = json.decode(response.body) as Map<String, dynamic>;
    return base64.decode(data['audioContent'] as String);
  }
}
