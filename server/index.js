import express from 'express';
import { DatabaseSync } from 'node:sqlite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 80;

app.use(express.json());

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

    if (phone) updateStmt.run('phone', String(phone).trim());
    if (helpPhone) updateStmt.run('helpPhone', String(helpPhone).trim());
    if (email) updateStmt.run('email', String(email).trim());

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
    const { name, phone, route, vehicle, date } = req.body;
    const id = 'BK-' + Math.floor(100000 + Math.random() * 900000);
    const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');

    const stmt = db.prepare(`
      INSERT INTO bookings (id, name, phone, route, vehicle, date, status, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, 'Pending', ?)
    `);

    stmt.run(id, name || 'Customer', phone || '', route || 'Custom Trip', vehicle || 'Standard Cab', date || new Date().toISOString().slice(0, 10), createdAt);

    res.json({
      success: true,
      booking: { id, name, phone, route, vehicle, date, status: 'Pending', createdAt }
    });
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

// 3. Admin Authentication Endpoint
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (email === 'mumbaicitycabs24@gmail.com' && password === 'Shahrukh@123') {
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
