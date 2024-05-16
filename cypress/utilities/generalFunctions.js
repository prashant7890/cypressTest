// Function to handle opening a new window and clicking on a specified element
const newWindowHandles = ({ href: hrefLink, button: elementToBeClicked }) => {
  cy.window().then((win) => {
    cy.stub(win, "open", () => {
      win.location.href = hrefLink;
    }).as("popup");
    cy.get(elementToBeClicked).click({ force: true });
    cy.get("@popup").should("be.called");
  });
};

// Function to simulate a click event on a specified element
const clickEvent = (element) => {
  cy.get(element).click({ force: true });
};

// Function to simulate typing into a specified element
const typeEvent = ({ element, text: dataText }) => {
  cy.get(element).type(dataText);
};

// Function to upload a file using the file input element
const uploadFile = (filePath) => {
  cy.get('input[type=file]').selectFile(filePath);
};

// Function to click on a dropdown element and select a specified value
const clickOnDropdownAndSelectValue = (dropdownLoactor, Value) => {
  cy.get(dropdownLoactor).select(Value);
};

// Function to verify that a specified element is visible
const verifyVisible = ({ element: locator }) => {
  cy.get(locator).should("be.visible");
};

// Exporting all functions for external use
export {
  newWindowHandles,
  clickEvent,
  typeEvent,
  clickOnDropdownAndSelectValue,
  verifyVisible,
  uploadFile,
};
