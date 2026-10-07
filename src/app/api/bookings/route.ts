import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '../../../payload.config'

export interface BookingPayloadInput {
  name: string
  phone: string
  email?: string
  route?: string
  tourName?: string
  vehicle?: string
  carType?: string
  date?: string
  travelDate?: string
  tripType?: string
  leadType?: 'booking' | 'quick_enquiry'
  gclid?: string
  utm_source?: string
}

export async function POST(request: Request) {
  try {
    const data: BookingPayloadInput = await request.json()
    const payload = await getPayload({ config: configPromise })

    const booking = await payload.create({
      collection: 'bookings',
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email || '',
        route: data.route || data.tourName || '',
        vehicle: data.vehicle || data.carType || '',
        date: data.date || data.travelDate || new Date().toISOString(),
        status: 'pending',
        leadType: data.leadType || (data.tripType?.includes('Enquiry') ? 'quick_enquiry' : 'booking'),
        gclid: data.gclid || '',
        utm_source: data.utm_source || '',
      },
    })

    return NextResponse.json({ success: true, bookingId: booking.id, booking }, { status: 201 })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal Server Error'
    console.error('Booking API Error:', error)
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const payload = await getPayload({ config: configPromise })

    // Auth guard: only authenticated admins can list bookings
    const { user } = await payload.auth({ headers: request.headers as any })
    if (!user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const limit = Number(searchParams.get('limit')) || 100
    const page = Number(searchParams.get('page')) || 1

    const result = await payload.find({
      collection: 'bookings',
      limit,
      page,
      sort: '-createdAt',
    })

    return NextResponse.json({
      success: true,
      docs: result.docs,
      bookings: result.docs,
      totalDocs: result.totalDocs,
      totalPages: result.totalPages,
    })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal Server Error'
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}