import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';

import '../models/party_character.dart';

class CharacterAvatar extends StatelessWidget {
  const CharacterAvatar({
    super.key,
    required this.party,
    this.radius = 32,
    this.showBorder = true,
  });

  final PartyCharacter party;
  final double radius;
  final bool showBorder;

  Color get _color {
    final hex = party.primaryColor.replaceFirst('#', '');
    return Color(int.parse('FF$hex', radix: 16));
  }

  @override
  Widget build(BuildContext context) {
    final size = radius * 2;

    Widget avatar;
    if (party.avatarAsset != null && party.avatarAsset!.isNotEmpty) {
      avatar = ClipOval(
        child: SvgPicture.asset(
          party.avatarAsset!,
          width: size,
          height: size,
          fit: BoxFit.cover,
          placeholderBuilder: (_) => _fallback(size),
        ),
      );
    } else {
      avatar = _fallback(size);
    }

    if (!showBorder) return avatar;

    return Container(
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        border: Border.all(color: _color, width: 3),
        boxShadow: [
          BoxShadow(
            color: _color.withValues(alpha: 0.3),
            blurRadius: 8,
            offset: const Offset(0, 3),
          ),
        ],
      ),
      child: avatar,
    );
  }

  Widget _fallback(double size) {
    return CircleAvatar(
      radius: radius,
      backgroundColor: _color,
      child: Text(
        party.initials,
        style: TextStyle(
          color: Colors.white,
          fontWeight: FontWeight.bold,
          fontSize: radius * 0.45,
        ),
      ),
    );
  }
}
