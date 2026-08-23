import rakhiZari from "@/assets/rakhi-zari.png";
import rakhiRudraksha from "@/assets/rakhi-rudraksha.png";
import rakhiGold from "@/assets/rakhi-gold.png";
import rakhiFloral from "@/assets/rakhi-floral.png";
import sweetKaju from "@/assets/sweet-kaju.png";
import sweetJamun from "@/assets/sweet-jamun.png";
import sweetLaddu from "@/assets/sweet-laddu.png";
import sweetRasgulla from "@/assets/sweet-rasgulla.png";

export type TilakStyle = {
  id: string;
  name: string;
  note: string;
};

export const tilakStyles: TilakStyle[] = [
  {
    id: "kumkum",
    name: "Round Kumkum with Akshat",
    note: "The timeless red dot, crowned with rice grains for abundance.",
  },
  {
    id: "chandan",
    name: "Chandan & Red Tilak",
    note: "Cooling sandalwood paste with a line of crimson devotion.",
  },
  {
    id: "trishul",
    name: "Royal Trishul Tilak",
    note: "A festive three-pronged mark for strength and courage.",
  },
];

export type RakhiOption = {
  id: string;
  name: string;
  note: string;
  image: string;
};

export const rakhiOptions: RakhiOption[] = [
  {
    id: "zari",
    name: "Traditional Zari",
    note: "Red silk and golden zari, just like the ones from home.",
    image: rakhiZari,
  },
  {
    id: "rudraksha",
    name: "Rudraksha",
    note: "Sacred beads that carry quiet, protective strength.",
    image: rakhiRudraksha,
  },
  {
    id: "gold",
    name: "Minimalist Gold",
    note: "Understated and modern, for the brother who keeps it simple.",
    image: rakhiGold,
  },
  {
    id: "floral",
    name: "Colorful Floral",
    note: "A little garden of blossoms, as bright as your laughter.",
    image: rakhiFloral,
  },
];

export type SweetOption = {
  id: string;
  name: string;
  note: string;
  image: string;
};

export const sweetOptions: SweetOption[] = [
  { id: "kaju", name: "Kaju Katli", note: "Silver-leafed and melt-in-mouth.", image: sweetKaju },
  { id: "jamun", name: "Gulab Jamun", note: "Warm, syrupy, always two at a time.", image: sweetJamun },
  { id: "laddu", name: "Motichoor Laddu", note: "Festival in a single golden sphere.", image: sweetLaddu },
  { id: "rasgulla", name: "Rasgulla", note: "Soft, light, and endlessly refreshing.", image: sweetRasgulla },
];

export const STEP_TITLES = [
  "Welcome",
  "The Tilak",
  "The Aarti",
  "The Rakhi",
  "The Sweet",
  "The Hug",
  "Our Letter",
] as const;
