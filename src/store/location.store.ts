import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type LocationStore = {
  storeId: string | null;
  setStoreId: (id: string) => void;
};

export const useLocationStore = create<LocationStore>()(
  persist(
    (set) => ({
      storeId: null,
      setStoreId: (id) => {
        set({ storeId: id });
      },
    }),
    {
      name: 'storeId', // unique name for localStorage key
    },
  ),
);
