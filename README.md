# Snyk SherpAI

**AI-powered Implementation Guidance Generator for Snyk Sales Engineers and Account Executives**

SherpAI is your intelligent guide for generating comprehensive Snyk implementation guidance. Designed for Snyk Sales Engineers (SEs) and Account Executives (AEs), it transforms basic technical requirements into detailed, customized implementation strategies with competitive positioning and technology-specific guidance.

## Overview

Snyk SherpAI streamlines the process of creating implementation guidance by:
- ✅ Analyzing customer's current scan processes and technology stack
- ✅ Generating dynamic future state analysis based on specific pain points
- ✅ Providing comprehensive language-specific implementation guides
- ✅ Delivering competitive positioning and key considerations
- ✅ Creating professional, shareable documentation via Google Docs integration

## Features

### 🎯 **Implementation Guidance Generation**
- **Current State Analysis**: Intelligent analysis of existing security tools and processes
- **Dynamic Future State**: Customized future state narratives based on current scan processes
- **Technology Stack Mapping**: Comprehensive analysis of languages, SCM, CI/CD, and infrastructure
- **Implementation Approach**: Structured 3-phase implementation strategy (Visibility → Prevention → Remediation)

### 🌐 **Comprehensive Language Support**
Supports all languages in Snyk's ecosystem with specific implementation guides:
- **Core Languages**: JavaScript, TypeScript, Python, Java, C#, Go, PHP, Ruby, Rust, Scala
- **Mobile & Native**: Swift, Objective-C, Kotlin, Dart/Flutter
- **Enterprise**: Apex (Salesforce), Groovy, VB.NET, Elixir
- **Systems**: C/C++, with framework-specific guidance (React, Spring, Django, Rails, etc.)

### 🏆 **Competitive Intelligence**
- **Why Snyk Section**: Dynamic competitive advantages based on mentioned competitors
- **Key Considerations**: Strategic questions to uncover customer needs and pain points
- **Competitor-Specific Positioning**: Tailored messaging for major AppSec vendors:
  - GitHub Advanced Security, Checkmarx, Veracode, SonarQube
  - Fortify, Prisma Cloud, Aqua Security, WhiteSource/Mend, Black Duck

### 🔧 **Technology-Specific Implementation Resources**
- **SCM Integration Guides**: GitHub, GitLab, Bitbucket, Azure DevOps with PAT requirements
- **Language Guides**: Setup instructions, package manager configuration, scanning commands
- **IDE Integration**: VS Code, IntelliJ, Eclipse plugin installation and configuration
- **CI/CD Integration**: Jenkins, GitHub Actions, GitLab CI, Azure Pipelines
- **Container & IaC**: Docker, Kubernetes, Terraform, CloudFormation security scanning

### 📄 **Google Docs Integration**
- **Automatic Document Creation**: Generate professionally formatted Google Docs
- **Rich Formatting**: Headers, colors, bullet points, and structured content
- **Instant Sharing**: Documents are automatically shareable and ready for stakeholder distribution
- **Professional Presentation**: Branded content suitable for customer meetings

### 📊 **Enhanced User Experience**
- **Streamlined Interface**: Clean, form-based input without complex chat interfaces
- **Smart Language Detection**: Recognizes abbreviations and framework mentions
- **Multiple SCM Support**: Handles customers with multiple source code management systems
- **Export Options**: Google Docs integration with proper error handling

## Technology Stack

- **Backend**: Node.js with Express.js
- **Google Integration**: Google Docs API and Google Drive API
- **Frontend**: Modern HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Responsive design with CSS Grid and Flexbox
- **Icons**: Font Awesome Pro
- **Authentication**: OAuth 2.0 for Google services

## Quick Start

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn package manager

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd snyk-pov-assistant
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the application**:
   ```bash
   npm start
   ```

4. **Access the application**:
   Open your browser and navigate to `http://localhost:3000`

### Development Mode
```bash
npm run dev  # Uses nodemon for auto-restart
```

## Configuration

### Basic Configuration
The application works out-of-the-box with default settings. For production deployment:

```env
PORT=3000
NODE_ENV=production
```

### Google Docs Integration (Optional)
To enable automatic Google Docs creation:

1. **Set up Google Cloud Project**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable Google Docs API and Google Drive API

2. **Create OAuth 2.0 Credentials**:
   - Navigate to APIs & Services → Credentials
   - Create OAuth 2.0 Client ID (Web application)
   - Add `http://localhost:3000/auth/google/callback` to authorized redirect URIs

3. **Environment Variables**:
   ```env
   GOOGLE_CLIENT_ID=your_google_client_id_here
   GOOGLE_CLIENT_SECRET=your_google_client_secret_here
   GOOGLE_REDIRECT_URI=http://localhost:3000/auth/google/callback
   ```

