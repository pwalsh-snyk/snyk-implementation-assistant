const competitiveIntel = require('./competitiveIntel');
const implementationResources = require('./implementationResources');

class POVProcessor {
  constructor() {
    this.qualificationCriteria = {
      minDiscoveryLength: 30,
      requiredFields: [
        'techStack', // Just need languages and SCM
        'currentState' // Just need what they're doing now for security
      ]
    };
  }

  async processDiscoveryNotes(discoveryNotes) {
    try {
      // Check if we have enough information to qualify the opportunity
      const qualificationResult = this.qualifyOpportunity(discoveryNotes);
      
      if (!qualificationResult.qualified) {
        return {
          qualified: false,
          message: qualificationResult.message,
          missingFields: qualificationResult.missingFields,
          recommendations: qualificationResult.recommendations
        };
      }

      // Extract key information from discovery notes
      const extractedInfo = this.extractInformation(discoveryNotes);
      
      // Generate POV worksheet
      const povWorksheet = this.generatePOVWorksheet(extractedInfo);
      
      // Identify competitors and generate competitive intelligence
      const competitors = this.identifyCompetitors(discoveryNotes);
      const competitiveAdvantages = await competitiveIntel.getCompetitiveAdvantages(competitors);
      
      // Generate implementation resources based on tech stack
      const implementationGuides = await implementationResources.getImplementationGuides(extractedInfo.techStack);
      
      return {
        qualified: true,
        povWorksheet,
        competitiveAdvantages,
        implementationGuides,
        extractedInfo
      };
    } catch (error) {
      console.error('Error processing discovery notes:', error);
      throw error;
    }
  }

  async processMessage(message, conversationHistory = []) {
    // This would integrate with an AI service like OpenAI for natural language processing
    // For now, we'll use a simple keyword-based approach
    
    const response = {
      content: '',
      povWorksheet: null
    };

    if (message.toLowerCase().includes('pov') || message.toLowerCase().includes('worksheet')) {
      response.content = "I can help you create a POV worksheet! Please share your discovery notes about the customer, including their current state, challenges, technology stack, and stakeholders involved.";
    } else if (message.toLowerCase().includes('competitor') || message.toLowerCase().includes('competition')) {
      response.content = "I can provide competitive intelligence and trap planting questions. What competitors are you facing in this deal?";
    } else if (message.toLowerCase().includes('implementation') || message.toLowerCase().includes('setup')) {
      response.content = "I can provide implementation guides and resources. What's the customer's technology stack?";
    } else {
      response.content = "I'm here to help you create POV worksheets, provide competitive intelligence, and share implementation resources. What would you like to know?";
    }

    return response;
  }

  qualifyOpportunity(discoveryNotes) {
    const result = {
      qualified: true,
      message: '',
      missingFields: [],
      recommendations: []
    };

    // Check minimum length
    if (discoveryNotes.length < this.qualificationCriteria.minDiscoveryLength) {
      result.qualified = false;
      result.message = 'Insufficient discovery information provided.';
      result.recommendations.push('Please provide more detailed discovery notes');
    }

    // Check for required information - just tech stack and current state
    const missingInfo = [];

    // Check for technology stack (languages and SCM)
    const hasLanguages = ['javascript', 'typescript', 'python', 'java', 'c#', 'go', 'rust', 'php', 'ruby', 'node.js', 'react', 'angular', 'vue'].some(lang => 
      discoveryNotes.toLowerCase().includes(lang)
    );
    const hasSCM = ['github', 'gitlab', 'bitbucket', 'azure devops', 'aws codecommit', 'git'].some(scm => 
      discoveryNotes.toLowerCase().includes(scm)
    );
    
    if (!hasLanguages && !discoveryNotes.toLowerCase().includes('language') && !discoveryNotes.toLowerCase().includes('tech')) {
      missingInfo.push('Programming languages or technology stack');
    }
    
    if (!hasSCM && !discoveryNotes.toLowerCase().includes('scm') && !discoveryNotes.toLowerCase().includes('source control') && !discoveryNotes.toLowerCase().includes('version control')) {
      missingInfo.push('Source code management system');
    }
    
    // Check for current state (what they're doing for security now - including nothing)
    const hasCurrentState = ['current', 'currently', 'existing', 'using', 'have', 'scan', 'security', 'tool', 'solution', 'nothing', 'no security', 'manual'].some(state => 
      discoveryNotes.toLowerCase().includes(state)
    );
    
    if (!hasCurrentState) {
      missingInfo.push('Current security scanning practices (what they do now, even if nothing)');
    }

    if (missingInfo.length > 0) {
      result.qualified = false;
      result.missingFields = missingInfo;
      result.message = 'Opportunity not qualified - missing key discovery information.';
      result.recommendations.push('Please gather more information about: ' + missingInfo.join(', '));
    }

    return result;
  }

