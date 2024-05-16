module.exports = {
    extends: [
      'plugin:cypress/recommended',
    ],
    plugins: ['prettier'],
    rules: {
      'prettier/prettier': 'error',
    },
  };
  