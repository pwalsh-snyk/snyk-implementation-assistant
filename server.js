const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const multer = require('multer');
const fs = require('fs');
const { google } = require('googleapis');
require('dotenv').config();

const povProcessor = require('./src/povProcessor');
const competitiveIntel = require('./src/competitiveIntel');
const implementationResources = require('./src/implementationResources');

// Enhanced input processing with abbreviation expansion and spelling corrections
function enhanceUserInputs(scm, languages, currentState, additionalContext, ide, cicd, containerRegistry, iac, cloudProvider) {
  // Language abbreviation and spelling correction map
  const languageMap = {
    'js': 'JavaScript',
    'javascript': 'JavaScript',
    'ts': 'TypeScript', 
    'typescript': 'TypeScript',
    'py': 'Python',
    'python': 'Python',
    'pyton': 'Python', // Common typo
    'pythn': 'Python', // Common typo
    'pyth': 'Python',  // Common abbreviation
    'java': 'Java',
    '.net': 'C#',
    'dotnet': 'C#',
    'csharp': 'C#',
    'c#': 'C#',
    'c sharp': 'C#',
    'go': 'Go',
    'golang': 'Go',
    'rust': 'Rust',
    'php': 'PHP',
    'ruby': 'Ruby',
    'rb': 'Ruby',
    'node': 'Node.js',
    'nodejs': 'Node.js',
    'node.js': 'Node.js',
    'react': 'React',
    'reactjs': 'React',
    'angular': 'Angular',
    'angularjs': 'Angular',
    'vue': 'Vue.js',
    'vuejs': 'Vue.js',
    'vue.js': 'Vue.js',
    'c++': 'C++',
    'cpp': 'C++',
    'kotlin': 'Kotlin',
    'swift': 'Swift',
    'dart': 'Dart',
    'scala': 'Scala'
  };

  const scmMap = {
    'gh': 'GitHub',
    'github': 'GitHub',
    'git hub': 'GitHub',
    'git-hub': 'GitHub',
    'gl': 'GitLab',
    'gitlab': 'GitLab',
    'git lab': 'GitLab',
    'git-lab': 'GitLab',
    'bb': 'Bitbucket',
    'bitbucket': 'Bitbucket',
    'bit bucket': 'Bitbucket',
    'azdo': 'Azure DevOps',
    'azure devops': 'Azure DevOps',
    'azure-devops': 'Azure DevOps',
    'ado': 'Azure DevOps',
    'tfs': 'Azure DevOps',
    'vsts': 'Azure DevOps',
    'aws codecommit': 'AWS CodeCommit',
    'codecommit': 'AWS CodeCommit'
  };

  const ideMap = {
    'vscode': 'VS Code',
    'vs code': 'VS Code',
    'visual studio code': 'VS Code',
    'intellij': 'IntelliJ IDEA',
    'intellij idea': 'IntelliJ IDEA',
    'idea': 'IntelliJ IDEA',
    'eclipse': 'Eclipse',
    'vim': 'Vim',
    'neovim': 'Neovim',
    'emacs': 'Emacs',
    'sublime': 'Sublime Text',
    'atom': 'Atom',
    'webstorm': 'WebStorm',
    'pycharm': 'PyCharm'
  };

  const cicdMap = {
    'jenkins': 'Jenkins',
    'github actions': 'GitHub Actions',
    'gh actions': 'GitHub Actions',
    'gitlab ci': 'GitLab CI/CD',
    'gitlab ci/cd': 'GitLab CI/CD',
    'azure pipelines': 'Azure Pipelines',
    'azure devops pipelines': 'Azure Pipelines',
    'circleci': 'CircleCI',
    'circle ci': 'CircleCI',
    'travis': 'Travis CI',
    'travis ci': 'Travis CI',
    'bamboo': 'Bamboo',
    'teamcity': 'TeamCity'
  };

  const containerRegistryMap = {
    'docker hub': 'Docker Hub',
    'dockerhub': 'Docker Hub',
    'ecr': 'Amazon ECR',
    'amazon ecr': 'Amazon ECR',
    'acr': 'Azure Container Registry',
    'azure container registry': 'Azure Container Registry',
    'gcr': 'Google Container Registry',
    'google container registry': 'Google Container Registry',
    'gar': 'Google Artifact Registry',
    'google artifact registry': 'Google Artifact Registry',
    'artifactory': 'JFrog Artifactory',
    'jfrog': 'JFrog Artifactory'
  };

  const iacMap = {
    'terraform': 'Terraform',
    'tf': 'Terraform',
    'cloudformation': 'AWS CloudFormation',
    'cfn': 'AWS CloudFormation',
    'arm': 'Azure Resource Manager',
    'azure rm': 'Azure Resource Manager',
    'kubernetes': 'Kubernetes',
    'k8s': 'Kubernetes',
    'helm': 'Helm',
    'pulumi': 'Pulumi',
    'cdk': 'AWS CDK',
    'aws cdk': 'AWS CDK'
  };

  const cloudProviderMap = {
    'aws': 'Amazon Web Services (AWS)',
    'amazon': 'Amazon Web Services (AWS)',
    'amazon web services': 'Amazon Web Services (AWS)',
    'azure': 'Microsoft Azure',
    'microsoft azure': 'Microsoft Azure',
    'gcp': 'Google Cloud Platform (GCP)',
    'google cloud': 'Google Cloud Platform (GCP)',
    'google cloud platform': 'Google Cloud Platform (GCP)',
    'multi-cloud': 'Multi-cloud',
    'multicloud': 'Multi-cloud',
    'on-premises': 'On-premises',
    'on-prem': 'On-premises',
    'hybrid': 'Hybrid cloud'
  };

  // Enhance languages
  let enhancedLanguages = languages;
  if (enhancedLanguages) {
    const langArray = enhancedLanguages.split(',').map(lang => {
      const cleanLang = lang.trim().toLowerCase();
      return languageMap[cleanLang] || lang.trim();
    });
    enhancedLanguages = langArray.join(', ');
  }

  // Enhance SCM
  let enhancedScm = scm;
  if (enhancedScm && enhancedScm !== 'multiple') {
    const cleanScm = enhancedScm.trim().toLowerCase();
    enhancedScm = scmMap[cleanScm] || scm;
  }

  // Enhance optional fields
  const enhanceField = (field, map) => {
    if (!field) return '';
    const cleanField = field.trim().toLowerCase();
    return map[cleanField] || field.trim();
  };

  return {
    scm: enhancedScm,
    languages: enhancedLanguages,
    currentState: currentState,
    additionalContext: additionalContext || '',
    ide: enhanceField(ide, ideMap),
    cicd: enhanceField(cicd, cicdMap),
    containerRegistry: enhanceField(containerRegistry, containerRegistryMap),
    iac: enhanceField(iac, iacMap),
    cloudProvider: enhanceField(cloudProvider, cloudProviderMap)
  };
}

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
app.post('/api/upload-tech', upload.single('techFile'), async (req, res) => {
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
        error: 'Currently only .txt and .md files are supported. Please upload a text file or copy/paste your technical requirements.' 
      });
    }

    // Process the technical requirements
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

