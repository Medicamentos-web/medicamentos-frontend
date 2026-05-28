import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import 'app.dart';
import 'firebase_options.dart';
import 'providers/auth_provider.dart';
import 'screens/main_shell.dart';
import 'screens/onboarding_screen.dart';
import 'services/notification_service.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await dotenv.load(fileName: '.env');
  await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);

  final notifications = NotificationService();
  await notifications.initialize();

  runApp(const ProviderScope(child: BootstrapApp()));
}

class BootstrapApp extends ConsumerStatefulWidget {
  const BootstrapApp({super.key});

  @override
  ConsumerState<BootstrapApp> createState() => _BootstrapAppState();
}

class _BootstrapAppState extends ConsumerState<BootstrapApp> {
  bool? _onboardingDone;

  @override
  void initState() {
    super.initState();
    _loadOnboarding();
  }

  Future<void> _loadOnboarding() async {
    final done = await OnboardingScreen.isComplete();
    if (mounted) setState(() => _onboardingDone = done);
  }

  @override
  Widget build(BuildContext context) {
    if (_onboardingDone == null) {
      return const VotaSuizaApp(
        home: Scaffold(body: Center(child: CircularProgressIndicator())),
      );
    }

    if (!_onboardingDone!) {
      return VotaSuizaApp(
        home: OnboardingScreen(onComplete: () {
          setState(() => _onboardingDone = true);
        }),
      );
    }

    final authInit = ref.watch(authInitProvider);
    return authInit.when(
      loading: () => const VotaSuizaApp(
        home: Scaffold(body: Center(child: CircularProgressIndicator())),
      ),
      error: (e, _) => VotaSuizaApp(
        home: Scaffold(body: Center(child: Text('Error auth: $e'))),
      ),
      data: (_) => const VotaSuizaApp(home: MainShell()),
    );
  }
}
