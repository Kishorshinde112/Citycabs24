import React from 'react';
import TourDetailPage from './TourDetailPage';

const rules = [
  "Toll parking and entry tickets are not included in the car hire charges",
  "Remaining time and kms can't be used to cover local places in Mumbai",
  "The trip should be: Pickup → Igatpuri tour → Drop",
  "City Cabs 24 offers doorstep pickup and drop for hassle-free experience (No extra charge)",
  "You can add or skip places of your choice. You can take your own time at each spot",
  "Cancellation charge of Rs 500/- will be applicable if booking is cancelled after arrival of driver",
];

const attractions = [
  { emoji: '🌄', name: 'Kasara Ghat', desc: 'Scenic mountain pass with breathtaking valley views, especially beautiful during monsoon.' },
  { emoji: '🕉️', name: 'Kapaleshwar Cave', desc: 'A peaceful cave temple dedicated to Lord Shiva.' },
  { emoji: '🙏', name: 'Ghatandevi Mata Mandir', desc: 'Surrounded by hills, perfect for a spiritual and nature-filled visit.' },
  { emoji: '🚪', name: 'Myanmar Gate', desc: 'A grand entrance near Vipassana, inspired by Burmese architecture.' },
  { emoji: '💧', name: 'Ashoka Waterfall Vihigaon', desc: 'A popular waterfall known for adventure activities like rappelling.' },
  { emoji: '🌊', name: 'Bhavali Dam', desc: 'Calm and scenic dam ideal for relaxing and photography.' },
  { emoji: '🏰', name: 'Tringalwadi Fort', desc: 'A trekking spot with panoramic views from the top.' },
  { emoji: '⛰️', name: 'Camel Valley', desc: 'Known for dramatic cliffs and seasonal waterfalls.' },
  { emoji: '🌿', name: 'Bhatsa River Valley', desc: 'A lush green valley with misty landscapes and river views.' },
  { emoji: '🧘', name: 'Vipassana International Academy', desc: 'World-famous meditation center offering a peaceful environment.' },
];

const rateColumns = ['Same-Day Return (350 Kms)', '2 Days, 1 Night (600 Kms)'];
const rates = [
  { vehicle: 'Sedan',    cols: ['₹5200',  '₹9000']  },
  { vehicle: 'Ertiga',   cols: ['₹6000',  '₹10400'] },
  { vehicle: 'Kia Carens', cols: ['₹6700',  '₹11600'] },
  { vehicle: 'Crysta',   cols: ['₹7400',  '₹12800'] },
];

export default function IgatpuriTourPage() {
  return (
    <TourDetailPage
      slug="igatpuri-tour"
      tourName="Igatpuri Tour"
      subtitle="Hills, Waterfalls & Dams"
      heroImage="https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&w=1920&q=80"
      description="Igatpuri is a small hill town in the Western Ghats, located in Nashik district of Maharashtra. It's best known for its scenic beauty, cool climate, and peaceful vibe — especially popular with travelers from Mumbai and Pune looking for a quick nature getaway."
      rules={rules}
      attractionTitle="Top Attractions"
      attractions={attractions}
      rateColumns={rateColumns}
      rates={rates}
      tripType="Igatpuri Tour"
    />
  );
}
