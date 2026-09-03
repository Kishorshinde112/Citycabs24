import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useBookingsStore = create(
  persist(
    (set) => ({
      bookings: [],
      addBooking: (booking) => set((state) => ({
        bookings: [{ ...booking, id: 'B-' + Math.floor(1000 + Math.random() * 9000), date: new Date().toISOString(), status: 'Pending' }, ...state.bookings]
      })),
      updateBookingStatus: (id, status) => set((state) => ({
        bookings: state.bookings.map(b => b.id === id ? { ...b, status } : b)
      }))
    }),
    {
      name: 'site-bookings',
    }
  )
);

export default useBookingsStore;
