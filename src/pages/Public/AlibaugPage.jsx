import React from 'react';
import TourDetailPage from './TourDetailPage';

const rules = [
  "Toll parking, ferry charges, and entry tickets are not included in car hire charges",
  "Remaining time and kms can't be used to cover local places in Mumbai",
  "The trip should be: Pickup → Alibaug → Drop",
  "City Cabs 24 offers doorstep pickup and drop for hassle-free experience (No extra charge)",
  "You can add or skip places of your choice. You can take your own time at each spot",
  "Cancellation charge of Rs 500/- will be applicable if booking is cancelled after arrival of driver",
];

const attractions = [
  { emoji: '🏰', name: 'Kolaba Fort (Alibag Fort)', desc: 'A magnificent sea fort built by Chhatrapati Shivaji Maharaj, accessible on foot at low tide.' },
  { emoji: '🏖️', name: 'Alibaug Beach', desc: 'The main beach — ideal for swimming, sunbathing and evening strolls.' },
  { emoji: '🌊', name: 'Kashid Beach', desc: 'One of the cleanest and most scenic beaches on the Konkan coast.' },
  { emoji: '⚓', name: 'Murud Janjira Fort', desc: 'The only sea fort on India\'s West Coast never conquered — an architectural marvel.' },
  { emoji: '🏖️', name: 'Kihim Beach', desc: 'A quiet and pristine beach surrounded by casuarina trees.' },
  { emoji: '🏛️', name: 'Nagaon Beach', desc: 'Popular beach with water sports facilities and beautiful sunsets.' },
  { emoji: '🛕', name: 'Kanakeshwar Temple', desc: 'Ancient hilltop temple dedicated to Lord Shiva with panoramic coastal views.' },
  { emoji: '🐠', name: 'Rewas Beach', desc: 'Entry point to Alibaug by ferry from Mumbai — scenic river and sea crossing.' },
];

const rateColumns = ['Same-Day Return (250 Kms)', '2 Days, 1 Night (400 Kms)'];
const rates = [
  { vehicle: 'Sedan',    cols: ['₹4000',  '₹7200']  },
  { vehicle: 'Ertiga',   cols: ['₹4600',  '₹8400']  },
  { vehicle: 'Kia Carens', cols: ['₹5200',  '₹9400']  },
  { vehicle: 'Crysta',   cols: ['₹5900',  '₹10500'] },
];

export default function AlibaugPage() {
  return (
    <TourDetailPage
      tourName="Alibaug Sightseeing"
      subtitle="Coastal Charm — Beaches, Sea Forts & Seafood"
      heroImage="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80"
      description="Alibaug is a coastal town just 95 km from Mumbai, known for its beautiful beaches, historic sea forts, and laid-back coastal vibe. Often called the 'Goa of Maharashtra', it's the perfect quick getaway for a sun, sea and seafood experience."
      rules={rules}
      attractionTitle="Top Attractions"
      attractions={attractions}
      rateColumns={rateColumns}
      rates={rates}
      tripType="Alibaug Sightseeing"
    />
  );
}
