describe('Login ', function() {
    it('front page can be opened', function() {
      cy.visit('http://localhost:3000')
      cy.contains('log in to application')
    })

    it('user can login', function () {
        
        cy.get('input:first')
          .type('milla')
        cy.get('input:last')
          .type('salainen')
        cy.contains('kirjaudu')
          .click()
        cy.contains('Milla Testi logged in')
      })  
  })