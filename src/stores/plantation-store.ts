import { create } from "zustand";
import { Plantation } from "../../generated/prisma";

export type UsePlantationStoreType = {
  plantations: Array<Plantation>;
  plantation: Plantation | null;
  loading: boolean;
  updatePlantation: (plantation: Partial<Plantation>) => void;
  setPlantations: (plantations: Array<Plantation>) => void;
  setLoading: (isLoading: boolean) => void;
};

export const usePlantation = create<UsePlantationStoreType>((set) => ({
  plantations: [],
  plantation: null,
  loading: true,
  updatePlantation: (plantation: Partial<Plantation>) =>
    set((state) => ({
      ...state,
      ...plantation,
    })),
  setPlantations: (plantations: Array<Plantation>) => set({ plantations }),
  setLoading: (isLoading: boolean) => set({ loading: isLoading }),
}));
