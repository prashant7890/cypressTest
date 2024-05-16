module.exports = {
    extends: [
      'plugin:cypress/recommended',
      // Add other configurations as needed
    ],
    plugins: ['prettier'],
    rules: {
      'prettier/prettier': 'error',
      // Add other rules as needed
    },
  };
  