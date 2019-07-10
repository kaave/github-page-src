module.exports = {
  hooks: {
    'pre-commit': 'run-s build lint-staged',
  },
};
