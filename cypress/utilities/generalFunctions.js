
const clickElementXpath = ({ element }) => {
  cy.xpath(element).click({ force: true });
};


const newWindowHandles = ({ href: hrefLink, button: elementToBeClicked }) => {
  cy.window().then((win) => {
    cy.stub(win, "open", () => {
      win.location.href = hrefLink;
    }).as("popup");
    cy.get(elementToBeClicked).click({ force: true });
    cy.wait(5000);
    cy.get("@popup").should("be.called");
  });
};

const clickEvent = (element) => {
  cy.get(element).click({ force: true });
};

const typeEvent = ({ element, text:dataText }) => {
  cy.get(element).type(dataText);
};

const hyperLinkClick = ({ linkText: text, locator: locatorField }) => {
  cy.get(locatorField).contains(text).click({ force: true });
};

const clickVisibleElement = ({ locator: locatorField }) => {
  cy.get(locatorField).filter(":visible").click({ force: true });
};

const clickFirstElementIn = ({ locator: locatorField, element: elValue }) => {
  cy.get(locatorField).parent().find(elValue).first().click({ force: true });
};

const clickLastElementIn = ({ locator: locatorField }) => {
  cy.get(locatorField).last().click({ force: true });
};

const verifyAttrText = ({
  locator: locatorField,
  attribute: getAttr,
  verifyText: text,
}) => {
  cy.get(locatorField).invoke("attr", getAttr).should("contain", text);
  applyHardWait(1000);
};

const verifyAttrTextWithXpath = ({
  locator: locatorField,
  attribute: getAttr,
  verifyText: text,
}) => {
  cy.xpath(locatorField).invoke("attr", getAttr).should("contain", text);
  applyHardWait(1000);
};

const verifyHaveText = ({ element, verifyText }) => {
  cy.get(element).should("have.text", verifyText);
};

const typeAndEnter = ({ element, typeText }) => {
  cy.get(element).clear().type(typeText).wait(3000).type("{enter}");
};

const uploadFile = (filePath) => {
  cy.get('input[type=file]').selectFile(filePath);
};

const typeAndEnterWithXpath = ({ element, typeText }) => {
  cy.xpath(element).type(typeText).wait(3000).type("{enter}");
};

const clickOnDropdownAndSelectValue = (dropdownLoactor, Value) => {
  cy.get(dropdownLoactor).select(Value);
};

const verifyToExist = ({ element: locator }) => {
  cy.get(locator).should("exist");
};

const verifyToNotExist = ({ element: locator }) => {
  cy.get(locator).should("not.exist");
};

const verifyVisible = ({ element: locator }) => {
  cy.get(locator).should("be.visible");
};

const refreshPage = () => {
  cy.wait(2000).reload();
};

const verifyContent = ({ locator, verifyText }) => {
  cy.get(locator).should("have.text", verifyText);
};

const clearAndType = ({ element, typeText }) => {
  cy.get(element).clear().type(typeText);
};

const clearEvent = ({ element }) => {
  cy.get(element).clear();
};

const clearEventWithXpath = ({ element }) => {
  cy.xpath(element).clear();
};


const verifyAlertTextAndAccept = ({ alertText: text }) => {
  cy.on("window:confirm", (txt) => {
    expect(txt).to.contains(text);
  });
};

const verifyToDisabled = ({ element: locator }) => {
  cy.get(locator).should("be.disabled");
};

export {
  clearEvent,
  clearEventWithXpath,
  clearAndType,
  clickElementXpath,
  newWindowHandles,
  clickEvent,
  typeEvent,
  hyperLinkClick,
  verifyHaveText,
  typeAndEnter,
  clickOnDropdownAndSelectValue,
  refreshPage,
  verifyContent,
  typeAndEnterWithXpath,
  verifyToExist,
  clickVisibleElement,
  verifyAttrText,
  verifyToNotExist,
  verifyVisible,
  clickFirstElementIn,
  clickLastElementIn,
  verifyAlertTextAndAccept,
  verifyToDisabled,
  verifyAttrTextWithXpath,
  uploadFile,
};
