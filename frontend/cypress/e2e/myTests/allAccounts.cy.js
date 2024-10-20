/* eslint-disable jest/expect-expect */
/// <reference types="cypress" />

describe('check accounts page', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('#login').type('developer');
    cy.get('#password').type('skillbox');
    cy.get('#log').click();
  });

  it('check correct render', () => {
    cy.get('.accounts').should('exist');
    cy.get('#accounts').should('have.class', 'nav__btn--current');
  });

  it('check sorting', () => {
    cy.contains('Сортировка').click().should('have.class', 'choose-click');
    cy.get('.frame').should('exist');
    cy.get('.select-list li').should('have.length', 3);
    cy.contains('Сортировка').click().should('not.have.class', 'choose-click');
    cy.contains('Сортировка').click();
    cy.get('.select-list li:first').click();
    cy.get('.frame').should('not.exist');
    cy.get('#select-btn').should('have.text', 'По номеру');
    cy.contains('По номеру').click();
    cy.get('#select-btn').should('have.text', 'Сортировка');
    cy.get('#account').should('have.class', 'select-list__btn--click');
  });

  it('check button "create" and button "open"', () => {
    cy.contains('Создать новый счёт').click();
    cy.contains('Открыть').click();
    cy.get('.details').should('exist');
  });
});
