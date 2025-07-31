const dayjs = require('dayjs');

module.exports = {
  prompter: function (cz, commit) {
    console.log('\n🌟 Custom Commit Assistant (EN)\n');

    const today = dayjs().format('YYYY-MM-DD');

    cz.prompt([
      {
        type: 'input',
        name: 'date',
        message: `Commit date?`,
        default: today,
      },
      {
        type: 'input',
        name: 'version',
        message: 'Project version? (e.g., 1.0.0)',
      },
      {
        type: 'list',
        name: 'type',
        message: 'Type of change?',
        choices: [
          { name: 'feature', value: 'feature' },
          { name: 'fix', value: 'fix' },
          { name: 'docs', value: 'docs' },
          { name: 'style', value: 'style' },
          { name: 'refactor', value: 'refactor' },
          { name: 'test', value: 'test' },
          { name: 'chore', value: 'chore' },
        ],
      },
      {
        type: 'input',
        name: 'description',
        message: 'Commit description:',
      },
      {
        type: 'input',
        name: 'jira',
        message: 'JIRA ticket number (e.g., JIRA-123):',
      },
      {
        type: 'confirm',
        name: 'ready',
        message: 'Is it ready for release?',
      },
    ]).then((answers) => {
      const msg = `${answers.date} ${answers.version} ${answers.type}: ${answers.description} Jira/Trello: ${answers.jira} ReadyToRelease: ${answers.ready}`;
      commit(msg);
    });
  },
};
