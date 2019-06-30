module.exports = {
  subTaskConcurrency: 1,
  linters: {
    '*.{js,ts}': ['eslint --fix', 'git add'],
    '*.scss': ['prettier --write', 'stylelint --fix', 'git add'],
    '*.vue': ['prettier --write', 'stylelint --config .stylelintrc.vue.js', 'eslint --fix', 'git add'],
  },
};
