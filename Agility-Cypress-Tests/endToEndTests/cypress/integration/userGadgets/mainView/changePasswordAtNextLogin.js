const loginUtils = require('../../../utils/loginUtils');
const changeDropdownUtils = require('../../../utils/changeDropdownUtils');
const genericUtils = require('../../../utils/genericUtils');
const userUtils = require('../../../utils/userUtils');


describe('User actions with changePasswordAtNextLogin field', function () {
    it('AMI:1879:24 click on changePasswordAtNextLogin checkbox and apply, it should ask for change passowrd in the next login with the specified user', function () {

        var userName = genericUtils.csvFile('userData.csv', 2, 0);
        var userGroup = genericUtils.csvFile('userData.csv', 1, 3);
        var userName1 = genericUtils.csvFile('userData.csv', 3, 4);

        var userGadget = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'userGadget');
        var userGroupList = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'userGroupList');
        var mainSection = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'mainSection');
        var changePasswordAtNextLoginCheckBox = genericUtils.jsonFile('userModuleElements.json', 'mainScreen', 'changePasswordAtNextLoginCheckBox');
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
        userUtils.selectUserName(userName1);
        userUtils.waitForObject(timeout);

        //checks for the main section visibility
        cy.get(mainSection).should('be.visible');
        cy.log('Main section is validated successfully');

        //validations of changePasswordAtNextLoginCheckBox in main view
        cy.get(changePasswordAtNextLoginCheckBox).should('be.visible');
        cy.get(changePasswordAtNextLoginCheckBox).should('not.checked');
        cy.log('changePasswordAtNextLoginCheckBox field is validated for unchecked status successfully');

        //check the changePasswordAtNextLoginCheckBox filed
        cy.get(changePasswordAtNextLoginCheckBox).check();
        cy.get(changePasswordAtNextLoginCheckBox).should('checked');
        cy.log('checked the changePasswordAtNextLoginCheckBox field successfully');

        //validation of cancel and apply buttons are enabled
        cy.get(gadgetCancel).should('be.enabled');
        cy.get(gadgetOk).should('be.enabled');
        cy.log('cancel and apply buttons are successfully enabled');

        //click on cancel and check for unchanged loginName
        cy.get(gadgetOk).click();
        userUtils.waitForObject(timeout);
        cy.log('Clicked on apply button');

        //validated the changePasswordAtNextLoginCheckBox after click on apply button
        cy.get(changePasswordAtNextLoginCheckBox).should('checked');

        //Logout from the application
        loginUtils.logoutFromAMI();
        userUtils.waitForObject(timeout);

        //Relogin into application with specific user
        loginUtils.ReloginToAMI(userName1);
        cy.log('Change password window is validated successfully in the next login');

        //Re-Initialize to the previous state for checkbox
        loginUtils.loginToAMI(userName);
        cy.get(userGadget).click();
        userUtils.waitForObject(timeout);
        changeDropdownUtils.userGroupSelection(userGroup);
        userUtils.waitForObject(timeout);
        userUtils.selectUserName(userName1);
        userUtils.waitForObject(timeout);
        cy.get(mainSection).should('be.visible');
        cy.get(changePasswordAtNextLoginCheckBox).should('checked');
        cy.get(changePasswordAtNextLoginCheckBox).uncheck();
        cy.get(gadgetOk).click();
        userUtils.waitForObject(timeout);
        cy.log('Clicked on apply button');
        cy.get(changePasswordAtNextLoginCheckBox).should('not.checked');
        cy.log('Re-Initialized the changePasswordAtNextLogin checkbox to unchecked state');

        //Logout from the application
        loginUtils.logoutFromAMI();
        userUtils.waitForObject(timeout);
    });
});