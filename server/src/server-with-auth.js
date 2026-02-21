const http = require('http');
const socketIo = require('socket.io');
const connectDB = require('./config/db-demo');
const app = require('./app-with-auth');
const socketHandler = require('./sockets/socket');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: process.env.NODE_ENV === 'production' ? false : ["http://localhost:3000"],
    methods: ["GET", "POST"]
  }
});

app.set('io', io);

socketHandler(io);

const startServer = async () => {
  try {
    await connectDB();
    
    server.listen(PORT, () => {
      console.log(`Demo server with authentication running on port ${PORT}`);
      console.log('Frontend available at: http://localhost:3000');
      console.log('Backend API available at: http://localhost:5000/api');
      console.log('Authentication endpoints: /api/auth/login, /api/auth/register');
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
