import express from 'express';
import { DatabaseSync } from 'node:sqlite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 80;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Ensure data directory exists
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, '../data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const DB_PATH = path.join(DATA_DIR, 'citycabs.db');
const db = new DatabaseSync(DB_PATH);

// Initialize DB Tables
db.exec(`
  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS bookings (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    route TEXT,
    vehicle TEXT,
    date TEXT,
    status TEXT DEFAULT 'Pending',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS tours (
    id TEXT PRIMARY KEY,
    data TEXT NOT NULL
  );
`);

try {
  db.exec(`ALTER TABLE bookings ADD COLUMN createdAt DATETIME DEFAULT CURRENT_TIMESTAMP;`);
} catch (e) {
  // Column already exists
}

// Seed default settings if empty
const checkSettings = db.prepare('SELECT COUNT(*) as count FROM settings').get();
if (checkSettings.count === 0) {
  const insertStmt = db.prepare('INSERT INTO settings (key, value) VALUES (?, ?)');
  insertStmt.run('phone', '9833309061');
  insertStmt.run('helpPhone', '8380803217');
  insertStmt.run('email', 'mumbaicitycabs24@gmail.com');
}

// Seed initial test lead if bookings table is empty
const checkBookings = db.prepare('SELECT COUNT(*) as count FROM bookings').get();
if (checkBookings.count === 0) {
  const insertBooking = db.prepare(`
    INSERT INTO bookings (id, name, phone, route, vehicle, date, status, createdAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  insertBooking.run(
    'BK-838080',
    'Test Booking (Live Lead)',
    '8380803217',
    'Mumbai ➔ Pune (Expressway)',
    'Swift Dzire (Sedan)',
    new Date().toISOString().slice(0, 10),
    'Confirmed',
    new Date().toISOString().slice(0, 19).replace('T', ' ')
  );
}

// Email Notification Setup (Gmail SMTP)
const mailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mykishorshinde@gmail.com',
    pass: 'fmawuuizjewkaftq',
  },
});

async function sendLeadEmailNotification(booking) {
  try {
    const toEmail = 'mumbaicitycabs24@gmail.com';

    const cleanPhone = String(booking.phone || '').replace(/[^0-9]/g, '');
    const phoneDisplay = booking.phone || 'N/A';
    const customerName = booking.name || 'Customer';
    const route = booking.route || 'Tour Inquiry';
    const vehicle = booking.vehicle || 'Standard Cab';
    const travelDate = booking.date || 'Flexible';
    const bookingId = booking.id || 'N/A';
    const createdAt = booking.createdAt || new Date().toISOString().slice(0, 19).replace('T', ' ');

    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.06);">
        <div style="background: linear-gradient(135deg, #09090b 0%, #1e1e24 100%); padding: 24px; text-align: center; border-bottom: 4px solid #f59e0b;">
          <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px;">🚖 CityCabs<span style="color: #f59e0b;">24</span> - Nayi Booking Aayi!</h1>
          <p style="color: #94a3b8; margin: 6px 0 0 0; font-size: 13px;">Live Lead Alert from Website</p>
        </div>

        <div style="padding: 24px 20px;">
          <!-- Quick Call & WhatsApp Buttons -->
          <div style="display: flex; gap: 10px; margin-bottom: 22px;">
            <a href="tel:+91${cleanPhone}" style="flex: 1; background-color: #0f172a; color: #ffffff; text-decoration: none; padding: 14px 12px; border-radius: 12px; font-weight: 700; font-size: 14px; text-align: center; display: inline-block;">
              📞 Call (+91 ${cleanPhone})
            </a>
            <a href="https://wa.me/91${cleanPhone}?text=Hello%20${encodeURIComponent(customerName)},%20regarding%20your%20CityCabs24%20booking%20${bookingId}" style="flex: 1; background-color: #10b981; color: #ffffff; text-decoration: none; padding: 14px 12px; border-radius: 12px; font-weight: 700; font-size: 14px; text-align: center; display: inline-block;">
              💬 WhatsApp
            </a>
          </div>

          <!-- Lead Details Table -->
          <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
            <tbody>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 12px 8px; color: #64748b; font-weight: 600; width: 35%;">Customer Name</td>
                <td style="padding: 12px 8px; color: #0f172a; font-weight: 800; font-size: 16px;">${customerName}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 12px 8px; color: #64748b; font-weight: 600;">Phone Number</td>
                <td style="padding: 12px 8px; color: #2563eb; font-weight: 800; font-size: 16px;">
                  <a href="tel:+91${cleanPhone}" style="color: #2563eb; text-decoration: none;">+91 ${phoneDisplay}</a>
                </td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 12px 8px; color: #64748b; font-weight: 600;">Trip Route</td>
                <td style="padding: 12px 8px; color: #0f172a; font-weight: 700;">${route}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 12px 8px; color: #64748b; font-weight: 600;">Vehicle</td>
                <td style="padding: 12px 8px; color: #0f172a; font-weight: 600;">${vehicle}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 12px 8px; color: #64748b; font-weight: 600;">Travel Date</td>
                <td style="padding: 12px 8px; color: #d97706; font-weight: 700;">📅 ${travelDate}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 12px 8px; color: #64748b; font-weight: 600;">Booking ID</td>
                <td style="padding: 12px 8px; color: #64748b; font-family: monospace;">${bookingId}</td>
              </tr>
              <tr>
                <td style="padding: 12px 8px; color: #64748b; font-weight: 600;">Received At</td>
                <td style="padding: 12px 8px; color: #64748b; font-size: 12px;">${createdAt}</td>
              </tr>
            </tbody>
          </table>

          <div style="text-align: center; margin-top: 25px;">
            <a href="https://citycabs24.com/admin" style="display: inline-block; background-color: #f59e0b; color: #000000; font-weight: 800; font-size: 13px; text-decoration: none; padding: 12px 24px; border-radius: 10px;">
              Open Admin Dashboard ➔
            </a>
          </div>
        </div>

        <div style="background-color: #f8fafc; padding: 14px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0;">
          CityCabs24 Live Dispatch Alert • Mumbai, Maharashtra
        </div>
      </div>
    `;

    const info = await mailTransporter.sendMail({
      from: '"CityCabs24 Dispatch Alert" <mykishorshinde@gmail.com>',
      to: toEmail,
      subject: `🚖 [NEW BOOKING] ${customerName} - ${route} (📞 +91 ${cleanPhone})`,
      text: `Nayi Booking Aayi!\n\nName: ${customerName}\nPhone: +91 ${phoneDisplay}\nRoute: ${route}\nVehicle: ${vehicle}\nTravel Date: ${travelDate}\nBooking ID: ${bookingId}\n\nCall: tel:+91${cleanPhone}\nWhatsApp: https://wa.me/91${cleanPhone}`,
      html: htmlContent,
    });

    console.log(`✉️ [LEAD EMAIL SENT] Message ID: ${info.messageId} to ${toEmail}`);
  } catch (err) {
    console.error('❌ Failed to send lead email notification:', err.message);
  }
}

