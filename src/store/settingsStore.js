import { create } from 'zustand';


let sharedSettingsPromise = null;
export const fetchSharedSettings = () => {
  if (!sharedSettingsPromise) {
    sharedSettingsPromise = fetch('/api/settings').then(res => {
      if (!res.ok) throw new Error('Network response was not ok');
      return res.json();
    }).catch(err => {
      sharedSettingsPromise = null;
      throw err;
    });
  }
  return sharedSettingsPromise;
};

const DEFAULT_SETTINGS = {
  phone: '9833309061',
  helpPhone: '8380803217',
  email: 'mumbaicitycabs24@gmail.com',
};

const useSettingsStore = create((set, get) => ({
  ...DEFAULT_SETTINGS,
  loading: false,

  fetchSettings: async () => {
    try {
      const data = await fetchSharedSettings();
      if (data) {
        if (data.success && data.settings) {
          set({
            phone: data.settings.phone || DEFAULT_SETTINGS.phone,
            helpPhone: data.settings.helpPhone || DEFAULT_SETTINGS.helpPhone,
            email: data.settings.email || DEFAULT_SETTINGS.email,
          });
        }
      }
    } catch (err) {
      console.warn('Using default settings (offline fallback):', err);
    }
  },

  updateSettings: async (newSettings) => {
    set((state) => ({ ...state, ...newSettings }));
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newSettings),
      });
      if (data) {
        if (data.success && data.settings) {
          set({
            phone: data.settings.phone,
            helpPhone: data.settings.helpPhone,
            email: data.settings.email,
          });
        }
      }
    } catch (err) {
      console.error('Failed to sync settings with server:', err);
    }
  },
}));

if (typeof window !== 'undefined') {
  useSettingsStore.getState().fetchSettings();
}

export default useSettingsStore;
