
export class FormLayoutsPage {

    submitInlineFormInDarkTheme(name, email) {
        cy.get('[type="button"]').click();
        cy.get('[ng-reflect-value="dark"]').click();

        cy.contains('Forms').click()
        cy.contains('Form Layouts').click({ force: true })
        
        cy.get('.inline-form-card [placeholder="Jane Doe"]').clear().type(name);
        cy.get('.inline-form-card [placeholder="Email"]').clear().type(email);
        cy.get('.inline-form-card [class="custom-checkbox"]').click();
        cy.get('.inline-form-card [type="submit"]').click();
        cy.get('[type="button"]').should('contain', 'Light');
    }

    signInUsingGrid(email, password) {
        cy.get('[type="button"]').click();
        cy.get('[ng-reflect-value="cosmic"]').click();

        cy.contains('Forms').click();
        cy.contains('Form Layouts').click({ force: true });

        cy.contains('nb-card', 'Using the Grid').then(fillTheForm => {
            cy.wrap(fillTheForm).find('[data-cy="imputEmail1"]').type(email);
            cy.wrap(fillTheForm).find('[id="inputPassword2"]').type(password);
            cy.wrap(fillTheForm).find('[type="radio"]').eq(1).check({ force: true });

            cy.wrap(fillTheForm).get('[data-cy="imputEmail1"]').invoke('prop', 'value').should('contain', email);
            cy.wrap(fillTheForm).get('[id="inputPassword2"]').invoke('prop', 'value').should('contain', password);

            cy.wrap(fillTheForm).find('[type="submit"]').click();
        });

        cy.get('[type="button"]').should('contain', 'Light');
    }
    signInWithRememberMe(email, password) {
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click({ force: true });

        cy.contains('nb-card', 'Horizontal form').then(horizontalFormFillup => {
            cy.wrap(horizontalFormFillup).find('#inputEmail3').type(email);
            cy.wrap(horizontalFormFillup).find('#inputPassword3').type(password);
            cy.wrap(horizontalFormFillup).find('.custom-checkbox').click();

            cy.wrap(horizontalFormFillup).find('#inputEmail3').invoke('prop', 'value').should('contain', email);
            cy.wrap(horizontalFormFillup).find('#inputPassword3').invoke('prop', 'value').should('contain', password);

            cy.wrap(horizontalFormFillup).contains('Sign in').click();
        });
    }

    submitInlineFormWithNameAndEmail(name, email){
        cy.contains('nb-card','Inline form').find('form').then(form =>{
            cy.wrap(form).find('[placeholder="Jane Doe"]').clear().type(name)
            cy.wrap(form).find('[placeholder="Email"]').clear().type(email)
            cy.wrap(form).find('[type="checkbox"]').check({force:true})
           cy.wrap(form).submit()
        })
    }
    submitBasicFormWithEmailAndPassword(email,password){
        cy.contains('nb-card','Basic form').find('form').then(form =>{
            cy.wrap(form).find('[placeholder="Email"]').clear().type(email)
            cy.wrap(form).find('[placeholder="Password"]').clear().type(password)
            cy.wrap(form).find('[type="checkbox"]').check({force:true})
           cy.wrap(form).submit()
        })
    }

    
    

}

export const onFormLayoutsPage= new FormLayoutsPage()