// New implementation guide endpoint with AI input enhancement
app.post('/api/generate-implementation', async (req, res) => {
  try {
    const { scm, languages, currentState, additionalContext, ide, cicd, containerRegistry, iac, cloudProvider } = req.body;

    if (!scm || !languages || !currentState) {
      return res.status(400).json({ error: 'SCM, languages, and current state are required' });
    }

    console.log('🧠 AI enhancing user inputs...');
    
    // Enhanced input processing with abbreviation expansion
    const enhancedInputs = enhanceUserInputs(scm, languages, currentState, additionalContext, ide, cicd, containerRegistry, iac, cloudProvider);
    
    console.log('Original inputs:', { scm, languages, currentState, ide, cicd, containerRegistry, iac, cloudProvider });
    console.log('Enhanced inputs:', enhancedInputs);

    // Build discovery notes from enhanced input including optional tech stack
    let discoveryNotes = `
SCM: ${enhancedInputs.scm}
Programming Languages: ${enhancedInputs.languages}  
Current Scan Processes: ${enhancedInputs.currentState}`;

    // Add optional tech stack details if provided
    if (enhancedInputs.ide) discoveryNotes += `\nIDE: ${enhancedInputs.ide}`;
    if (enhancedInputs.cicd) discoveryNotes += `\nCI/CD: ${enhancedInputs.cicd}`;
    if (enhancedInputs.containerRegistry) discoveryNotes += `\nContainer Registry: ${enhancedInputs.containerRegistry}`;
    if (enhancedInputs.iac) discoveryNotes += `\nInfrastructure as Code: ${enhancedInputs.iac}`;
    if (enhancedInputs.cloudProvider) discoveryNotes += `\nCloud Provider: ${enhancedInputs.cloudProvider}`;
    if (enhancedInputs.additionalContext) discoveryNotes += `\nAdditional Context: ${enhancedInputs.additionalContext}`;
    
    discoveryNotes = discoveryNotes.trim();

    const result = await povProcessor.processDiscoveryNotes(discoveryNotes, enhancedInputs);
    
    // Add the enhanced inputs to the response so the frontend can show them
    result.enhancedInputs = enhancedInputs;
    
    res.json(result);
  } catch (error) {
    console.error('Error generating implementation guide:', error);
    res.status(500).json({ error: 'Failed to generate implementation guide' });
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
    res.status(500).json({ error: 'Failed to process implementation guidance' });
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
          content: 'I\'ve processed your discovery notes and generated comprehensive implementation guidance.',
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

// Google Docs API configuration
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/auth/google/callback';

// OAuth endpoint for Google authentication
app.get('/auth/google', (req, res) => {
  const oauth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    REDIRECT_URI
  );

  const scopes = [
    'https://www.googleapis.com/auth/documents',
    'https://www.googleapis.com/auth/drive.file'
  ];

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    state: JSON.stringify({ implementationData: req.query.data })
  });

  res.redirect(authUrl);
});

