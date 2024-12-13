/// <reference types="cypress" />

const { getLocaleDateFormat } = require("@angular/common")

describe('Automating Login and Registration Process', () => {
    
    it('TC1: registration', () =>{
        cy.visit('/')
        cy.get('Registration').click()
        cy.get('firstname').type('Test')
        cy.get('lastname').type('Talents')
        cy.get('username').type('testtalents')
        cy.get('email').type('testtalents@testtalents.com')
        cy.get('password').type('talents1')
        cy.get('re-type-password').type('talents1')
        cy.get('Sign up').click()
        
        cy.should('contains','welcome to testtalents, check your dashboard')
    })
    it('TC2: login', () =>{
        cy.visit('/')
        cy.get('username').type('testtalents')
        cy.get('password').type('talents1')
        cy.get('Login').click()
        cy.should('contains','welcome to testtalents, check your dashboard')
    })

    it('TC7 Submit data and validate', () => { 
        cy.visit('/')
    
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()
    
        // Helper function to add data
        const addDataRow = (id, firstName, lastName, username, email, age) => {
            cy.get('.nb-plus').click();
            cy.get('thead tr').eq(2).within(() => {
                cy.get('[placeholder="ID"]').type(id)
                cy.get('[placeholder="First Name"]').type(firstName)
                cy.get('[placeholder="Last Name"]').type(lastName)
                cy.get('[placeholder="Username"]').type(username)
                cy.get('[placeholder="E-mail"]').type(email)
                cy.get('[placeholder="Age"]').type(age)
                cy.get('[class="nb-checkmark"]').click()
            })
        }
    
        // Add Data
        addDataRow('01', 'Amatullah', 'Azra', 'zahrun', 'zahrun@gmail.com', '.30')
        addDataRow('02', 'Zarin', 'Zinia', 'Tasnim', 'zarin.t@gmail.com', '28')
        addDataRow('03', 'Kibria', 'Shohan', 'asmksn', 'asmksn@gmail.com', '35')
        addDataRow('04', 'Yahya', 'Shohag', 'asmys', 'asmys@gmail.com', '35')
    
        // Helper function to validate and delete a row
        const validateAndDeleteRow = (index, firstName, lastName, email, username, age) => {
            cy.get('tbody tr').eq(index).find('td')
                //.should('contain', id)
                .should('contain', firstName)
                .should('contain', lastName)
                .should('contain', email)
                .should('contain', username)
                .should('contain', age)
                .find('[class="nb-trash"]').click()
        }
    
        // Validate Data and Delete
        validateAndDeleteRow(3, 'Amatullah', 'Azra', 'zahrun@gmail.com', 'zahrun', '.30')
        validateAndDeleteRow(2, 'Zarin', 'Zinia', 'zarin.t@gmail.com', 'Tasnim', '28')
        validateAndDeleteRow(1, 'Kibria', 'Shohan', 'asmksn@gmail.com', 'asmksn', '35')
        validateAndDeleteRow(0, 'Yahya', 'Shohag', 'asmys@gmail.com', 'asmys', '35')
    })
})