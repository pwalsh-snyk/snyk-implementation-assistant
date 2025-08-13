class CompetitiveIntel {
  constructor() {
    this.competitorData = {
      'github advanced security': {
        name: 'GitHub Advanced Security',
        advantages: [
          'Snyk provides more comprehensive vulnerability coverage across languages and frameworks',
          'Snyk offers real-time vulnerability scanning with faster update cycles',
          'Snyk provides better developer experience with IDE integration and auto-fix capabilities',
          'Snyk offers more granular policy controls and compliance features',
          'Snyk provides better container and infrastructure security scanning'
        ],
        trapQuestions: [
          'How do you handle vulnerabilities in languages not natively supported by GitHub?',
          'What\'s your process for scanning container images and infrastructure as code?',
          'How quickly do you get vulnerability updates compared to when they\'re discovered?',
          'Can you show me how your IDE integration helps developers fix issues in real-time?',
          'What compliance frameworks do you support for audit requirements?'
        ],
        weaknesses: [
          'Limited language support compared to Snyk',
          'Slower vulnerability database updates',
          'Less comprehensive container security',
          'Limited infrastructure as code scanning',
          'Basic IDE integration without auto-fix'
        ]
      },
      'checkmarx': {
        name: 'Checkmarx',
        advantages: [
          'Snyk provides faster, more accurate scanning with lower false positive rates',
          'Snyk offers better developer experience with seamless IDE integration',
          'Snyk provides comprehensive coverage including open source, containers, and IaC',
          'Snyk offers real-time vulnerability updates and auto-fix capabilities',
          'Snyk provides better integration with modern CI/CD pipelines'
        ],
        trapQuestions: [
          'How long does it take to get scan results in your current setup?',
          'What\'s your false positive rate and how do you handle it?',
          'How do you handle container security and infrastructure scanning?',
          'Can developers easily integrate security scanning into their IDEs?',
          'How quickly do you get updates for newly discovered vulnerabilities?'
        ],
        weaknesses: [
          'Slower scanning performance',
          'Higher false positive rates',
          'Limited container and infrastructure security',
          'Poor developer experience',
          'Complex setup and configuration'
        ]
      },
      'veracode': {
        name: 'Veracode',
        advantages: [
          'Snyk provides faster scanning with real-time results',
          'Snyk offers better developer experience with IDE integration',
          'Snyk provides comprehensive coverage including containers and IaC',
          'Snyk offers more granular policy controls and compliance features',
          'Snyk provides better integration with modern development workflows'
        ],
        trapQuestions: [
          'How long does it take to get scan results in your current process?',
          'How do you handle container security and cloud infrastructure?',
          'Can developers easily integrate security into their daily workflow?',
          'What\'s your process for handling infrastructure as code security?',
          'How do you ensure compliance across different environments?'
        ],
        weaknesses: [
          'Slower scanning and longer feedback cycles',
          'Limited container and infrastructure security',
          'Poor developer experience',
          'Complex compliance management',
          'Limited modern CI/CD integration'
        ]
      },
      'sonarqube': {
        name: 'SonarQube',
        advantages: [
          'Snyk provides more comprehensive security coverage beyond code quality',
          'Snyk offers better vulnerability scanning with real-time updates',
          'Snyk provides container and infrastructure security scanning',
          'Snyk offers better developer experience with auto-fix capabilities',
          'Snyk provides more granular security policies and compliance features'
        ],
        trapQuestions: [
          'How do you handle security vulnerabilities vs code quality issues?',
          'What\'s your process for container and infrastructure security?',
          'How quickly do you get updates for newly discovered vulnerabilities?',
          'Can you show me how developers fix security issues in real-time?',
          'What compliance frameworks do you support for security requirements?'
        ],
        weaknesses: [
          'Limited security focus (more code quality oriented)',
          'Slower vulnerability database updates',
          'No container or infrastructure security',
          'Limited auto-fix capabilities',
          'Basic security policy management'
        ]
      },
      'fortify': {
        name: 'Fortify',
        advantages: [
          'Snyk provides faster, more accurate scanning with lower false positive rates',
          'Snyk offers better developer experience with seamless IDE integration',
          'Snyk provides comprehensive coverage including open source, containers, and IaC',
          'Snyk offers real-time vulnerability updates and auto-fix capabilities',
          'Snyk provides better integration with modern CI/CD pipelines'
        ],
        trapQuestions: [
          'How long does it take to get scan results in your current setup?',
          'What\'s your false positive rate and how do you handle it?',
          'How do you handle container security and infrastructure scanning?',
          'Can developers easily integrate security scanning into their IDEs?',
          'How quickly do you get updates for newly discovered vulnerabilities?'
        ],
        weaknesses: [
          'Slower scanning performance',
          'Higher false positive rates',
          'Limited container and infrastructure security',
          'Poor developer experience',
          'Complex setup and configuration'
        ]
      },
      'prisma cloud': {
        name: 'Prisma Cloud',
        advantages: [
          'Snyk provides more comprehensive application security coverage',
          'Snyk offers better developer experience with IDE integration',
          'Snyk provides faster vulnerability scanning and updates',
          'Snyk offers better integration with development workflows',
          'Snyk provides more granular policy controls for application security'
        ],
        trapQuestions: [
          'How do you handle application security beyond container scanning?',
          'Can developers easily integrate security into their development workflow?',
          'How quickly do you get updates for application vulnerabilities?',
          'What\'s your process for scanning open source dependencies?',
          'How do you handle infrastructure as code security?'
        ],
        weaknesses: [
          'Limited application security focus',
          'Poor developer experience',
          'Slower vulnerability updates',
          'Limited development workflow integration',
          'Basic application security policies'
        ]
      },
      'aqua security': {
        name: 'Aqua Security',
        advantages: [
          'Snyk provides more comprehensive application security coverage',
          'Snyk offers better developer experience with IDE integration',
          'Snyk provides faster vulnerability scanning and updates',
          'Snyk offers better integration with development workflows',
          'Snyk provides more granular policy controls for application security'
        ],
        trapQuestions: [
          'How do you handle application security beyond container scanning?',
          'Can developers easily integrate security into their development workflow?',
          'How quickly do you get updates for application vulnerabilities?',
          'What\'s your process for scanning open source dependencies?',
          'How do you handle infrastructure as code security?'
        ],
        weaknesses: [
          'Limited application security focus',
          'Poor developer experience',
          'Slower vulnerability updates',
          'Limited development workflow integration',
          'Basic application security policies'
        ]
      },
      'twistlock': {
        name: 'Twistlock',
        advantages: [
          'Snyk provides more comprehensive application security coverage',
          'Snyk offers better developer experience with IDE integration',
          'Snyk provides faster vulnerability scanning and updates',
          'Snyk offers better integration with development workflows',
          'Snyk provides more granular policy controls for application security'
        ],
        trapQuestions: [
          'How do you handle application security beyond container scanning?',
          'Can developers easily integrate security into their development workflow?',
          'How quickly do you get updates for application vulnerabilities?',
          'What\'s your process for scanning open source dependencies?',
          'How do you handle infrastructure as code security?'
        ],
        weaknesses: [
          'Limited application security focus',
          'Poor developer experience',
          'Slower vulnerability updates',
          'Limited development workflow integration',
          'Basic application security policies'
        ]
      },
      'clair': {
        name: 'Clair',
        advantages: [
          'Snyk provides more comprehensive security coverage beyond containers',
          'Snyk offers better developer experience with IDE integration',
          'Snyk provides faster vulnerability scanning and updates',
          'Snyk offers better integration with development workflows',
          'Snyk provides more granular policy controls and compliance features'
        ],
        trapQuestions: [
          'How do you handle application security beyond container scanning?',
          'Can developers easily integrate security into their development workflow?',
          'How quickly do you get updates for application vulnerabilities?',
          'What\'s your process for scanning open source dependencies?',
          'How do you handle infrastructure as code security?'
        ],
        weaknesses: [
          'Limited to container scanning only',
          'No application security coverage',
          'Poor developer experience',
          'Limited integration capabilities',
          'Basic policy management'
        ]
      },
      'trivy': {
        name: 'Trivy',
        advantages: [
          'Snyk provides more comprehensive security coverage beyond containers',
          'Snyk offers better developer experience with IDE integration',
          'Snyk provides faster vulnerability scanning and updates',
          'Snyk offers better integration with development workflows',
          'Snyk provides more granular policy controls and compliance features'
        ],
        trapQuestions: [
          'How do you handle application security beyond container scanning?',
          'Can developers easily integrate security into their development workflow?',
          'How quickly do you get updates for application vulnerabilities?',
          'What\'s your process for scanning open source dependencies?',
          'How do you handle infrastructure as code security?'
        ],
        weaknesses: [
          'Limited to container scanning only',
          'No application security coverage',
          'Poor developer experience',
          'Limited integration capabilities',
          'Basic policy management'
        ]
      }
    };
  }

  async getCompetitiveAdvantages(competitors) {
    if (!competitors || competitors.length === 0) {
      return {
        competitors: [],
        advantages: [],
        trapQuestions: [],
        generalAdvantages: [
          'Snyk provides comprehensive security coverage across applications, containers, and infrastructure',
          'Snyk offers superior developer experience with seamless IDE integration',
          'Snyk provides real-time vulnerability updates and auto-fix capabilities',
          'Snyk offers better integration with modern CI/CD pipelines',
          'Snyk provides more granular policy controls and compliance features'
        ]
      };
    }

    const advantages = [];
    const trapQuestions = [];
    const competitorDetails = [];

    for (const competitor of competitors) {
      const competitorKey = competitor.toLowerCase();
      const competitorInfo = this.competitorData[competitorKey];
      
      if (competitorInfo) {
        competitorDetails.push({
          name: competitorInfo.name,
          advantages: competitorInfo.advantages,
          weaknesses: competitorInfo.weaknesses
        });
        
        advantages.push(...competitorInfo.advantages);
        trapQuestions.push(...competitorInfo.trapQuestions);
      }
    }

    // Remove duplicates
    const uniqueAdvantages = [...new Set(advantages)];
    const uniqueTrapQuestions = [...new Set(trapQuestions)];

    return {
      competitors: competitorDetails,
      advantages: uniqueAdvantages,
      trapQuestions: uniqueTrapQuestions,
      generalAdvantages: [
        'Snyk provides comprehensive security coverage across applications, containers, and infrastructure',
        'Snyk offers superior developer experience with seamless IDE integration',
        'Snyk provides real-time vulnerability updates and auto-fix capabilities',
        'Snyk offers better integration with modern CI/CD pipelines',
        'Snyk provides more granular policy controls and compliance features'
      ]
    };
  }

  getCompetitorWeaknesses(competitor) {
    const competitorKey = competitor.toLowerCase();
    const competitorInfo = this.competitorData[competitorKey];
    
    return competitorInfo ? competitorInfo.weaknesses : [];
  }

  getTrapQuestions(competitor) {
    const competitorKey = competitor.toLowerCase();
    const competitorInfo = this.competitorData[competitorKey];
    
    return competitorInfo ? competitorInfo.trapQuestions : [];
  }

  getGeneralTrapQuestions() {
    return [
      'How long does it take to get scan results in your current process?',
      'What\'s your false positive rate and how do you handle it?',
      'How do you handle container security and infrastructure scanning?',
      'Can developers easily integrate security scanning into their IDEs?',
      'How quickly do you get updates for newly discovered vulnerabilities?',
      'What compliance frameworks do you support?',
      'How do you ensure security across your entire development lifecycle?',
      'What\'s your process for handling infrastructure as code security?'
    ];
  }
}

module.exports = new CompetitiveIntel(); 