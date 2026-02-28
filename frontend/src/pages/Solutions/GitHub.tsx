import { Code } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function GitHub() {
  return (
    <SolutionTemplate
      title="GitHub"
      icon={Code}
      description="Code collaboration platform with CI/CD and security scanning at scale"
      problems={[
        { description: 'GitHub Actions workflow optimization for large monorepos with long build times' },
        { description: 'Dependabot alerts and security scanning generate high volumes of notifications' },
        { description: 'Branch protection rules and code review requirements slow down deployment velocity' },
        { description: 'Large binary files and Git LFS usage impact repository performance' },
      ]}
      solutions={[
        { description: 'Implement matrix builds and caching strategies to parallelize CI/CD workflows' },
        { description: 'Deploy automated dependency updates with grouped PRs and intelligent scheduling' },
        { description: 'Use CODEOWNERS and required reviewers with auto-merge for trusted contributors' },
        { description: 'Optimize Git LFS configuration with CDN caching and bandwidth limits' },
      ]}
    />
  );
}
