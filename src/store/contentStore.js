import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TOURS_DATA } from '../data/toursData';
import { FLEET_DATA } from '../data/fleetData';
import { GALLERY_DATA } from '../data/routesData';

export const DEFAULT_SITE_IMAGES = {
  homeHero: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1920&q=80',
  mumbaiHero: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1920&q=80',
};

const useContentStore = create(
  persist(
    (set, get) => ({
      tours: TOURS_DATA,
      fleet: FLEET_DATA,
      gallery: GALLERY_DATA,
      siteImages: DEFAULT_SITE_IMAGES,

      // Fetch all tours and site content from server
      fetchContent: async () => {
        try {
          const res = await fetch('/api/tours');
          if (res.ok) {
            const data = await res.json();
            if (data.success && Array.isArray(data.tours) && data.tours.length > 0) {
              set({ tours: data.tours });
            }
          }
        } catch (err) {
          console.warn('Using local cached tours:', err);
        }

        try {
          const resSettings = await fetch('/api/settings');
          if (resSettings.ok) {
            const data = await resSettings.json();
            if (data.success && data.settings) {
              if (data.settings.fleet) {
                try {
                  const parsed = JSON.parse(data.settings.fleet);
                  if (Array.isArray(parsed) && parsed.length > 0) set({ fleet: parsed });
                } catch (e) {}
              }
              if (data.settings.gallery) {
                try {
                  const parsed = JSON.parse(data.settings.gallery);
                  if (Array.isArray(parsed) && parsed.length > 0) set({ gallery: parsed });
                } catch (e) {}
              }
              if (data.settings.siteImages) {
                try {
                  const parsed = JSON.parse(data.settings.siteImages);
                  if (parsed && typeof parsed === 'object') {
                    set(state => ({ siteImages: { ...state.siteImages, ...parsed } }));
                  }
                } catch (e) {}
              }
            }
          }
        } catch (err) {
          console.warn('Using local cached settings:', err);
        }
      },

      // Backward compatibility
      fetchTours: async () => {
        return get().fetchContent();
      },

      // Tours Management
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
              headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` },
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
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` },
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
            headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
          });
        } catch (err) {
          console.error('Failed to delete tour on server:', err);
        }
      },

      // Fleet Image & Vehicle Management
      updateFleetCar: async (carId, updatedData) => {
        let updatedFleet = [];
        set((state) => {
          updatedFleet = state.fleet.map(c => c.id === carId ? { ...c, ...updatedData } : c);
          return { fleet: updatedFleet };
        });

        try {
          await fetch('/api/settings', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` },
            body: JSON.stringify({ fleet: updatedFleet }),
          });
        } catch (err) {
          console.error('Failed to sync fleet to server:', err);
        }
      },

      // Gallery Image Management
      updateGalleryItem: async (itemId, updatedData) => {
        let updatedGallery = [];
        set((state) => {
          updatedGallery = state.gallery.map(g => g.id === itemId ? { ...g, ...updatedData } : g);
          return { gallery: updatedGallery };
        });

        try {
          await fetch('/api/settings', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` },
            body: JSON.stringify({ gallery: updatedGallery }),
          });
        } catch (err) {
          console.error('Failed to sync gallery to server:', err);
        }
      },

      addGalleryItem: async (newItem) => {
        let updatedGallery = [];
        set((state) => {
          updatedGallery = [
            { id: Date.now(), ...newItem },
            ...state.gallery
          ];
          return { gallery: updatedGallery };
        });

        try {
          await fetch('/api/settings', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` },
            body: JSON.stringify({ gallery: updatedGallery }),
          });
        } catch (err) {
          console.error('Failed to sync gallery to server:', err);
        }
      },

      deleteGalleryItem: async (itemId) => {
        let updatedGallery = [];
        set((state) => {
          updatedGallery = state.gallery.filter(g => g.id !== itemId);
          return { gallery: updatedGallery };
        });

        try {
          await fetch('/api/settings', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` },
            body: JSON.stringify({ gallery: updatedGallery }),
          });
        } catch (err) {
          console.error('Failed to delete gallery item from server:', err);
        }
      },

      // Site Images (Hero background, etc.)
      updateSiteImage: async (key, imageUrl) => {
        let updatedSiteImages = {};
        set((state) => {
          updatedSiteImages = {
            ...state.siteImages,
            [key]: imageUrl
          };
          return { siteImages: updatedSiteImages };
        });

        try {
          await fetch('/api/settings', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` },
            body: JSON.stringify({ siteImages: updatedSiteImages }),
          });
        } catch (err) {
          console.error('Failed to sync site image to server:', err);
        }
      },

      // Reset to defaults
      resetTours: async () => {
        set({ tours: TOURS_DATA });
        try {
          await fetch('/api/tours', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` },
            body: JSON.stringify({ tours: TOURS_DATA }),
          });
        } catch (err) {}
      },

      resetFleet: async () => {
        set({ fleet: FLEET_DATA });
        try {
          await fetch('/api/settings', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` },
            body: JSON.stringify({ fleet: FLEET_DATA }),
          });
        } catch (err) {}
      },

      resetGallery: async () => {
        set({ gallery: GALLERY_DATA });
        try {
          await fetch('/api/settings', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` },
            body: JSON.stringify({ gallery: GALLERY_DATA }),
          });
        } catch (err) {}
      },

      resetSiteImages: async () => {
        set({ siteImages: DEFAULT_SITE_IMAGES });
        try {
          await fetch('/api/settings', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` },
            body: JSON.stringify({ siteImages: DEFAULT_SITE_IMAGES }),
          });
        } catch (err) {}
      },

      resetToDefault: async () => {
        set({
          tours: TOURS_DATA,
          fleet: FLEET_DATA,
          gallery: GALLERY_DATA,
          siteImages: DEFAULT_SITE_IMAGES,
        });
        try {
          await fetch('/api/tours', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` },
            body: JSON.stringify({ tours: TOURS_DATA }),
          });
          await fetch('/api/settings', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` },
            body: JSON.stringify({
              fleet: FLEET_DATA,
              gallery: GALLERY_DATA,
              siteImages: DEFAULT_SITE_IMAGES,
            }),
          });
        } catch (err) {}
      }
    }),
    {
      name: 'site-content-v6',
    }
  )
);

if (typeof window !== 'undefined') {
  useContentStore.getState().fetchContent();
}

export default useContentStore;
