import React from 'react';
import TourDetailPage from './TourDetailPage';

const rules = [
  "Toll parking and entry tickets are not included in the car hire charges",
  "Remaining time and kms can't be used to cover local places in Mumbai",
  "The trip should be: Pickup → Lonavala → Drop",
  "City Cabs 24 offers doorstep pickup and drop for hassle-free experience (No extra charge)",
  "You can add or skip places of your choice. You can take your own time at each spot",
  "Cancellation charge of Rs 500/- will be applicable if booking is cancelled after arrival of driver",
];

const attractions = [
  { emoji: '🌊', name: 'Tiger\'s Leap (Tiger Point)', desc: 'A dramatic cliff edge resembling a tiger\'s leap with breathtaking valley views.' },
  { emoji: '🌊', name: 'Bhushi Dam', desc: 'Popular water cascades over stepped stone embankments — a monsoon favourite.' },
  { emoji: '🦁', name: 'Lion\'s Point', desc: 'Sunset viewpoint overlooking the twin valleys of Lonavala and Khandala.' },
  { emoji: '💎', name: 'Rajmachi Point', desc: 'Panoramic viewpoint with views of Rajmachi Fort.' },
  { emoji: '💧', name: 'Kune Falls', desc: 'One of Maharashtra\'s highest waterfalls, spectacular during monsoon.' },
  { emoji: '🏊', name: 'Lonavala Lake', desc: 'Peaceful lake surrounded by hills, great for picnics and morning walks.' },
  { emoji: '🏛️', name: 'Karla & Bhaja Caves', desc: 'Ancient Buddhist rock-cut cave temples from the 2nd century BCE.' },
  { emoji: '🍬', name: 'Lonavala Chikki & Fudge', desc: 'Famous local sweets — don\'t leave without buying the iconic chikki!' },
];

const rateColumns = ['Same-Day Return (200 Kms)', '2 Days, 1 Night (350 Kms)'];
const rates = [
  { vehicle: 'Sedan',    cols: ['₹3200',  '₹6000']  },
  { vehicle: 'Ertiga',   cols: ['₹3700',  '₹7000']  },
  { vehicle: 'Kia Carens', cols: ['₹4200',  '₹7800']  },
  { vehicle: 'Crysta',   cols: ['₹4800',  '₹8700']  },
];

export default function LonavalaTripPage() {
  return (
    <TourDetailPage
      tourName="Lonavala Trip"
      subtitle="Weekend Gateway to the Sahyadri Hills"
      heroImage="https://images.unsplash.com/photo-1568824432553-9f7de742c24d?auto=format&fit=crop&w=1920&q=80"
      description="Lonavala is a charming hill station nestled in the Western Ghats, just 83 km from Mumbai. Famous for its misty valleys, scenic viewpoints, ancient caves, and the sweetest chikki, it's the perfect weekend escape from city life."
      rules={rules}
      attractionTitle="Top Attractions"
      attractions={attractions}
      rateColumns={rateColumns}
      rates={rates}
      tripType="Lonavala Trip"
    />
  );
}
