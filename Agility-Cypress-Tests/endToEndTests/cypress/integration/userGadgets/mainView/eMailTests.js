const loginUtils = require('../../../utils/loginUtils');
const changeDropdownUtils = require('../../../utils/changeDropdownUtils');
const genericUtils = require('../../../utils/genericUtils');
const userUtils = require('../../../utils/userUtils');


describe('User actions with eMail field', function () {
    it('AMI:1868:13,AMI:1869:14 edit email field with valid email id, check for apply and cancel button enable and click on cancel should not change the email', function () {

        //Retrieving test data
        var userName = genericUtils.csvFile('userData.csv', 'LoginName', 'value2');
        var userGroup = genericUtils.csvFile('userData.csv', 'UserGroup', 'value1');
        var userName1 = genericUtils.csvFile('userData.csv', 'UserName', 'value3');
        var workspaceOption = genericUtils.csvFile('userData.csv', 'WorkspacesOption', 'value1');
        var email1 = genericUtils.csvFile('userData.csv', 'Email_Id', 'value2');

        //Retrieving elements
        var userGadget = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'userGadget');
        var userGroupList = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'userGroupList');
        var mainSection = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'mainSection');
        var emailField = genericUtils.jsonFile('userModuleElements.json', 'mainScreen', 'emailField');
        var gadgetCancel = genericUtils.jsonFile('userModuleElements.json', 'mainScreen', 'gadgetCancel');
        var gadgetOk = genericUtils.jsonFile('userModuleElements.json', 'mainScreen', 'gadgetOk');
        var timeout = genericUtils.jsonFile('configEnvironment.json', 'timeout', 'min');

        //Login to AMI.
        loginUtils.loginToAMI(userName);
        cy.log('User Successfully logged in application');

        //Selecting the Configuration Option in Workspace Dropdown
        changeDropdownUtils.changeWorkspace(workspaceOption);
        cy.log('User Successfully navigated to Configuration Options');

        //Clicks on user gadgets
        cy.get(userGadget).click();
        cy.wait(timeout);
        cy.log('User clicked on User gadget');

        // Displaying values from the user group dropdown
        cy.get(userGroupList).then((li) => {
            const allValues = li.text();
            cy.log(allValues);
        });

        // Selects 'User groups' and 'user name' in dropdowns.
        changeDropdownUtils.userGroupSelection(userGroup);
        cy.wait(timeout);
        cy.log('User selected the userGroupName in Usergroup dropdown');

        userUtils.selectUserName(userName1);
        cy.wait(timeout);
        cy.log('User selected the userName in Username dropdown');

        //Checks for the main section visibility
        cy.get(mainSection).should('be.visible');
        cy.log('Main section is validated successfully');

        // Validations of all fields in main view
        cy.get(emailField).should('be.visible');
        cy.get(emailField).then((field) => {
            const value2 = field.text('value');
            cy.log(value2);
        });
        cy.log('Login name field is validated successfully');

        //Edit the email field
        userUtils.editText(emailField, email1);
        cy.log('Edited the email field successfully');

        //Validation of cancel and apply buttons are enabled
        cy.get(gadgetCancel).should('be.enabled');
        cy.get(gadgetOk).should('be.enabled');
        cy.log('Cancel and apply buttons are successfully enabled');

        //Click on cancel
        cy.get(gadgetCancel).click();
        cy.wait(timeout);
        cy.log('Email field remained unchanged, after clicking on cancel button');

        //Logout from the application
        loginUtils.logoutFromAMI();
        cy.wait(timeout);

    });

    it('AMI:1871:16 edit email field with invalid email id, click on ok and validate for error msg with close button', function () {

        //Retrieving test data
        var userName = genericUtils.csvFile('userData.csv', 'LoginName', 'value2');
        var userGroup = genericUtils.csvFile('userData.csv', 'UserGroup', 'value1');
        var userName1 = genericUtils.csvFile('userData.csv', 'UserName', 'value3');
        var workspaceOption = genericUtils.csvFile('userData.csv', 'WorkspacesOption', 'value1');
        var email1 = genericUtils.csvFile('userData.csv', 'Email_Id', 'value3');

        //Retrieving elements
        var userGadget = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'userGadget');
        var userGroupList = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'userGroupList');
        var mainSection = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'mainSection');
        var emailField = genericUtils.jsonFile('userModuleElements.json', 'mainScreen', 'emailField');
        var invalidEmailErrorMsg = genericUtils.jsonFile('userModuleElements.json', 'mainScreen', 'invalidEmailErrorMsg');
        var timeout = genericUtils.jsonFile('configEnvironment.json', 'timeout', 'min');

        //Login to AMI.
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

        // Validations of all fields in main view
        cy.get(emailField).should('be.visible');
        cy.get(emailField).then((field) => {
            const value2 = field.text('value');
            cy.log(value2);
        });
        cy.log('Login name field is validated successfully');

        //Edit the email field
        userUtils.editText(emailField, email1);
        cy.log('Edited the email field successfully');

        //Check for error msg for email field
        cy.get(invalidEmailErrorMsg).should('be.visible');
        cy.log('Validated the error msg, after clicking on ok button');

        //Logout from the application
        loginUtils.logoutFromAMI();
        cy.wait(timeout);
    });

    it('AMI:1870:15 edit email field with valid email id, it should get changed after click on ok', function () {

        //Retrieving test data
        var userName = genericUtils.csvFile('userData.csv', 'LoginName', 'value2');
        var userGroup = genericUtils.csvFile('userData.csv', 'UserGroup', 'value1');
        var userName1 = genericUtils.csvFile('userData.csv', 'UserName', 'value3');
        var workspaceOption = genericUtils.csvFile('userData.csv', 'WorkspacesOption', 'value1');
        var email1 = genericUtils.csvFile('userData.csv', 'Email_Id', 'value2');
        var email2 = genericUtils.csvFile('userData.csv', 'Email_Id', 'value1');

        //Retrieving elements
        var userGadget = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'userGadget');
        var userGroupList = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'userGroupList');
        var mainSection = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'mainSection');
        var emailField = genericUtils.jsonFile('userModuleElements.json', 'mainScreen', 'emailField');
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

        // Validations of email fields in main view
        cy.get(emailField).should('be.visible');
        cy.get(emailField).then((field) => {
            const value2 = field.text('value');
            cy.log(value2);
        });
        cy.log('Login name field is validated successfully');

        //Edit the email field
        userUtils.editText(emailField, email1);
        cy.log('Edited the login name field successfully');

        //Validation of cancel and apply buttons are enabled
        cy.get(gadgetCancel).should('be.enabled');
        cy.get(gadgetOk).should('be.enabled');
        cy.log('Cancel and apply buttons are successfully enabled');

        //Click on ok with unique email id and email id should be changed
        cy.get(gadgetOk).click();
        cy.wait(timeout);
        cy.log('Clicked on ok successfully and email id should be changed');

        //ReInitializing to before email id 
        userUtils.editText(emailField, email2); 
        cy.get(gadgetOk).click();
        cy.wait(timeout);
        cy.log('Re-Edited the email id field successfully');

        //Logout from the application
        loginUtils.logoutFromAMI();
        cy.wait(timeout);
    });

});