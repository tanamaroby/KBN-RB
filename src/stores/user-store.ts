import { create } from "zustand";
import { users } from "../../generated/prisma";

export type UseUserStoreType = users & {
  loading: boolean;
  setLoading: (isLoading: boolean) => void;
  updateFirstName: (name: string) => void;
  updateLastName: (name: string) => void;
  updateEmail: (email: string) => void;
  updateRole: (role: string) => void;
  updateAvatar: (avatar: string) => void;
  updateUser: (user: users) => void;
};

export const EMPTY_USER: users = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  role: "",
  avatar: null,
};

export const useUser = create<UseUserStoreType>((set) => ({
  ...EMPTY_USER,
  loading: true,
  setLoading: (isLoading: boolean) => set({ loading: isLoading }),
  updateFirstName: (name: string) => set(() => ({ first_name: name })),
  updateLastName: (name: string) => set(() => ({ last_name: name })),
  updateEmail: (email: string) => set(() => ({ email })),
  updateRole: (role: string) => set(() => ({ role })),
  updateAvatar: (avatar: string) => set(() => ({ avatar })),
  updateUser: (user: users) => set(() => user),
}));