  extractInformation(discoveryNotes) {
    const info = {
      customerName: this.extractCustomerName(discoveryNotes),
      currentState: this.extractCurrentState(discoveryNotes),
      challenges: this.extractChallenges(discoveryNotes),
      techStack: this.extractTechStack(discoveryNotes),
      stakeholders: this.extractStakeholders(discoveryNotes),
      competitors: this.extractCompetitors(discoveryNotes),
      timeline: this.extractTimeline(discoveryNotes),
      budget: this.extractBudget(discoveryNotes)
    };

    return info;
  }

  extractCustomerName(notes) {
    // Simple extraction - look for company names
    const companyPatterns = [
      /(?:customer|client|company|organization):\s*([A-Z][a-zA-Z\s&]+)/i,
      /([A-Z][a-zA-Z\s&]+)\s+(?:is|has|wants|needs)/i
    ];
    
    for (const pattern of companyPatterns) {
      const match = notes.match(pattern);
      if (match) return match[1].trim();
    }
    
    return 'Customer Name TBD';
  }

  extractCurrentState(notes) {
    const lowerNotes = notes.toLowerCase();
    
    // Detect security tools they're currently using
    const securityTools = [];
    const toolPatterns = {
      'veracode': 'Veracode',
      'checkmarx': 'Checkmarx', 
      'sonarqube': 'SonarQube',
      'sonar': 'SonarQube',
      'fortify': 'Fortify',
      'github advanced security': 'GitHub Advanced Security',
      'github security': 'GitHub Advanced Security',
      'snyk': 'Snyk',
      'prisma cloud': 'Prisma Cloud',
      'aqua security': 'Aqua Security',
      'twistlock': 'Twistlock',
      'clair': 'Clair',
      'trivy': 'Trivy',
      'whitesource': 'WhiteSource',
      'blackduck': 'Black Duck'
    };
    
    for (const [pattern, tool] of Object.entries(toolPatterns)) {
      if (lowerNotes.includes(pattern)) {
        securityTools.push(tool);
      }
    }
    
    // Detect scanning practices
    const practices = [];
    if (lowerNotes.includes('manual') && (lowerNotes.includes('scan') || lowerNotes.includes('review'))) {
      practices.push('manual security reviews');
    }
    if (lowerNotes.includes('sast')) practices.push('SAST scanning');
    if (lowerNotes.includes('sca') || lowerNotes.includes('dependency')) practices.push('dependency scanning');
    if (lowerNotes.includes('container') && lowerNotes.includes('scan')) practices.push('container scanning');
    if (lowerNotes.includes('iac') || lowerNotes.includes('infrastructure as code')) practices.push('IaC scanning');
    
    // Detect if they have no security or limited security
    const noSecurity = lowerNotes.includes('no security') || 
                      lowerNotes.includes('nothing') || 
                      lowerNotes.includes('no scanning') ||
                      lowerNotes.includes('no tools') ||
                      lowerNotes.includes('limited security');
    
    // Build current state description
    let currentState = '';
    
    if (noSecurity) {
      currentState = 'The customer currently has limited or no automated security scanning in place. They rely on manual processes or ad-hoc security reviews, creating significant security risks and slowing down development cycles.';
    } else if (securityTools.length > 0) {
      currentState = `The customer currently uses ${securityTools.join(', ')} for security scanning.`;
      if (practices.length > 0) {
        currentState += ` Their current practices include ${practices.join(', ')}.`;
      }
      
      // Add common pain points based on tools
      if (securityTools.includes('Veracode') || securityTools.includes('Checkmarx')) {
        currentState += ' They face challenges with slow scan times, high false positive rates, and poor developer experience.';
      } else if (securityTools.includes('SonarQube')) {
        currentState += ' While they have code quality scanning, they lack comprehensive security vulnerability detection and container/infrastructure scanning.';
      } else if (securityTools.includes('GitHub Advanced Security')) {
        currentState += ' They have some security capabilities but lack comprehensive language support and container/infrastructure scanning.';
      }
    } else if (practices.length > 0) {
      currentState = `The customer currently implements ${practices.join(', ')} but lacks a comprehensive, automated security scanning solution.`;
    } else {
      // Try to extract any current state information from the notes
      const sentences = notes.split(/[.!?]+/);
      for (const sentence of sentences) {
        if (sentence.toLowerCase().includes('current') || 
            sentence.toLowerCase().includes('existing') || 
            sentence.toLowerCase().includes('using') ||
            sentence.toLowerCase().includes('have')) {
          currentState = sentence.trim();
          break;
        }
      }
      
      if (!currentState) {
        currentState = 'The customer currently has an ad-hoc approach to application security with limited automated scanning capabilities.';
      }
    }
    
    return currentState;
  }

