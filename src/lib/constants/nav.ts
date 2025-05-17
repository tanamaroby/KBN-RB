import { Hand, SquareTerminal } from "lucide-react";

export type NavType = {
  title: string;
  url: string;
  icon: typeof SquareTerminal;
  isActive?: boolean;
  items?: Array<{
    title: string;
    url: string;
  }>;
};

export const NAV_ITEMS: Array<NavType> = [
  {
    title: "Dashboard",
    url: "/",
    icon: SquareTerminal,
  },
  {
    title: "Pewaratan",
    url: "/perawatan",
    icon: Hand,
  },
];
