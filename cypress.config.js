const { defineConfig } = require("cypress");

const fs = require('fs');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        readTextFromFile(filePath) {
          return new Promise((resolve, reject) => {
            fs.readFile(filePath, 'utf8', (err, data) => {
              if (err) {
                reject(err);
              } else {
                resolve(data);
              }
            });
          });
        }
      });
    },
  },
});
