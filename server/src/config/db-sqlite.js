const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const connectDB = async () => {
  return new Promise((resolve, reject) => {
    const dbPath = path.join(__dirname, '..', 'data', 'expert-booking.db');
    const db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('Database connection error:', err.message);
        reject(err);
      } else {
        console.log('SQLite database connected successfully');
        initializeTables(db);
        resolve(db);
      }
    });
  });
};

const initializeTables = (db) => {
  // Create experts table
  db.run(`CREATE TABLE IF NOT EXISTS experts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    expertise TEXT NOT NULL,
    hourly_rate INTEGER NOT NULL,
    availability TEXT NOT NULL,
    rating REAL DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Create sessions table
  db.run(`CREATE TABLE IF NOT EXISTS sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    expert_id INTEGER NOT NULL,
    user_email TEXT NOT NULL,
    date_time DATETIME NOT NULL,
    duration INTEGER NOT NULL,
    status TEXT DEFAULT 'pending',
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (expert_id) REFERENCES experts (id)
  )`);

  // Create users table
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'user',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  console.log('Database tables initialized');
};

module.exports = connectDB;
