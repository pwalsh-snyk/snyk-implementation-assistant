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

  async processDiscoveryNotes(discoveryNotes, enhancedInputs = null) {
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
      const extractedInfo = this.extractInformation(discoveryNotes, enhancedInputs);
      
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

    // Check for technology stack (languages and SCM) - based on Snyk's official supported languages
    const hasLanguages = [
      // Core languages from Snyk documentation
      'javascript', 'js', 'typescript', 'ts', 'python', 'py', 'java', 'kotlin', 'kt',
      'c#', 'csharp', 'c++', 'cpp', 'c', 'go', 'golang', 'rust', 'php', 'ruby', 'rb',
      'scala', 'swift', 'objective-c', 'objc', 'dart', 'flutter', 'elixir', 'groovy',
      'apex', '.net', 'dotnet', 'vb.net', 'vb', 'visual basic',
      // Common frameworks and variations
      'node.js', 'nodejs', 'react', 'angular', 'vue', 'spring', 'django', 'flask',
      'rails', 'laravel', 'symfony', 'asp.net', 'blazor'
    ].some(lang => 
      discoveryNotes.toLowerCase().includes(lang)
    );
    const hasSCM = [
      'github', 'gh', 'gitlab', 'gl', 'bitbucket', 'bb',
      'azure devops', 'azure-devops', 'azure repos', 'azure-repos', 'ado', 'azdo', 'tfs', 'vsts',
      'aws codecommit', 'codecommit', 'git'
    ].some(scm => 
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

  extractInformation(discoveryNotes, enhancedInputs = null) {
    const info = {
      customerName: this.extractCustomerName(discoveryNotes),
      currentState: this.extractCurrentState(discoveryNotes),
      challenges: this.extractChallenges(discoveryNotes),
      techStack: this.extractTechStack(discoveryNotes, enhancedInputs),
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

  extractTechStack(notes, enhancedInputs = null) {
    const techStack = {
      sourceCodeManagement: this.extractSCMTool(notes),
      languages: this.extractLanguages(notes),
      ide: this.extractIDE(notes),
      cicd: this.extractCICD(notes),
      containerRegistry: this.extractContainerRegistry(notes),
      iacFormats: this.extractIACFormats(notes),
      cloudProvider: this.extractCloudProvider(notes)
    };
    
    // Override with enhanced inputs when available - prioritize form inputs over extracted values
    if (enhancedInputs) {
      if (enhancedInputs.scm && enhancedInputs.scm !== 'SCM tool TBD') {
        // Handle comma-separated SCMs by converting to array
        if (enhancedInputs.scm.includes(',')) {
          techStack.sourceCodeManagement = enhancedInputs.scm.split(',').map(scm => scm.trim());
        } else {
          techStack.sourceCodeManagement = enhancedInputs.scm;
        }
      }
      if (enhancedInputs.languages && enhancedInputs.languages !== 'Languages TBD') {
        techStack.languages = enhancedInputs.languages.split(',').map(lang => lang.trim());
      }
      if (enhancedInputs.ide && enhancedInputs.ide !== 'IDE TBD' && enhancedInputs.ide.trim() !== '') {
        techStack.ide = enhancedInputs.ide;
      }
      if (enhancedInputs.cicd && enhancedInputs.cicd !== 'CI/CD TBD' && enhancedInputs.cicd.trim() !== '') {
        techStack.cicd = enhancedInputs.cicd;
      }
      if (enhancedInputs.containerRegistry && enhancedInputs.containerRegistry !== 'Container Registry TBD' && enhancedInputs.containerRegistry.trim() !== '') {
        techStack.containerRegistry = enhancedInputs.containerRegistry;
      }
      if (enhancedInputs.iac && enhancedInputs.iac !== 'IaC formats TBD' && enhancedInputs.iac.trim() !== '') {
        techStack.iacFormats = enhancedInputs.iac.split(',').map(format => format.trim());
      }
      // Always use enhanced cloudProvider if provided
      if (enhancedInputs.cloudProvider && enhancedInputs.cloudProvider.trim() !== '') {
        techStack.cloudProvider = enhancedInputs.cloudProvider;
      }
    }
    
    return techStack;
  }

  extractSCMTool(notes) {
    const lowerNotes = notes.toLowerCase();
    const foundTools = [];
    
    // Define SCM patterns with variations
    const scmPatterns = {
      'github': ['github', 'gh'],
      'gitlab': ['gitlab', 'gl'],
      'bitbucket': ['bitbucket', 'bb'],
      'azure devops': [
        'azure devops', 'azure-devops', 'azuredevops',
        'azure repos', 'azure-repos', 'azurerepos', 
        'ado', 'azdo', 'tfs', 'vsts', 
        'team foundation', 'visual studio team services'
      ],
      'aws codecommit': ['aws codecommit', 'codecommit']
    };
    
    // Check each SCM pattern
    for (const [scmKey, patterns] of Object.entries(scmPatterns)) {
      const hasMatch = patterns.some(pattern => lowerNotes.includes(pattern));
      if (hasMatch && !foundTools.includes(scmKey)) {
        foundTools.push(scmKey);
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
    const lowerNotes = notes.toLowerCase();
    const found = [];
    
    // Language mapping based on Snyk's official supported languages documentation
    const languagePatterns = {
      'JavaScript': ['javascript', 'js', 'node.js', 'nodejs', 'react', 'angular', 'vue'],
      'TypeScript': ['typescript', 'ts'],
      'Python': ['python', 'py', 'django', 'flask'],
      'Java': ['java', 'spring', 'maven', 'gradle'],
      'Kotlin': ['kotlin', 'kt'],
      'C#': ['c#', 'csharp', 'asp.net', 'blazor', '.net core'],
      'C/C++': ['c++', 'cpp', 'c ', ' c)', 'gcc', 'clang'],
      'Go': ['go', 'golang'],
      'Rust': ['rust'],
      'PHP': ['php', 'laravel', 'symfony', 'composer'],
      'Ruby': ['ruby', 'rb', 'rails', 'gem'],
      'Scala': ['scala', 'sbt'],
      'Swift': ['swift', 'ios'],
      'Objective-C': ['objective-c', 'objc', 'obj-c'],
      'Dart': ['dart', 'flutter'],
      'Elixir': ['elixir', 'phoenix'],
      'Groovy': ['groovy'],
      'Apex': ['apex', 'salesforce'],
      '.NET': ['.net', 'dotnet', 'nuget'],
      'VB.NET': ['vb.net', 'vb', 'visual basic']
    };
    
    // Check for each language pattern
    for (const [language, patterns] of Object.entries(languagePatterns)) {
      const hasLanguage = patterns.some(pattern => {
        // Special handling for single character patterns to avoid false positives
        if (pattern === 'c ' || pattern === ' c)') {
          return lowerNotes.includes(pattern);
        }
        return lowerNotes.includes(pattern);
      });
      
      if (hasLanguage && !found.includes(language)) {
        found.push(language);
      }
    }
    
    // Sort languages by common usage for better display
    const sortOrder = ['JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'Go', 'PHP', 'Ruby', 'C/C++'];
    found.sort((a, b) => {
      const aIndex = sortOrder.indexOf(a);
      const bIndex = sortOrder.indexOf(b);
      if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
      if (aIndex !== -1) return -1;
      if (bIndex !== -1) return 1;
      return a.localeCompare(b);
    });
    
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
    const lowerNotes = notes.toLowerCase();
    
    // Check for on-premises first
    if (lowerNotes.includes('on-premises') || lowerNotes.includes('on-prem') || 
        lowerNotes.includes('onpremises') || lowerNotes.includes('onprem')) {
      return 'On-premises';
    }
    
    // Check for cloud providers
    const providers = ['aws', 'amazon web services', 'azure', 'microsoft azure', 'gcp', 'google cloud', 'multi-cloud', 'hybrid'];
    for (const provider of providers) {
      if (lowerNotes.includes(provider)) {
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
    const currentLower = currentState.toLowerCase();
    
    // Analyze current state pain points to create targeted future state
    let futureStateNarrative = '';
    
    // No security or limited security
    if (currentLower.includes('no security') || currentLower.includes('nothing') || 
        currentLower.includes('limited') || currentLower.includes('no scanning') ||
        currentLower.includes('no tools')) {
      
      futureStateNarrative = `With Snyk implementation, the organization will transform from an ad-hoc security approach to a comprehensive, automated security-first development culture. `;
      futureStateNarrative += `Developers will have security insights directly in their IDEs, preventing vulnerabilities before they reach production. `;
      futureStateNarrative += `The team will achieve complete visibility across all ${techStack.languages ? techStack.languages.join(', ') : 'application'} code, `;
      futureStateNarrative += `dependencies, containers, and infrastructure with automated remediation guidance that reduces security debt by 80%.`;
      
    // Manual processes
    } else if (currentLower.includes('manual') || currentLower.includes('ad-hoc')) {
      
      futureStateNarrative = `Moving from time-intensive manual security reviews to automated, real-time security scanning will accelerate development velocity by 40% `;
      futureStateNarrative += `while dramatically improving security posture. Developers will receive instant feedback on security issues `;
      futureStateNarrative += `directly in their ${techStack.ide !== 'IDE TBD' ? techStack.ide : 'development environment'}, `;
      futureStateNarrative += `eliminating the bottleneck of waiting for security team reviews and enabling true shift-left security practices.`;
      
    // Veracode/Checkmarx users  
    } else if (currentLower.includes('veracode') || currentLower.includes('checkmarx')) {
      
      futureStateNarrative = `Replacing current SAST tools with Snyk will deliver scan results in seconds instead of hours, `;
      futureStateNarrative += `reduce false positives by 70%, and provide AI-powered auto-fix suggestions that resolve vulnerabilities with a single click. `;
      futureStateNarrative += `The development team will experience security as an enabler rather than a roadblock, `;
      futureStateNarrative += `with seamless ${techStack.sourceCodeManagement !== 'SCM tool TBD' ? techStack.sourceCodeManagement : 'SCM'} integration and developer-friendly remediation guidance.`;
      
    // SonarQube users
    } else if (currentLower.includes('sonarqube') || currentLower.includes('sonar')) {
      
      futureStateNarrative = `While SonarQube provides code quality insights, Snyk will extend security coverage to include real-time vulnerability detection, `;
      futureStateNarrative += `container image scanning, and infrastructure-as-code security analysis. The organization will gain comprehensive `;
      futureStateNarrative += `application security visibility from code to cloud, with industry-leading vulnerability intelligence `;
      futureStateNarrative += `and automated dependency management that keeps applications secure without slowing development.`;
      
    // GitHub Advanced Security users
    } else if (currentLower.includes('github') && currentLower.includes('security')) {
      
      futureStateNarrative = `Enhancing GitHub's security capabilities with Snyk will provide superior language support, `;
      futureStateNarrative += `more comprehensive vulnerability detection, and expanded coverage for containers and infrastructure. `;
      futureStateNarrative += `The team will benefit from Snyk's deeper security expertise, faster scanning, and more actionable remediation guidance `;
      futureStateNarrative += `while maintaining seamless integration with existing GitHub workflows.`;
      
    // Dependency scanning tools
    } else if (currentLower.includes('dependency') || currentLower.includes('sca') || 
               currentLower.includes('whitesource') || currentLower.includes('black duck')) {
      
      futureStateNarrative = `Snyk will modernize dependency management with real-time vulnerability monitoring, automated pull requests for security updates, `;
      futureStateNarrative += `and intelligent prioritization based on reachability analysis. Beyond just identifying vulnerabilities, `;
      futureStateNarrative += `Snyk provides contextual remediation advice and license compliance management, `;
      futureStateNarrative += `reducing security technical debt while maintaining development velocity.`;
      
    // Container security tools
    } else if (currentLower.includes('container') && (currentLower.includes('twistlock') || 
               currentLower.includes('aqua') || currentLower.includes('prisma'))) {
      
      futureStateNarrative = `Snyk will provide comprehensive container security that integrates directly into the development workflow, `;
      futureStateNarrative += `scanning images during the build process and providing base image recommendations for faster remediation. `;
      futureStateNarrative += `The security team will gain complete visibility from code to runtime, with automated policy enforcement `;
      futureStateNarrative += `and developer-friendly remediation guidance that reduces container vulnerabilities by 60%.`;
      
    // Generic current tool replacement
    } else {
      
      futureStateNarrative = `With Snyk's modern application security platform, the organization will achieve comprehensive security coverage `;
      futureStateNarrative += `across the entire software development lifecycle. Developers will experience security as a natural part of their workflow, `;
      futureStateNarrative += `with real-time insights, automated remediation, and seamless integration with existing tools. `;
      futureStateNarrative += `The security team will gain unified visibility, automated policy enforcement, and measurable risk reduction `;
      futureStateNarrative += `that demonstrates clear ROI on security investments.`;
    }
    
    // Add specific tech stack benefits
    const techBenefits = [];
    
    if (techStack.cicd && techStack.cicd !== 'CI/CD TBD') {
      techBenefits.push(`Automated security gates in ${techStack.cicd} will ensure only secure code reaches production`);
    }
    
    if (techStack.containerRegistry && techStack.containerRegistry !== 'Container Registry TBD') {
      techBenefits.push(`Container images in ${techStack.containerRegistry} will be automatically scanned with base image upgrade recommendations`);
    }
    
    if (techStack.iacFormats && Array.isArray(techStack.iacFormats) && techStack.iacFormats[0] !== 'IaC formats TBD') {
      techBenefits.push(`Infrastructure security will be enforced through ${techStack.iacFormats.join(' and ')} policy scanning`);
    }
    
    if (techBenefits.length > 0) {
      futureStateNarrative += ` Additionally, ${techBenefits.join(', ').toLowerCase()}.`;
    }
    
    // Add measurable outcomes
    futureStateNarrative += ` Expected outcomes include 70% reduction in mean time to remediation, `;
    futureStateNarrative += `40% decrease in security-related deployment delays, and 85% improvement in vulnerability fix rates `;
    futureStateNarrative += `through automated, actionable remediation guidance.`;
    
    return futureStateNarrative;
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