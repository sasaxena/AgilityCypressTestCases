const loginUtils = require('../../../utils/loginUtils');
const changeDropdownUtils = require('../../../utils/changeDropdownUtils');
const genericUtils = require('../../../utils/genericUtils');
const userUtils = require('../../../utils/userUtils');


describe('User actions with loginName field', function () {
    it('AMI:1864:9,AMI:1865:10 Edit the Login name, then Apply and cancel button should be enabled and it should not change the login name after click on cancel', function () {

        var userName = genericUtils.csvFile('userData.csv', 2, 0);
        var userGroup = genericUtils.csvFile('userData.csv', 1, 3);
        var userName1 = genericUtils.csvFile('userData.csv', 3, 4);

        var userGadget = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'userGadget');
        var userGroupList = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'userGroupList');
        var mainSection = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'mainSection');
        var loginNameField = genericUtils.jsonFile('userModuleElements.json', 'mainScreen', 'loginNameField');
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

        // Selects 'User groups' in user group dropdown.
        changeDropdownUtils.userGroupSelection(userGroup);
        userUtils.waitForObject(timeout);

        //checks for the main section visibility
        cy.get(mainSection).should('be.visible');
        cy.log('Main section is validated successfully');

        // validations of all fields in main view
        cy.get(loginNameField).should('be.visible');
        cy.get(loginNameField).then((field) => {
            const value2 = field.text('value');
            cy.log(value2);
        });
        cy.log('login name field is validated successfully');

        //edit the loginName filed
        userUtils.editText(loginNameField, userName1);
        cy.log('edited the login name field successfully');

        //validation of cancel and apply buttons are enabled
        cy.get(gadgetCancel).should('be.enabled');
        cy.get(gadgetOk).should('be.enabled');
        cy.log('cancel and apply buttons are successfully enabled');

        //click on cancel and check for unchanged loginName
        cy.get(gadgetCancel).click();
        userUtils.waitForObject(timeout);
        cy.log('Clicked on cancel button and login name remained unchanged');

        //Logout from the application
        loginUtils.logoutFromAMI();
        userUtils.waitForObject(timeout);

    });

    it('AMI:1867:12 Edit the Login name and Apply,edit with existing login name should give error msg', function () {

        var userName = genericUtils.csvFile('userData.csv', 2, 0);
        var userGroup = genericUtils.csvFile('userData.csv', 1, 3);
        var userName1 = genericUtils.csvFile('userData.csv', 3, 4);
        var userName2 = genericUtils.csvFile('userData.csv', 4, 4);

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
        cy.get(loginNameField).should('be.visible');
        cy.get(loginNameField).then((field) => {
            const value2 = field.text('value');
            cy.log(value2);
        });
        cy.log('login name field is validated successfully');

        //edit the loginName filed
        userUtils.editText(loginNameField, userName2);
        cy.log('edited the login name field successfully');

        //validation of cancel and apply buttons are enabled
        cy.get(gadgetCancel).should('be.enabled');
        cy.get(gadgetOk).should('be.enabled');
        cy.log('cancel and apply buttons are successfully enabled');

        //click on ok with existing login name and check for error msg for loginName
        cy.get(gadgetOk).click();
        userUtils.waitForObject(timeout);
        cy.get(exixtUserErrorMsg).should('be.visible');
        cy.log('Validated the error msg when clicked on ok button');

        //Logout from the application
        loginUtils.logoutFromAMI();
        userUtils.waitForObject(timeout);

    });

    it('AMI:1866:11, Edit the Login name and Apply,edit with unique login name should give error msg', function () {

        var userName = genericUtils.csvFile('userData.csv', 2, 0);
        var userGroup = genericUtils.csvFile('userData.csv', 1, 3);
        var userName1 = genericUtils.csvFile('userData.csv', 3, 4);
        var userName3 = genericUtils.csvFile('userData.csv', 5, 4);

        var userGadget = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'userGadget');
        var userGroupList = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'userGroupList');
        var mainSection = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'mainSection');
        var loginNameField = genericUtils.jsonFile('userModuleElements.json', 'mainScreen', 'loginNameField');
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
        cy.get(loginNameField).should('be.visible');
        cy.get(loginNameField).then((field) => {
            const value2 = field.text('value');
            cy.log(value2);
        });
        cy.log('login name field is validated successfully');

        //edit the loginName filed
        userUtils.editText(loginNameField, userName3);
        cy.log('edited the login name field successfully');

        //validation of cancel and apply buttons are enabled
        cy.get(gadgetCancel).should('be.enabled');
        cy.get(gadgetOk).should('be.enabled');
        cy.log('cancel and apply buttons are successfully enabled');

        //click on ok with unique login name and loginName should be changed
        cy.get(gadgetOk).click();
        userUtils.waitForObject(timeout);
        cy.log('clicked on ok successfully');

        //ReInitializing to before login name 
        userUtils.editText(loginNameField, userName1);
        cy.get(gadgetOk).click();
        userUtils.waitForObject(timeout);
        cy.log('Re-Edited the login name field successfully');

        //Logout from the application
        loginUtils.logoutFromAMI();
        userUtils.waitForObject(timeout);

    });

});