  extractChallenges(notes) {
    const challengeKeywords = ['challenge', 'problem', 'issue', 'pain', 'difficulty', 'struggle'];
    const challenges = [];
    const sentences = notes.split(/[.!?]+/);
    
    for (const sentence of sentences) {
      for (const keyword of challengeKeywords) {
        if (sentence.toLowerCase().includes(keyword)) {
          challenges.push(sentence.trim());
        }
      }
    }
    
    return challenges.length > 0 ? challenges : ['Challenges to be identified'];
  }

  extractTechStack(notes) {
    const techStack = {
      sourceCodeManagement: this.extractSCMTool(notes),
      languages: this.extractLanguages(notes),
      ide: this.extractIDE(notes),
      cicd: this.extractCICD(notes),
      containerRegistry: this.extractContainerRegistry(notes),
      iacFormats: this.extractIACFormats(notes),
      cloudProvider: this.extractCloudProvider(notes)
    };
    
    return techStack;
  }

  extractSCMTool(notes) {
    const scmTools = ['github', 'gitlab', 'bitbucket', 'azure devops', 'aws codecommit'];
    const foundTools = [];
    
    for (const tool of scmTools) {
      if (notes.toLowerCase().includes(tool)) {
        foundTools.push(tool);
      }
    }
    
    // Return array if multiple tools found, single string if one, or default if none
    if (foundTools.length > 1) {
      return foundTools;
    } else if (foundTools.length === 1) {
      return foundTools[0];
    } else {
      return 'SCM tool TBD';
    }
  }

  extractLanguages(notes) {
    const languages = ['javascript', 'typescript', 'python', 'java', 'c#', 'go', 'rust', 'php', 'ruby', 'node.js'];
    const found = [];
    
    for (const lang of languages) {
      if (notes.toLowerCase().includes(lang)) {
        found.push(lang);
      }
    }
    
    return found.length > 0 ? found : ['Languages TBD'];
  }

  extractIDE(notes) {
    const ides = ['vscode', 'visual studio code', 'intellij', 'eclipse', 'vim', 'emacs'];
    for (const ide of ides) {
      if (notes.toLowerCase().includes(ide)) {
        return ide;
      }
    }
    return 'IDE TBD';
  }

  extractCICD(notes) {
    const cicdTools = ['jenkins', 'github actions', 'gitlab ci', 'azure pipelines', 'circleci', 'travis'];
    for (const tool of cicdTools) {
      if (notes.toLowerCase().includes(tool)) {
        return tool;
      }
    }
    return 'CI/CD TBD';
  }

  extractContainerRegistry(notes) {
    const registries = ['docker hub', 'ecr', 'acr', 'gcr', 'artifactory'];
    for (const registry of registries) {
      if (notes.toLowerCase().includes(registry)) {
        return registry;
      }
    }
    return 'Container Registry TBD';
  }

  extractIACFormats(notes) {
    const iacFormats = ['terraform', 'cloudformation', 'arm', 'kubernetes', 'helm'];
    const found = [];
    
    for (const format of iacFormats) {
      if (notes.toLowerCase().includes(format)) {
        found.push(format);
      }
    }
    
    return found.length > 0 ? found : ['IaC formats TBD'];
  }

  extractCloudProvider(notes) {
    const providers = ['aws', 'azure', 'gcp', 'google cloud'];
    for (const provider of providers) {
      if (notes.toLowerCase().includes(provider)) {
        return provider;
      }
    }
    return 'Cloud Provider TBD';
  }

  extractStakeholders(notes) {
    const stakeholderKeywords = ['stakeholder', 'contact', 'team', 'person', 'manager', 'director', 'vp'];
    const sentences = notes.split(/[.!?]+/);
    const stakeholders = [];
    
    for (const sentence of sentences) {
      for (const keyword of stakeholderKeywords) {
        if (sentence.toLowerCase().includes(keyword)) {
          stakeholders.push(sentence.trim());
        }
      }
    }
    
    return stakeholders.length > 0 ? stakeholders : ['Stakeholders TBD'];
  }

