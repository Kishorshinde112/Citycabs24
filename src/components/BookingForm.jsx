import React, { useState } from 'react';

export default function BookingForm() {
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    
    // Using Kishor's n8n webhook for leads
    const formData = {
      name: e.target.name.value,
      phone: e.target.phone.value,
      tour: e.target.tour.value
    };

    try {
      await fetch('https://n8n.kishorlab.dev/webhook/lead-ingestor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      setStatus('Booking Confirmed! We will call you shortly.');
    } catch (error) {
      setStatus('Error, please try again.');
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-100 max-w-md w-full">
      <h3 className="text-2xl font-bold mb-6 text-gray-900">Book Your Cab</h3>
      {status ? <p className="text-blue-600 font-bold mb-4">{status}</p> : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" type="text" placeholder="Full Name" required className="w-full p-4 border rounded-xl" />
          <input name="phone" type="tel" placeholder="Phone Number" required className="w-full p-4 border rounded-xl" />
          <select name="tour" className="w-full p-4 border rounded-xl">
            <option>Select Tour</option>
            <option>Mumbai Darshan</option>
            <option>Airport Transfer</option>
          </select>
          <button type="submit" className="w-full bg-blue-900 text-white py-4 rounded-xl font-bold hover:bg-blue-800 transition">Confirm Booking</button>
        </form>
      )}
    </div>
  );
}
