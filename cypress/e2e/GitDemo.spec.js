/// <reference types="cypress" />

const { getLocaleDateFormat } = require("@angular/common")

describe('LocalHost4200_TC', () => {
    it('TC1: Theme selection and validation', () =>{
        // cy.visit('/')
        // cy.get('[type="button"]').click()
        // cy.get('[ng-reflect-value="dark"]').click()
        // cy.get('[type="button"]').click()
        // cy.get('[ng-reflect-value="cosmic"]').click()
        // cy.get('[type="button"]').click()
        // cy.get('[ng-reflect-value="corporate"]').click()
        // cy.get('[type="button"]').click()
        // cy.get('[ng-reflect-value="default"]').click()
        cy.visit('/')
        cy.get('nav nb-select').then(dropDown => {
            cy.wrap(dropDown).click()
            cy.get ('#cdk-overlay-0 nb-option').each( (listItem, index) => {
                const itemText = listItem.text().trim()
                cy.wrap(listItem).click()
                cy.wrap(dropDown).should('contain', itemText)
                if (index <3){
                    cy.wrap(dropDown).click()
                }                
            })
        })        
    })

    it('TC2: Submit inline form in Dark theme', () =>{
        cy.visit('/')
        cy.get('[type="button"]').click()
        cy.get('[ng-reflect-value="dark"]').click()

        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()
        cy.get ('.inline-form-card [placeholder="Jane Doe"]').clear().type('Kibria')
        cy.get ('.inline-form-card [placeholder="Email"]').clear().type('asmksn@gmail.com')
        cy.get ('.inline-form-card [class="custom-checkbox"]').click()

        ////cypress alias
        // cy.contains('.inline-form-card', 'Inline form').as ('inLineFormValidation')
        // cy.get('@inLineFormValidation').find('[placeholder="Jane Doe"]').should('contain', 'Kibria Shohan')
        // cy.get('@inLineFormValidation').find('[for="inputPassword2"]').should('contain', 'Password')

        ////cypress then() method
        // cy.contains('.inline-form-card', 'Inline form').then (inLineFormValidation => {
        //     cy.wrap(inLineFormValidation).find('[placeholder="Jane Doe"]').should('contain', 'Kibria')
        //     cy.wrap(inLineFormValidation).find('[placeholder="Email"]').should('contain', 'asmksn@gmail.com')
        // })

        cy.get ('.inline-form-card [type="submit"]').click()
        cy.get('[type="button"]').should('contain', 'Light')

    })
    it('TC3: Sign in Using the Grid and value extract',() =>{
        cy.visit('/')
        cy.get('[type="button"]').click()
        cy.get('[ng-reflect-value="cosmic"]').click()

        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.contains('nb-card','Using the Grid').then(fillTheForm =>{
            cy.wrap(fillTheForm).find('[data-cy="imputEmail1"]').type('asmksn@gmail.com')
            cy.wrap(fillTheForm).find('[id="inputPassword2"]').type('asmksn@123')
            cy.wrap(fillTheForm).find('[type="radio"]').eq(1).check({force: true})

            cy.wrap(fillTheForm).get('[data-cy="imputEmail1"]').invoke('prop', 'value').should('contain','asmksn@gmail.com')
            cy.wrap(fillTheForm).get('[id="inputPassword2"]').invoke('prop', 'value').should('contain','asmksn@123')
          
            cy.wrap(fillTheForm).find('[type="submit"]').click()              
        })
        cy.get('[type="button"]').should('contain', 'Light')
        
    })

    it('TC4: signing with Remember me in Horizontal form',() =>{

        cy.visit('/')
        
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.contains('nb-card','Horizontal form').then(horizontalFormFillup =>{
            cy.wrap(horizontalFormFillup).find('#inputEmail3').type('asmksn.sqa@gmail.com')
            cy.wrap(horizontalFormFillup).find('#inputPassword3').type('asmksn@123')
            cy.wrap(horizontalFormFillup).find('.custom-checkbox').click()

            cy.wrap(horizontalFormFillup).find('#inputEmail3').invoke('prop', 'value').should('contain','asmksn.sqa@gmail.com')
            cy.wrap(horizontalFormFillup).find('#inputPassword3').invoke('prop', 'value').should('contain','asmksn@123')

            cy.wrap(horizontalFormFillup).contains('Sign in').click()           
        })
        
    })

    it('TC5: Date selction and validation',() =>{

        function selectDayFromCurrent(day){
            let date =new Date()
            date.setDate (date.getDate()+day)
            let futueDay=date.getDate()
            let futureMonth =date.toLocaleDateString('en-US', {month:'short'})
            let futureYear= date.getFullYear()
            let dateToAssert= `${futureMonth} ${futueDay}, ${futureYear}`

            cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then (dateAttribute =>{
                if (!dateAttribute.includes(futureMonth) || !dateAttribute.includes(futureYear)){
                    cy.get('[data-name="chevron-right"]').click()
                    selectDayFromCurrent(day)
                } else{
                    cy.get('.day-cell').not('.bounding-month').contains(futueDay).click()
                }                    
            })
            return dateToAssert
        }
        cy.visit('/')        
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()
    
        cy.contains('nb-card','Common Datepicker').find('input').then(input =>{
            cy.wrap(input).click()
            const dateToAssert=selectDayFromCurrent(100)
            cy.wrap(input).invoke('prop', 'value').should('contain', dateToAssert)
            cy.wrap(input).should('have.value',dateToAssert)
        })              
    })

    it('TC6: Select birthday and validation',() =>{
        cy.visit('/')
        
        cy.contains('Extra Components').click()
        cy.contains('Calendar').click()
      
        const targetYear = '2024' // Changeable target year
        const targetMonth = 'Jun' // Changeable target month
        const targetDate = '18' // Changeable target date
        
        let dateToValidate = `${targetMonth} ${targetDate}, ${targetYear}`
        
        function selectYear() {
            cy.get('@firstCalendar')
            .find('nb-calendar-year-cell') 
            .then((body) => {
                // Check if the target year exists in the calendar body
                if (!body.text().includes(targetYear)) {
                // If not, click the left chevron and recursively call the function
                cy.get('button nb-icon svg [data-name="chevron-left"]')
                    .first()
                    .click()
                    .then(() => {
                    selectYear() // Recursive call to keep checking for the year
                    })
                } else {
                // If the target year is found, click on it
                cy.get('@firstCalendar')
                    .find('nb-calendar-picker')
                    .contains(targetYear)
                    .click();
        
                // Proceed to select the target month
                selectMonthAndDate()
                }
            })
        }
        
        function selectMonthAndDate() {
            // Select the target month
            cy.get('@firstCalendar')
            .find('nb-calendar-month-cell')
            .contains(targetMonth)
            .click()
        
            // Select the target date
            cy.get('@firstCalendar')
            .find('nb-calendar-day-cell').not('.bounding-month')
            .contains(targetDate)
            .click()
        }

        // Usage
        cy.get('div.calendar-container').first().as('firstCalendar') // Alias the calendar element
        cy.get('@firstCalendar')
            .find('nb-calendar-navigation')
            .click() // Open the calendar navigation if required
        
        selectYear() // Start the recursive check

        cy.get('@firstCalendar').find('[class="subtitle"]').should('contain', dateToValidate)            
            
        // cy.get('@firstCalendar').find('nb-card-body').should('not.contain','1989').find('nb-calendar-navigation').click().then( (selectDeseiredYear) =>{
        //     cy.wrap(selectDeseiredYear).get('button nb-icon svg ').find('[data-name="chevron-left"]').first().click()
        //     })              
        
    })
    


    it('TC7: Submit data and validate',() =>{

        cy.visit('/')
        
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()


        // Helper function to add data
        function addData(id, firstName, lastName, username, email, age) {
            cy.get('.nb-plus').click().get('thead tr').eq(2).then(addData => {
                cy.wrap(addData).find('[placeholder="ID"]').type(id);
                cy.wrap(addData).find('[placeholder="First Name"]').type(firstName);
                cy.wrap(addData).find('[placeholder="Last Name"]').type(lastName);
                cy.wrap(addData).find('[placeholder="Username"]').type(username);
                cy.wrap(addData).find('[placeholder="E-mail"]').type(email);
                cy.wrap(addData).find('[placeholder="Age"]').type(age);
                cy.wrap(addData).find('[class="nb-checkmark"]').click();
            });
        }

        // Helper function to verify and delete data
        function verifyAndDeleteData(index, firstName, lastName, username, email, age) {
            cy.get('tbody tr').eq(index).find('td')
                .should('contain', firstName)
                .should('contain', lastName)
                .should('contain', email)
                .should('contain', username)
                .should('contain', age)
                .find('[class="nb-trash"]').click()
                cy.on('window:confirm', (confirm) => {
                    expect(confirm).to.equal('Are you sure you want to delete?')
                });
            }

            // Add data
            addData('01', 'Amatullah', 'Azra', 'zahrun', 'zahrun@gmail.com', '.30');
            addData('02', 'Zarin', 'Zinia', 'Tasnim', 'zarin.t@gmail.com', '28');
            addData('03', 'Kibria', 'Shohan', 'asmksn', 'asmksn@gmail.com', '35');

            // Verify and delete data
            verifyAndDeleteData(2, 'Amatullah', 'Azra', 'zahrun', 'zahrun@gmail.com', '.30');
            verifyAndDeleteData(1, 'Zarin', 'Zinia', 'Tasnim', 'zarin.t@gmail.com', '28');
            verifyAndDeleteData(0, 'Kibria', 'Shohan', 'asmksn', 'asmksn@gmail.com', '35');


        // //Data1
        // cy.get('.nb-plus').click().get('thead tr ').eq(2).then(addData =>{
        //     cy.wrap(addData).find('[placeholder="ID"]').type('01')
        //     cy.wrap(addData).find('[placeholder="First Name"]').type('Amatullah')
        //     cy.wrap(addData).find('[placeholder="Last Name"]').type('Azra')
        //     cy.wrap(addData).find('[placeholder="Username"]').type('zahrun')
        //     cy.wrap(addData).find('[placeholder="E-mail"]').type('zahrun@gmail.com')
        //     cy.wrap(addData).find('[placeholder="Age"]').type('.30')
        //     cy.wrap(addData).find('[class="nb-checkmark"]').click()
        // })
        
        // //Data2
        // cy.get('.nb-plus').click().get('thead tr ').eq(2).then(addData =>{
        //     cy.wrap(addData).find('[placeholder="ID"]').type('02')
        //     cy.wrap(addData).find('[placeholder="First Name"]').type('Zarin')
        //     cy.wrap(addData).find('[placeholder="Last Name"]').type('Zinia')
        //     cy.wrap(addData).find('[placeholder="Username"]').type('Tasnim')
        //     cy.wrap(addData).find('[placeholder="E-mail"]').type('zarin.t@gmail.com')
        //     cy.wrap(addData).find('[placeholder="Age"]').type('28')
        //     cy.wrap(addData).find('[class="nb-checkmark"]').click()
        // })
        // //Data3
        // cy.get('.nb-plus').click().get('thead tr ').eq(2).then(addData =>{
        //     cy.wrap(addData).find('[placeholder="ID"]').type('03')
        //     cy.wrap(addData).find('[placeholder="First Name"]').type('Kibria')
        //     cy.wrap(addData).find('[placeholder="Last Name"]').type('Shohan')
        //     cy.wrap(addData).find('[placeholder="Username"]').type('asmksn')
        //     cy.wrap(addData).find('[placeholder="E-mail"]').type('asmksn@gmail.com')
        //     cy.wrap(addData).find('[placeholder="Age"]').type('35')
        //     cy.wrap(addData).find('[class="nb-checkmark"]').click()
        // })

        // cy.get('tbody tr').eq(2).find('td')
        //     .should('contain', 'Amatullah')
        //     .should('contain', 'Azra')
        //     .should('contain', 'zahrun@gmail.com')
        //     .should('contain', 'zahrun')
        //     .should('contain', '.30')
        //     .find('[class="nb-trash"]').click()
        
        // cy.get('tbody tr').eq(1).find('td')
        //     .should('contain', 'Zarin')
        //     .should('contain', 'Zinia')
        //     .should('contain', 'zarin.t@gmail.com')
        //     .should('contain', 'Tasnim')
        //     .should('contain', '28')
        //     .find('[class="nb-trash"]').click()

        // cy.get('tbody tr').eq(0).find('td')
        //     .should('contain', 'Kibria')
        //     .should('contain', 'Shohan')
        //     .should('contain', 'asmksn@gmail.com')
        //     .should('contain', 'asmksn')
        //     .should('contain', '35')
        //     .find('[class="nb-trash"]').click()
    })



    it.only('TC8: Edit data and validate also filtering by age', () => { 
        cy.visit('/')
    
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()
            
        
        cy.get('[class="nb-edit"]').eq(3).click()
        const editDataRow1 = (id, firstName, lastName, username, email, age)=>{
        cy.get('tr').eq(5).then(editData =>{
            cy.wrap(editData).find('td').eq(1).find('input').clear({ force: true }).type(id)
            cy.wrap(editData).find('td').eq(2).find('input').clear({ force: true }).type(firstName)
            cy.wrap(editData).find('td').eq(3).find('input').clear({ force: true }).type(lastName)
            cy.wrap(editData).find('td').eq(4).find('input').clear({ force: true }).type(username)
            cy.wrap(editData).find('td').eq(5).find('input').clear({ force: true }).type(email)
            cy.wrap(editData).find('td').eq(6).find('input').clear({ force: true }).type(age)
            })
            cy.get('[class="nb-checkmark"').click()
        }
        editDataRow1('004', 'Amatullah', 'Azra', 'zahrun', 'zahrun@gmail.com', '.30')

        cy.get('[class="nb-edit"]').eq(4).click()
        const editDataRow2 = (id, firstName, lastName, username, email, age)=>{
        cy.get('tr').eq(6).then(editData =>{
            cy.wrap(editData).find('td').eq(1).find('input').clear({ force: true }).type(id)
            cy.wrap(editData).find('td').eq(2).find('input').clear({ force: true }).type(firstName)
            cy.wrap(editData).find('td').eq(3).find('input').clear({ force: true }).type(lastName)
            cy.wrap(editData).find('td').eq(4).find('input').clear({ force: true }).type(username)
            cy.wrap(editData).find('td').eq(5).find('input').clear({ force: true }).type(email)
            cy.wrap(editData).find('td').eq(6).find('input').clear({ force: true }).type(age)
            })
            cy.get('[class="nb-checkmark"').click()
        }
        editDataRow2('005', 'Zarin', 'Zinia', 'Tasnim', 'zarin.t@gmail.com', '28')


        cy.get('[class="nb-edit"]').eq(5).click()
        const editDataRow3 = (id, firstName, lastName, username, email, age)=>{
        cy.get('tr').eq(7).then(editData =>{
            cy.wrap(editData).find('td').eq(1).find('input').clear({ force: true }).type(id)
            cy.wrap(editData).find('td').eq(2).find('input').clear({ force: true }).type(firstName)
            cy.wrap(editData).find('td').eq(3).find('input').clear({ force: true }).type(lastName)
            cy.wrap(editData).find('td').eq(4).find('input').clear({ force: true }).type(username)
            cy.wrap(editData).find('td').eq(5).find('input').clear({ force: true }).type(email)
            cy.wrap(editData).find('td').eq(6).find('input').clear({ force: true }).type(age)
            })
            cy.get('[class="nb-checkmark"').click()
        }
        editDataRow3('006', 'Kibria', 'Shohan', 'asmksn', 'asmksn@gmail.com', '35')

        const validateEditedRow = (index, firstName, lastName, email, username, age) => {
            cy.get('tbody tr').eq(index).find('td')
                //.should('contain', id)
                .should('contain', firstName)
                .should('contain', lastName)
                .should('contain', email)
                .should('contain', username)
                .should('contain', age)
        }
    
        // Validate Data 
        validateEditedRow(3, 'Amatullah', 'Azra', 'zahrun@gmail.com', 'zahrun', '.30')
        validateEditedRow(4, 'Zarin', 'Zinia', 'zarin.t@gmail.com', 'Tasnim', '28')
        validateEditedRow(5, 'Kibria', 'Shohan', 'asmksn@gmail.com', 'asmksn', '35')
        

        ////Filtering by agelet
        let age=28
        cy.get('thead [placeholder="Age"]').type(age)
        cy.wait(500)
        cy.get('tbody td').eq(6).should('contain', age)
        
    
    })

    it('TC9: Delete 3rd pages row and data validation', () => {
        cy.visit('/')
    
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()

        cy.get('nav').contains('Last').click()
        cy.get('nav').contains('3').click()
        cy.get('tr').eq(4).find('[class="nb-trash"]').click()
        cy.on('window:confirm', (confirm) => {
            expect(confirm).to.equal('Are you sure you want to delete?')
        })
        cy.get('tr').eq(4).find('[class="nb-trash"]').click()
        cy.on('window:confirm', (confirm) => {
            expect(confirm).to.equal('Are you sure you want to delete?')
        })

        cy.get('nav').contains('First').click()
        cy.get('nav').contains('3').click()

        cy.get('tbody').should('not.contain', 'Frieda') .and('not.contain', 'Cote')
    
        
    })
    it('T10: Search by doc', () => { 
        cy.visit('/')
    
        cy.contains('Tables & Data').click()
        cy.contains('Tree Grid').click()
    
        cy.get('[id="search"]').type('doc')
        cy.get('tr, [class="nb-tree-grid-header-cell]').contains('size').click()
    }) 
    
    

    
    

})

