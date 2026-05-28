import 'dart:convert';

import 'package:flutter/services.dart';

import '../models/history_event.dart';
import '../models/party_character.dart';
import '../models/voting_question.dart';

class DataLoaderService {
  List<PartyCharacter>? _partiesCache;
  List<PartyHistory>? _historyCache;
  List<VotingQuestion>? _questionsCache;
  final Map<String, Map<String, dynamic>> _promptCache = {};

  Future<List<PartyCharacter>> loadParties() async {
    if (_partiesCache != null) return _partiesCache!;
    final jsonStr = await rootBundle.loadString('assets/data/parties.json');
    final list = json.decode(jsonStr) as List<dynamic>;
    _partiesCache =
        list.map((e) => PartyCharacter.fromJson(e as Map<String, dynamic>)).toList();
    return _partiesCache!;
  }

  Future<PartyCharacter?> getPartyById(String id) async {
    final parties = await loadParties();
    try {
      return parties.firstWhere((p) => p.id == id);
    } catch (_) {
      return null;
    }
  }

  Future<List<PartyHistory>> loadHistory() async {
    if (_historyCache != null) return _historyCache!;
    final jsonStr = await rootBundle.loadString('assets/data/history.json');
    final list = json.decode(jsonStr) as List<dynamic>;
    _historyCache =
        list.map((e) => PartyHistory.fromJson(e as Map<String, dynamic>)).toList();
    return _historyCache!;
  }

  Future<PartyHistory?> getHistoryForParty(String partyId) async {
    final all = await loadHistory();
    try {
      return all.firstWhere((h) => h.partyId == partyId);
    } catch (_) {
      return null;
    }
  }

  Future<List<VotingQuestion>> loadVotingQuestions() async {
    if (_questionsCache != null) return _questionsCache!;
    final jsonStr =
        await rootBundle.loadString('assets/data/voting_questions.json');
    final list = json.decode(jsonStr) as List<dynamic>;
    _questionsCache = list
        .map((e) => VotingQuestion.fromJson(e as Map<String, dynamic>))
        .toList();
    return _questionsCache!;
  }

  /// Carga el prompt del partido desde JSON local (caché en memoria).
  Future<Map<String, dynamic>> loadPartyPrompt(String promptFile) async {
    if (_promptCache.containsKey(promptFile)) {
      return _promptCache[promptFile]!;
    }
    final jsonStr = await rootBundle.loadString(promptFile);
    final data = json.decode(jsonStr) as Map<String, dynamic>;
    _promptCache[promptFile] = data;
    return data;
  }
}
