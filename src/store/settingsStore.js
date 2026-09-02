import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useSettingsStore = create(
  persist(
    (set) => ({
      phone: '9833309061',
      email: 'mumbaicitycabs24@gmail.com',
      updateSettings: (newSettings) => set((state) => ({ ...state, ...newSettings })),
    }),
    {
      name: 'site-settings', // name of item in the storage (must be unique)
    }
  )
);

export default useSettingsStore;
