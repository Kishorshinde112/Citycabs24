# Backend Integration Guide for Agent

This document outlines the requirements and structure needed to build a real backend for the `CityCabs24` application. Currently, the frontend and admin panel rely on mocked data and `localStorage`.

## 1. Authentication

The admin panel currently uses a hardcoded login (`mumbaicitycabs24@gmail.com` / `Shahrukh@123`).

**Required Backend Endpoints:**
- `POST /api/auth/login`
  - Body: `{ email, password }`
  - Returns: JWT Token or sets an HttpOnly cookie.
- `GET /api/auth/me`
  - Returns: Current admin user details.

## 2. Global Site Settings

Currently, the site contact phone (`9833309061`) and email (`mumbaicitycabs24@gmail.com`) are managed via Zustand and `localStorage`.

**Required Database Model (`Settings` or `SiteConfig`):**
- `id` (UUID or INT)
- `supportPhone` (String)
- `supportEmail` (String)

**Required Backend Endpoints:**
- `GET /api/settings`
  - Public endpoint. Fetches the current settings for the frontend UI.
- `PUT /api/settings`
  - Protected endpoint (Admin only). Updates the settings.

**Frontend changes required once backend is ready:**
- In `src/store/settingsStore.js`, replace the `persist` middleware initialization with an async `fetchSettings` action that calls `GET /api/settings` on app load.
- In `src/pages/Admin/Settings.jsx`, update the `handleSubmit` to call `PUT /api/settings` instead of just updating local state.

## 3. Bookings & Inquiries (Optional / Next Steps)

The admin dashboard currently shows a mocked table of bookings. The frontend contact/booking forms currently do not send data anywhere.

**Required Database Model (`Booking`):**
- `id` (UUID)
- `customerName` (String)
- `customerPhone` (String)
- `customerEmail` (String, optional)
- `routeOrTour` (String)
- `date` (DateTime)
- `status` (Enum: PENDING, CONFIRMED, COMPLETED, CANCELLED)

**Required Backend Endpoints:**
- `POST /api/bookings`
  - Public endpoint. Called by the frontend booking forms.
- `GET /api/bookings`
  - Protected endpoint (Admin only). Lists all bookings for the dashboard.
- `PATCH /api/bookings/:id/status`
  - Protected endpoint. Updates a booking status.

## General Tech Stack Recommendation for the Agent
Given the frontend is React (Vite), a lightweight Node.js backend using **Express** or **Fastify** with a database like **PostgreSQL** (via Prisma or Drizzle ORM) or **MongoDB** (via Mongoose) would integrate seamlessly.
