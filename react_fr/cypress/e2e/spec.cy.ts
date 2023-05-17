describe('Payroll tests', () => {
  beforeEach(() => {
    cy.viewport(1722, 824)
    cy.visit('https://main--payrollapp1.netlify.app/')
    cy.window().then((win) => {
      cy.stub(win, 'alert').as('windowAlert');
    });
  })

  it('Login', () => {
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


  it('show problems filter', () => {
    cy.contains('Products').click()

    cy.get('input#filterQuantity').clear().type(75869675486)

    cy.get('input[class=input]').type(1)
    cy.get('tr').should('have.length', 3)


    cy.get('input[class=input]').type("{backspace} {rightArrow} 2")
    cy.get('tr').should('have.length', 2)

    cy.get('input[class=input]').type("{backspace} {rightArrow} 3")
    cy.get('tr').should('have.length', 1)
    cy.contains("No data to show.").should('exist')
})

  // it('Does not do much!', () => {
  //   expect(true).to.equal(false)
  // })
})