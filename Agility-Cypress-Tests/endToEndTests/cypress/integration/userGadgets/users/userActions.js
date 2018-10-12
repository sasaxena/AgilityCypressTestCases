const loginUtils = require('../../../utils/loginUtils');
const changeDropdownUtils = require('../../../utils/changeDropdownUtils');
const genericUtils = require('../../../utils/genericUtils');
const userUtils = require('../../../utils/userUtils');


describe('User actions with Usergadgets section', function () {
    it('AMI:1857:2, Clicks on user group dropdown and validates list of user groups and blank space', function () {

        // Login to AMI.
        var userName = genericUtils.csvFile('userData.csv', 2, 0);
        var userGroup = genericUtils.csvFile('userData.csv', 1, 3);
        var userGadget = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'userGadget');
        var timeout = genericUtils.jsonFile('configEnvironment.json', 'timeout', 'min');


        loginUtils.loginToAMI(userName);
        // Clicks on user gadgets
        cy.get(userGadget).click();
        userUtils.waitForObject(timeout);
        // Displaying values from the user group dropdown
        var userGroupList = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'userGroupList');
        cy.get(userGroupList).then((li) => {
            const allValues = li.text();
            cy.log(allValues);
        });
        //Selects User groups in user group dropdown
        changeDropdownUtils.userGroupSelection(userGroup);
        userUtils.waitForObject(timeout);
        loginUtils.logoutFromAMI();
        userUtils.waitForObject(timeout);
    });
    it('AMI:1856:1, Clicks on user group dropdown and validates Main,Groups,Languages,Workspaces,Attributes,Permissions,User Snapshot sections', function () {

        // Login to AMI.
        var userName = genericUtils.csvFile('userData.csv', 2, 0);
        var userGroup = genericUtils.csvFile('userData.csv', 1, 3);
        var userGadget = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'userGadget');
        var userNameD = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'userNameDropdown');
        var userGroupD = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'userGroupDropdown');
        var mainSection = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'mainSection');
        var groupSection = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'groupsSection');
        var languageSection = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'languageSection');
        var workspaceSection = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'workspaceSection');
        var AttributeSection = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'attributeSection');
        var permissionsSection = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'permissionSection');
        var userSnapshotSection = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'userSnapshotSection');
        var timeout = genericUtils.jsonFile('configEnvironment.json', 'timeout', 'min');


        loginUtils.loginToAMI(userName);
        cy.get(userGadget).click();
        userUtils.waitForObject(timeout);
        cy.get(userGroupD).should('be.visible');
        cy.log('User group section is validated successfully');
        cy.get(userNameD).should('be.visible');
        cy.log('User name section is validated successfully');
        //Selects User groups in user group dropdown
        changeDropdownUtils.userGroupSelection(userGroup);
        
        cy.get(mainSection).should('be.visible');
        cy.log('Main section is validated successfully');

        cy.get(groupSection).should('be.visible');
        cy.log('Groups section is validated successfully');

        cy.get(languageSection).should('be.visible');
        cy.log('Language section is validated successfully');

        cy.get(workspaceSection).should('be.visible');
        cy.log('Workspaces section is validated successfully');

        cy.get(AttributeSection).should('be.visible');
        cy.log('Attributes section is validated successfully');

        cy.get(permissionsSection).should('be.visible');
        cy.log('Permissions section is validated successfully');

        cy.get(userSnapshotSection).should('be.visible');
        cy.log('User Snapshot section is validated successfully');
        
        cy.log('All the fields are validated successfully');
        loginUtils.logoutFromAMI();
        userUtils.waitForObject(timeout);
    });
 
    it('AMI:1858:3, Clicks on user name dropdown and validates user name for the selected user group', function () {
        var userName = genericUtils.csvFile('userData.csv', 2, 0);
        var userGroup = genericUtils.csvFile('userData.csv', 1, 3);
        var user = genericUtils.csvFile('userData.csv', 2, 4);
        var userGadget = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'userGadget');
        var userNameD = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'userNameDropdown');
        var userNameList = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'userNameList');
        var timeout = genericUtils.jsonFile('configEnvironment.json', 'timeout', 'min');


        // Login to AMI.
        loginUtils.loginToAMI(userName);
        cy.get(userGadget).click();
        userUtils.waitForObject(timeout);
        // Selects 'User groups' in user group dropdown.
        changeDropdownUtils.userGroupSelection(userGroup);
        userUtils.waitForObject(timeout);
        cy.get(userNameList).then((li) => {
            const allValues = li.text();
            cy.log(allValues);
        });
        cy.get(userNameD).should('be.visible');
        cy.log('User group name down is visible');

        changeDropdownUtils.selectUserName(user);
        userUtils.waitForObject(timeout);
        cy.log('user is present in user group');

        loginUtils.logoutFromAMI();
    });
});