// OAuth callback endpoint
app.get('/auth/google/callback', async (req, res) => {
  try {
    const { code, state } = req.query;
    const stateData = JSON.parse(state || '{}');

    const oauth2Client = new google.auth.OAuth2(
      GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET,
      REDIRECT_URI
    );

    const { tokens } = await oauth2Client.getAccessToken(code);
    oauth2Client.setCredentials(tokens);

    // Create Google Doc with the implementation data
    if (stateData.implementationData) {
      const docUrl = await createGoogleDoc(oauth2Client, JSON.parse(stateData.implementationData));
      res.redirect(`${req.protocol}://${req.get('host')}/?doc_created=${encodeURIComponent(docUrl)}`);
    } else {
      res.redirect(`${req.protocol}://${req.get('host')}/?error=no_data`);
    }
  } catch (error) {
    console.error('OAuth callback error:', error);
    res.redirect(`${req.protocol}://${req.get('host')}/?error=auth_failed`);
  }
});

// Create Google Doc with formatted content
async function createGoogleDoc(auth, implementationData) {
  const docs = google.docs({ version: 'v1', auth });
  const drive = google.drive({ version: 'v3', auth });

  try {
    // Create a new document
    const doc = await docs.documents.create({
      requestBody: {
        title: `Snyk Implementation Guidance - ${new Date().toLocaleDateString()}`
      }
    });

    const documentId = doc.data.documentId;

    // Format and add content to the document
    const requests = await buildDocumentRequests(implementationData);
    
    if (requests.length > 0) {
      await docs.documents.batchUpdate({
        documentId,
        requestBody: {
          requests
        }
      });
    }

    // Make the document shareable
    await drive.permissions.create({
      fileId: documentId,
      requestBody: {
        role: 'writer',
        type: 'anyone'
      }
    });

    return `https://docs.google.com/document/d/${documentId}/edit`;
  } catch (error) {
    console.error('Error creating Google Doc:', error);
    throw error;
  }
}

