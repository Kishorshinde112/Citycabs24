import React from 'react';
import TourDetailPage from './TourDetailPage';

const rules = [
  "Toll parking and entry tickets are not included in the car hire charges",
  "Remaining time and kms can't be used to cover local places in Mumbai",
  "The trip should be: Pickup → Konkan Darshan → Drop",
  "City Cabs 24 offers doorstep pickup and drop for hassle-free experience (No extra charge)",
  "You can add or skip places of your choice. You can take your own time at each spot",
  "Cancellation charge of Rs 500/- will be applicable if booking is cancelled after arrival of driver",
];

const attractions = [
  { emoji: '🏖️', name: 'Ganpatipule Beach', desc: 'Famous for its swayambhu Ganesh temple right on the beach; stunning coastal scenery.' },
  { emoji: '🏰', name: 'Sindhudurg Fort', desc: 'A magnificent sea fort built by Chhatrapati Shivaji Maharaj on a small island.' },
  { emoji: '🌊', name: 'Tarkarli Beach', desc: 'Known for crystal-clear water, scuba diving, and snorkeling opportunities.' },
  { emoji: '🐊', name: 'Malvan Marine Sanctuary', desc: 'Diverse marine life and coral reefs; ideal for water sports lovers.' },
  { emoji: '🛕', name: 'Sawantwadi Palace', desc: 'Royal palace of the Sawantwadi kingdom, famous for traditional wooden lacquerware.' },
  { emoji: '🌿', name: 'Amboli Ghat', desc: 'One of Maharashtra\'s highest ghats; stunning waterfalls and lush biodiversity.' },
  { emoji: '🐠', name: 'Vengurla Beach', desc: 'Quiet and pristine beach, perfect for peaceful relaxation and seafood.' },
  { emoji: '🍤', name: 'Ratnagiri', desc: 'Famous for Alphonso mangoes, Ratnadurg Fort, and the Konkan\'s coastal charm.' },
];

const rateColumns = ['3 Days, 2 Nights (700 Kms)', '4 Days, 3 Nights (900 Kms)', '5 Days, 4 Nights (1100 Kms)'];
const rates = [
  { vehicle: 'Sedan',    cols: ['₹10500', '₹14000', '₹17000'] },
  { vehicle: 'Ertiga',   cols: ['₹12100', '₹16200', '₹19700'] },
  { vehicle: 'Kia Carens', cols: ['₹13500', '₹18000', '₹22000'] },
  { vehicle: 'Crysta',   cols: ['₹15000', '₹20000', '₹24500'] },
];

export default function KonkanDarshanPage() {
  return (
    <TourDetailPage
      slug="konkan-darshan"
      tourName="Konkan Darshan"
      subtitle="Coastal Paradise — Beaches, Forts & Seafood"
      heroImage="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80"
      description="The Konkan coastline is Maharashtra's hidden treasure — a stretch of pristine beaches, ancient sea forts, tropical greenery, and the freshest Malvani seafood. Our Konkan Darshan tour takes you through the best of Sindhudurg, Ratnagiri, and beyond."
      rules={rules}
      attractionTitle="Places to Explore"
      attractions={attractions}
      rateColumns={rateColumns}
      rates={rates}
      tripType="Konkan Darshan"
    />
  );
}
