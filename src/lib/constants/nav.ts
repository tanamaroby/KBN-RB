import { Blocks, SquareTerminal, TreePalm } from "lucide-react";

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
    title: "Kebun",
    url: "/plantations",
    icon: TreePalm,
  },
  {
    title: "Blocks",
    url: "/blocks",
    icon: Blocks,
  },
];
