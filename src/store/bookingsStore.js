import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useBookingsStore = create(
  persist(
    (set, get) => ({
      bookings: [],

      fetchBookings: async () => {
        try {
          const res = await fetch('/api/bookings');
          if (res.ok) {
            const data = await res.json();
            if (data.success && Array.isArray(data.bookings)) {
              set({ bookings: data.bookings });
            }
          }
        } catch (err) {
          console.warn('Backend fetch offline, using cached bookings:', err);
        }
      },

      addBooking: async (booking) => {
        const newRecord = {
          id: 'BK-' + Math.floor(1000 + Math.random() * 9000),
          name: booking.name || 'Anonymous',
          contact: booking.contact || booking.phone || '',
          phone: booking.phone || booking.contact || '',
          tripType: booking.tripType || 'Tour / One Way',
          tourName: booking.tourName || booking.route || '',
          route: booking.route || booking.tourName || '',
          carType: booking.carType || booking.vehicle || 'Standard Cab',
          vehicle: booking.vehicle || booking.carType || 'Standard Cab',
          date: booking.date || booking.travelDate || new Date().toISOString().slice(0, 10),
          travelDate: booking.travelDate || booking.date || new Date().toISOString().slice(0, 10),
          pickupLocation: booking.pickupLocation || '',
          status: 'Pending',
          createdAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
          ...booking,
        };

        set((state) => ({
          bookings: [newRecord, ...state.bookings]
        }));

        try {
          await fetch('/api/bookings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: newRecord.name,
              phone: newRecord.phone,
              route: newRecord.route || newRecord.tourName,
              vehicle: newRecord.vehicle || newRecord.carType,
              date: newRecord.date,
            }),
          });
        } catch (err) {
          console.error('Failed to sync booking to backend:', err);
        }
      },

      updateBookingStatus: async (id, status) => {
        set((state) => ({
          bookings: state.bookings.map(b => b.id === id ? { ...b, status } : b)
        }));

        try {
          await fetch(`/api/bookings/${id}/status`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status }),
          });
        } catch (err) {
          console.error('Failed to update status on backend:', err);
        }
      },

      deleteBooking: async (id) => {
        set((state) => ({
          bookings: state.bookings.filter(b => b.id !== id)
        }));

        try {
          await fetch(`/api/bookings/${id}`, { method: 'DELETE' });
        } catch (err) {
          console.error('Failed to delete booking on backend:', err);
        }
      }
    }),
    {
      name: 'site-bookings-v2',
    }
  )
);

// Initial sync on app load
if (typeof window !== 'undefined') {
  useBookingsStore.getState().fetchBookings();
}

export default useBookingsStore;
