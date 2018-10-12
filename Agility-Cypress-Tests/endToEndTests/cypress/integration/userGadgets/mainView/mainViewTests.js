const loginUtils = require('../../../utils/loginUtils');
const changeDropdownUtils = require('../../../utils/changeDropdownUtils');
const genericUtils = require('../../../utils/genericUtils');
const userUtils = require('../../../utils/userUtils');


describe('User actions with MainView section', function () {
    it('AMI:1859:4, Validations of all the fields in Main view sections', function () {

        // Login to AMI.
        var userName = genericUtils.csvFile('userData.csv', 2, 0);
        var userGroup = genericUtils.csvFile('userData.csv', 1, 3);

        var userGadget = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'userGadget');
        var userGroupList = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'userGroupList');
        var mainSection = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'mainSection');

        var loginNameLabel = genericUtils.jsonFile('userModuleElements.json', 'mainScreen', 'loginNameLabel');
        var userNameLabel = genericUtils.jsonFile('userModuleElements.json', 'mainScreen', 'userNameLabel');
        var email = genericUtils.jsonFile('userModuleElements.json', 'mainScreen', 'email');
        var role = genericUtils.jsonFile('userModuleElements.json', 'mainScreen', 'role');
        var uiLocale = genericUtils.jsonFile('userModuleElements.json', 'mainScreen', 'uiLocale');
        var visualizer = genericUtils.jsonFile('userModuleElements.json', 'mainScreen', 'visualizer');
        var superUser = genericUtils.jsonFile('userModuleElements.json', 'mainScreen', 'superUser');
        var changePassword = genericUtils.jsonFile('userModuleElements.json', 'mainScreen', 'changePassword');
        var gadgetCancel = genericUtils.jsonFile('userModuleElements.json', 'mainScreen', 'gadgetCancel');
        var gadgetOk = genericUtils.jsonFile('userModuleElements.json', 'mainScreen', 'gadgetOk');
        var timout = genericUtils.jsonFile('configEnvironment.json', 'timeout', 'min');


        loginUtils.loginToAMI(userName);
        // Clicks on user gadgets
        cy.get(userGadget).click();
        userUtils.waitForObject(timout);
        // Displaying values from the user group dropdown
        cy.get(userGroupList).then((li) => {
            const allValues = li.text();
            cy.log(allValues);
        });
        // Selects 'User groups' in user group dropdown.
        changeDropdownUtils.userGroupSelection(userGroup);
       
        userUtils.waitForObject(timout);
        cy.get(mainSection).should('be.visible');
        cy.log('Main section is validated successfully');

        // validations of all fields in main view
        cy.get(loginNameLabel).should('be.visible');
        cy.log('login name field is validated successfully');

        cy.get(userNameLabel).should('be.visible');
        cy.log('user name field is validated successfully');

        cy.get(email).should('be.visible');
        cy.log('email field is validated successfully');

        cy.get(role).should('be.visible');
        cy.log('role field is validated successfully');

        cy.get(uiLocale).should('be.visible');
        cy.log('User Interface locale field is validated successfully');

        cy.get(visualizer).should('be.visible');
        cy.log('CheckBox for Visualizer field is validated successfully');

        cy.get(superUser).should('be.visible');
        cy.log('CheckBox for Allow moves from/to any state field is validated successfully');

        cy.get(changePassword).should('be.visible');
        cy.log('CheckBox for change password at next login field is validated successfully');

        cy.get(gadgetCancel).should('be.visible');
        cy.log('cancel button field is validated successfully');

        cy.get(gadgetOk).should('be.visible');
        cy.log('apply button field is validated successfully');

        loginUtils.logoutFromAMI();
        userUtils.waitForObject(timout);

    });


    it('AMI:1860:5,AMI:1861:6,AMI:1862:7,AMI:1863:8 Validations of all the fields with its user data in Main view sections', function () {

        var userName = genericUtils.csvFile('userData.csv', 2, 0);
        var userGroup = genericUtils.csvFile('userData.csv', 1, 3);

        var userGadget = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'userGadget');
        var userGroupList = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'userGroupList');
        var mainSection = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'mainSection');
        var loginNameField = genericUtils.jsonFile('userModuleElements.json', 'mainScreen', 'loginNameField');
        var userNameField = genericUtils.jsonFile('userModuleElements.json', 'mainScreen', 'userNameField');
        var roleField = genericUtils.jsonFile('userModuleElements.json', 'mainScreen', 'roleField');
        var uiLocaleField = genericUtils.jsonFile('userModuleElements.json', 'mainScreen', 'uiLocaleField');
        var timout = genericUtils.jsonFile('configEnvironment.json', 'timeout', 'min');


        
        // Login to AMI.
        loginUtils.loginToAMI(userName);
        // Clicks on user gadgets
       
        cy.get(userGadget).click();
        userUtils.waitForObject(timout);
        // Displaying values from the user group dropdown
        cy.get(userGroupList).then((li) => {
            const allValues = li.text();
            cy.log(allValues);
        });
        // Selects 'User groups' in user group dropdown.
        changeDropdownUtils.userGroupSelection(userGroup);
        cy.get(mainSection).should('be.visible');
        cy.log('Main section is validated successfully');
        // validations of all fields in main view
        cy.get(loginNameField).should('be.visible').click();
        cy.log('LoginName is validated successfully');

        cy.get(userNameField).should('be.visible');       
        cy.log('Username is validated successfully');

        cy.get(roleField).should('be.visible');
        cy.log('Role is validated successfully');
       
        cy.get(uiLocaleField).should('be.visible');
        cy.log('UI Locale is validated successfully');
        
        loginUtils.logoutFromAMI();
    });
});