// Build formatted content requests for Google Docs API
async function buildDocumentRequests(data) {
  const requests = [];
  let index = 1;

  // Helper function to add text with styling
  const addText = (text, style = {}) => {
    requests.push({
      insertText: {
        location: { index },
        text: text
      }
    });

    if (Object.keys(style).length > 0) {
      requests.push({
        updateTextStyle: {
          range: {
            startIndex: index,
            endIndex: index + text.length
          },
          textStyle: style,
          fields: Object.keys(style).join(',')
        }
      });
    }

    index += text.length;
  };

  // Add title
  addText('SNYK IMPLEMENTATION GUIDANCE\n\n', {
    bold: true,
    fontSize: { magnitude: 18, unit: 'PT' },
    foregroundColor: { color: { rgbColor: { red: 0.4, green: 0.49, blue: 0.92 } } }
  });

  addText(`Generated by SherpAI - ${new Date().toLocaleDateString()}\n\n`, {
    italic: true,
    fontSize: { magnitude: 10, unit: 'PT' },
    foregroundColor: { color: { rgbColor: { red: 0.5, green: 0.5, blue: 0.5 } } }
  });

  // Executive Summary
  if (data.povWorksheet?.executiveSummary) {
    addText('EXECUTIVE SUMMARY\n', {
      bold: true,
      fontSize: { magnitude: 14, unit: 'PT' },
      foregroundColor: { color: { rgbColor: { red: 0.2, green: 0.2, blue: 0.2 } } }
    });

    addText(`Current State: ${data.povWorksheet.executiveSummary.currentState}\n\n`, {
      fontSize: { magnitude: 11, unit: 'PT' }
    });

    addText(`Future State: ${data.povWorksheet.executiveSummary.futureState}\n\n`, {
      fontSize: { magnitude: 11, unit: 'PT' }
    });
  }

  // Technology Stack
  if (data.povWorksheet?.techStack) {
    addText('TECHNOLOGY STACK\n', {
      bold: true,
      fontSize: { magnitude: 14, unit: 'PT' },
      foregroundColor: { color: { rgbColor: { red: 0.2, green: 0.2, blue: 0.2 } } }
    });

    const techStack = data.povWorksheet.techStack;
    addText(`• SCM: ${Array.isArray(techStack.sourceCodeManagement) ? techStack.sourceCodeManagement.join(', ') : techStack.sourceCodeManagement}\n`);
    addText(`• Languages: ${Array.isArray(techStack.languages) ? techStack.languages.join(', ') : techStack.languages}\n`);
    addText(`• IDE: ${techStack.ide}\n`);
    addText(`• CI/CD: ${techStack.cicd}\n`);
    addText(`• Container Registry: ${techStack.containerRegistry}\n`);
    addText(`• IaC: ${Array.isArray(techStack.iacFormats) ? techStack.iacFormats.join(', ') : techStack.iacFormats}\n`);
    addText(`• Cloud: ${techStack.cloudProvider}\n\n`);
  }

  // Why Snyk
  if (data.competitiveAdvantages?.advantages?.length > 0 || data.competitiveAdvantages?.generalAdvantages?.length > 0) {
    addText('WHY SNYK\n', {
      bold: true,
      fontSize: { magnitude: 14, unit: 'PT' },
      foregroundColor: { color: { rgbColor: { red: 0.0, green: 0.4, blue: 0.6 } } }
    });

    const advantages = data.competitiveAdvantages.advantages?.length > 0 
      ? data.competitiveAdvantages.advantages 
      : data.competitiveAdvantages.generalAdvantages;

    advantages.forEach(advantage => {
      addText(`• ${advantage}\n`);
    });
    addText('\n');
  }

  // Key Considerations
  if (data.competitiveAdvantages?.trapQuestions?.length > 0) {
    addText('KEY CONSIDERATIONS\n', {
      bold: true,
      fontSize: { magnitude: 14, unit: 'PT' },
      foregroundColor: { color: { rgbColor: { red: 0.8, green: 0.5, blue: 0.0 } } }
    });

    addText('Important questions to consider when implementing application security:\n\n');

    data.competitiveAdvantages.trapQuestions.forEach(question => {
      addText(`• ${question}\n`);
    });
    addText('\n');
  }

  // Implementation Approach
  addText('IMPLEMENTATION APPROACH\n', {
    bold: true,
    fontSize: { magnitude: 14, unit: 'PT' },
    foregroundColor: { color: { rgbColor: { red: 0.2, green: 0.2, blue: 0.2 } } }
  });

  addText('Recommended Implementation Strategy:\n\n', {
    bold: true,
    fontSize: { magnitude: 12, unit: 'PT' }
  });

  addText('1. START WITH VISIBILITY\n', {
    bold: true,
    foregroundColor: { color: { rgbColor: { red: 0.0, green: 0.4, blue: 0.6 } } }
  });
  addText('   Import repositories and gain security insights without blocking development workflows\n\n');

  addText('2. ENABLE PREVENTION\n', {
    bold: true,
    foregroundColor: { color: { rgbColor: { red: 0.0, green: 0.6, blue: 0.4 } } }
  });
  addText('   Add PR checks and CI/CD integration to prevent new vulnerabilities\n\n');

  addText('3. ADDRESS BACKLOG\n', {
    bold: true,
    foregroundColor: { color: { rgbColor: { red: 0.8, green: 0.2, blue: 0.2 } } }
  });
  addText('   Prioritize and fix existing vulnerabilities through structured triage\n\n');

  addText('Quick Start Checklist:\n', {
    bold: true,
    fontSize: { magnitude: 12, unit: 'PT' }
  });

  const checklist = [
    'Set up SCM integration and import key repositories',
    'Configure organization structure and invite team members', 
    'Deploy IDE plugins for developer adoption',
    'Enable automated PR/MR checks for new code',
    'Establish weekly triage process for findings'
  ];

  checklist.forEach(item => {
    addText(`• ${item}\n`);
  });

  addText('\nImplementation typically takes 2-4 weeks for most organizations\n\n');

  addText('Generated by Snyk SherpAI', {
    italic: true,
    fontSize: { magnitude: 9, unit: 'PT' },
    foregroundColor: { color: { rgbColor: { red: 0.5, green: 0.5, blue: 0.5 } } }
  });

  return requests;
}

// Endpoint to initiate Google Doc creation
app.post('/api/create-google-doc', (req, res) => {
  try {
    const implementationData = req.body;
    
    if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
      return res.status(500).json({ 
        error: 'Google API credentials not configured. Please set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET environment variables.' 
      });
    }

    // Redirect to OAuth flow with implementation data
    const authUrl = `/auth/google?data=${encodeURIComponent(JSON.stringify(implementationData))}`;
    res.json({ authUrl });
  } catch (error) {
    console.error('Error creating Google Doc:', error);
    res.status(500).json({ error: 'Failed to create Google Doc' });
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Snyk SherpAI running on port ${PORT}`);
  console.log(`Open http://localhost:${PORT} to access the application`);
}); 