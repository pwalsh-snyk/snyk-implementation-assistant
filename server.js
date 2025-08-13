const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
require('dotenv').config();

const povProcessor = require('./src/povProcessor');
const competitiveIntel = require('./src/competitiveIntel');
const implementationResources = require('./src/implementationResources');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/api/process-pov', async (req, res) => {
  try {
    const { discoveryNotes } = req.body;
    
    if (!discoveryNotes || discoveryNotes.trim().length < 50) {
      return res.status(400).json({
        error: 'Insufficient discovery notes. Please provide more detailed information about the customer\'s current state, challenges, and requirements.'
      });
    }

    const result = await povProcessor.processDiscoveryNotes(discoveryNotes);
    res.json(result);
  } catch (error) {
    console.error('Error processing POV:', error);
    res.status(500).json({ error: 'Failed to process POV worksheet' });
  }
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('send-message', async (data) => {
    try {
      const { message, conversationHistory } = data;
      
      // Process the message and generate response
      const response = await povProcessor.processMessage(message, conversationHistory);
      
      socket.emit('receive-message', {
        type: 'assistant',
        content: response.content,
        povWorksheet: response.povWorksheet,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error processing message:', error);
      socket.emit('receive-message', {
        type: 'error',
        content: 'Sorry, I encountered an error processing your message. Please try again.',
        timestamp: new Date().toISOString()
      });
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Snyk POV Assistant running on port ${PORT}`);
  console.log(`Open http://localhost:${PORT} to access the application`);
}); 