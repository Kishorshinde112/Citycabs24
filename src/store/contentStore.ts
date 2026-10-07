// @ts-nocheck
import { create } from 'zustand';
import { fetchSharedSettings } from './settingsStore';
import { persist } from 'zustand/middleware';
import { TOURS_DATA } from '../data/toursData';
import { FLEET_DATA } from '../data/fleetData';
import { GALLERY_DATA } from '../data/routesData';
import { TESTIMONIALS_DATA } from '../data/testimonialsData';
import { FAQ_DATA } from '../data/faqData';

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
      testimonials: TESTIMONIALS_DATA,
      faqs: FAQ_DATA,
      siteImages: DEFAULT_SITE_IMAGES,

      // Fetch all tours and site content from server
      fetchContent: async () => {
        try {
          const res = await fetch('/api/tours?sort=displayOrder&limit=100');
          if (res.ok) {
            const data = await res.json();
            if (data && Array.isArray(data.docs) && data.docs.length > 0) {
              const normalizedTours = data.docs.map((doc: any) => {
                const staticTour = TOURS_DATA.find((t) => t.slug === doc.slug || t.id === doc.slug || t.id === doc.id) || {};
                const tourDetailsBlock = doc.layout?.find((b: any) => b.blockType === 'tourDetails');
                return {
                  ...staticTour,
                  ...doc,
                  banner: doc.banner || tourDetailsBlock?.heroImage || staticTour.banner || '/assets/tours/mumbai-darshan-banner.webp',
                  startingPrice: doc.startingPrice || staticTour.startingPrice || '₹2,499',
                  category: doc.category || staticTour.category || 'City Tour',
                  duration: doc.duration || staticTour.duration || '1 Day Tour',
                  shortDescription: doc.shortDescription || tourDetailsBlock?.description || staticTour.shortDescription || '',
                };
              });
              set({ tours: normalizedTours });
            } else if (data.success && Array.isArray(data.tours) && data.tours.length > 0) {
              set({ tours: data.tours });
            }
          }
        } catch (err) {
          console.warn('Using local cached tours:', err);
        }

        // Fetch Fleet from CMS
        try {
          const res = await fetch('/api/fleet?limit=50');
          if (res.ok) {
            const data = await res.json();
            if (data && Array.isArray(data.docs) && data.docs.length > 0) {
              const normalized = data.docs.map((doc: any) => ({
                id: doc.id,
                name: doc.name,
                category: doc.category || 'Standard',
                tag: doc.tag || 'Popular',
                seats: doc.seats || doc.seating || '4 + 1 Passengers',
                configuration: doc.configuration || '',
                bootSpace: doc.bootSpace || '',
                luggage: doc.luggage || '2-3 Bags',
                acType: doc.acType || (doc.ac ? 'Air Conditioned' : 'Non-AC'),
                fuelType: doc.fuelType || 'CNG / Petrol',
                ratePerKm: doc.ratePerKm || '₹12 / km',
                localFullDay: doc.localFullDay || doc.baseRate || '₹2,499 / 8hr 80km',
                image: doc.imageUrl || doc.image?.url || doc.image || '',
                bestFor: doc.bestFor || '',
              }));
              set({ fleet: normalized });
            }
          }
        } catch (err) {}

        // Fetch Gallery from CMS
        try {
          const res = await fetch('/api/gallery?limit=50');
          if (res.ok) {
            const data = await res.json();
            if (data && Array.isArray(data.docs) && data.docs.length > 0) {
              const normalized = data.docs.map((doc: any) => ({
                id: doc.id,
                title: doc.title,
                category: doc.category || 'Mumbai',
                image: doc.imageUrl || doc.image?.url || doc.image || '',
              }));
              set({ gallery: normalized });
            }
          }
        } catch (err) {}

        // Fetch Testimonials from CMS
        try {
          const res = await fetch('/api/testimonials?limit=50');
          if (res.ok) {
            const data = await res.json();
            if (data && Array.isArray(data.docs) && data.docs.length > 0) {
              set({ testimonials: data.docs });
            }
          }
        } catch (err) {}

        // Fetch FAQs from CMS
        try {
          const res = await fetch('/api/faqs?limit=50');
          if (res.ok) {
            const data = await res.json();
            if (data && Array.isArray(data.docs) && data.docs.length > 0) {
              const normalized = data.docs.map((doc: any) => {
                let answerText = typeof doc.answer === 'string' ? doc.answer : '';
                if (!answerText && doc.answer?.root?.children) {
                  answerText = doc.answer.root.children
                    .map((n: any) => n.children?.map((c: any) => c.text).join(''))
                    .join('\n');
                }
                return {
                  question: doc.question,
                  answer: answerText,
                };
              });
              set({ faqs: normalized });
            }
          }
        } catch (err) {}

        try {
          const data = await fetchSharedSettings();
          if (data) {
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

// Eager window fetch removed to eliminate redundant client-side REST calls on page load.
// All initial content is streamed directly via Next.js Server Components.

export default useContentStore;
