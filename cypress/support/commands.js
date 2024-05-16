// Custom Cypress command to read text from a file
Cypress.Commands.add('readTextFromFile', (filePath) => {
  return cy.task('readTextFromFile', filePath)
})
