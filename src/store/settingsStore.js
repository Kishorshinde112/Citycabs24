import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const DEFAULT_SETTINGS = {
  phone: '9833309061',
  helpPhone: '8380803217',
  email: 'mumbaicitycabs24@gmail.com',
};

const useSettingsStore = create(
  persist(
    (set) => ({
      ...DEFAULT_SETTINGS,
      updateSettings: (newSettings) => set((state) => ({ ...state, ...newSettings })),
    }),
    {
      name: 'site-settings',
    }
  )
);

export default useSettingsStore;
