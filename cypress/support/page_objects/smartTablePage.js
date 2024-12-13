export class SmartTablePage{

    updateDataAndValidate0(id, firstName, lastName, userName, email, age){
        cy.get('.nb-plus').click().get('thead tr ').eq(2).then(addData =>{
            cy.wrap(addData).find('[placeholder="ID"]').type(id)
            cy.wrap(addData).find('[placeholder="First Name"]').type(firstName)
            cy.wrap(addData).find('[placeholder="Last Name"]').type(lastName)
            cy.wrap(addData).find('[placeholder="Username"]').type(userName)
            cy.wrap(addData).find('[placeholder="E-mail"]').type(email)
            cy.wrap(addData).find('[placeholder="Age"]').type(age)
            cy.wrap(addData).find('[class="nb-checkmark"]').click()
        })
    }
    updateDataAndValidate1(id, firstName, lastName, userName, email, age){
        cy.get('.nb-plus').click().get('thead tr ').eq(2).then(addData =>{
            cy.wrap(addData).find('[placeholder="ID"]').type(id)
            cy.wrap(addData).find('[placeholder="First Name"]').type(firstName)
            cy.wrap(addData).find('[placeholder="Last Name"]').type(lastName)
            cy.wrap(addData).find('[placeholder="Username"]').type(userName)
            cy.wrap(addData).find('[placeholder="E-mail"]').type(email)
            cy.wrap(addData).find('[placeholder="Age"]').type(age)
            cy.wrap(addData).find('[class="nb-checkmark"]').click()
        })
    }
    updateDataAndValidate2(id, firstName, lastName, userName, email, age){
        cy.get('.nb-plus').click().get('thead tr ').eq(2).then(addData =>{
            cy.wrap(addData).find('[placeholder="ID"]').type(id)
            cy.wrap(addData).find('[placeholder="First Name"]').type(firstName)
            cy.wrap(addData).find('[placeholder="Last Name"]').type(lastName)
            cy.wrap(addData).find('[placeholder="Username"]').type(userName)
            cy.wrap(addData).find('[placeholder="E-mail"]').type(email)
            cy.wrap(addData).find('[placeholder="Age"]').type(age)
            cy.wrap(addData).find('[class="nb-checkmark"]').click()
        })
    }
    verifyAndDeleteData0(index, firstName0, lastName0, username0, email0, age0) {
        cy.get('tbody tr').eq(2).find('td')
          .should('contain', firstName0)
          .should('contain', lastName0)
          .should('contain', email0)
          .should('contain', username0)
          .should('contain', age0)
          .find('[class="nb-trash"]').click();
    }
    verifyAndDeleteData1(index, firstName1, lastName1, username1, email1, age1) {
        cy.get('tbody tr').eq(1).find('td')
          .should('contain', firstName1)
          .should('contain', lastName1)
          .should('contain', email1)
          .should('contain', username1)
          .should('contain', age1)
          .find('[class="nb-trash"]').click();
    }
    verifyAndDeleteData2(index, firstName2, lastName2, username2, email2, age2) {
        cy.get('tbody tr').eq(0).find('td')
          .should('contain', firstName2)
          .should('contain', lastName2)
          .should('contain', email2)
          .should('contain', username2)
          .should('contain', age2)
          .find('[class="nb-trash"]').click();
    }


    ///// TC8 /////

    editRow(rowIndex, id, firstName, lastName, username, email, age) {
        cy.get('[class="nb-edit"]').eq(rowIndex).click();
        cy.get('tr').eq(rowIndex + 2).then(row => {
            cy.wrap(row).find('td').eq(1).find('input').clear({ force: true }).type(id);
            cy.wrap(row).find('td').eq(2).find('input').clear({ force: true }).type(firstName);
            cy.wrap(row).find('td').eq(3).find('input').clear({ force: true }).type(lastName);
            cy.wrap(row).find('td').eq(4).find('input').clear({ force: true }).type(username);
            cy.wrap(row).find('td').eq(5).find('input').clear({ force: true }).type(email);
            cy.wrap(row).find('td').eq(6).find('input').clear({ force: true }).type(age);
        });
        cy.get('[class="nb-checkmark"]').click();
    }

    validateRow(rowIndex, firstName, lastName, email, username, age) {
        cy.get('tbody tr').eq(rowIndex).find('td')
            .should('contain', firstName)
            .should('contain', lastName)
            .should('contain', email)
            .should('contain', username)
            .should('contain', age);
    }

    filterByAge(age) {
        cy.get('thead [placeholder="Age"]').type(age);
        cy.wait(500);
        cy.get('tbody td').eq(6).should('contain', age);
    }


    /// TC9 ///

    deleteRowInThirdPage(rowIndex) {
        cy.get('nav').contains('Last').click();
        cy.get('nav').contains('3').click();
        cy.get('tr').eq(rowIndex).find('[class="nb-trash"]').click();
        cy.on('window:confirm', (confirm) => {
            expect(confirm).to.equal('Are you sure you want to delete?');
        });
    }

    validateRowDeletedInThirdPage(rowIndex, firstName, lastName) {
        cy.get('nav').contains('First').click();
        cy.get('nav').contains('3').click();
        cy.get('tbody')
            .should('not.contain', firstName)
            .and('not.contain', lastName);
    }
    
    



}

export const onSmartTablePage = new SmartTablePage()