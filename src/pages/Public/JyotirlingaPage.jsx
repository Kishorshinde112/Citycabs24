import React from 'react';
import TourDetailPage from './TourDetailPage';

const rules = [
  "Toll parking and entry tickets are not included in the car hire charges",
  "Remaining time and kms can't be used to cover local places in Mumbai",
  "The trip should be: Pickup → 3 Jyotirlinga → Drop",
  "City Cabs 24 offers doorstep pickup and drop for hassle-free experience (No extra charge)",
  "You can add or skip places of your choice. You can take your own time at each spot",
  "Cancellation charge of Rs 500/- will be applicable if booking is cancelled after arrival of driver",
];

const attractions = [
  { emoji: '🕉️', name: 'Trimbakeshwar (Nashik)', desc: 'One of the 12 Jyotirlingas; the source of the sacred Godavari river. Located near Nashik.' },
  { emoji: '🕉️', name: 'Bhimashankar (Pune)', desc: 'Located in the Sahyadri Hills; also a wildlife sanctuary. One of the most scenic Jyotirlingas.' },
  { emoji: '🕉️', name: 'Grishneshwar (Aurangabad)', desc: 'The last of the 12 Jyotirlingas; located near the UNESCO World Heritage Ellora Caves.' },
  { emoji: '🏛️', name: 'Ellora Caves (Optional)', desc: 'UNESCO World Heritage Site with remarkable rock-cut architecture near Grishneshwar.' },
  { emoji: '🛕', name: 'Nashik City Temples', desc: 'Explore the holy city of Nashik with its many ghats and ancient temples.' },
];

const rateColumns = ['2 Days, 1 Night (900 Kms)', '3 Days, 2 Nights (1000 Kms)'];
const rates = [
  { vehicle: 'Sedan',      cols: ['₹13200', '₹14900'] },
  { vehicle: 'Ertiga',     cols: ['₹15200', '₹17200'] },
  { vehicle: 'Kia Carens', cols: ['₹17000', '₹19200'] },
  { vehicle: 'Crysta',     cols: ['₹18800', '₹21200'] },
];

export default function JyotirlingaPage() {
  return (
    <TourDetailPage
      slug="3-jyotirlinga-in-maharashtra"
      tourName="3 Jyotirlinga in Maharashtra"
      subtitle="Sacred Pilgrimage — Trimbakeshwar, Bhimashankar & Grishneshwar"
      heroImage="https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=1920&q=80"
      description="Maharashtra is blessed with 5 of the 12 sacred Jyotirlingas (divine abodes of Lord Shiva). Our popular 3 Jyotirlinga tour covers Trimbakeshwar, Bhimashankar, and Grishneshwar — a divine circuit through the heartland of Maharashtra."
      rules={rules}
      attractionTitle="Pilgrimage Stops"
      attractions={attractions}
      rateColumns={rateColumns}
      rates={rates}
      tripType="3 Jyotirlinga Tour"
    />
  );
}
