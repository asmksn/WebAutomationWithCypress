const { getMaxListeners } = require("process")
const { onDatePickerPage } = require("../support/page_objects/datePickerPage")
const { onFormLayoutsPage } = require("../support/page_objects/formLayoutsPage")
const { navigateTo } = require("../support/page_objects/navigationPage")
const { onSmartTablePage } = require("../support/page_objects/smartTablePage")
const { onTreeGridPage } = require("../support/page_objects/treeGridPage")
const { onHomePage, homePage } = require("../support/page_objects/homePage")
const { onCalendarPage } = require("../support/page_objects/calendarPage")

describe('Test with page objects', () =>{

    beforeEach('open application', () =>{
        cy.visit('/')
    })

    
    it ('TC1: theme selection and validation', ()=>{

        navigateTo.homePage()
        onHomePage.selectAndValidateTheme()
    })

    it ('TC2: Submit inline form in Dark theme', ()=>{

        navigateTo.formLayoutsPage()
        onFormLayoutsPage.submitInlineFormInDarkTheme('Kibria', 'asmksn@gmail.com')
    })

    it ('TC3: Sign in Using the Grid and value extract', ()=>{
        
        onFormLayoutsPage.signInUsingGrid('asmksn@gmail.com', 'asmksn#123')

    })

    it ('TC4: signing with Remember me in Horizontal form', ()=>{
        
        onFormLayoutsPage.signInWithRememberMe('tzasnim.sqa@gmail.com', 'asmksn#123')
    })
    
    it ('TC5: Date selction and validation', ()=>{        
        
        navigateTo.datePickerPage()
        onDatePickerPage.selectDatePickerDateFromToday(100)
        onDatePickerPage.selectDateRangeFromToday(2,8)
    })

    it ('TC6: Select birthday and validation', ()=>{
        
        navigateTo.CalendarPage()
        onCalendarPage.selectBirthday('1995', 'Jun', '18')
    })

    it ('TC7: Submit data and validate', ()=>{
        
        navigateTo.smartTablePage()
        onSmartTablePage.updateDataAndValidate0('001', 'Amatullah', 'Azra', 'Zahrun', 'aazahrun@gmail.com', 0.5)
        onSmartTablePage.updateDataAndValidate1('002', 'Zarin', 'Tasnim', 'zinia', 'ztz@gmail.com', 28)
        onSmartTablePage.updateDataAndValidate2('003', 'Kibria', 'Shohan', 'asmksn', 'asmksn@gmail.com', 35)
        onSmartTablePage.verifyAndDeleteData0('001', 'Amatullah', 'Azra', 'Zahrun', 'aazahrun@gmail.com', 0.5)
        onSmartTablePage.verifyAndDeleteData1('002', 'Zarin', 'Tasnim', 'zinia', 'ztz@gmail.com', 28)
        onSmartTablePage.verifyAndDeleteData2('003', 'Kibria', 'Shohan', 'asmksn', 'asmksn@gmail.com', 35)
    })

    it ('TC8: Edit data and validate also filtering by age', ()=>{
        navigateTo.homePage()
        navigateTo.smartTablePage()        
        onSmartTablePage.editRow(3, '004', 'Amatullah', 'Azra', 'zahrun', 'zahrun@gmail.com', '.30');
        onSmartTablePage.editRow(4, '005', 'Zarin', 'Zinia', 'Tasnim', 'zarin.t@gmail.com', '28');
        onSmartTablePage.editRow(5, '006', 'Kibria', 'Shohan', 'asmksn', 'asmksn@gmail.com', '35');

        // Validate rows
        onSmartTablePage.validateRow(3, 'Amatullah', 'Azra', 'zahrun@gmail.com', 'zahrun', '.30');
        onSmartTablePage.validateRow(4, 'Zarin', 'Zinia', 'zarin.t@gmail.com', 'Tasnim', '28');
        onSmartTablePage.validateRow(5, 'Kibria', 'Shohan', 'asmksn@gmail.com', 'asmksn', '35');

        // Filter by age
        onSmartTablePage.filterByAge(28);
    })

    it ('TC9: Delete 3rd pages row and data validation', ()=>{

        // Delete rows
        navigateTo.homePage()
        navigateTo.smartTablePage()
        onSmartTablePage.deleteRowInThirdPage(4);
        onSmartTablePage.deleteRowInThirdPage(4); // Deleting the same row again after confirmation.

        // Validate row deletion
        onSmartTablePage.validateRowDeletedInThirdPage(4, 'Frieda', 'Cote');

    })

    it ('T10: Search by doc', ()=>{
             
        navigateTo.treeGridPage()
        onTreeGridPage.searchInTreeGrid('doc')
    })



        
    // it ('TC 1-10', ()=>{

    //     //TC1: theme selection and validation//

    //     navigateTo.homePage()
    //     onHomePage.selectAndValidateTheme()
        
    //     //TC2: Submit inline form in Dark theme//

    //     navigateTo.formLayoutsPage()
    //     onFormLayoutsPage.submitInlineFormInDarkTheme('Kibria', 'asmksn@gmail.com')


    //     //TC3: Sign in Using the Grid and value extract//
    //     onFormLayoutsPage.signInUsingGrid('asmksn@gmail.com', 'asmksn#123')

    //     //TC4: signing with Remember me in Horizontal form//
    //     onFormLayoutsPage.signInWithRememberMe('tzasnim.sqa@gmail.com', 'asmksn#123')

    //     //TC5: Date selction and validation//
    //     navigateTo.datePickerPage()
    //     onDatePickerPage.selectDatePickerDateFromToday(100)
    //     onDatePickerPage.selectDateRangeFromToday(2,8)

    //     //TC6: Select birthday and validation//4
    //     navigateTo.CalendarPage()
    //     onCalendarPage.selectBirthday('1995', 'Jun', '18')


    //     // TC7: Submit data and validate ////

    //     navigateTo.smartTablePage()
    //     onSmartTablePage.updateDataAndValidate0('001', 'Amatullah', 'Azra', 'Zahrun', 'aazahrun@gmail.com', 0.5)
    //     onSmartTablePage.updateDataAndValidate1('002', 'Zarin', 'Tasnim', 'zinia', 'ztz@gmail.com', 28)
    //     onSmartTablePage.updateDataAndValidate2('003', 'Kibria', 'Shohan', 'asmksn', 'asmksn@gmail.com', 35)
    //     onSmartTablePage.verifyAndDeleteData0('001', 'Amatullah', 'Azra', 'Zahrun', 'aazahrun@gmail.com', 0.5)
    //     onSmartTablePage.verifyAndDeleteData1('002', 'Zarin', 'Tasnim', 'zinia', 'ztz@gmail.com', 28)
    //     onSmartTablePage.verifyAndDeleteData2('003', 'Kibria', 'Shohan', 'asmksn', 'asmksn@gmail.com', 35)
        
    //     // TC8: Edit data and validate also filtering by age ////

    //     onSmartTablePage.editRow(3, '004', 'Amatullah', 'Azra', 'zahrun', 'zahrun@gmail.com', '.30');
    //     onSmartTablePage.editRow(4, '005', 'Zarin', 'Zinia', 'Tasnim', 'zarin.t@gmail.com', '28');
    //     onSmartTablePage.editRow(5, '006', 'Kibria', 'Shohan', 'asmksn', 'asmksn@gmail.com', '35');

    //     // Validate rows
    //     onSmartTablePage.validateRow(3, 'Amatullah', 'Azra', 'zahrun@gmail.com', 'zahrun', '.30');
    //     onSmartTablePage.validateRow(4, 'Zarin', 'Zinia', 'zarin.t@gmail.com', 'Tasnim', '28');
    //     onSmartTablePage.validateRow(5, 'Kibria', 'Shohan', 'asmksn@gmail.com', 'asmksn', '35');

    //     // Filter by age
    //     onSmartTablePage.filterByAge(28);


    //     // TC9: Delete 3rd pages row and data validation //

    //     // Delete rows
    //     navigateTo.homePage()
    //     navigateTo.smartTablePage()
    //     onSmartTablePage.deleteRowInThirdPage(4);
    //     onSmartTablePage.deleteRowInThirdPage(4); // Deleting the same row again after confirmation.

    //     // Validate row deletion
    //     onSmartTablePage.validateRowDeletedInThirdPage(4, 'Frieda', 'Cote');

    //     // T10: Search by doc ////
    //     navigateTo.treeGridPage()
    //     onTreeGridPage.searchInTreeGrid('doc')

    // })


})