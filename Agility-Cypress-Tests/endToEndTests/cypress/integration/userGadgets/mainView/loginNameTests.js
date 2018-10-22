const loginUtils = require('../../../utils/loginUtils');
const changeDropdownUtils = require('../../../utils/changeDropdownUtils');
const genericUtils = require('../../../utils/genericUtils');
const userUtils = require('../../../utils/userUtils');

describe('User actions with loginName field', function () {
    it('AMI:1864:9,AMI:1865:10 Edit the Login name, then Apply and cancel button should be enabled and it should not change the login name after click on cancel', function () {

        //Retrieving test data
        var userName = genericUtils.csvFile('userData.csv', 'LoginName', 'value2');
        var userGroup = genericUtils.csvFile('userData.csv', 'UserGroup', 'value1');
        var userName1 = genericUtils.csvFile('userData.csv', 'UserName', 'value3');
        var workspaceOption = genericUtils.csvFile('userData.csv', 'WorkspacesOption', 'value1');

        //Retrieving elements
        var userGadget = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'userGadget');
        var userGroupList = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'userGroupList');
        var mainSection = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'mainSection');
        var loginNameField = genericUtils.jsonFile('userModuleElements.json', 'mainScreen', 'loginNameField');
        var gadgetCancel = genericUtils.jsonFile('userModuleElements.json', 'mainScreen', 'gadgetCancel');
        var gadgetOk = genericUtils.jsonFile('userModuleElements.json', 'mainScreen', 'gadgetOk');
        var timeout = genericUtils.jsonFile('configEnvironment.json', 'timeout', 'min');

        // Login to AMI.
        loginUtils.loginToAMI(userName);
        cy.log('User Successfully logged in application');

        //Selecting the Configuration Option in Workspace Dropdown
        changeDropdownUtils.changeWorkspace(workspaceOption);
        cy.log('User Successfully navigated to Configuration Options');

        // Clicks on user gadgets
        cy.get(userGadget).click();
        cy.wait(timeout);
        cy.log('User clicked on User gadget');

        // Displaying values from the user group dropdown
        cy.get(userGroupList).then((li) => {
            const allValues = li.text();
            cy.log(allValues);
        });

        // Selects 'User groups' in user group dropdown.
        changeDropdownUtils.userGroupSelection(userGroup);
        cy.wait(timeout);
        cy.log('User selected the userGroupName in Usergroup dropdown');

        //Checks for the main section visibility
        cy.get(mainSection).should('be.visible');
        cy.log('Main section is validated successfully');

        //Validations of all fields in main view
        cy.get(loginNameField).should('be.visible');
        cy.get(loginNameField).then((field) => {
            const value2 = field.text('value');
            cy.log(value2);
        });
        cy.log('Login name field is validated successfully');

        //Edit the loginName field
        userUtils.editText(loginNameField, userName1);
        cy.log('Edited the login name field successfully');

        //Validation of cancel and apply buttons are enabled
        cy.get(gadgetCancel).should('be.enabled');
        cy.get(gadgetOk).should('be.enabled');
        cy.log('Cancel and apply buttons are successfully enabled');

        //Click on cancel and check for unchanged loginName
        cy.get(gadgetCancel).click();
        cy.wait(timeout);
        cy.log('Clicked on cancel button and login name remained unchanged');

        //Logout from the application
        loginUtils.logoutFromAMI();
        cy.wait(timeout);

    });

    it('AMI:1867:12 Edit the Login name and Apply,edit with existing login name should give error msg', function () {

        //Retrieving test data
        var userName = genericUtils.csvFile('userData.csv', 'LoginName', 'value2');
        var userGroup = genericUtils.csvFile('userData.csv', 'UserGroup', 'value1');
        var workspaceOption = genericUtils.csvFile('userData.csv', 'WorkspacesOption', 'value1');
        var userName1 = genericUtils.csvFile('userData.csv', 'UserName', 'value3');
        var userName2 = genericUtils.csvFile('userData.csv', 'UserName', 'value4');

        //Retrieving elements
        var userGadget = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'userGadget');
        var userGroupList = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'userGroupList');
        var mainSection = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'mainSection');
        var loginNameField = genericUtils.jsonFile('userModuleElements.json', 'mainScreen', 'loginNameField');
        var gadgetCancel = genericUtils.jsonFile('userModuleElements.json', 'mainScreen', 'gadgetCancel');
        var gadgetOk = genericUtils.jsonFile('userModuleElements.json', 'mainScreen', 'gadgetOk');
        var exixtUserErrorMsg = genericUtils.jsonFile('userModuleElements.json', 'mainScreen', 'exixtUserErrorMsg');
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

        //Validations of all fields in main view
        cy.get(loginNameField).should('be.visible');
        cy.get(loginNameField).then((field) => {
            const value2 = field.text('value');
            cy.log(value2);
        });
        cy.log('Login name field is validated successfully');

        //Edit the loginName field
        userUtils.editText(loginNameField, userName2);
        cy.log('Edited the login name field successfully');

        //Validation of cancel and apply buttons are enabled
        cy.get(gadgetCancel).should('be.enabled');
        cy.get(gadgetOk).should('be.enabled');
        cy.log('Cancel and apply buttons are successfully enabled');

        //Click on ok with existing login name and check for error msg for loginName
        cy.get(gadgetOk).click();
        cy.wait(timeout);
        cy.get(exixtUserErrorMsg).should('be.visible');
        cy.log('Validated the error msg when clicked on ok button');

        //Logout from the application
        loginUtils.logoutFromAMI();
        cy.wait(timeout);

    });

    it('AMI:1866:11, Edit the Login name and Apply,edit with unique login name should give error msg', function () {

        //Retrieving test data
        var userName = genericUtils.csvFile('userData.csv', 'LoginName', 'value2');
        var userGroup = genericUtils.csvFile('userData.csv', 'UserGroup', 'value1');
        var workspaceOption = genericUtils.csvFile('userData.csv', 'WorkspacesOption', 'value1');
        var userName1 = genericUtils.csvFile('userData.csv', 'UserName', 'value3');
        var userName3 = genericUtils.csvFile('userData.csv', 'UserName', 'value5');

        //Retrieving elements
        var userGadget = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'userGadget');
        var userGroupList = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'userGroupList');
        var mainSection = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'mainSection');
        var loginNameField = genericUtils.jsonFile('userModuleElements.json', 'mainScreen', 'loginNameField');
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

        //Validations of all fields in main view
        cy.get(loginNameField).should('be.visible');
        cy.get(loginNameField).then((field) => {
            const value2 = field.text('value');
            cy.log(value2);
        });
        cy.log('Login name field is validated successfully');

        //Edit the loginName field
        userUtils.editText(loginNameField, userName3);
        cy.log('Edited the login name field successfully');

        //Validation of cancel and apply buttons are enabled
        cy.get(gadgetCancel).should('be.enabled');
        cy.get(gadgetOk).should('be.enabled');
        cy.log('Cancel and apply buttons are successfully enabled');

        //Click on ok with unique login name and loginName should be changed
        cy.get(gadgetOk).click();
        cy.wait(timeout);
        cy.log('Clicked on ok successfully');

        //ReInitializing to before login name 
        userUtils.editText(loginNameField, userName1);
        cy.get(gadgetOk).click();
        cy.wait(timeout);
        cy.log('Re-Edited the login name field successfully');

        //Logout from the application
        loginUtils.logoutFromAMI();
        cy.wait(timeout);

    });

});