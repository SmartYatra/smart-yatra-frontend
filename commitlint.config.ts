import {
  RuleConfigCondition,
  RuleConfigSeverity,
  TargetCaseType,
  UserConfig,
} from '@commitlint/types';

const commitLintConfig: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [
      RuleConfigSeverity.Error,
      'always',
      ['client', 'common', 'config', 'scripts', 'deps', 'ci', 'docs', 'test'],
    ] as const,
    'type-enum': [
      RuleConfigSeverity.Error,
      'always',
      ['feat', 'fix', 'docs', 'chore', 'style', 'refactor', 'ci', 'test', 'revert', 'perf'],
    ] as const,
    'body-leading-blank': [RuleConfigSeverity.Warning, 'always'] as const,
    'body-max-line-length': [RuleConfigSeverity.Error, 'always', 100] as const,
    'footer-leading-blank': [RuleConfigSeverity.Warning, 'always'] as const,
    'footer-max-line-length': [RuleConfigSeverity.Error, 'always', 100] as const,
    'header-max-length': [RuleConfigSeverity.Error, 'always', 100] as const,
    'header-trim': [RuleConfigSeverity.Error, 'always'] as const,
    'subject-case': [
      RuleConfigSeverity.Error,
      'never',
      ['sentence-case', 'start-case', 'pascal-case', 'upper-case'],
    ] as [RuleConfigSeverity, RuleConfigCondition, TargetCaseType[]],
    'subject-empty': [RuleConfigSeverity.Error, 'never'] as const,
    'subject-full-stop': [RuleConfigSeverity.Error, 'never', '.'] as const,
    'type-case': [RuleConfigSeverity.Error, 'always', 'lower-case'] as const,
    'type-empty': [RuleConfigSeverity.Error, 'never'] as const,
  },
  ignores: [(commit: string) => commit.startsWith('Merge') || commit === 'Initial commit'],
};

export default commitLintConfig;
