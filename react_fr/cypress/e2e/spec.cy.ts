describe('Payroll tests', () => {
  beforeEach(() => {
    cy.viewport(1722, 824)
    cy.visit('https://main--payrollapp1.netlify.app/')
  })

  it('passes', () => {
    cy.get('#login').click()
  })

  it('Does not do much!', () => {
    expect(true).to.equal(false)
  })
})