import { create } from "zustand";
import { Plantation } from "../../generated/prisma";

export type UsePlantationStoreType = {
  plantations: Array<Plantation>;
  plantation: Plantation | null;
  loading: boolean;
  setPlantation: (plantation: Plantation | null) => void;
  setPlantations: (plantations: Array<Plantation>) => void;
  setLoading: (isLoading: boolean) => void;
};

export const usePlantation = create<UsePlantationStoreType>((set) => ({
  plantations: [],
  plantation: null,
  loading: true,
  setPlantation: (plantation: Plantation | null) => set({ plantation }),
  setPlantations: (plantations: Array<Plantation>) => set({ plantations }),
  setLoading: (isLoading: boolean) => set({ loading: isLoading }),
}));
