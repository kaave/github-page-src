module.exports = {
  '*.{js,ts}': ['eslint --fix', 'git add'],
  '*.scss': ['prettier --write', 'stylelint --fix', 'git add'],
  '*.vue': ['prettier --write', 'stylelint --config .stylelintrc.vue.js', 'eslint --fix', 'git add'],
};
