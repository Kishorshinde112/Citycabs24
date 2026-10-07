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
  {
    emoji: '🏖️',
    name: 'Alibaug Beach',
    desc: 'Clean and serene beach perfect for relaxation.'
  },
  {
    emoji: '🏰',
    name: 'Kolaba Fort',
    desc: 'Historic sea fort accessible during low tide.'
  },
  {
    emoji: '🏖️',
    name: 'Nagaon Beach',
    desc: 'Popular for water sports and activities.'
  },
  {
    emoji: '🏛️',
    name: 'Kanakeshwar Temple',
    desc: 'Ancient temple with panoramic views.'
  },
  {
    emoji: '🏖️',
    name: 'Varsoli Beach',
    desc: 'Serene and clean beach.'
  },
  {
    emoji: '🏖️',
    name: 'Kihim Beach',
    desc: 'Largest beach with usual vendors and rides.'
  },
  {
    emoji: '🐆',
    name: 'Phansad Wildlife Sanctuary',
    desc: 'Wildlife sanctuary near Mumbai.'
  },
  {
    emoji: '🏖️',
    name: 'Akshi Beach',
    desc: 'Lesser-known beach near Alibaug.'
  },
  {
    emoji: '🏛️',
    name: 'Vikram Vinayak Temple (Birla Temple)',
    desc: 'Temple dedicated to Lord Vishnu and Goddess Lakshmi.'
  },
  {
    emoji: '🏰',
    name: 'Murud Janjira Fort',
    desc: 'Nearby historic fort, around 50 km from Alibaug.'
  },
];

const rateColumns = ['Same-Day Return (300 Kms)', '2 Days, 1 Night (500 Kms)'];
const rates = [
  { vehicle: 'Sedan',      cols: ['₹4500',  '₹7600']  },
  { vehicle: 'Ertiga',     cols: ['₹5200',  '₹8800']  },
  { vehicle: 'Kia Carens', cols: ['₹5800',  '₹9800']  },
  { vehicle: 'Crysta',     cols: ['₹6400',  '₹10800'] },
];

export default function AlibaugPage() {
  return (
    <TourDetailPage
      slug="alibaug-sightseeing"
      tourName="Alibaug Sightseeing"
      subtitle="Coastal Charm — Beaches, Sea Forts & Seafood"
      heroImage="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80"
      description="Alibaug is a coastal town just 95 km from Mumbai, known for its beautiful beaches, historic sea forts, and laid-back coastal vibe. Often called the 'Goa of Maharashtra', it's the perfect quick getaway for a sun, sea and seafood experience."
      rules={rules}
      attractionTitle="Must-Visit Places"
      attractions={attractions}
      rateColumns={rateColumns}
      rates={rates}
      tripType="Alibaug Sightseeing"
    />
  );
}
