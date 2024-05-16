// Importing utility functions and test data
import {
  clickOnDropdownAndSelectValue,
  uploadFile,
  verifyVisible,
  clickEvent,
  newWindowHandles,
  typeEvent
} from "../utilities/generalFunctions.js";
import homePage from "../pageObjects/homePge.json";
import dropDownTestData from "../fixtures/dropDownTestData.json";
import socialMediaData from "../fixtures/socialMediaLinks.json";
import commonTestData from "../fixtures/commonTestData.json";

describe("Easy generator test ", () => {
  let alertFileText;

  // Before running tests, read alert text from file
  before(() => {
    cy.readTextFromFile(commonTestData.alertTextFilePath).then((text) => {
      alertFileText = text;
    });
  });

  // Before each test, visit the task.html page
  beforeEach(() => {
    cy.visit("task.html");
  })

  // Test 1: Validate dropdown options on the home page
  it(
    "Test 1 : Validate dropdown on the home page for all the options",
    { tags: ["@regression"], },
    () => {
      dropDownTestData.dropDownValues.forEach((eachOption) => {
        // Click on dropdown and select each option, then verify the selected option
        clickOnDropdownAndSelectValue(homePage.dropDown, eachOption.option);
        cy.get(homePage.dropDown).find(':selected').should('have.text', eachOption.option);
      });
    },
  );

  // Test 2: Validate image upload functionality on home page
  it(
    "Test 2 : Validate image upload functionality on home page",
    { tags: ["@regression"], },
    () => {
      // Upload image file and verify if it's visible
      uploadFile(commonTestData.logoImageFilePath);
      verifyVisible({ element: homePage.uploadedImage });
    },
  );

  // Test 3: Validate new tab functionality on home page
  it(
    "Test 3 : Validate new tab functionality on home page",
    { tags: ["@regression"], },
    () => {
      // Open link in a new tab and handle new window
      newWindowHandles({href: commonTestData.newTabLink, button: homePage.openTabButton});
    },
  );

  // Test 4: Validate alert and confirm dialogs on home page
  it(
    "Test 4 : Validate alert and confirm dialogs on home page",
    { tags: ["@regression"], },
    () => {
      // Type text in alert input box, click on alert button, and validate the alert message
      typeEvent({ element: homePage.alertNameTextBox, text: alertFileText });
      clickEvent(homePage.alertButton);
      const alertMessage = "Hello " +alertFileText+","+" share this practice page and share your knowledge";
      cy.on('window:alert', (alertText) => {
        expect(alertText).to.equal(alertMessage);
      });

      // Type text in confirm input box, click on confirm button, and validate the confirm message
      typeEvent({ element: homePage.alertNameTextBox, text: alertFileText });
      clickEvent(homePage.confirmButton);
      const confirmMessage = "Hello " +alertFileText+","+" Are you sure you want to confirm?";
      cy.on('window:confirm', (confirmText) => {
        expect(confirmText).to.equal(confirmMessage);
      });

    },
  );

  // Test 5: Validate hide/show functionality on home page
  it(
    "Test 5 : Validate hide/show functionality on home page",
    { tags: ["@regression"], },
    () => {

      // Verify if the element is initially visible, then hide it and verify it's hidden
      verifyVisible({ element: homePage.hideShowExample });
      clickEvent(homePage.hideButton);
      cy.get(homePage.hideShowExample).should('have.css', 'display', 'none');

      // Show the hidden element and verify if it's visible again
      clickEvent(homePage.showButton);
      verifyVisible({ element: homePage.hideShowExample });
    },
  );

  // Test 6: Validate hover functionality on home page
  it(
    "Test 6 : Validate hover functionality on home page",
    { tags: ["@regression"], },
    () => {
      // Verify if the hover content is initially not visible, then hover over the button to make it visible
      cy.get(homePage.hoverContent).should('not.be.visible');
      cy.get(homePage.hoverButton).trigger('mouseover');
      cy.get(homePage.hoverContent).should('be.visible');

      // Click on an element within the hover content and assert URL change
      cy.get(homePage.hoverContentTop).click();
      cy.url().should('include', '#top');

      // Click on "Reload" option in the hover content and verify it's not visible anymore
      cy.get(homePage.hoverContentReload).click();
      cy.get(homePage.hoverContent).should('not.be.visible');

    },
  );

  // Test 7: Validate iframe and other elements on the home page
  it(
    "Test 7 : Validate iframe and other elements on the home page",
    { tags: ["@regression"], },
    () => {
      // Verify if iframe is visible and check if header contains links with specified href attributes
      verifyVisible({ element: homePage.iframeId });
      cy.get('header').find('a').should('have.attr', 'href', commonTestData.websiteLink);
      cy.get('header').find('div > a').should('have.attr', 'href', commonTestData.websiteLink);

    },
  );

  // Test 8: Validate social media links on the home page
  it(
    "Test 8 : Validate social media links on the home page",
    { tags: ["@regression"], },
    () => {
      // Loop through social media links, find them on the page, and validate their href attributes
      socialMediaData.socialMediaLinks.forEach((eachOption) => {
        cy.get(homePage.socialMediaFooter).contains(eachOption.socialMedia).
          should('have.attr', 'href', eachOption.link)
      },
      );

    },
  );
});
