describe('Blog app', function() {
  beforeEach(function () {
    cy.visit('http://localhost:3000')
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'mrtest',
      password: 'secret',
      name: 'Mr Test'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    
  })
    
    it('front page can be opened', function() {
      
      cy.contains('log in to application')
    })

    it('user can login', function () {
        
        cy.get('input:first')
          .type('mrtest')
        cy.get('input:last')
          .type('secret')
        cy.contains('kirjaudu')
          .click()
        cy.contains('logged in')
      })  
    })


      describe('Blog functions', function() {
        beforeEach(function () {
          cy.visit('http://localhost:3000')
          cy.request('POST', 'http://localhost:3003/api/testing/reset')
          const user = {
            username: 'mrtest',
            password: 'secret',
            name: 'Mr Test'
          }
          cy.request('POST', 'http://localhost:3003/api/users', user)
          cy.get('input:first')
          .type('mrtest')
        cy.get('input:last')
          .type('secret')
        cy.contains('kirjaudu')
          .click()
        })

      it('user can create blog', function () {
        
        cy.contains('Blogs')
        .click()
        cy.contains('create new')
        .click()
        cy.get('#title')
          .type('hello')
          cy.get('#author')
          .type('writer')
        cy.get('#url')
          .type('www')
        cy.get('#createbutton')
          .click()
        cy.contains('hello')
      }) 

      it('user can like blog', function () {
        cy.contains('Blogs')
        .click()
        cy.contains('create new')
        .click()
        cy.get('#title')
          .type('hello')
          cy.get('#author')
          .type('writer')
        cy.get('#url')
          .type('www')
        cy.get('#createbutton')
          .click()
        cy.get('#blogclick')
        .click()
        cy.get('#like')
        .click()
        cy.contains('1 likes')
      }) 
    })

    describe('User list', function() {
      beforeEach(function () {
        cy.visit('http://localhost:3000')
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
          username: 'mrtest',
          password: 'secret',
          name: 'Mr Test'
        }
        cy.request('POST', 'http://localhost:3003/api/users', user)
        cy.get('input:first')
        .type('mrtest')
      cy.get('input:last')
        .type('secret')
      cy.contains('kirjaudu')
        .click()
      })


    it('user can see users', function () {
        
      
      cy.contains('Users')
        .click()
      cy.contains('Mr Test')
    })  
  })

    