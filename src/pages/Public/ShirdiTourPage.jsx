import React from 'react';
import TourDetailPage from './TourDetailPage';

const rules = [
  "Toll charges, parking, and entry fees not included in car hire charges",
  "Remaining time and kms can't be used to cover local places in Mumbai",
  "The trip should be: Pickup → Shirdi Tour → Drop",
  "City Cabs 24 offers doorstep pickup and drop for hassle-free experience (No extra charge)",
  "You can add or skip places of your choice. You can take your own time at each spot",
  "Cancellation charge of Rs 500/- will be applicable if booking is cancelled after arrival of driver",
];

const attractions = [
  { emoji: '🕉️', name: 'Sai Baba Temple', desc: 'Main shrine and spiritual center of Shirdi.' },
  { emoji: '🙏', name: 'Shani Shingnapur', desc: 'Famous temple village known for Lord Shani — can be included in the tour.' },
  { emoji: '🛕', name: 'Dwarkamai Masjid', desc: 'Sacred mosque where Sai Baba spent most of his life.' },
  { emoji: '🪔', name: 'Chavadi', desc: 'Where Sai Baba spent alternate nights; an important spiritual stop.' },
  { emoji: '🌿', name: 'Lendi Baug', desc: 'Garden maintained by Sai Baba himself; peaceful and serene.' },
];

const rateColumns = ['Same-Day Return (550 Kms)', '2 Days, 1 Night (600 Kms)'];
const rates = [
  { vehicle: 'Sedan',    cols: ['₹8000',  '₹9000']  },
  { vehicle: 'Ertiga',   cols: ['₹9200',  '₹10400'] },
  { vehicle: 'Kia Carens', cols: ['₹10300', '₹11600'] },
  { vehicle: 'Crysta',   cols: ['₹11400', '₹12800'] },
];

export default function ShirdiTourPage() {
  return (
    <TourDetailPage
      slug="shirdi-tour"
      tourName="Shirdi Tour"
      subtitle="Spiritual Journey to Sai Baba's Abode"
      heroImage="https://images.unsplash.com/photo-1604946114042-dafac5b93cc4?auto=format&fit=crop&w=1920&q=80"
      description="Shirdi is one of India's most revered pilgrimage destinations, home to the sacred shrine of Sai Baba. Experience divine peace and spirituality with our expert driver-guides."
      rules={rules}
      attractionTitle="Places to Visit"
      attractions={attractions}
      rateColumns={rateColumns}
      rates={rates}
      tripType="Shirdi Tour"
    />
  );
}
