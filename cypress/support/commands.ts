/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

type TConstructorSelector = {
  topSelector: string;
  bottomSelector: string;
  toppingSelector: string;
};

declare namespace Cypress {
  interface Chainable {
    dataCy(value: string): Chainable<JQuery<HTMLElement>>;
    exist(value: string): Chainable<JQuery<HTMLElement>>;
    notExist(value: string): Chainable<JQuery<HTMLElement>>;
    addToConstructor(value: string): Chainable;
    checkConstructorIsFilled(value: TConstructorSelector): Chainable;
    checkConstructorIsEmpty(value: TConstructorSelector): Chainable;
  }
}

Cypress.Commands.add('dataCy', (value) => {
  return cy.get(`[data-Cy=${value}]`);
});

Cypress.Commands.add('exist', (value) => {
  cy.get(`[data-Cy=${value}]`).should('exist');
});

Cypress.Commands.add('notExist', (value) => {
  cy.get(`[data-Cy=${value}]`).should('not.exist');
});

Cypress.Commands.add('addToConstructor', (value) => {
  cy.get(`[data-Cy=${value}]`).each((element) => {
    cy.wrap(element).find('button').as('addButton');
    cy.get('@addButton').click();
  });
});

Cypress.Commands.add('checkConstructorIsFilled', (value) => {
  cy.exist(value.topSelector);
  cy.exist(value.toppingSelector);
  cy.exist(value.bottomSelector);
});

Cypress.Commands.add('checkConstructorIsEmpty', (value) => {
  cy.notExist(value.topSelector);
  cy.notExist(value.toppingSelector);
  cy.notExist(value.bottomSelector);
});
