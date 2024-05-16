// Importing the 'defineConfig' function from the 'cypress' module
const { defineConfig } = require("cypress");
// Importing the 'fs' module for file system operations
const fs = require('fs');

// Exporting a Cypress configuration object using 'defineConfig' function
module.exports = defineConfig({
  // Configuration for end-to-end tests
  e2e: {
    // Setup node events
    setupNodeEvents(on, config) {
      // Define a custom task named 'readTextFromFile'
      on('task', {
        readTextFromFile(filePath) {
          // Return a promise to asynchronously read text from the file
          return new Promise((resolve, reject) => {
            // Read the file asynchronously using 'fs.readFile'
            fs.readFile(filePath, 'utf8', (err, data) => {
              if (err) {
                // If an error occurs, reject the promise
                reject(err);
              } else {
                // If successful, resolve the promise with the file data
                resolve(data);
              }
            });
          });
        }
      });
    },
  },
});
