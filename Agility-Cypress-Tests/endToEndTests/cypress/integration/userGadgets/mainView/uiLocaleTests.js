const loginUtils = require('../../../utils/loginUtils');
const changeDropdownUtils = require('../../../utils/changeDropdownUtils');
const genericUtils = require('../../../utils/genericUtils');
const userUtils = require('../../../utils/userUtils');


describe('User actions with UILocale field', function () {
    it('AMI:1875:20,AMI:1876:21 Change UILocale field in dropdown, check for apply and cancel button enable and click on cancel should not change the uiLocale', function () {

        var userName = genericUtils.csvFile('userData.csv', 2, 0);
        var userGroup = genericUtils.csvFile('userData.csv', 1, 3);
        var userName1 = genericUtils.csvFile('userData.csv', 3, 4);
        var uiLocale = genericUtils.csvFile('userData.csv', 1, 9);
        var uiLocale2 = genericUtils.csvFile('userData.csv', 2, 9);

        var userGadget = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'userGadget');
        var userGroupList = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'userGroupList');
        var mainSection = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'mainSection');
        var uiLocaleField = genericUtils.jsonFile('userModuleElements.json', 'mainScreen', 'uiLocaleField');
        var gadgetCancel = genericUtils.jsonFile('userModuleElements.json', 'mainScreen', 'gadgetCancel');
        var gadgetOk = genericUtils.jsonFile('userModuleElements.json', 'mainScreen', 'gadgetOk');
        var timeout = genericUtils.jsonFile('configEnvironment.json', 'timeout', 'min');

        // Login to AMI.
        loginUtils.loginToAMI(userName);

        // Clicks on user gadgets
        cy.get(userGadget).click();
        userUtils.waitForObject(timeout);

        // Displaying values from the user group dropdown
        cy.get(userGroupList).then((li) => {
            const allValues = li.text();
            cy.log(allValues);
        });

        // Selects 'User groups' and 'user name' in dropdowns.
        changeDropdownUtils.userGroupSelection(userGroup);
        userUtils.waitForObject(timeout);
        userUtils.selectUserName(userName1);
        userUtils.waitForObject(timeout);

        //checks for the main section visibility
        cy.get(mainSection).should('be.visible');
        cy.log('Main section is validated successfully');

        // validations of uiLocaleField in main view
        cy.get(uiLocaleField).should('be.visible');
        cy.log('role field is validated successfully');

        //changed the uiLocale filed
        userUtils.selectUILocale(uiLocale);
        cy.log('changed the role field successfully');

        //validation of cancel and apply buttons are enabled
        cy.get(gadgetCancel).should('be.enabled');
        cy.get(gadgetOk).should('be.enabled');
        cy.log('cancel and apply buttons are successfully enabled');

        //click on cancel
        cy.get(gadgetCancel).click();
        userUtils.waitForObject(timeout);
        cy.log('role field remained unchanged, after clicking on cancel button');

        //Validating unchanged uiLocale
        cy.get(uiLocaleField).contains(uiLocale2).then((pw) => {
            var print = pw.text();
            cy.log(print);
        });

        //Logout from the application
        loginUtils.logoutFromAMI();
        userUtils.waitForObject(timeout);

    });

    it('AMI:1877:22 Change UILocale field in dropdown, click on apply,it should change in the uiLocale', function () {

        var userName = genericUtils.csvFile('userData.csv', 2, 0);
        var userGroup = genericUtils.csvFile('userData.csv', 1, 3);
        var userName1 = genericUtils.csvFile('userData.csv', 3, 4);
        var uiLocale1 = genericUtils.csvFile('userData.csv', 1, 9);
        var uiLocale2 = genericUtils.csvFile('userData.csv', 2, 9);

        var userGadget = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'userGadget');
        var userGroupList = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'userGroupList');
        var mainSection = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'mainSection');
        var uiLocaleField = genericUtils.jsonFile('userModuleElements.json', 'mainScreen', 'uiLocaleField');
        var gadgetCancel = genericUtils.jsonFile('userModuleElements.json', 'mainScreen', 'gadgetCancel');
        var gadgetOk = genericUtils.jsonFile('userModuleElements.json', 'mainScreen', 'gadgetOk');
        var timeout = genericUtils.jsonFile('configEnvironment.json', 'timeout', 'min');

        // Login to AMI.
        loginUtils.loginToAMI(userName);

        // Clicks on user gadgets
        cy.get(userGadget).click();
        userUtils.waitForObject(timeout);

        // Displaying values from the user group dropdown
        cy.get(userGroupList).then((li) => {
            const allValues = li.text();
            cy.log(allValues);
        });

        // Selects 'User groups' and 'user name' in dropdowns.
        changeDropdownUtils.userGroupSelection(userGroup);
        userUtils.waitForObject(timeout);
        userUtils.selectUserName(userName1);
        userUtils.waitForObject(timeout);

        //checks for the main section visibility
        cy.get(mainSection).should('be.visible');
        cy.log('Main section is validated successfully');

        // validations of uiLocaleField in main view
        cy.get(uiLocaleField).should('be.visible');
        cy.log('role field is validated successfully');

        //changed the uiLocale filed
        userUtils.selectUILocale(uiLocale1);
        cy.log('changed the role field successfully');

        //validation of cancel and apply buttons are enabled
        cy.get(gadgetCancel).should('be.enabled');
        cy.get(gadgetOk).should('be.enabled');
        cy.log('cancel and apply buttons are successfully enabled');

        //click on cancel
        cy.get(gadgetOk).click();
        userUtils.waitForObject(timeout);
        cy.log('role field remained unchanged, after clicking on ok button');

        //Validating unchanged uiLocale
        cy.get(uiLocaleField).contains(uiLocale1).then((pw) => {
            var print = pw.text();
            cy.log(print);
        });

        //Re-initialise to previous uiLocale
        userUtils.selectUILocale(uiLocale2);
        cy.get(gadgetOk).click();
        userUtils.waitForObject(timeout);
        cy.log('changed the role field successfully');

        //validated the Re-Initialised uiLocale
        cy.get(uiLocaleField).contains(uiLocale2).then((pw) => {
            var print = pw.text();
            cy.log(print);
        });

        //Logout from the application
        loginUtils.logoutFromAMI();
        userUtils.waitForObject(timeout);

    });
});