// n8n Webhook Dispatch for instant Telegram & iOS push alerts
async function sendN8nLeadAlert(booking) {
  const urls = [
    'http://n8n:5678/webhook/citycabs24-lead',
    'https://n8n.kishorlab.dev/webhook/citycabs24-lead'
  ];
  for (const url of urls) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking),
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      if (res.ok) {
        console.log(`⚡ [N8N LEAD DISPATCHED] Successfully delivered to ${url}`);
        return;
      }
    } catch (e) {
      // try fallback url
    }
  }
  console.warn('⚠️ [N8N LEAD DISPATCH] Could not reach n8n webhook.');
}

// REST API Endpoints

// 1. Settings Endpoints
app.get('/api/settings', (req, res) => {
  try {
    const rows = db.prepare('SELECT key, value FROM settings').all();
    const settings = {};
    for (const r of rows) {
      settings[r.key] = r.value;
    }
    res.json({ success: true, settings });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.put('/api/settings', (req, res) => {
  try {
    const { phone, helpPhone, email } = req.body;
    const updateStmt = db.prepare('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)');
    for (const [key, value] of Object.entries(req.body)) {
      if (value !== undefined && value !== null) {
        const valStr = typeof value === 'object' ? JSON.stringify(value) : String(value).trim();
        updateStmt.run(key, valStr);
      }
    }

    const rows = db.prepare('SELECT key, value FROM settings').all();
    const settings = {};
    for (const r of rows) {
      settings[r.key] = r.value;
    }
    res.json({ success: true, settings });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 2. Bookings Endpoints
app.get('/api/bookings', (req, res) => {
  try {
    const rows = db.prepare('SELECT * FROM bookings ORDER BY rowid DESC').all();
    res.json({ success: true, bookings: rows });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/bookings', (req, res) => {
  try {
    const name = String(req.body.name || req.body.fullName || 'Customer').trim();
    const phone = String(req.body.phone || req.body.contact || '').trim();
    const route = String(req.body.route || req.body.tourName || req.body.destination || req.body.drop || 'Custom Trip').trim();
    const vehicle = String(req.body.vehicle || req.body.carType || req.body.carPreference || 'Standard Cab').trim();
    const date = String(req.body.date || req.body.travelDate || req.body.pickupDate || new Date().toISOString().slice(0, 10)).trim();
    const id = req.body.id || ('BK-' + Math.floor(100000 + Math.random() * 900000));
    const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');

    console.log(`📥 [NEW BOOKING RECEIVED] ID: ${id} | Name: "${name}" | Phone: "${phone}" | Route: "${route}" | Vehicle: "${vehicle}" | Date: "${date}"`);

    let stmt;
    try {
      stmt = db.prepare(`
        INSERT INTO bookings (id, name, phone, route, vehicle, date, status, created_at)
        VALUES (?, ?, ?, ?, ?, ?, 'Pending', ?)
      `);
      stmt.run(id, name, phone, route, vehicle, date, createdAt);
    } catch (e) {
      stmt = db.prepare(`
        INSERT INTO bookings (id, name, phone, route, vehicle, date, status)
        VALUES (?, ?, ?, ?, ?, ?, 'Pending')
      `);
      stmt.run(id, name, phone, route, vehicle, date);
    }

    // Send email alert asynchronously without blocking API response
    sendLeadEmailNotification({ id, name, phone, route, vehicle, date, createdAt }).catch((e) => {
      console.error('Async email notification error:', e.message);
    });

    // Send instant Telegram / n8n alert asynchronously
    sendN8nLeadAlert({ id, name, phone, route, vehicle, date, createdAt }).catch((e) => {
      console.error('Async n8n notification error:', e.message);
    });

    res.json({
      success: true,
      booking: { id, name, phone, route, vehicle, date, status: 'Pending', createdAt }
    });
  } catch (err) {
    console.error('❌ Error saving booking:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Test Email & Alert Endpoint
app.post('/api/test-email', async (req, res) => {
  try {
    const testPayload = {
      id: 'TEST-' + Math.floor(1000 + Math.random() * 9000),
      name: 'Test Customer (Shahrukh)',
      phone: '9769681690',
      route: 'Mumbai Darshan (Test Alert)',
      vehicle: 'Swift Dzire (Sedan)',
      date: new Date().toISOString().slice(0, 10),
      createdAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
    };
    await sendLeadEmailNotification(testPayload);
    await sendN8nLeadAlert(testPayload);
    res.json({ success: true, message: 'Test lead alert sent to Email and Telegram!' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.patch('/api/bookings/:id/status', (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const stmt = db.prepare('UPDATE bookings SET status = ? WHERE id = ?');
    stmt.run(status, id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete('/api/bookings/:id', (req, res) => {
  try {
    const { id } = req.params;
    const stmt = db.prepare('DELETE FROM bookings WHERE id = ?');
    stmt.run(id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 3. Tours Endpoints (CMS for Tour Packages & Images)
app.get('/api/tours', (req, res) => {
  try {
    const rows = db.prepare('SELECT id, data FROM tours').all();
    const tours = rows.map(r => JSON.parse(r.data));
    res.json({ success: true, tours });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.put('/api/tours', (req, res) => {
  try {
    const { tours } = req.body;
    if (Array.isArray(tours)) {
      const stmt = db.prepare('INSERT OR REPLACE INTO tours (id, data) VALUES (?, ?)');
      for (const t of tours) {
        stmt.run(t.id, JSON.stringify(t));
      }
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.put('/api/tours/:id', (req, res) => {
  try {
    const { id } = req.params;
    const tourData = req.body;
    const stmt = db.prepare('INSERT OR REPLACE INTO tours (id, data) VALUES (?, ?)');
    stmt.run(id, JSON.stringify(tourData));
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete('/api/tours/:id', (req, res) => {
  try {
    const { id } = req.params;
    const stmt = db.prepare('DELETE FROM tours WHERE id = ?');
    stmt.run(id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 4. Admin Authentication Endpoint
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (email?.trim().toLowerCase() === 'mumbaicitycabs24@gmail.com' && password === 'Shahrukh@123') {
    res.json({ success: true, token: 'admin-jwt-token-citycabs24' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid admin credentials.' });
  }
});

// Serve compiled static assets
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

// Catch-all route to serve SPA index.html
app.use((req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚖 CityCabs24 Fullstack server running on http://0.0.0.0:${PORT}`);
  console.log(`📁 Database connected at ${DB_PATH}`);
});
