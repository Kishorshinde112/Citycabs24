import React from 'react';
import TourDetailPage from './TourDetailPage';

const rules = [
  "Toll parking and entry tickets are not included in the car hire charges",
  "Remaining time and kms can't be used to cover local places in Mumbai",
  "The trip should be: Pickup → Ashtavinayak → Drop",
  "City Cabs 24 offers doorstep pickup and drop for hassle-free experience (No extra charge)",
  "You can add or skip places of your choice. You can take your own time at each spot",
  "Cancellation charge of Rs 500/- will be applicable if booking is cancelled after arrival of driver",
];

const attractions = [
  { emoji: '🐘', name: 'Mayureshwar Temple (Morgaon)', desc: 'Starting & ending point of the yatra; Ganesha defeated the demon Sindhu here.' },
  { emoji: '🐘', name: 'Siddhivinayak Temple (Siddhatek)', desc: 'Known for granting wishes and success (siddhi).' },
  { emoji: '🐘', name: 'Ballaleshwar Temple (Pali)', desc: 'The only Ganesha temple named after a devotee (Ballal).' },
  { emoji: '🐘', name: 'Varadavinayak Temple (Mahad)', desc: 'Associated with blessings and boons (varada).' },
  { emoji: '🐘', name: 'Chintamani Temple (Theur)', desc: 'Believed to relieve worries (chinta).' },
  { emoji: '🐘', name: 'Girijatmaj Temple (Lenyadri)', desc: 'Located in caves; associated with Ganesha\'s childhood.' },
  { emoji: '🐘', name: 'Vighneshwar Temple (Ozar)', desc: 'Worshipped as the remover of obstacles (vighna).' },
  { emoji: '🐘', name: 'Mahaganapati Temple (Ranjangaon)', desc: 'Represents Ganesha in his most powerful form.' },
];

const rateColumns = ['3 Days, 2 Nights (900 Kms)', '4 Days, 3 Nights (1000 Kms)'];
const rates = [
  { vehicle: 'Sedan',    cols: ['₹13500', '₹15200'] },
  { vehicle: 'Ertiga',   cols: ['₹15600', '₹17600'] },
  { vehicle: 'Kia Carens', cols: ['₹17400', '₹19600'] },
  { vehicle: 'Crysta',   cols: ['₹19200', '₹21600'] },
];

export default function AshtavinayakPage() {
  return (
    <TourDetailPage
      slug="ashtavinayak"
      tourName="Ashtavinayak"
      subtitle="Spiritual Trail of Lord Ganesha"
      heroImage="https://images.unsplash.com/photo-1546961342-ea5f62d951f0?auto=format&fit=crop&w=1920&q=80"
      description="Ashtavinayak refers to the sacred pilgrimage of eight Ganesha temples across Maharashtra. 'Ashta' means eight and 'Vinayak' is a name of Ganesha. Experience the divine grace of all eight swayambhu (self-manifest) Ganeshas."
      rules={rules}
      attractionTitle="The 8 Sacred Temples"
      attractions={attractions}
      rateColumns={rateColumns}
      rates={rates}
      tripType="Ashtavinayak Tour"
    />
  );
}
