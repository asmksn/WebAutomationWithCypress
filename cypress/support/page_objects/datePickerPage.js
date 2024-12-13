
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

export class DatePickerPage{
    selectDatePickerDateFromToday(dayfromToday){             
        cy.contains('nb-card','Common Datepicker').find('input').then(input =>{
            cy.wrap(input).click()
            const dateToAssert=selectDayFromCurrent(dayfromToday)
            cy.wrap(input).invoke('prop', 'value').should('contain', dateToAssert)
            cy.wrap(input).should('have.value',dateToAssert)
        })   
    }
    selectDateRangeFromToday(firstDate, secondDate){
        cy.contains('nb-card','Datepicker With Range').find('input').then(input =>{
            cy.wrap(input).click()
            const dateToAssertFirst=selectDayFromCurrent(firstDate)
            const dateToAssertSecond=selectDayFromCurrent(secondDate)
            const finalDate = dateToAssertFirst +' - '+ dateToAssertSecond
            cy.wrap(input).invoke('prop', 'value').should('contain', finalDate)
            cy.wrap(input).should('have.value',finalDate)
        }) 
    }
    
}
export const onDatePickerPage= new DatePickerPage()

