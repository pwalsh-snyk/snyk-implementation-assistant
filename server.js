const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const multer = require('multer');
const fs = require('fs');
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

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'discovery-notes-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: function (req, file, cb) {
    // Accept text files, PDFs, and common document formats
    const allowedTypes = /txt|pdf|doc|docx|md|rtf/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype) || 
                    file.mimetype === 'text/plain' ||
                    file.mimetype === 'application/pdf' ||
                    file.mimetype === 'application/msword' ||
                    file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only text files, PDFs, and Word documents are allowed!'));
    }
  }
});

// Middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com"],
      connectSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"]
    }
  }
}));
app.use(compression());
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// File upload endpoint
app.post('/api/upload-discovery', upload.single('discoveryFile'), async (req, res) => {
  try {
    console.log('File upload request received');
    console.log('Request file:', req.file);
    
    if (!req.file) {
      console.log('No file uploaded');
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const filePath = req.file.path;
    let fileContent = '';

    console.log('File path:', filePath);
    console.log('File mimetype:', req.file.mimetype);
    console.log('File extension:', path.extname(req.file.originalname).toLowerCase());

    // Read file content based on type
    const fileExtension = path.extname(req.file.originalname).toLowerCase();
    if (req.file.mimetype === 'text/plain' || fileExtension === '.txt' || fileExtension === '.md') {
      fileContent = fs.readFileSync(filePath, 'utf8');
      console.log('File content length:', fileContent.length);
    } else {
      // For other file types, we'll need additional libraries to parse them
      // For now, return an error asking for text files
      fs.unlinkSync(filePath); // Clean up uploaded file
      return res.status(400).json({ 
        error: 'Currently only .txt and .md files are supported. Please upload a text file or copy/paste your discovery notes.' 
      });
    }

    // Process the discovery notes
    const result = await povProcessor.processDiscoveryNotes(fileContent);
    
    // Clean up uploaded file
    fs.unlinkSync(filePath);
    
    res.json(result);
  } catch (error) {
    console.error('Error processing uploaded file:', error);
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path); // Clean up on error
    }
    res.status(500).json({ error: 'Failed to process uploaded file' });
  }
});

app.post('/api/process-pov', async (req, res) => {
  try {
    const { discoveryNotes } = req.body;
    
    if (!discoveryNotes || discoveryNotes.trim().length < 20) {
      return res.status(400).json({
        error: 'Please provide discovery notes about the customer\'s current state, challenges, and requirements.'
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
      console.log('Received message:', message.substring(0, 100) + '...');
      
      // Process the discovery notes directly if it looks like discovery notes
      if (message.length > 100) {
        const result = await povProcessor.processDiscoveryNotes(message);
        
        socket.emit('receive-message', {
          type: 'assistant',
          content: 'I\'ve processed your discovery notes and generated a comprehensive POV worksheet.',
          povWorksheet: result,
          timestamp: new Date().toISOString()
        });
      } else {
        // Process as a regular message
        const response = await povProcessor.processMessage(message, conversationHistory);
        
        socket.emit('receive-message', {
          type: 'assistant',
          content: response.content,
          povWorksheet: response.povWorksheet,
          timestamp: new Date().toISOString()
        });
      }
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