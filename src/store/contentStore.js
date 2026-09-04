import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TOURS_DATA } from '../data/toursData';

const useContentStore = create(
  persist(
    (set, get) => ({
      tours: TOURS_DATA,

      fetchTours: async () => {
        try {
          const res = await fetch('/api/tours');
          if (res.ok) {
            const data = await res.json();
            if (data.success && Array.isArray(data.tours) && data.tours.length > 0) {
              set({ tours: data.tours });
            }
          }
        } catch (err) {
          console.warn('Using local/cached tours:', err);
        }
      },

      updateTour: async (tourId, updatedData) => {
        let updatedTour = null;
        set((state) => {
          const newTours = state.tours.map(t => {
            if (t.id === tourId) {
              updatedTour = { ...t, ...updatedData };
              return updatedTour;
            }
            return t;
          });
          return { tours: newTours };
        });

        if (updatedTour) {
          try {
            await fetch(`/api/tours/${tourId}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(updatedTour),
            });
          } catch (err) {
            console.error('Failed to sync tour to server:', err);
          }
        }
      },

      addTour: async (newTour) => {
        const fullTour = {
          ...newTour,
          id: newTour.id || 'tour-' + Date.now(),
          category: newTour.category || 'City Sightseeing',
          duration: newTour.duration || '1 Day Tour',
          startingPrice: newTour.startingPrice || '₹2,999',
          rating: newTour.rating || 4.9,
          reviewsCount: newTour.reviewsCount || 100,
          highlights: newTour.highlights || ['Doorstep Pickup & Drop', 'AC Cab & Driver Guide'],
          banner: newTour.banner || '/assets/tours/bd08021da8c244de8eafa9a4f86c4e2a30099151_yk3fsq4Dd4.png',
        };

        set((state) => ({ tours: [fullTour, ...state.tours] }));

        try {
          await fetch(`/api/tours/${fullTour.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(fullTour),
          });
        } catch (err) {
          console.error('Failed to sync new tour:', err);
        }
      },

      deleteTour: async (tourId) => {
        set((state) => ({
          tours: state.tours.filter(t => t.id !== tourId)
        }));

        try {
          await fetch(`/api/tours/${tourId}`, {
            method: 'DELETE',
          });
        } catch (err) {
          console.error('Failed to delete tour on server:', err);
        }
      },

      resetToDefault: async () => {
        set({ tours: TOURS_DATA });
        try {
          await fetch('/api/tours', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tours: TOURS_DATA }),
          });
        } catch (err) {
          console.error('Failed to reset tours:', err);
        }
      }
    }),
    {
      name: 'site-content-v4',
    }
  )
);

if (typeof window !== 'undefined') {
  useContentStore.getState().fetchTours();
}

export default useContentStore;
