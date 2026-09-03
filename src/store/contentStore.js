import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TOURS_DATA } from '../data/toursData';

const useContentStore = create(
  persist(
    (set) => ({
      tours: TOURS_DATA,
      updateTour: (tourId, updatedData) => set((state) => ({
        tours: state.tours.map(t => t.id === tourId ? { ...t, ...updatedData } : t)
      })),
      addTour: (newTour) => set((state) => ({
        tours: [...state.tours, { ...newTour, id: newTour.id || Date.now().toString() }]
      })),
      deleteTour: (tourId) => set((state) => ({
        tours: state.tours.filter(t => t.id !== tourId)
      }))
    }),
    {
      name: 'site-content',
    }
  )
);

export default useContentStore;
