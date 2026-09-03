import express from 'express';
import cors from 'cors';
import compression from 'compression';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { DatabaseSync } from 'node:sqlite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 80;

// Ensure persistent data directory exists
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, '../data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const DB_PATH = path.join(DATA_DIR, 'citycabs.db');
const db = new DatabaseSync(DB_PATH);

// Initialize Tables
db.exec(`
  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT
  );

  CREATE TABLE IF NOT EXISTS bookings (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    route TEXT,
    vehicle TEXT,
    date TEXT,
    status TEXT DEFAULT 'Pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Seed default settings if not exists
const getSettingStmt = db.prepare('SELECT value FROM settings WHERE key = ?');
const setSettingStmt = db.prepare('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)');

if (!getSettingStmt.get('phone')) {
  setSettingStmt.run('phone', '9833309061');
}
if (!getSettingStmt.get('helpPhone')) {
  setSettingStmt.run('helpPhone', '8380803217');
}
if (!getSettingStmt.get('email')) {
  setSettingStmt.run('email', 'mumbaicitycabs24@gmail.com');
}

// Middleware
app.use(cors());
app.use(compression());
app.use(express.json());

// Redirect old GoDaddy lander
app.use('/lander', (req, res) => res.redirect(301, '/'));

// --- API ROUTES ---

// 1. Auth Login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const adminEmail = process.env.ADMIN_EMAIL || 'mumbaicitycabs24@gmail.com';
  const adminPass = process.env.ADMIN_PASSWORD || 'Shahrukh@123';

  if (email && email.trim() === adminEmail && password === adminPass) {
    const token = 'citycabs_admin_' + Buffer.from(`${email}:${Date.now()}`).toString('base64');
    return res.json({
      success: true,
      token,
      admin: { email: adminEmail }
    });
  }

  return res.status(401).json({ success: false, message: 'Invalid admin email or password.' });
});

// 2. Settings - GET
app.get('/api/settings', (req, res) => {
  try {
    const phoneRow = getSettingStmt.get('phone');
    const helpPhoneRow = getSettingStmt.get('helpPhone');
    const emailRow = getSettingStmt.get('email');
    return res.json({
      success: true,
      settings: {
        phone: phoneRow ? phoneRow.value : '9833309061',
        helpPhone: helpPhoneRow ? helpPhoneRow.value : '8380803217',
        email: emailRow ? emailRow.value : 'mumbaicitycabs24@gmail.com',
      }
    });
  } catch (err) {
    console.error('Error fetching settings:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// 3. Settings - PUT / POST (Update)
app.put('/api/settings', (req, res) => {
  try {
    const { phone, helpPhone, email } = req.body;
    if (phone) setSettingStmt.run('phone', String(phone).trim());
    if (helpPhone) setSettingStmt.run('helpPhone', String(helpPhone).trim());
    if (email) setSettingStmt.run('email', String(email).trim());

    const phoneRow = getSettingStmt.get('phone');
    const helpPhoneRow = getSettingStmt.get('helpPhone');
    const emailRow = getSettingStmt.get('email');
    return res.json({
      success: true,
      settings: {
        phone: phoneRow ? phoneRow.value : '9833309061',
        helpPhone: helpPhoneRow ? helpPhoneRow.value : '8380803217',
        email: emailRow ? emailRow.value : 'mumbaicitycabs24@gmail.com',
      }
    });
  } catch (err) {
    console.error('Error updating settings:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// 4. Bookings - GET (List all leads)
const getBookingsStmt = db.prepare('SELECT * FROM bookings ORDER BY created_at DESC');

app.get('/api/bookings', (req, res) => {
  try {
    const bookings = getBookingsStmt.all();
    return res.json({
      success: true,
      bookings: bookings.map(b => ({
        id: b.id,
        name: b.name,
        phone: b.phone,
        route: b.route,
        vehicle: b.vehicle,
        date: b.date,
        status: b.status,
        createdAt: b.created_at,
      }))
    });
  } catch (err) {
    console.error('Error fetching bookings:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// 5. Bookings - POST (Create new lead from website forms)
const insertBookingStmt = db.prepare(`
  INSERT INTO bookings (id, name, phone, route, vehicle, date, status)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`);

app.post('/api/bookings', (req, res) => {
  try {
    const { name, phone, route, vehicle, date } = req.body;
    if (!name || !phone) {
      return res.status(400).json({ success: false, message: 'Name and Phone are required.' });
    }

    const id = `BK-${Date.now().toString().slice(-6)}`;
    const status = 'Pending';
    const bookingDate = date || new Date().toISOString().slice(0, 10);

    insertBookingStmt.run(
      id,
      String(name).trim(),
      String(phone).trim(),
      route ? String(route).trim() : 'General Inquiry',
      vehicle ? String(vehicle).trim() : 'Standard Cab',
      bookingDate,
      status
    );

    console.log(`[LEAD] New booking lead recorded: ${id} - ${name} (${phone}) - ${route}`);

    return res.status(201).json({
      success: true,
      booking: {
        id,
        name: String(name).trim(),
        phone: String(phone).trim(),
        route: route ? String(route).trim() : 'General Inquiry',
        vehicle: vehicle ? String(vehicle).trim() : 'Standard Cab',
        date: bookingDate,
        status
      }
    });
  } catch (err) {
    console.error('Error creating booking:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// 6. Bookings - PATCH (Update status: Confirmed, Completed, Pending, Cancelled)
const updateBookingStatusStmt = db.prepare('UPDATE bookings SET status = ? WHERE id = ?');
const getBookingByIdStmt = db.prepare('SELECT * FROM bookings WHERE id = ?');

app.patch('/api/bookings/:id/status', (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ success: false, message: 'Status is required.' });
    }

    updateBookingStatusStmt.run(status, id);
    const updated = getBookingByIdStmt.get(id);

    return res.json({ success: true, booking: updated });
  } catch (err) {
    console.error('Error updating status:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// 7. Bookings - DELETE
const deleteBookingStmt = db.prepare('DELETE FROM bookings WHERE id = ?');

app.delete('/api/bookings/:id', (req, res) => {
  try {
    const { id } = req.params;
    deleteBookingStmt.run(id);
    return res.json({ success: true, id });
  } catch (err) {
    console.error('Error deleting booking:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// --- STATIC ASSETS & SPA FALLBACK ---
const distPath = path.join(__dirname, '../dist');

// Static assets with cache headers
app.use('/assets', express.static(path.join(distPath, 'assets'), {
  maxAge: '1y',
  immutable: true
}));

app.use(express.static(distPath, {
  maxAge: 0,
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('logo.png') || filePath.endsWith('index.html')) {
      res.setHeader('Cache-Control', 'no-cache, must-revalidate');
    }
  }
}));

// SPA catch-all fallback
app.use((req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚖 CityCabs24 Fullstack server running on http://0.0.0.0:${PORT}`);
  console.log(`📁 Database connected at ${DB_PATH}`);
});
