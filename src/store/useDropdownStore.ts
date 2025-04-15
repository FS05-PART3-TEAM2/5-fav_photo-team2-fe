import { create } from "zustand";

interface DropdownStore {
  openName: string | null;
  setOpenName: (name: string | null) => void;
}

export const useDropdownStore = create<DropdownStore>(set => ({
  openName: null,
  setOpenName: name => set({ openName: name }),
}));
