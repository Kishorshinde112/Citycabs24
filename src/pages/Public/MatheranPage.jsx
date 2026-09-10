import React from 'react';
import TourDetailPage from './TourDetailPage';

const rules = [
  "Toll parking and entry tickets are not included in the car hire charges",
  "Remaining time and kms can't be used to cover local places in Mumbai",
  "The trip should be: Pickup → Matheran → Drop",
  "Note: No motorized vehicles allowed inside Matheran — explore on foot or by horse",
  "City Cabs 24 offers doorstep pickup and drop for hassle-free experience (No extra charge)",
  "You can add or skip places of your choice. You can take your own time at each spot",
  "Cancellation charge of Rs 500/- will be applicable if booking is cancelled after arrival of driver",
];

const attractions = [
  { emoji: '🌅', name: 'Panorama Point', desc: 'The most popular viewpoint offering a 360° panoramic view of the surrounding hills.' },
  { emoji: '🌊', name: 'Charlotte Lake', desc: 'A serene lake and the main water source of Matheran, perfect for peaceful walks.' },
  { emoji: '🛤️', name: 'Toy Train Ride', desc: 'Iconic narrow-gauge heritage railway from Neral to Matheran through dense forests.' },
  { emoji: '🦅', name: 'Louisa Point', desc: 'Breathtaking views of the Prabal and Matheran valleys.' },
  { emoji: '🌿', name: 'Echo Point', desc: 'Famous for its natural echo effect with stunning valley views.' },
  { emoji: '🏇', name: 'Horse Riding', desc: 'Explore the no-vehicle zone on horseback — a unique Matheran experience.' },
  { emoji: '🌁', name: 'One Tree Hill Point', desc: 'A calm viewpoint with dramatic valley scenery, especially beautiful at dusk.' },
  { emoji: '🔭', name: 'Hart Point', desc: 'Offers spectacular views of Prabal Fort and the surrounding landscape.' },
];

const rateColumns = ['Same-Day Return (200 Kms)', '2 Days, 1 Night (350 Kms)'];
const rates = [
  { vehicle: 'Sedan',    cols: ['₹3200',  '₹6000']  },
  { vehicle: 'Ertiga',   cols: ['₹3700',  '₹7000']  },
  { vehicle: 'Kia Carens', cols: ['₹4200',  '₹7800']  },
  { vehicle: 'Crysta',   cols: ['₹4800',  '₹8700']  },
];

export default function MatheranPage() {
  return (
    <TourDetailPage
      tourName="Matheran Sightseeing"
      subtitle="India's Only No-Vehicle Hill Station"
      heroImage="https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=1920&q=80"
      description="Matheran is India's smallest and only eco-sensitive hill station where motor vehicles are banned. Located just 80 km from Mumbai, it offers red laterite roads, forested trails, and stunning viewpoints — a perfect digital detox."
      rules={rules}
      attractionTitle="Top Attractions"
      attractions={attractions}
      rateColumns={rateColumns}
      rates={rates}
      tripType="Matheran Sightseeing"
    />
  );
}
