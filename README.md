## How To Get Started

- Download and install Node.js, if not already done. You can do it from [nodejs.org](https://nodejs.org/en/download/)
- Clone this [repo](https://github.com/prashant7890/cypressTest.git)
- Then inside your editors terminal run the command

  `npm install cypress --save-dev`

- Next, to run tests locally on Cypress runner you'll have to run this command in your terminal

  `npx cypress open`

  This will open a Cypress window where you can run tests

- To run all the tests in headless mode you'll have to run this command in your terminal

  `npx cypress run`

## Notes
- I have kept task.html & alert-text.txt file in cypress>fixtures>testFiles folder
- Using logo.jpg file to check upload functionlity
- All the tests are written in file easyGeneratorTest.cy.js

