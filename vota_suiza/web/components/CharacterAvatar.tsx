"use client";

import type { Party } from "@/lib/types";

interface Props {
  party: Party;
  size?: number;
}

export default function CharacterAvatar({ party, size = 64 }: Props) {
  const src = `/characters/${party.id}.svg`;

  return (
    <div
      className="rounded-full overflow-hidden flex-shrink-0 bg-gray-100"
      style={{
        width: size,
        height: size,
        borderColor: party.primaryColor,
        borderWidth: 3,
        borderStyle: "solid",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={party.partyName}
        width={size}
        height={size}
        className="w-full h-full object-cover"
        onError={(e) => {
          const el = e.currentTarget;
          el.style.display = "none";
          if (el.parentElement) {
            el.parentElement.style.backgroundColor = party.primaryColor;
            el.parentElement.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;color:white;font-weight:bold;font-size:${size * 0.3}px">${party.initials}</div>`;
          }
        }}
      />
    </div>
  );
}
