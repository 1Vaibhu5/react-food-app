// server.js - Main Server File
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');

// Load env vars
dotenv.config();

// Connect to MongoDB
const connectDB = require('./config/db');
connectDB();

const app = express();
const server = http.createServer(app);

// Socket.IO
const io = socketio(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  },
});

app.set('socketio', io);

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser
app.use(cookieParser());

// Session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

// CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);

// Security
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/orders', require('./routes/order'));
app.use('/api/upload', require('./routes/upload'));

// Socket.IO Chat
const Message = require('./models/Message');

io.on('connection', (socket) => {
  console.log('New WebSocket connection');

  socket.on('join', ({ username, room }) => {
    socket.join(room);
    socket.username = username;
    socket.room = room;

    socket.emit('message', {
      senderName: 'Admin',
      message: `Welcome to ${room}!`,
      createdAt: new Date(),
    });

    socket.broadcast.to(room).emit('message', {
      senderName: 'Admin',
      message: `${username} joined`,
      createdAt: new Date(),
    });
  });

  socket.on('chatMessage', async (msg) => {
    try {
      const message = await Message.create({
        sender: msg.userId,
        senderName: msg.username,
        message: msg.message,
        room: socket.room || 'general',
      });

      io.to(socket.room).emit('message', {
        senderName: msg.username,
        message: msg.message,
        createdAt: message.createdAt,
      });
    } catch (error) {
      console.error('Error saving message:', error);
    }
  });

  socket.on('disconnect', () => {
    if (socket.username && socket.room) {
      io.to(socket.room).emit('message', {
        senderName: 'Admin',
        message: `${socket.username} left`,
        createdAt: new Date(),
      });
    }
    console.log('User disconnected');
  });
});

// Test routes
app.get('/api/test', (req, res) => {
  res.json({ success: true, message: 'API working!' });
});

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server running',
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Server Error',
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`✅ Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  console.log(`✅ Socket.IO server is ready for real-time chat`);
});

process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});

module.exports = app;