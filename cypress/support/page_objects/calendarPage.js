
export class CalendarPage {

    selectBirthday(targetYear, targetMonth, targetDate) {
        
        const dateToValidate = `${targetMonth} ${targetDate}, ${targetYear}`;

        const selectYear = () => {
            cy.get('@firstCalendar')
                .find('nb-calendar-year-cell')
                .then(body => {
                    if (!body.text().includes(targetYear)) {
                        cy.get('button nb-icon svg [data-name="chevron-left"]')
                            .first()
                            .click()
                            .then(() => {
                                selectYear();
                            });
                    } else {
                        cy.get('@firstCalendar')
                            .find('nb-calendar-picker')
                            .contains(targetYear)
                            .click();

                        selectMonthAndDate();
                    }
                });
        };

        const selectMonthAndDate = () => {
            cy.get('@firstCalendar')
                .find('nb-calendar-month-cell')
                .contains(targetMonth)
                .click();

            cy.get('@firstCalendar')
                .find('nb-calendar-day-cell').not('.bounding-month')
                .contains(targetDate)
                .click();
        };

        cy.get('div.calendar-container').first().as('firstCalendar');
        cy.get('@firstCalendar')
            .find('nb-calendar-navigation')
            .click();

        selectYear();

        cy.get('@firstCalendar').find('[class="subtitle"]').should('contain', dateToValidate);
    }    
    

}

export const onCalendarPage= new CalendarPage()