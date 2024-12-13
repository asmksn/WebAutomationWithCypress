export class homePage{

    selectAndValidateTheme() {
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
    }
}
export const onHomePage = new homePage()



