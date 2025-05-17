import { AudioWaveform, Command, GalleryVerticalEnd } from "lucide-react";

export type KebunType = {
  name: string;
  logo: typeof GalleryVerticalEnd;
  description: string;
};

export const KEBUN_LIST: Array<KebunType> = [
  {
    name: "Sintong",
    logo: GalleryVerticalEnd,
    description: "Main Kebun 700 HA",
  },
  {
    name: "Panam",
    logo: AudioWaveform,
    description: "Secondary Kebun 500 HA",
  },
  {
    name: "Sample Kebun",
    logo: Command,
    description: "Tertiary Kebun 250 HA",
  },
];
