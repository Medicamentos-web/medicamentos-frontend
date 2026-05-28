import Image from "next/image";
import type { Party } from "@/lib/types";

interface Props {
  party: Party;
  size?: number;
}

export default function CharacterAvatar({ party, size = 64 }: Props) {
  const src = `/characters/${party.id}.svg`;

  return (
    <div
      className="rounded-full overflow-hidden flex-shrink-0"
      style={{
        width: size,
        height: size,
        borderColor: party.primaryColor,
        borderWidth: 3,
        borderStyle: "solid",
      }}
    >
      <Image
        src={src}
        alt={party.partyName}
        width={size}
        height={size}
        className="object-cover"
        onError={(e) => {
          const el = e.target as HTMLImageElement;
          el.style.display = "none";
        }}
      />
    </div>
  );
}
