const loginUtils = require('../../../utils/loginUtils');
const changeDropdownUtils = require('../../../utils/changeDropdownUtils');
const userUtils = require('../../../utils/userUtils');
const genericUtils = require('../../../utils/genericUtils');
//const configOptionsUtils = require('../../../utils/configOptionsUtils');

describe('Permission View functionality', function () {
    it('AMI:1928:73 Can Edit Workspace Checkbox is present', function () {
        //Retrieving test data
        var userName = genericUtils.csvFile('userData.csv', 1, 0);
        const workspaceOption = genericUtils.csvFile('userData.csv', 1, 1);
        var gadgetName = genericUtils.csvFile('userData.csv', 1, 2);
        var userGroupName = genericUtils.csvFile('userData.csv', 1, 3);
        var userName2 = genericUtils.csvFile('userData.csv', 1, 4);
        
        //rerieving elements 
        var permissionHeaderElement = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'permissionSection');
        var canEditWorkspaceElement = genericUtils.jsonFile('userModuleElements.json', 'permissionScreen', 'canEditWorkspaceCheckbox');

        // Login to AMI.
        loginUtils.loginToAMI(userName);
        cy.log('User Successfully logged in application');

        //selcting the Configuration Option in Workspace Dropdown
        changeDropdownUtils.changeWorkspace(workspaceOption);
        cy.log('User Successfully navigated to Configuration Options');

        //Clicking on user Gadget
        userUtils.selectGadget(gadgetName);
        cy.log('User clicked on User gadget');
        
        //selecting Admin user group
        userUtils.selectUserGroup(userGroupName);
        cy.log('User selected the-' + userGroupName + ' option in Usergroup');

        //selecting username
        userUtils.selectUserName(userName2);
        cy.log('User selected the' + userName2 + 'option in Username');

        //Exapnding the permission header
        cy.wait(1000);
        cy.get(permissionHeaderElement, { timeout: 2000 }).click();
        cy.log('Expand the permission header section');

        //Checking Can edit workspace checkbox is visible in permission section
        cy.get(canEditWorkspaceElement).should('be.visible');
        cy.log('Can edit workspaces Checkbox is visible');

        //Log out from AMI application
        loginUtils.logoutFromAMI();
        
    });


    it('AMI:1929:74_Checking Can edit Workspace Checkbox', function () {
        //Data Retrieving
        var userName = genericUtils.csvFile('userData.csv', 1, 0);
        var workspaceOption = genericUtils.csvFile('userData.csv', 1, 1);
        var gadgetName = genericUtils.csvFile('userData.csv', 1, 2);
        var userGroupName = genericUtils.csvFile('userData.csv', 1, 3);
        var userName2 = genericUtils.csvFile('userData.csv', 1, 4);
        var workspaceOption2 = genericUtils.csvFile('userData.csv', 2, 1);

        cy.log(workspaceOption2);
        var permissionHeaderElement = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'permissionSection');
        var canEditWorkspaceElement = genericUtils.jsonFile('userModuleElements.json', 'permissionScreen', 'canEditWorkspaceCheckbox');
        var workspaceDropdownElement = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'workspaceDropdown');

        // Login to AMI.
        loginUtils.loginToAMI(userName);
        cy.log('User Successfully logged in application');

        //selcting the Configuration Option in Workspace Dropdown
        changeDropdownUtils.changeWorkspace(workspaceOption);
        //changeDropdownUtils.changeWorkspace(workspaceOption);
        cy.log('User Successfully navigated to Configuration Options');

        //Clicking on user Gadget 
        userUtils.selectGadget(gadgetName);
        cy.log('User clicked on User gadget');

        //selecting Admin user group
        userUtils.selectUserGroup(userGroupName);
        cy.log('User selected the-' + userGroupName + ' option in Usergroup');

        //selecting username
        userUtils.selectUserName(userName2);

        //Exapnding the permission header
        cy.wait(1000);
        cy.get(permissionHeaderElement).click();

        //Checking Can edit workspace checkbox in permission section
        cy.get(canEditWorkspaceElement).check().should('be.checked');
        cy.log('Can edit Workspace Checkbox is Checked');

        //Checking Create new workspace... option is visible in workspace dropdown
        userUtils.availableOptionInDropdown(workspaceDropdownElement, 'Create new workspace...');
    });

    it('AMI:1930:75_Uncheck Can edit Workspace Checkbox', function () {
        //Data Retrieving
        var userName = genericUtils.csvFile('userData.csv', 1, 0);
        const workspaceOption = genericUtils.csvFile('userData.csv', 2, 0);
        var gadgetName = genericUtils.csvFile('userData.csv', 1, 2);
        var userGroupName = genericUtils.csvFile('userData.csv', 1, 3);
        var userName2 = genericUtils.csvFile('userData.csv', 1, 4);
        //var workspaceOption2 = genericUtils.csvFile('UserData.csv', 2, 1);
        //var workspaceOption3 = genericUtils.csvFile('UserData.csv', 3, 1);

        var permissionHeaderElement = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'permissionSection');
        var canEditWorkspaceElement = genericUtils.jsonFile('userModuleElements.json', 'permissionScreen', 'canEditWorkspaceCheckbox');
        var workspaceDropdownElement = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'workspaceDropdown');

        // Login to AMI.
        loginUtils.loginToAMI(userName);
        cy.log('User Successfully logged in application');

        //selcting the Configuration Option in Workspace Dropdown
        changeDropdownUtils.changeWorkspace(workspaceOption);
        cy.log('User Successfully navigated to Configuration Options');

        //Clicking on user Gadget
        userUtils.selectGadget(gadgetName);
        cy.log('User clicked on User gadget');

        //selecting Admin user group
        userUtils.selectUserGroup(userGroupName);
        cy.log('User selected the-' + userGroupName + ' option in Usergroup');

        //selecting username
        userUtils.selectUserName(userName2);
        cy.log('User selected the-' + userName2 + ' option in Username');
        //cy.wait(1000);

        cy.wait(1000);
        //Exapnding the permission header
        cy.get(permissionHeaderElement, { timeout: 2000 }).click();
       
        cy.get(canEditWorkspaceElement).should('be.visible');

        //Uncheck Can edit workspace checkbox in permission section
        cy.get(canEditWorkspaceElement).uncheck().should('not.be.checked');
        cy.log('Can edit Workspace Checkbox is UnChecked');

        //logout from AMI application
        loginUtils.logoutFromAMI();

        //login to AMI application
        loginUtils.loginToAMI(userName);
       
        //Checking Create new workspace...and Edit current workspace... option is not visible in workspace dropdown
        userUtils.unAvailableOptionInDropdown(workspaceDropdownElement, 'Create new workspace...');
        userUtils.unAvailableOptionInDropdown(workspaceDropdownElement, 'Edit current workspace...');

        //logout from AMI application
        loginUtils.logoutFromAMI();
    });
});