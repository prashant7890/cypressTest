import { clickOnDropdownAndSelectValue, uploadFile, verifyVisible, clickEvent, newWindowHandles, typeEvent, verifyAlertTextAndAccept, verifyToNotExist } from "../utilities/generalFunctions.js";
import homePage from "../pageObjects/homePge.json";
import dropDownTestData from "../fixtures/dropDownTestData.json";
import socialMediaData from "../fixtures/socialMediaLinks.json";
import commonTestData from "../fixtures/commonTestData.json"

describe("Easy generator test ", () => {
  let alertFileText;

  before(() => {
    cy.readTextFromFile(commonTestData.alertTextFilePath).then((text) => {
      alertFileText = text;
    });
  });

  beforeEach(() => {
    cy.visit("task.html");
  })

  it(
    "Test 1 : Validate dropdown on the home page for all the options",
    { tags: ["@regression"], },
    () => {
      dropDownTestData.dropDownValues.forEach((eachOption) => {
        clickOnDropdownAndSelectValue(homePage.dropDown, eachOption.option);
        cy.get(homePage.dropDown).find(':selected').should('have.text', eachOption.option);
      });
    },
  );

  it(
    "Test 2 : Validate image upload functionality on home page",
    { tags: ["@regression"], },
    () => {
      uploadFile(commonTestData.logoImageFilePath);
      verifyVisible({ element: homePage.uploadedImage });
    },
  );

  it(
    "Test 3 : Validate new tab functionality on home page",
    { tags: ["@regression"], },
    () => {
      newWindowHandles({href: 'https://www.easygenerator.com/en/', button: homePage.openTabButton});
    },
  );

  it(
    "Test 4 : Validate alert and confirm on home page",
    { tags: ["@regression"], },
    () => {
      typeEvent({ element: homePage.alertNameTextBox, text: alertFileText });
      clickEvent(homePage.alertButton);
      const alertMessage = "Hello " +alertFileText+","+" share this practice page and share your knowledge";
      cy.on('window:alert', (alertText) => {
        expect(alertText).to.equal(alertMessage);
      });

      typeEvent({ element: homePage.alertNameTextBox, text: alertFileText });
      clickEvent(homePage.confirmButton);
      const confirmMessage = "Hello " +alertFileText+","+" Are you sure you want to confirm?";
      cy.on('window:confirm', (confirmText) => {
        expect(confirmText).to.equal(confirmMessage);
      });

    },
  );

  it(
    "Test 5 : Validate hide functionality on home page",
    { tags: ["@regression"], },
    () => {

      verifyVisible({ element: homePage.hideShowExample });
      clickEvent(homePage.hideButton);
      cy.get(homePage.hideShowExample).should('have.css', 'display', 'none');
      clickEvent(homePage.showButton);
      verifyVisible({ element: homePage.hideShowExample });
    },
  );

  it(
    "Test 6 : Validate Hover functionality on home page",
    { tags: ["@regression"], },
    () => {
      cy.get(homePage.hoverContent).should('not.be.visible');
      cy.get(homePage.hoverButton).trigger('mouseover');
      cy.get(homePage.hoverContent).should('be.visible');
      cy.get(homePage.hoverContentTop).click();

      // Assert that the URL has changed to the top of the page
      cy.url().should('include', '#top');

      // Click on the "Reload" option
      cy.get(homePage.hoverContentReload).click();
      cy.get(homePage.hoverContent).should('not.be.visible');

    },
  );

  it(
    "Test 7 : Validate iframe and other elements on page",
    { tags: ["@regression"], },
    () => {
      verifyVisible({ element: homePage.iframeId });
      cy.get('header').find('a').should('have.attr', 'href', 'https://easygenerator.com/');
      cy.get('header').find('div > a').should('have.attr', 'href', 'https://easygenerator.com/');

    },
  );

  it(
    "Test 8 : Validate social media links on page",
    { tags: ["@regression"], },
    () => {

      socialMediaData.socialMediaLinks.forEach((eachOption) => {
        cy.get(homePage.socialMediaFooter).contains(eachOption.socialMedia).
          should('have.attr', 'href', eachOption.link)
      },
      );

    },
  );
});