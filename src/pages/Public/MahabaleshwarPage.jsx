import React from 'react';
import TourDetailPage from './TourDetailPage';

const rules = [
  "Toll parking and entry tickets are not included in the car hire charges",
  "Remaining time and kms can't be used to cover local places in Mumbai",
  "The trip should be: Pickup → Mahabaleshwar → Drop",
  "City Cabs 24 offers doorstep pickup and drop for hassle-free experience (No extra charge)",
  "You can add or skip places of your choice. You can take your own time at each spot",
  "Cancellation charge of Rs 500/- will be applicable if booking is cancelled after arrival of driver",
];

const attractions = [
  { emoji: '🌅', name: 'Wilson Point (Sunrise Point)', desc: 'The highest point in Mahabaleshwar offering stunning sunrise views.' },
  { emoji: '🏔️', name: 'Arthur\'s Seat', desc: 'Known as the "Queen of all Points" — dramatic cliffs with panoramic views.' },
  { emoji: '🌊', name: 'Venna Lake', desc: 'Serene lake perfect for boating and relaxation amidst nature.' },
  { emoji: '🛕', name: 'Mahabaleshwar Temple', desc: 'Ancient temple dedicated to Lord Shiva; the town\'s name derives from it.' },
  { emoji: '🍓', name: 'Strawberry Garden', desc: 'Mahabaleshwar is famous for its fresh strawberries — don\'t miss the farms!' },
  { emoji: '🌿', name: 'Pratapgad Fort', desc: 'Historic Maratha fort where Shivaji Maharaj defeated Afzal Khan.' },
  { emoji: '💧', name: 'Lingmala Waterfall', desc: 'Beautiful waterfall cascading down rocky cliffs; stunning during monsoon.' },
  { emoji: '🦋', name: 'Elephants Head Point', desc: 'A rocky outcrop resembling an elephant\'s head with scenic valley views.' },
  { emoji: '🔭', name: 'Kate\'s Point', desc: 'Overlooks the Krishna Valley and Dhom Dam — ideal for photography.' },
];

const rateColumns = ['Same-Day Return (400 Kms)', '2 Days, 1 Night (600 Kms)', '3 Days, 2 Nights (800 Kms)'];
const rates = [
  { vehicle: 'Sedan',    cols: ['₹5800',  '₹9000',  '₹13000'] },
  { vehicle: 'Ertiga',   cols: ['₹6700',  '₹10400', '₹15000'] },
  { vehicle: 'Kia Carens', cols: ['₹7500',  '₹11600', '₹16800'] },
  { vehicle: 'Crysta',   cols: ['₹8300',  '₹12800', '₹18600'] },
];

export default function MahabaleshwarPage() {
  return (
    <TourDetailPage
      slug="mahabaleshwar-sightseeing"
      tourName="Mahabaleshwar Sightseeing"
      subtitle="Queen of Hill Stations — Scenic Beauty & Cool Breeze"
      heroImage="https://images.unsplash.com/photo-1545158535-c3f7168c28b6?auto=format&fit=crop&w=1920&q=80"
      description="Mahabaleshwar is Maharashtra's premier hill station, located at 1,372 metres in the Western Ghats. Blessed with lush strawberry farms, colonial-era points, ancient temples, and cool misty weather, it's the perfect escape from the city."
      rules={rules}
      attractionTitle="Top Attractions"
      attractions={attractions}
      rateColumns={rateColumns}
      rates={rates}
      tripType="Mahabaleshwar Sightseeing"
    />
  );
}
