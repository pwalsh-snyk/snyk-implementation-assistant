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
          ]
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
          ]
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
          ]
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
          ]
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

    const scmKey = scmTool.toLowerCase();
    const scmInfo = this.resources.scm[scmKey];
    
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