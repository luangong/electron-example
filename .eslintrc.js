module.exports = {
  root: true,
  extends: [
    'airbnb-base',
  ],
  settings: {
    // Treat 'electron' as a core module, otherwise ESLint will complain that 'electron'
    // should be in 'dependencies' rather than 'devDependencies' because we imported
    // 'electorn' in JavaScript.
    //
    // https://github.com/electron-userland/electron-forge/issues/1071#issuecomment-517625623
    // https://www.npmjs.com/package/eslint-plugin-import#importcore-modules
    'import/core-modules': ['electron'],
  },
  rules: {
    'no-console': 'off',

    // https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/style.js
    'no-restricted-syntax': [
      'error',
      'ForInStatement',
      // Allow for..of statements
      // 'ForOfStatement',
      'LabeledStatement',
      'WithStatement',
    ],
  },
};
