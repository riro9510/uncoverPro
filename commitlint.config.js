module.exports = {
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'chore',
        'ci',
        'build',
        'revert',
      ],
    ],
    'subject-empty': [0],
  },
  parserPreset: {
    parserOpts: {
      headerPattern:
        /^(\d{4}-\d{2}-\d{2}) (\d+\.\d+\.\d+) (\w+): (.+) (JIRA-\d+) ReadyToRelease: (true|false)$/,
      headerCorrespondence: ['date', 'version', 'type', 'description', 'jira', 'ready'],
    },
  },
};
