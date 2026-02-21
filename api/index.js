const app = require('../server/src/app');
const connectDB = require('../server/src/config/db');

let isConnected = false;

module.exports = async (req, res) => {
    // Set env vars if not already set (for Vercel)
    if (!process.env.MONGODB_URI) {
        require('dotenv').config({ path: './server/.env' });
    }

    if (!isConnected) {
        try {
            await connectDB();
            isConnected = true;
        } catch (error) {
            console.error('DB connection error:', error.message);
            return res.status(500).json({ success: false, error: 'Database connection failed' });
        }
    }

    // Set io to null for serverless (no websockets)
    if (!req.app.get('io')) {
        req.app.set('io', null);
    }

    return app(req, res);
};