  extractCompetitors(notes) {
    const competitors = [
      'github advanced security', 'checkmarx', 'veracode', 'sonarqube', 'fortify', 
      'snyk', 'prisma cloud', 'aqua security', 'twistlock', 'clair', 'trivy'
    ];
    const found = [];
    
    for (const competitor of competitors) {
      if (notes.toLowerCase().includes(competitor)) {
        found.push(competitor);
      }
    }
    
    return found;
  }

  extractTimeline(notes) {
    const timelineKeywords = ['timeline', 'deadline', 'by', 'within', 'weeks', 'months'];
    const sentences = notes.split(/[.!?]+/);
    
    for (const sentence of sentences) {
      for (const keyword of timelineKeywords) {
        if (sentence.toLowerCase().includes(keyword)) {
          return sentence.trim();
        }
      }
    }
    
    return 'Timeline TBD';
  }

  extractBudget(notes) {
    const budgetKeywords = ['budget', 'cost', 'price', 'investment', 'spend'];
    const sentences = notes.split(/[.!?]+/);
    
    for (const sentence of sentences) {
      for (const keyword of budgetKeywords) {
        if (sentence.toLowerCase().includes(keyword)) {
          return sentence.trim();
        }
      }
    }
    
    return 'Budget TBD';
  }

  identifyCompetitors(notes) {
    return this.extractCompetitors(notes);
  }

  generatePOVWorksheet(extractedInfo) {
    return {
      executiveSummary: {
        currentState: extractedInfo.currentState,
        futureState: this.generateFutureState(extractedInfo)
      },
      solutionsMap: this.generateSolutionsMap(extractedInfo.challenges),
      stakeholders: this.formatStakeholders(extractedInfo.stakeholders),
      techStack: extractedInfo.techStack,
      timeline: this.generateTimeline(),
      successCriteria: this.generateSuccessCriteria(extractedInfo.challenges),
      onboardingChecklist: this.generateOnboardingChecklist(extractedInfo.techStack)
    };
  }

  generateFutureState(extractedInfo) {
    const { techStack, currentState, challenges } = extractedInfo;
    
    let futureState = 'With Snyk implementation, the customer will achieve: ';
    const benefits = [];
    
    // Core benefits based on tech stack
    if (techStack.languages && Array.isArray(techStack.languages) && techStack.languages.length > 0 && techStack.languages[0] !== 'Languages TBD') {
      benefits.push(`comprehensive security scanning across all ${techStack.languages.join(', ')} applications`);
    }
    
    if (techStack.sourceCodeManagement && techStack.sourceCodeManagement !== 'SCM tool TBD') {
      benefits.push(`seamless integration with ${techStack.sourceCodeManagement} for automated PR checks and developer workflow integration`);
    }
    
    // Address current state gaps
    if (currentState.toLowerCase().includes('manual') || currentState.toLowerCase().includes('ad-hoc')) {
      benefits.push('automated security scanning replacing manual processes');
      benefits.push('shift-left security with real-time vulnerability detection in the IDE');
    }
    
    if (currentState.toLowerCase().includes('no security') || currentState.toLowerCase().includes('limited') || currentState.toLowerCase().includes('nothing')) {
      benefits.push('comprehensive application security coverage from code to deployment');
      benefits.push('proactive vulnerability management with actionable remediation guidance');
    }
    
    if (currentState.toLowerCase().includes('slow') || currentState.toLowerCase().includes('false positive')) {
      benefits.push('faster scanning with industry-leading accuracy and low false positive rates');
      benefits.push('developer-friendly security tools that accelerate rather than impede development');
    }
    
    // Tech-specific benefits
    if (techStack.cicd && techStack.cicd !== 'CI/CD TBD') {
      benefits.push(`automated security gates in ${techStack.cicd} pipelines with configurable fail conditions`);
    }
    
    if (techStack.containerRegistry && techStack.containerRegistry !== 'Container Registry TBD') {
      benefits.push('container image vulnerability scanning with base image recommendations');
    }
    
    if (techStack.iacFormats && Array.isArray(techStack.iacFormats) && techStack.iacFormats[0] !== 'IaC formats TBD') {
      benefits.push(`infrastructure as code security scanning for ${techStack.iacFormats.join(', ')} configurations`);
    }
    
    // Universal benefits
    benefits.push('unified security platform providing visibility across the entire software development lifecycle');
    benefits.push('measurable reduction in mean time to remediation (MTTR) through prioritized, actionable vulnerability insights');
    benefits.push('compliance-ready reporting and governance controls for security policy enforcement');
    
    // Competitive advantages based on current tools
    if (currentState.toLowerCase().includes('veracode') || currentState.toLowerCase().includes('checkmarx')) {
      benefits.push('significantly faster scan times with real-time feedback during development');
      benefits.push('AI-powered auto-fix capabilities reducing manual remediation effort');
    }
    
    if (currentState.toLowerCase().includes('sonarqube')) {
      benefits.push('expanded security coverage beyond code quality to include containers and infrastructure');
      benefits.push('comprehensive vulnerability database with real-time updates');
    }
    
    if (currentState.toLowerCase().includes('github')) {
      benefits.push('enhanced language support and more comprehensive vulnerability detection');
      benefits.push('superior container and infrastructure security capabilities');
    }
    
    futureState += benefits.slice(0, 5).join('; ') + '.';
    
    return futureState;
  }

