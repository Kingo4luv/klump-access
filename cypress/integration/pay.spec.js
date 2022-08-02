/// <reference types="cypress" />
import data from '../fixtures/data.json';
// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('home', () => {
	beforeEach(() => {
		// Cypress starts out with a blank slate for each test
		// so we must tell it to visit our website with the `cy.visit()` command.
		// Since we want to visit the same URL at the start of all our tests,
		// we include it in our beforeEach function so that it runs before each test
		cy.visit(data.base_url);
	});

	it('Should see klump image svg, h1, paragraphs, input and klump button', () => {
		// We use the `cy.get()` command to get all elements that match the selector.
		// Then, we use `should` to assert that there are two matched items,
		// which are the two default items.
		cy.get('svg').should('be.visible');
		cy.get('h1').should('be.visible').and('not.be.empty');
		cy.get('h1').should('be.visible').and('not.be.empty');
		cy.get('p').first().should('be.visible').and('not.be.empty');
		cy.get('p').first().should('be.visible').and('not.be.empty');
		cy.get('p').eq(1).should('be.visible').and('not.be.empty');
		cy.get('label').should('be.visible');
		cy.get('label').contains('Amount to be charged');
		cy.get('input').should('be.visible');
		cy.get('#pay').should('be.visible');
	});
	it('Should see klump modal when the pay with klump modal is clicked', () => {
		cy.get('input').should('be.visible');
		cy.get('#pay').should('be.visible');
		cy.get('#pay').click();
		cy.get('iframe').should('be.visible');
	});
});
