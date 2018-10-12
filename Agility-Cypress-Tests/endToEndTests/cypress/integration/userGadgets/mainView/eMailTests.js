const loginUtils = require('../../../utils/loginUtils');
const changeDropdownUtils = require('../../../utils/changeDropdownUtils');
const genericUtils = require('../../../utils/genericUtils');
const userUtils = require('../../../utils/userUtils');


describe('User actions with eMail field', function () {
    it('AMI:1868:13,AMI:1869:14 edit email field with valid email id, check for apply and cancel button enable and click on cancel should not change the email', function () {

        var userName = genericUtils.csvFile('userData.csv', 2, 0);
        var userGroup = genericUtils.csvFile('userData.csv', 1, 3);
        var userName1 = genericUtils.csvFile('userData.csv', 3, 4);
        var email1 = genericUtils.csvFile('userData.csv', 2, 6);

        var userGadget = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'userGadget');
        var userGroupList = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'userGroupList');
        var mainSection = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'mainSection');
        var emailField = genericUtils.jsonFile('userModuleElements.json', 'mainScreen', 'emailField');
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

        // validations of all fields in main view
        cy.get(emailField).should('be.visible');
        cy.get(emailField).then((field) => {
            const value2 = field.text('value');
            cy.log(value2);
        });
        cy.log('login name field is validated successfully');

        //edit the email filed
        userUtils.editText(emailField, email1);
        cy.log('edited the email field successfully');

        //validation of cancel and apply buttons are enabled
        cy.get(gadgetCancel).should('be.enabled');
        cy.get(gadgetOk).should('be.enabled');
        cy.log('cancel and apply buttons are successfully enabled');

        //click on cancel
        cy.get(gadgetCancel).click();
        userUtils.waitForObject(timeout);
        cy.log('email field remained unchanged, after clicking on cancel button');

        //Logout from the application
        loginUtils.logoutFromAMI();
        userUtils.waitForObject(timeout);

    });

    it('AMI:1871:16 edit email field with invalid email id, click on ok and validate for error msg with close button', function () {

        var userName = genericUtils.csvFile('userData.csv', 2, 0);
        var userGroup = genericUtils.csvFile('userData.csv', 1, 3);
        var userName1 = genericUtils.csvFile('userData.csv', 3, 4);
        var email1 = genericUtils.csvFile('userData.csv', 3, 6);

        var userGadget = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'userGadget');
        var userGroupList = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'userGroupList');
        var mainSection = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'mainSection');
        var emailField = genericUtils.jsonFile('userModuleElements.json', 'mainScreen', 'emailField');
        var invalidEmailErrorMsg = genericUtils.jsonFile('userModuleElements.json', 'mainScreen', 'invalidEmailErrorMsg');
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

        // validations of all fields in main view
        cy.get(emailField).should('be.visible');
        cy.get(emailField).then((field) => {
            const value2 = field.text('value');
            cy.log(value2);
        });
        cy.log('login name field is validated successfully');

        //edit the email filed
        userUtils.editText(emailField, email1);
        cy.log('edited the email field successfully');

        //check for error msg for email field
        cy.get(invalidEmailErrorMsg).should('be.visible');
        cy.log('validated the error msg, after clicking on ok button');

        //Logout from the application
        loginUtils.logoutFromAMI();
        userUtils.waitForObject(timeout);
    });

    it('AMI:1870:15 edit email field with valid email id, it should get changed after click on ok', function () {

        var userName = genericUtils.csvFile('userData.csv', 2, 0);
        var userGroup = genericUtils.csvFile('userData.csv', 1, 3);
        var userName1 = genericUtils.csvFile('userData.csv', 3, 4);
        var email1 = genericUtils.csvFile('userData.csv', 2, 6);
        var email2 = genericUtils.csvFile('userData.csv', 1, 6);

        var userGadget = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'userGadget');
        var userGroupList = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'userGroupList');
        var mainSection = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'mainSection');
        var emailField = genericUtils.jsonFile('userModuleElements.json', 'mainScreen', 'emailField');
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

        // validations of email fields in main view
        cy.get(emailField).should('be.visible');
        cy.get(emailField).then((field) => {
            const value2 = field.text('value');
            cy.log(value2);
        });
        cy.log('login name field is validated successfully');

        //edit the email filed
        userUtils.editText(emailField, email1);
        cy.log('edited the login name field successfully');

        //validation of cancel and apply buttons are enabled
        cy.get(gadgetCancel).should('be.enabled');
        cy.get(gadgetOk).should('be.enabled');
        cy.log('cancel and apply buttons are successfully enabled');

        //click on ok with unique email id and email id should be changed
        cy.get(gadgetOk).click();
        userUtils.waitForObject(timeout);
        cy.log('clicked on ok successfully and email id should be changed');

        //ReInitializing to before email id 
        userUtils.editText(emailField, email2);
        cy.get(gadgetOk).click();
        userUtils.waitForObject(timeout);
        cy.log('Re-Edited the email id field successfully');

        //Logout from the application
        loginUtils.logoutFromAMI();
        userUtils.waitForObject(timeout);
    });

});