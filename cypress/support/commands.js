Cypress.Commands.add('readTextFromFile', (filePath) => {
  return cy.task('readTextFromFile', filePath);
});