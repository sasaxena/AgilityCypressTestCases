const loginUtils = require('../../../utils/loginUtils');
const changeDropdownUtils = require('../../../utils/changeDropdownUtils');
const genericUtils = require('../../../utils/genericUtils');
const userUtils = require('../../../utils/userUtils');

describe('User actions with UILocale field', function () {
    it('AMI:1875:20,AMI:1876:21 Change UILocale field in dropdown, check for apply and cancel button enable and click on cancel should not change the uiLocale', function () {

        //Retrieving test data
        var userName = genericUtils.csvFile('userData.csv', 'LoginName', 'value2');
        var userGroup = genericUtils.csvFile('userData.csv', 'UserGroup', 'value1');
        var userName1 = genericUtils.csvFile('userData.csv', 'UserName', 'value3');
        var workspaceOption = genericUtils.csvFile('userData.csv', 'WorkspacesOption', 'value1');
        var uiLocale = genericUtils.csvFile('userData.csv', 'UI Locale', 'value1');
        var uiLocale2 = genericUtils.csvFile('userData.csv', 'UI Locale', 'value2');

        //Retrieving elements
        var userGadget = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'userGadget');
        var userGroupList = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'userGroupList');
        var mainSection = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'mainSection');
        var uiLocaleField = genericUtils.jsonFile('userModuleElements.json', 'mainScreen', 'uiLocaleField');
        var gadgetCancel = genericUtils.jsonFile('userModuleElements.json', 'mainScreen', 'gadgetCancel');
        var gadgetOk = genericUtils.jsonFile('userModuleElements.json', 'mainScreen', 'gadgetOk');
        var timeout = genericUtils.jsonFile('configEnvironment.json', 'timeout', 'min');

        // Login to AMI.
        loginUtils.loginToAMI(userName);

        //Selecting the Configuration Option in Workspace Dropdown
        changeDropdownUtils.changeWorkspace(workspaceOption);
        cy.log('User Successfully navigated to Configuration Options');

        // Clicks on user gadgets
        cy.get(userGadget).click();
        cy.wait(timeout);

        // Displaying values from the user group dropdown
        cy.get(userGroupList).then((li) => {
            const allValues = li.text();
            cy.log(allValues);
        });

        // Selects 'User groups' and 'user name' in dropdowns.
        changeDropdownUtils.userGroupSelection(userGroup);
        cy.wait(timeout);

        userUtils.selectUserName(userName1);
        cy.wait(timeout);

        //Checks for the main section visibility
        cy.get(mainSection).should('be.visible');
        cy.log('Main section is validated successfully');

        // Validations of uiLocaleField in main view
        cy.get(uiLocaleField).should('be.visible');
        cy.log('Role field is validated successfully');

        //Change the uiLocale field
        userUtils.selectUILocale(uiLocale);
        cy.log('Changed the role field successfully');

        //Validation of cancel and apply buttons are enabled
        cy.get(gadgetCancel).should('be.enabled');
        cy.get(gadgetOk).should('be.enabled');
        cy.log('Cancel and apply buttons are successfully enabled');

        //Click on cancel
        cy.get(gadgetCancel).click();
        cy.wait(timeout);
        cy.log('Role field remained unchanged, after clicking on cancel button');

        //Validating unchanged uiLocale
        cy.get(uiLocaleField).contains(uiLocale2).then((pw) => {
            var print = pw.text();
            cy.log(print);
        });

        //Logout from the application
        loginUtils.logoutFromAMI();
        cy.wait(timeout);
    });

    it('AMI:1877:22 Change UILocale field in dropdown, click on apply,it should change in the uiLocale', function () {
        //Retrieving test data
        var userName = genericUtils.csvFile('userData.csv', 'LoginName', 'value2');
        var userGroup = genericUtils.csvFile('userData.csv', 'UserGroup', 'value1');
        var userName1 = genericUtils.csvFile('userData.csv', 'UserName', 'value3');
        var workspaceOption = genericUtils.csvFile('userData.csv', 'WorkspacesOption', 'value1');
        var uiLocale1 = genericUtils.csvFile('userData.csv', 'UI Locale', 'value1');
        var uiLocale2 = genericUtils.csvFile('userData.csv', 'UI Locale', 'value2');

        //Retrieving elements
        var userGadget = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'userGadget');
        var userGroupList = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'userGroupList');
        var mainSection = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'mainSection');
        var uiLocaleField = genericUtils.jsonFile('userModuleElements.json', 'mainScreen', 'uiLocaleField');
        var gadgetCancel = genericUtils.jsonFile('userModuleElements.json', 'mainScreen', 'gadgetCancel');
        var gadgetOk = genericUtils.jsonFile('userModuleElements.json', 'mainScreen', 'gadgetOk');
        var timeout = genericUtils.jsonFile('configEnvironment.json', 'timeout', 'min');

        // Login to AMI.
        loginUtils.loginToAMI(userName);

        //Selecting the Configuration Option in Workspace Dropdown
        changeDropdownUtils.changeWorkspace(workspaceOption);
        cy.log('User Successfully navigated to Configuration Options');

        // Clicks on user gadgets
        cy.get(userGadget).click();
        cy.wait(timeout);

        // Displaying values from the user group dropdown
        cy.get(userGroupList).then((li) => {
            const allValues = li.text();
            cy.log(allValues);
        });

        // Selects 'User groups' and 'user name' in dropdowns.
        changeDropdownUtils.userGroupSelection(userGroup);
        cy.wait(timeout);
        userUtils.selectUserName(userName1);
        cy.wait(timeout);

        //Checks for the main section visibility
        cy.get(mainSection).should('be.visible');
        cy.log('Main section is validated successfully');

        // validations of uiLocaleField in main view
        cy.get(uiLocaleField).should('be.visible');
        cy.log('Role field is validated successfully');

        //Changed the uiLocale field
        userUtils.selectUILocale(uiLocale1);
        cy.log('Changed the role field successfully');

        //Validation of cancel and apply buttons are enabled
        cy.get(gadgetCancel).should('be.enabled');
        cy.get(gadgetOk).should('be.enabled');
        cy.log('Cancel and apply buttons are successfully enabled');

        //Click on cancel
        cy.get(gadgetOk).click();
        cy.wait(timeout);
        cy.log('Role field remained unchanged, after clicking on ok button');

        //Validating unchanged uiLocale
        cy.get(uiLocaleField).contains(uiLocale1).then((pw) => {
            var print = pw.text();
            cy.log(print);
        });

        //Re-initialise to previous uiLocale
        userUtils.selectUILocale(uiLocale2);
        cy.get(gadgetOk).click();
        cy.wait(timeout);
        cy.log('Changed the role field successfully');

        //Validated the Re-Initialised uiLocale
        cy.get(uiLocaleField).contains(uiLocale2).then((pw) => {
            var print = pw.text();
            cy.log(print);
        });

        //Logout from the application
        loginUtils.logoutFromAMI();
        cy.wait(timeout);
    });
});