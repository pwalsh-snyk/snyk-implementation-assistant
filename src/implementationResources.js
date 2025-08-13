class ImplementationResources {
  constructor() {
    this.resources = {
      scm: {
        'github': {
          name: 'GitHub Integration',
          links: [
            'https://docs.snyk.io/integrations/git-repository-scm-integrations/github-integration',
            'https://docs.snyk.io/integrations/git-repository-scm-integrations/github-integration/github-actions-integration',
            'https://docs.snyk.io/integrations/git-repository-scm-integrations/github-integration/github-enterprise-integration'
          ],
          setupSteps: [
            'Install Snyk GitHub App',
            'Configure repository access',
            'Set up GitHub Actions workflow',
            'Configure PR checks'
          ],
          patPermissions: {
            required: [
              'repo (Full control of private repositories) - Required for accessing private repos',
              'read:org (Read org and team membership) - Required for organization-level access'
            ],
            optional: [
              'admin:repo_hook (Repository webhooks) - Only if using webhook integrations',
              'admin:org_hook (Organization webhooks) - Only if using org-level webhooks',
              'user:email (Access user email) - For user identification in some workflows'
            ],
            notes: 'For GitHub.com, Snyk GitHub App is preferred over PAT for better security. For GitHub Enterprise Server, PAT is required. Fine-grained tokens are supported with Contents (read) and Metadata (read) permissions.'
          }
        },
        'gitlab': {
          name: 'GitLab Integration',
          links: [
            'https://docs.snyk.io/integrations/git-repository-scm-integrations/gitlab-integration',
            'https://docs.snyk.io/integrations/git-repository-scm-integrations/gitlab-integration/gitlab-ci-cd-integration'
          ],
          setupSteps: [
            'Install Snyk GitLab App',
            'Configure repository access',
            'Set up GitLab CI/CD pipeline',
            'Configure merge request checks'
          ],
          patPermissions: {
            required: [
              'api (Complete read/write access to the API)',
              'read_repository (Read access to repository)',
              'write_repository (Write access to repository)'
            ],
            optional: [
              'read_user (Read user information)',
              'read_registry (Read container registry images)'
            ],
            notes: 'GitLab Personal Access Token must be created by a user with sufficient permissions to access the repositories you want to monitor.'
          }
        },
        'bitbucket': {
          name: 'Bitbucket Integration',
          links: [
            'https://docs.snyk.io/integrations/git-repository-scm-integrations/bitbucket-integration',
            'https://docs.snyk.io/integrations/git-repository-scm-integrations/bitbucket-integration/bitbucket-pipelines-integration'
          ],
          setupSteps: [
            'Install Snyk Bitbucket App',
            'Configure repository access',
            'Set up Bitbucket Pipelines',
            'Configure PR checks'
          ],
          patPermissions: {
            required: [
              'Repositories: Read',
              'Repositories: Write',
              'Pull requests: Read',
              'Pull requests: Write'
            ],
            optional: [
              'Account: Read',
              'Team membership: Read',
              'Webhooks: Read and write'
            ],
            notes: 'Bitbucket App Password must be created with sufficient permissions. For Bitbucket Server, use Personal Access Token.'
          }
        },
        'azure devops': {
          name: 'Azure DevOps Integration',
          links: [
            'https://docs.snyk.io/integrations/git-repository-scm-integrations/azure-devops-integration',
            'https://docs.snyk.io/integrations/git-repository-scm-integrations/azure-devops-integration/azure-pipelines-integration'
          ],
          setupSteps: [
            'Configure Azure DevOps connection',
            'Set up Azure Pipelines',
            'Configure PR policies',
            'Set up build validation'
          ],
          patPermissions: {
            required: [
              'Code (read & write)',
              'Build (read & execute)',
              'Project and team (read)',
              'Pull Request (read & write)'
            ],
            optional: [
              'Identity (read)',
              'User profile (read)',
              'Work items (read & write)'
            ],
            notes: 'Azure DevOps Personal Access Token must be created with appropriate scopes. Ensure the token has access to all projects and repositories you want to monitor.'
          }
        }
      },
      languages: {
        'javascript': {
          name: 'JavaScript/Node.js',
          links: [
            'https://docs.snyk.io/snyk-open-source/language-and-package-manager-support/javascript-and-node.js',
            'https://docs.snyk.io/snyk-open-source/language-and-package-manager-support/javascript-and-node.js/npm',
            'https://docs.snyk.io/snyk-open-source/language-and-package-manager-support/javascript-and-node.js/yarn'
          ],
          setupSteps: [
            'Install Snyk CLI',
            'Authenticate with Snyk',
            'Test your dependencies',
            'Monitor for vulnerabilities'
          ]
        },
        'typescript': {
          name: 'TypeScript',
          links: [
            'https://docs.snyk.io/snyk-open-source/language-and-package-manager-support/javascript-and-node.js/typescript',
            'https://docs.snyk.io/snyk-code/language-support/typescript'
          ],
          setupSteps: [
            'Install Snyk CLI',
            'Configure TypeScript project',
            'Test dependencies and code',
            'Set up monitoring'
          ]
        },
        'python': {
          name: 'Python',
          links: [
            'https://docs.snyk.io/snyk-open-source/language-and-package-manager-support/python',
            'https://docs.snyk.io/snyk-open-source/language-and-package-manager-support/python/pip',
            'https://docs.snyk.io/snyk-open-source/language-and-package-manager-support/python/poetry'
          ],
          setupSteps: [
            'Install Snyk CLI',
            'Configure Python environment',
            'Test requirements.txt or poetry.lock',
            'Monitor for vulnerabilities'
          ]
        },
        'java': {
          name: 'Java',
          links: [
            'https://docs.snyk.io/snyk-open-source/language-and-package-manager-support/java',
            'https://docs.snyk.io/snyk-open-source/language-and-package-manager-support/java/maven',
            'https://docs.snyk.io/snyk-open-source/language-and-package-manager-support/java/gradle'
          ],
          setupSteps: [
            'Install Snyk CLI',
            'Configure Maven or Gradle',
            'Test dependencies',
            'Monitor for vulnerabilities'
          ]
        },
        'c#': {
          name: 'C#/.NET',
          links: [
            'https://docs.snyk.io/snyk-open-source/language-and-package-manager-support/csharp',
            'https://docs.snyk.io/snyk-open-source/language-and-package-manager-support/csharp/nuget'
          ],
          setupSteps: [
            'Install Snyk CLI',
            'Configure .NET project',
            'Test NuGet packages',
            'Monitor for vulnerabilities'
          ]
        },
        'go': {
          name: 'Go',
          links: [
            'https://docs.snyk.io/snyk-open-source/language-and-package-manager-support/go',
            'https://docs.snyk.io/snyk-open-source/language-and-package-manager-support/go/go-modules'
          ],
          setupSteps: [
            'Install Snyk CLI',
            'Configure Go modules',
            'Test dependencies',
            'Monitor for vulnerabilities'
          ]
        }
      },
      ide: {
        'vscode': {
          name: 'Visual Studio Code',
          links: [
            'https://docs.snyk.io/integrations/ide-tools/visual-studio-code-extension-for-snyk-code',
            'https://docs.snyk.io/integrations/ide-tools/visual-studio-code-extension-for-snyk-open-source'
          ],
          setupSteps: [
            'Install Snyk VS Code extension',
            'Authenticate with Snyk',
            'Configure workspace settings',
            'Start scanning'
          ]
        },
        'intellij': {
          name: 'IntelliJ IDEA',
          links: [
            'https://docs.snyk.io/integrations/ide-tools/intellij-idea-jetbrains-ide-plugin',
            'https://docs.snyk.io/integrations/ide-tools/intellij-idea-jetbrains-ide-plugin/installation-and-activation'
          ],
          setupSteps: [
            'Install Snyk IntelliJ plugin',
            'Authenticate with Snyk',
            'Configure project settings',
            'Start scanning'
          ]
        }
      },
      cicd: {
        'jenkins': {
          name: 'Jenkins',
          links: [
            'https://docs.snyk.io/integrations/ci-cd-integrations/jenkins-integration',
            'https://docs.snyk.io/integrations/ci-cd-integrations/jenkins-integration/jenkins-pipeline-integration'
          ],
          setupSteps: [
            'Install Snyk Jenkins plugin',
            'Configure Snyk credentials',
            'Add Snyk steps to pipeline',
            'Configure build conditions'
          ]
        },
        'github actions': {
          name: 'GitHub Actions',
          links: [
            'https://docs.snyk.io/integrations/ci-cd-integrations/github-actions-integration',
            'https://docs.snyk.io/integrations/ci-cd-integrations/github-actions-integration/github-actions-for-snyk-open-source'
          ],
          setupSteps: [
            'Add Snyk GitHub Action',
            'Configure secrets',
            'Set up workflow',
            'Configure failure conditions'
          ]
        },
        'gitlab ci': {
          name: 'GitLab CI/CD',
          links: [
            'https://docs.snyk.io/integrations/ci-cd-integrations/gitlab-ci-cd-integration',
            'https://docs.snyk.io/integrations/ci-cd-integrations/gitlab-ci-cd-integration/gitlab-ci-cd-for-snyk-open-source'
          ],
          setupSteps: [
            'Add Snyk to .gitlab-ci.yml',
            'Configure variables',
            'Set up pipeline stages',
            'Configure failure conditions'
          ]
        },
        'azure pipelines': {
          name: 'Azure Pipelines',
          links: [
            'https://docs.snyk.io/integrations/ci-cd-integrations/azure-pipelines-integration',
            'https://docs.snyk.io/integrations/ci-cd-integrations/azure-pipelines-integration/azure-pipelines-for-snyk-open-source'
          ],
          setupSteps: [
            'Add Snyk task to pipeline',
            'Configure service connection',
            'Set up build steps',
            'Configure failure conditions'
          ]
        }
      },
      containers: {
        'docker': {
          name: 'Docker',
          links: [
            'https://docs.snyk.io/snyk-container',
            'https://docs.snyk.io/snyk-container/getting-started-with-container-vulnerability-management',
            'https://docs.snyk.io/snyk-container/scanning-your-container-images'
          ],
          setupSteps: [
            'Install Snyk CLI',
            'Authenticate with Snyk',
            'Scan Docker images',
            'Monitor for vulnerabilities'
          ]
        },
        'kubernetes': {
          name: 'Kubernetes',
          links: [
            'https://docs.snyk.io/snyk-container/kubernetes-workload-and-image-scanning',
            'https://docs.snyk.io/snyk-container/kubernetes-workload-and-image-scanning/kubernetes-integration-overview'
          ],
          setupSteps: [
            'Install Snyk Operator',
            'Configure namespace scanning',
            'Set up admission controller',
            'Monitor workloads'
          ]
        }
      },
      iac: {
        'terraform': {
          name: 'Terraform',
          links: [
            'https://docs.snyk.io/snyk-infrastructure-as-code',
            'https://docs.snyk.io/snyk-infrastructure-as-code/getting-started-with-infrastructure-as-code-security',
            'https://docs.snyk.io/snyk-infrastructure-as-code/scanning-terraform-files'
          ],
          setupSteps: [
            'Install Snyk CLI',
            'Scan Terraform files',
            'Review security issues',
            'Fix misconfigurations'
          ]
        },
        'cloudformation': {
          name: 'AWS CloudFormation',
          links: [
            'https://docs.snyk.io/snyk-infrastructure-as-code/scanning-cloudformation-files',
            'https://docs.snyk.io/snyk-infrastructure-as-code/scanning-cloudformation-files/cloudformation-security-rules'
          ],
          setupSteps: [
            'Install Snyk CLI',
            'Scan CloudFormation templates',
            'Review security issues',
            'Fix misconfigurations'
          ]
        },
        'kubernetes': {
          name: 'Kubernetes Manifests',
          links: [
            'https://docs.snyk.io/snyk-infrastructure-as-code/scanning-kubernetes-configuration-files',
            'https://docs.snyk.io/snyk-infrastructure-as-code/scanning-kubernetes-configuration-files/kubernetes-security-rules'
          ],
          setupSteps: [
            'Install Snyk CLI',
            'Scan Kubernetes manifests',
            'Review security issues',
            'Fix misconfigurations'
          ]
        }
      }
    };
  }

  async getImplementationGuides(techStack) {
    const guides = {
      scm: this.getSCMGuides(techStack.sourceCodeManagement),
      languages: this.getLanguageGuides(techStack.languages),
      ide: this.getIDEGuides(techStack.ide),
      cicd: this.getCICDGuides(techStack.cicd),
      containers: this.getContainerGuides(),
      iac: this.getIACGuides(techStack.iacFormats)
    };

    return guides;
  }

  getSCMGuides(scmTool) {
    if (scmTool === 'SCM tool TBD') {
      return {
        name: 'Source Code Management',
        message: 'SCM tool not specified in discovery notes',
        generalLinks: [
          'https://docs.snyk.io/integrations/git-repository-scm-integrations',
          'https://docs.snyk.io/integrations/git-repository-scm-integrations/github-integration',
          'https://docs.snyk.io/integrations/git-repository-scm-integrations/gitlab-integration'
        ]
      };
    }

    // Handle multiple SCMs
    if (Array.isArray(scmTool)) {
      const multipleScmGuides = {
        name: `Multiple SCM Systems (${scmTool.join(', ')})`,
        isMultiple: true,
        scmTools: [],
        implementationGuide: this.getEnterpriseImplementationGuide()
      };

      scmTool.forEach(tool => {
        const scmKey = tool.toLowerCase();
        const scmInfo = this.resources.scm[scmKey];
        if (scmInfo) {
          multipleScmGuides.scmTools.push({
            name: scmInfo.name,
            links: scmInfo.links,
            setupSteps: scmInfo.setupSteps,
            patPermissions: scmInfo.patPermissions
          });
        }
      });

      return multipleScmGuides;
    }

    // Handle single SCM
    const scmKey = scmTool.toLowerCase();
    const scmInfo = this.resources.scm[scmKey];
    
    // Add implementation guide to the SCM info
    if (scmInfo) {
      scmInfo.implementationGuide = this.getEnterpriseImplementationGuide();
    }
    
    return scmInfo || {
      name: scmTool,
      message: 'SCM integration guide not available',
      generalLinks: [
        'https://docs.snyk.io/integrations/git-repository-scm-integrations'
      ]
    };
  }

  getLanguageGuides(languages) {
    if (!languages || languages[0] === 'Languages TBD') {
      return {
        name: 'Programming Languages',
        message: 'Languages not specified in discovery notes',
        generalLinks: [
          'https://docs.snyk.io/snyk-open-source/language-and-package-manager-support',
          'https://docs.snyk.io/snyk-code/language-support'
        ]
      };
    }

    const guides = [];
    for (const language of languages) {
      const langKey = language.toLowerCase();
      const langInfo = this.resources.languages[langKey];
      
      if (langInfo) {
        guides.push(langInfo);
      }
    }

    return guides.length > 0 ? guides : {
      name: 'Programming Languages',
      message: 'Language-specific guides not available',
      generalLinks: [
        'https://docs.snyk.io/snyk-open-source/language-and-package-manager-support'
      ]
    };
  }

  getIDEGuides(ide) {
    if (ide === 'IDE TBD') {
      return {
        name: 'IDE Integration',
        message: 'IDE not specified in discovery notes',
        generalLinks: [
          'https://docs.snyk.io/integrations/ide-tools',
          'https://docs.snyk.io/integrations/ide-tools/visual-studio-code-extension-for-snyk-code',
          'https://docs.snyk.io/integrations/ide-tools/intellij-idea-jetbrains-ide-plugin'
        ]
      };
    }

    const ideKey = ide.toLowerCase();
    const ideInfo = this.resources.ide[ideKey];
    
    return ideInfo || {
      name: ide,
      message: 'IDE integration guide not available',
      generalLinks: [
        'https://docs.snyk.io/integrations/ide-tools'
      ]
    };
  }

  getCICDGuides(cicd) {
    if (cicd === 'CI/CD TBD') {
      return {
        name: 'CI/CD Integration',
        message: 'CI/CD tool not specified in discovery notes',
        generalLinks: [
          'https://docs.snyk.io/integrations/ci-cd-integrations',
          'https://docs.snyk.io/integrations/ci-cd-integrations/github-actions-integration',
          'https://docs.snyk.io/integrations/ci-cd-integrations/jenkins-integration'
        ]
      };
    }

    const cicdKey = cicd.toLowerCase();
    const cicdInfo = this.resources.cicd[cicdKey];
    
    return cicdInfo || {
      name: cicd,
      message: 'CI/CD integration guide not available',
      generalLinks: [
        'https://docs.snyk.io/integrations/ci-cd-integrations'
      ]
    };
  }

  getContainerGuides() {
    return {
      name: 'Container Security',
      links: [
        'https://docs.snyk.io/snyk-container',
        'https://docs.snyk.io/snyk-container/getting-started-with-container-vulnerability-management',
        'https://docs.snyk.io/snyk-container/scanning-your-container-images'
      ],
      setupSteps: [
        'Install Snyk CLI',
        'Authenticate with Snyk',
        'Scan container images',
        'Monitor for vulnerabilities'
      ]
    };
  }

  getIACGuides(iacFormats) {
    if (!iacFormats || iacFormats[0] === 'IaC formats TBD') {
      return {
        name: 'Infrastructure as Code',
        message: 'IaC formats not specified in discovery notes',
        generalLinks: [
          'https://docs.snyk.io/snyk-infrastructure-as-code',
          'https://docs.snyk.io/snyk-infrastructure-as-code/getting-started-with-infrastructure-as-code-security'
        ]
      };
    }

    const guides = [];
    for (const format of iacFormats) {
      const formatKey = format.toLowerCase();
      const formatInfo = this.resources.iac[formatKey];
      
      if (formatInfo) {
        guides.push(formatInfo);
      }
    }

    return guides.length > 0 ? guides : {
      name: 'Infrastructure as Code',
      message: 'IaC-specific guides not available',
      generalLinks: [
        'https://docs.snyk.io/snyk-infrastructure-as-code'
      ]
    };
  }

  getEnterpriseImplementationGuide() {
    return {
      title: 'Snyk Enterprise Implementation Guide',
      overview: 'Strategic approach to implementing Snyk at enterprise scale with proven methodology',
      documentationLink: 'https://docs.snyk.io/implementation-and-setup/enterprise-implementation-guide',
      strategy: {
        goals: [
          'Achieve visibility across your application portfolio',
          'Achieve prevention and drive developer adoption', 
          'Fix the backlog and triage issues'
        ],
        approach: 'Three-phase implementation focusing on visibility first, then prevention, and finally backlog remediation'
      },
      phases: [
        {
          phase: 'Phase 1: Discovery and Planning',
          timeline: 'Week 1-2',
          objectives: [
            'Connect with Snyk team for guidance',
            'Conduct comprehensive discovery of current state',
            'Plan Organization structure and user roles',
            'Decide on SSO access requirements',
            'Choose rollout integrations based on tech stack',
            'Create detailed rollout plan'
          ],
          keyActivities: [
            'Validate current tech stack and security tools',
            'Identify key stakeholders and champions',
            'Determine pilot teams and applications',
            'Plan success metrics and KPIs'
          ],
          deliverables: [
            'Organization structure plan',
            'User role assignments',
            'Integration roadmap',
            'Success criteria definition'
          ]
        },
        {
          phase: 'Phase 2: Configure Account',
          timeline: 'Week 2-3',
          objectives: [
            'Configure SSO for enterprise authentication',
            'Set up Organization template and visibility settings',
            'Configure integrations with SCM and CI/CD',
            'Apply security and license policies',
            'Configure Asset Management'
          ],
          keyActivities: [
            'Set up Single Sign-On integration',
            'Configure notifications and alerts',
            'Enable Snyk Code for SAST scanning',
            'Create Organizations based on structure plan',
            'Configure Snyk Essentials for coverage control'
          ],
          deliverables: [
            'Configured Snyk environment',
            'Active SSO integration',
            'Organization templates',
            'Initial policy framework'
          ]
        },
        {
          phase: 'Phase 3: Gain Visibility',
          timeline: 'Week 3-4',
          objectives: [
            'Import Projects to gain security visibility',
            'Set up Asset Policies for governance',
            'Configure Snyk AppRisk Insights (if available)',
            'Add Project tags and attributes for organization'
          ],
          keyActivities: [
            'Bulk import repositories using API Import Tool',
            'Configure asset classification and tagging',
            'Set up initial reporting and dashboards',
            'Establish baseline security metrics'
          ],
          deliverables: [
            'Complete application portfolio visibility',
            'Categorized and tagged Projects',
            'Initial security assessment report',
            'Baseline metrics established'
          ]
        },
        {
          phase: 'Phase 4: Create Fix Strategy',
          timeline: 'Week 4-5',
          objectives: [
            'Analyze discovered security issues',
            'Prioritize remediation efforts',
            'Create triage workflows',
            'Establish fix strategy and timelines'
          ],
          keyActivities: [
            'Review and categorize security findings',
            'Create priority matrix for vulnerabilities',
            'Establish triage process with development teams',
            'Define SLAs for different severity levels'
          ],
          deliverables: [
            'Prioritized remediation roadmap',
            'Triage process documentation',
            'SLA definitions',
            'Resource allocation plan'
          ]
        },
        {
          phase: 'Phase 5: Initial Rollout to Team',
          timeline: 'Week 5-6',
          objectives: [
            'Notify and train development teams',
            'Deploy IDE plugins for developer adoption',
            'Provide Snyk Learn training resources',
            'Establish support channels'
          ],
          keyActivities: [
            'Conduct developer training sessions',
            'Roll out IDE integrations (VS Code, IntelliJ)',
            'Create internal documentation and guides',
            'Establish feedback channels'
          ],
          deliverables: [
            'Trained development teams',
            'Active IDE plugin usage',
            'Internal training materials',
            'Support process established'
          ]
        },
        {
          phase: 'Phase 6: Rolling Out Prevention',
          timeline: 'Week 6-8',
          objectives: [
            'Enable PR/MR checks for automated scanning',
            'Configure CI/CD pipeline integration',
            'Implement custom base images scanning',
            'Deploy Infrastructure as Code scanning'
          ],
          keyActivities: [
            'Configure automated PR checks',
            'Integrate Snyk into CI/CD pipelines',
            'Set up container registry scanning',
            'Enable IaC security scanning',
            'Configure pipeline gates and fail conditions'
          ],
          deliverables: [
            'Automated security gates',
            'Active PR/MR scanning',
            'CI/CD pipeline integration',
            'Container and IaC scanning'
          ]
        },
        {
          phase: 'Phase 7: Triages, Ignores, and Fixes',
          timeline: 'Week 8+',
          objectives: [
            'Establish ongoing triage processes',
            'Implement ignore policies for accepted risks',
            'Execute remediation plan',
            'Monitor and measure progress'
          ],
          keyActivities: [
            'Weekly triage meetings with teams',
            'Implement ignore policies for false positives',
            'Execute vulnerability fixes based on priority',
            'Monitor developer adoption metrics',
            'Regular reporting to stakeholders'
          ],
          deliverables: [
            'Sustainable triage process',
            'Reduced vulnerability backlog',
            'Improved security posture',
            'Regular progress reports'
          ]
        }
      ],
      timeline: {
        small_business: 'Days to weeks - rapid implementation possible',
        enterprise: 'Weeks to months - detailed planning and phased rollout',
        typical_enterprise: '6-8 weeks for full implementation'
      },
      successFactors: [
        'Executive sponsorship and change management',
        'Developer champion identification and training',
        'Gradual rollout starting with visibility before enforcement',
        'Clear communication and feedback channels',
        'Regular progress monitoring and stakeholder updates'
      ],
      keyResources: [
        'Snyk Customer Success team for guidance',
        'Snyk Learn for developer education',
        'API Import Tool for bulk repository onboarding',
        'Snyk Essentials for enterprise governance'
      ]
    };
  }

  getGeneralResources() {
    return {
      gettingStarted: [
        'https://docs.snyk.io/getting-started',
        'https://docs.snyk.io/getting-started/getting-started-with-snyk-open-source',
        'https://docs.snyk.io/getting-started/getting-started-with-snyk-code'
      ],
      bestPractices: [
        'https://docs.snyk.io/best-practices',
        'https://docs.snyk.io/best-practices/security-policies',
        'https://docs.snyk.io/best-practices/automated-security-testing'
      ],
      troubleshooting: [
        'https://docs.snyk.io/troubleshooting',
        'https://docs.snyk.io/troubleshooting/common-issues'
      ]
    };
  }
}

module.exports = new ImplementationResources(); 