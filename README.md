# Snyk SherpAI

SherpAI is your AI guide for creating comprehensive POV (Proof of Value) worksheets. Designed for Snyk Sales Engineers (SEs) and Account Executives (AEs), it transforms discovery notes into detailed implementation strategies and competitive intelligence.

## Features

### 🤖 Interactive Chatbot
- Real-time chat interface for inputting discovery notes
- Natural language processing to extract key information
- Intelligent qualification checks to ensure sufficient discovery

### 📋 POV Worksheet Generation
- **Executive Summary**: Current vs Future State analysis
- **Solutions Map**: Business outcomes mapped to Snyk products
- **Technology Stack Analysis**: Comprehensive tech stack breakdown
- **Timeline**: Week-by-week POV execution plan
- **Success Criteria**: Measurable outcomes and value drivers
- **Onboarding Checklist**: Technical setup and testing steps

### 🏆 Competitive Intelligence
- **Competitive Advantages**: Snyk's strengths vs competitors
- **Trap Planting Questions**: Strategic questions to ask during engagements
- **Competitor Analysis**: Detailed analysis of major AppSec vendors including:
  - GitHub Advanced Security
  - Checkmarx
  - Veracode
  - SonarQube
  - Fortify
  - Prisma Cloud
  - Aqua Security
  - Twistlock
  - Clair
  - Trivy

### 📚 Implementation Resources
- **Technology-Specific Guides**: Links to Snyk documentation based on customer tech stack
- **Setup Instructions**: Step-by-step implementation guides
- **Integration Resources**: SCM, CI/CD, IDE, and container integration guides

### ✅ Qualification Engine
- **Minimum Requirements**: Ensures sufficient discovery information
- **Missing Field Detection**: Identifies gaps in discovery
- **Recommendations**: Provides guidance for additional discovery needed

## Technology Stack

- **Backend**: Node.js with Express
- **Real-time Communication**: Socket.IO
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Styling**: Modern CSS with Flexbox and Grid
- **Icons**: Font Awesome
- **Fonts**: Inter (Google Fonts)

## Installation

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

## Development

### Running in Development Mode
```bash
npm run dev
```

### Project Structure
```
snyk-pov-assistant/
├── src/
│   ├── povProcessor.js      # Main POV processing logic
│   ├── competitiveIntel.js  # Competitive intelligence data
│   └── implementationResources.js # Implementation guides
├── public/
│   └── index.html          # Frontend application
├── server.js               # Express server setup
├── package.json            # Dependencies and scripts
└── README.md              # This file
```

## Usage

### Input Discovery Notes
Enter comprehensive discovery notes including:
- Customer's current state and challenges
- Technology stack details
- Stakeholder information
- Competitor mentions
- Timeline and budget information

### Minimum Requirements
- At least 200 characters of discovery notes
- Must include current state analysis
- Must include challenges or problems
- Must include technology stack information
- Must include stakeholder information

### Output Generated
1. **POV Worksheet**: Complete worksheet with all sections filled
2. **Competitive Intelligence**: Advantages and trap questions if competitors identified
3. **Implementation Resources**: Relevant Snyk documentation links
4. **Qualification Status**: Whether the opportunity is qualified for POV

## Example Input

```
Customer: TechCorp Inc. is a mid-size software company currently using GitHub for source control and Jenkins for CI/CD. They're facing challenges with vulnerability management in their Node.js and Python applications. They're currently evaluating GitHub Advanced Security but are concerned about limited language support. Their development team uses VS Code and they're looking to implement container security for their Docker images. Key stakeholders include the CISO, DevOps lead, and development team lead. They want to complete the POV within 4 weeks and have budget approved for security tools.
```

## Example Output

The application will generate:
- **Executive Summary**: Current state vs future state analysis
- **Technology Stack**: GitHub, Jenkins, Node.js, Python, VS Code, Docker
- **Solutions Map**: Vulnerability management, container security, developer experience
- **Competitive Intelligence**: GitHub Advanced Security advantages and trap questions
- **Implementation Resources**: GitHub integration, Node.js/Python guides, VS Code plugins, container security
- **Timeline**: 4-week POV execution plan
- **Success Criteria**: Measurable outcomes for the engagement

## Configuration

### Environment Variables
Create a `.env` file in the root directory:
```env
PORT=3000
NODE_ENV=development
```

### Customization
- **Competitors**: Add new competitors in `src/competitiveIntel.js`
- **Implementation Guides**: Update resources in `src/implementationResources.js`
- **Qualification Criteria**: Modify requirements in `src/povProcessor.js`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For questions or issues, please contact the Snyk team or create an issue in the repository.

---

**Built for Snyk Sales Teams** 🚀 