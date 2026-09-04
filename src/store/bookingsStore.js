import { create } from 'zustand';

const useBookingsStore = create((set, get) => ({
  bookings: [],
  loading: false,

  fetchBookings: async () => {
    set({ loading: true });
    try {
      const res = await fetch('/api/bookings');
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.bookings)) {
          set({ bookings: data.bookings, loading: false });
          return;
        }
      }
    } catch (err) {
      console.warn('Using local fallback for bookings:', err);
    }
    set({ loading: false });
  },

  addBooking: async (bookingData) => {
    const tempId = 'BK-' + Math.floor(100000 + Math.random() * 900000);
    const newBooking = {
      id: tempId,
      name: bookingData.name || 'Customer',
      phone: bookingData.phone || bookingData.contact || '',
      route: bookingData.route || bookingData.tourName || 'Custom Trip',
      vehicle: bookingData.vehicle || bookingData.carType || 'Standard Cab',
      date: bookingData.date || new Date().toISOString().slice(0, 10),
      status: 'Pending',
      created_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
    };

    // Optimistic UI update
    set((state) => ({ bookings: [newBooking, ...state.bookings] }));

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.booking) {
          get().fetchBookings();
        }
      }
    } catch (err) {
      console.error('Failed to sync booking to server:', err);
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
      console.error('Failed to update booking status on server:', err);
    }
  },

  deleteBooking: async (id) => {
    set((state) => ({
      bookings: state.bookings.filter(b => b.id !== id)
    }));

    try {
      await fetch(`/api/bookings/${id}`, {
        method: 'DELETE',
      });
    } catch (err) {
          console.error('Failed to delete booking on server:', err);
    }
  }
}));

if (typeof window !== 'undefined') {
  useBookingsStore.getState().fetchBookings();
}

export default useBookingsStore;
