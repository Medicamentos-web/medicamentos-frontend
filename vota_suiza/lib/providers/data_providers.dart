import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../models/vote.dart';
import '../services/data_loader_service.dart';
import 'service_providers.dart';

final partiesProvider = FutureProvider<List<PartyCharacter>>((ref) async {
  final loader = ref.watch(dataLoaderProvider);
  return loader.loadParties();
});

final partyByIdProvider =
    FutureProvider.family<PartyCharacter?, String>((ref, id) async {
  final loader = ref.watch(dataLoaderProvider);
  return loader.getPartyById(id);
});

final partyHistoryProvider =
    FutureProvider.family((ref, String partyId) async {
  final loader = ref.watch(dataLoaderProvider);
  return loader.getHistoryForParty(partyId);
});

final votingQuestionsProvider = FutureProvider((ref) async {
  final loader = ref.watch(dataLoaderProvider);
  return loader.loadVotingQuestions();
});
