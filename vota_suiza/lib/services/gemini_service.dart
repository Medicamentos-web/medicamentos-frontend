import 'dart:convert';

import 'package:http/http.dart' as http;

import '../config/env_config.dart';

class GeminiService {
  GeminiService({http.Client? client}) : _client = client ?? http.Client();

  final http.Client _client;

  Future<String> generateResponse({
    required String systemPrompt,
    required String userMessage,
    required String languageCode,
    List<Map<String, String>>? conversationHistory,
  }) async {
    final apiKey = EnvConfig.geminiApiKey;
    if (apiKey.isEmpty) {
      return _fallbackResponse(languageCode);
    }

    final contents = <Map<String, dynamic>>[];

    if (conversationHistory != null) {
      for (final msg in conversationHistory) {
        contents.add({
          'role': msg['role'],
          'parts': [{'text': msg['text']}],
        });
      }
    }

    contents.add({
      'role': 'user',
      'parts': [
        {
          'text':
              'Responde en idioma: $languageCode.\n\nMensaje del usuario: $userMessage',
        },
      ],
    });

    final body = {
      'systemInstruction': {
        'parts': [{'text': systemPrompt}],
      },
      'contents': contents,
      'generationConfig': {
        'temperature': 0.7,
        'maxOutputTokens': 512,
      },
    };

    final url = Uri.parse('${EnvConfig.geminiEndpoint}?key=$apiKey');

    final response = await _client.post(
      url,
      headers: {'Content-Type': 'application/json'},
      body: json.encode(body),
    );

    if (response.statusCode != 200) {
      throw Exception('Gemini API error: ${response.statusCode} ${response.body}');
    }

    final data = json.decode(response.body) as Map<String, dynamic>;
    final candidates = data['candidates'] as List<dynamic>?;
    if (candidates == null || candidates.isEmpty) {
      throw Exception('Gemini: respuesta vacía');
    }

    final parts = candidates[0]['content']['parts'] as List<dynamic>;
    return parts[0]['text'] as String;
  }

  String _fallbackResponse(String languageCode) {
    const messages = {
      'de': 'Entschuldigung, der KI-Dienst ist momentan nicht verfügbar. Bitte versuchen Sie es später erneut.',
      'fr': 'Désolé, le service IA n\'est pas disponible pour le moment. Veuillez réessayer plus tard.',
      'it': 'Spiacenti, il servizio IA non è al momento disponibile. Riprova più tardi.',
      'rm': 'Perdon, il servetsch d\'IA n\'è betg disponibel per il mument.',
    };
    return messages[languageCode] ?? messages['de']!;
  }
}