## Usage

### Input Requirements
Simply provide three key pieces of information:

1. **Source Code Management**: GitHub, GitLab, Bitbucket, Azure DevOps, or multiple systems
2. **Programming Languages**: Any combination of supported languages (abbreviations like JS, TS, Py are fine)
3. **Current Scan Processes**: Existing security tools, manual processes, or "no security scanning"

### Example Input
```
SCM: GitHub, GitLab
Languages: TypeScript, Python, Go
Current Scan Processes: Using Veracode for SAST but scans are slow and have high false positive rates. Manual dependency reviews.
```

### Generated Output
The application creates comprehensive guidance including:

- **Executive Summary**: Current vs future state with specific pain point analysis
- **Technology Stack**: Complete breakdown of detected technologies
- **Why Snyk**: Competitive advantages tailored to mentioned tools/competitors  
- **Key Considerations**: Strategic questions for customer discovery
- **PAT Token Requirements**: Detailed permissions needed for SCM integration
- **Language Support**: Technology-specific implementation guides
- **Implementation Approach**: 3-phase strategy with quick start checklist

## Project Structure

```
snyk-pov-assistant/
├── src/
│   ├── povProcessor.js           # Core processing and future state generation
│   ├── competitiveIntel.js       # Competitive intelligence and positioning
│   └── implementationResources.js # Technology guides and SCM integration
├── public/
│   └── index.html               # Frontend application with enhanced UI
├── server.js                    # Express server with Google Docs integration
├── package.json                # Dependencies and scripts
└── README.md                   # This documentation
```

## Key Features Explained

### Dynamic Future State Analysis
The application analyzes current scan processes to generate targeted future states:
- **No Security Tools**: Focuses on comprehensive security transformation
- **Manual Processes**: Emphasizes automation and developer experience improvements  
- **Veracode/Checkmarx**: Highlights speed improvements and reduced false positives
- **SonarQube**: Expands coverage beyond code quality to security and containers
- **GitHub Security**: Enhances existing capabilities with superior language support

### Comprehensive Language Detection
Smart pattern matching recognizes:
- **Direct mentions**: "Java", "Python", "TypeScript" 
- **Abbreviations**: "JS" → JavaScript, "TS" → TypeScript, "Py" → Python
- **Frameworks**: "React" → JavaScript, "Django" → Python, "Spring" → Java
- **Variations**: "Node.js", "Golang", "C#", ".NET", "Objective-C"

### SCM Integration with PAT Requirements
Provides specific Personal Access Token permissions for each SCM:
- **GitHub**: Repository access, organization membership, webhook permissions
- **GitLab**: API access, repository read/write, user information
- **Bitbucket**: Repository access, pull request permissions, account details
- **Azure DevOps**: Code access, build execution, project and team permissions

## API Endpoints

- `POST /api/generate-implementation` - Generate implementation guidance
- `POST /api/upload-tech` - Upload technical requirements file
- `POST /api/create-google-doc` - Create Google Docs document
- `GET /auth/google` - Initiate Google OAuth flow
- `GET /auth/google/callback` - Handle OAuth callback

## Customization

### Adding New Languages
Update `src/implementationResources.js`:
```javascript
'new-language': {
  name: 'New Language',
  links: ['https://docs.snyk.io/path/to/guide'],
  setupSteps: [
    'Install Snyk CLI',
    'Configure language-specific setup',
    'Run scans',
    'Monitor for vulnerabilities'
  ]
}
```

### Adding Competitors
Update `src/competitiveIntel.js`:
```javascript
'new-competitor': {
  advantages: ['Advantage 1', 'Advantage 2'],
  trapQuestions: ['Question 1', 'Question 2']
}
```

## Deployment

### Production Deployment
1. Set environment variables for Google integration (optional)
2. Set `NODE_ENV=production`
3. Use a process manager like PM2:
   ```bash
   npm install -g pm2
   pm2 start server.js --name "snyk-sherpai"
   ```

### Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/enhancement`)
3. Make your changes
4. Test thoroughly
5. Commit your changes (`git commit -am 'Add new feature'`)
6. Push to the branch (`git push origin feature/enhancement`)
7. Create a Pull Request

## License

MIT License - see LICENSE file for details.

## Support

For questions, issues, or feature requests:
- Create an issue in the repository
- Contact the Snyk Sales Engineering team
- Reference the [Snyk Documentation](https://docs.snyk.io) for integration details

---

**Empowering Snyk Sales Teams with AI-Driven Implementation Guidance** 🚀

*Built with ❤️ by the Snyk team*