  generateSolutionsMap(challenges) {
    const solutionsMap = [];
    
    if (challenges.some(c => c.toLowerCase().includes('vulnerability'))) {
      solutionsMap.push({
        outcome: 'Reduce security vulnerabilities',
        pathway: 'Shift-left security scanning',
        snykProducts: ['Snyk Open Source', 'Snyk Code', 'Snyk Container']
      });
    }
    
    if (challenges.some(c => c.toLowerCase().includes('compliance'))) {
      solutionsMap.push({
        outcome: 'Meet compliance requirements',
        pathway: 'Automated compliance scanning',
        snykProducts: ['Snyk Open Source', 'Snyk Container', 'Snyk IaC']
      });
    }
    
    if (challenges.some(c => c.toLowerCase().includes('developer'))) {
      solutionsMap.push({
        outcome: 'Improve developer experience',
        pathway: 'IDE integration and auto-fix',
        snykProducts: ['Snyk IDE plugins', 'Snyk Learn']
      });
    }
    
    return solutionsMap.length > 0 ? solutionsMap : [{
      outcome: 'Business outcomes to be defined',
      pathway: 'Pathway to be determined',
      snykProducts: ['Snyk products to be selected']
    }];
  }

  formatStakeholders(stakeholders) {
    return stakeholders.map(stakeholder => ({
      name: 'Name TBD',
      role: stakeholder,
      contact: 'Contact TBD'
    }));
  }

  generateTimeline() {
    return [
      { event: 'Demo Session', agenda: 'Product overview and value proposition', due: 'Week 0', status: 'Complete' },
      { event: 'POV Planning', agenda: 'Tech stack analysis, success criteria, timing', due: 'Week 1', status: 'To Do' },
      { event: 'POV Kickoff', agenda: 'Integration setup, IDE plugins, training', due: 'Week 2', status: 'To Do' },
      { event: 'POV Testing', agenda: 'CI/CD testing, results validation', due: 'Week 3', status: 'To Do' },
      { event: 'POV Wrap Up', agenda: 'Results review, technical signoff', due: 'Week 4', status: 'To Do' }
    ];
  }

  generateSuccessCriteria(challenges) {
    const criteria = [
      {
        desiredState: 'Innovate Faster',
        capabilities: 'Quickly identify and remediate software vulnerabilities earlier in the SDLC',
        priority: '1 - Must Have',
        result: 'To Do'
      },
      {
        desiredState: 'Reduce Risk Exposure',
        capabilities: 'Automated PR Checks for SAST/SCA vulnerabilities',
        priority: '2 - Should Have',
        result: 'To Do'
      },
      {
        desiredState: 'Efficiently Deliver Secure Software',
        capabilities: 'Gating flexibility: pass/fail based on certain flags',
        priority: '3 - Nice to Have',
        result: 'To Do'
      }
    ];
    
    return criteria;
  }

  generateOnboardingChecklist(techStack) {
    const checklist = [
      'Provision your Snyk account',
      'Set up joint Slack/MS Teams channel for communication',
      'Configure SCM integration(s)',
      'Set up Snyk Essentials',
      'Import repositories into Snyk',
      'Invite additional team members'
    ];
    
    if (techStack.ide !== 'IDE TBD') {
      checklist.push('Configure IDE plugins');
    }
    
    if (techStack.cicd !== 'CI/CD TBD') {
      checklist.push('Configure CI/CD integration');
    }
    
    return checklist;
  }
}

module.exports = new POVProcessor(); 