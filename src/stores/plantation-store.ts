import { create } from "zustand";
import { Plantation } from "../../generated/prisma";

export type UsePlantationStoreType = {
  plantations: Array<Plantation>;
  plantation: Plantation | null;
  updatePlantation: (plantation: Partial<Plantation>) => void;
  setPlantations: (plantations: Array<Plantation>) => void;
};

export const usePlantation = create<UsePlantationStoreType>((set) => ({
  plantations: [],
  plantation: null,
  updatePlantation: (plantation: Partial<Plantation>) =>
    set((state) => ({
      ...state,
      ...plantation,
    })),
  setPlantations: (plantations: Array<Plantation>) => set({ plantations }),
}));
