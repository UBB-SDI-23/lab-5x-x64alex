describe('Payroll tests', () => {
  beforeEach(() => {
    cy.viewport(1722, 824)
    cy.visit('https://main--payrollapp1.netlify.app/')
  })

  it('Login', () => {
    cy.window().then((win) => {
      cy.stub(win, 'alert').as('windowAlert');
    });

    cy.contains('Login').click()
    cy.url().should('include', '/login')
    cy.get('input#username').type('your_username');
    cy.get('input#password').type('1');
    cy.get('#submitButton').click()
    cy.get('@windowAlert').should('be.calledWith', 'Error');

    cy.get('input#username').clear().type("admin")
    cy.get('input#password').clear().type("12345678")
    cy.get('#submitButton').click()
    cy.get('@windowAlert').should('be.calledWith', 'Useradmin signed in');

    cy.contains('Logout').click()
    cy.contains('Logout').should('not.exist')
    cy.contains('Login').should('exist')
  })

  // it('Does not do much!', () => {
  //   expect(true).to.equal(false)
  // })
})