import React from 'react'

export const metadata = {
  title: 'Enquiry Confirmed | CityCabs24',
  robots: {
    index: false,
    follow: false,
  }
}

export default function EnquiryConfirmed() {
  return (
    <div className="min-h-screen py-24 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Enquiry Confirmed</h1>
      <p>Your enquiry has been confirmed.</p>
    </div>
  )
}