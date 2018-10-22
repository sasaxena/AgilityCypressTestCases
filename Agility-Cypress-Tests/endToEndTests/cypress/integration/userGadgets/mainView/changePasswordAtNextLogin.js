const loginUtils = require('../../../utils/loginUtils');
const changeDropdownUtils = require('../../../utils/changeDropdownUtils');
const genericUtils = require('../../../utils/genericUtils');
const userUtils = require('../../../utils/userUtils');

describe('User actions with changePasswordAtNextLogin field', function () {
    it('AMI:1879:24 click on changePasswordAtNextLogin checkbox and apply, it should ask for change passowrd in the next login with the specified user', function () {

        //Retrieving test data
        var userName = genericUtils.csvFile('userData.csv', 'LoginName', 'value2');
        var userGroup = genericUtils.csvFile('userData.csv', 'UserGroup', 'value1');
        var userName1 = genericUtils.csvFile('userData.csv', 'UserName', 'value3');
        var workspaceOption = genericUtils.csvFile('userData.csv', 'WorkspacesOption', 'value1');

        //Retrieving elements
        var userGadget = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'userGadget');
        var userGroupList = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'userGroupList');
        var mainSection = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'mainSection');
        var changePasswordAtNextLoginCheckBox = genericUtils.jsonFile('userModuleElements.json', 'mainScreen', 'changePasswordAtNextLoginCheckBox');
        var gadgetCancel = genericUtils.jsonFile('userModuleElements.json', 'mainScreen', 'gadgetCancel');
        var gadgetOk = genericUtils.jsonFile('userModuleElements.json', 'mainScreen', 'gadgetOk');
        var timeout = genericUtils.jsonFile('configEnvironment.json', 'timeout', 'min');

        //Login to AMI.
        loginUtils.loginToAMI(userName);
        cy.log('User Successfully logged in application');

        //Selecting the Configuration Option in Workspace Dropdown
        changeDropdownUtils.changeWorkspace(workspaceOption);
        cy.log('User Successfully navigated to Configuration Options');

        // Clicks on user gadgets
        cy.get(userGadget).click();
        cy.wait(timeout);
        cy.log('User clicked on User gadget');

        //Displaying values from the user group dropdown
        cy.get(userGroupList).then((li) => {
            const allValues = li.text();
            cy.log(allValues);
        });

        // Selects 'User group' in user group dropdown.
        changeDropdownUtils.userGroupSelection(userGroup);
        cy.wait(timeout);
        cy.log('User selected the userGroupName in Usergroup dropdown');

        // Selects 'User name' in user name dropdown.
        userUtils.selectUserName(userName1);
        cy.wait(timeout);
        cy.log('User selected the userName in Username dropdown');

        //Checks for the main section visibility
        cy.get(mainSection).should('be.visible');
        cy.log('Main section is validated successfully');

        //Validations of changePasswordAtNextLoginCheckBox in main view
        cy.get(changePasswordAtNextLoginCheckBox).should('be.visible');
        cy.get(changePasswordAtNextLoginCheckBox).should('not.checked');
        cy.log('ChangePasswordAtNextLoginCheckBox field is validated for unchecked status successfully');

        //Check the changePasswordAtNextLoginCheckBox field
        cy.get(changePasswordAtNextLoginCheckBox).check();
        cy.get(changePasswordAtNextLoginCheckBox).should('checked');
        cy.log('Checked the changePasswordAtNextLoginCheckBox field successfully');

        //Validation of cancel and apply buttons are enabled
        cy.get(gadgetCancel).should('be.enabled');
        cy.get(gadgetOk).should('be.enabled');
        cy.log('Cancel and apply buttons are successfully enabled');

        //Click on cancel and check for unchanged loginName
        cy.get(gadgetOk).click();
        cy.wait(timeout);
        cy.log('Clicked on apply button');

        //Validated the changePasswordAtNextLoginCheckBox after click on apply button
        cy.get(changePasswordAtNextLoginCheckBox).should('checked');

        //Logout from the application
        loginUtils.logoutFromAMI();
        cy.wait(timeout);

        //Relogin into application with specific user
        loginUtils.ReloginToAMI(userName1);
        cy.log('Change password window is validated successfully in the next login');

        //Re-Initialize to the previous state for checkbox
        loginUtils.loginToAMI(userName);
        changeDropdownUtils.changeWorkspace(workspaceOption);
        cy.wait(timeout);
        cy.get(userGadget).click();
        cy.wait(timeout);
        changeDropdownUtils.userGroupSelection(userGroup);
        cy.wait(timeout);
        userUtils.selectUserName(userName1);
        cy.wait(timeout);
        cy.get(mainSection).should('be.visible');
        cy.get(changePasswordAtNextLoginCheckBox).should('checked');
        cy.get(changePasswordAtNextLoginCheckBox).uncheck();
        cy.get(gadgetOk).click();
        cy.wait(timeout);
        cy.log('Clicked on apply button');
        cy.get(changePasswordAtNextLoginCheckBox).should('not.checked');
        cy.log('Re-Initialized the changePasswordAtNextLogin checkbox to unchecked state');

        //Logout from the application
        loginUtils.logoutFromAMI();
        cy.wait(timeout);
    });
});