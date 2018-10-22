const loginUtils = require('../../../utils/loginUtils');
const changeDropdownUtils = require('../../../utils/changeDropdownUtils');
const userUtils = require('../../../utils/userUtils');
const genericUtils = require('../../../utils/genericUtils');

describe('Permission View functionality', function () {
    it('AMI:1928:73 Can Edit Workspace Checkbox is present', function () {
        
        //Retrieving test data
        var userName = genericUtils.csvFile('userData.csv', "LoginName", "value1");
        const workspaceOption = genericUtils.csvFile('userData.csv', "WorkspacesOption", "value1");
        var gadgetName = genericUtils.csvFile('userData.csv', "Gadgets", "value1");
        var userGroupName = genericUtils.csvFile('userData.csv', "UserGroup", "value1");
        var userName2 = genericUtils.csvFile('userData.csv', "UserName", "value1");

        //Retrieving elements 
        var permissionHeaderElement = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'permissionSection');
        var canEditWorkspaceElement = genericUtils.jsonFile('userModuleElements.json', 'permissionScreen', 'canEditWorkspaceCheckbox');
        var timeOut = genericUtils.jsonFile('configEnvironment.json', 'timeout', 'min');
        var avg = genericUtils.jsonFile('configEnvironment.json', 'timeout', 'avg');

        //Login to AMI.
        loginUtils.loginToAMI(userName);
        cy.log('User Successfully logged in application');

        //Selecting the Configuration Option in Workspace Dropdown
        changeDropdownUtils.changeWorkspace(workspaceOption);
        cy.log('User Successfully navigated to Configuration Options');

        //Clicking on user Gadget
        userUtils.selectGadget(gadgetName);
        cy.log('User clicked on user gadget');
        
        //Selecting Admin user group
        userUtils.selectUserGroup(userGroupName);
        cy.log('User selected the userGroupName in Usergroup dropdown');

        //Selecting username
        userUtils.selectUserName(userName2);
        cy.log('User selected the userName in Username dropdown');

        //Expanding the permission header
        cy.wait(timeOut);
        cy.get(permissionHeaderElement, { timeout: avg }).click();
        cy.log('Expand the permission header section');

        //Checking Can edit workspace checkbox is visible in permission section
        cy.get(canEditWorkspaceElement).should('be.visible');
        cy.log('Can edit workspaces Checkbox is visible');

        //Log out from AMI application
        loginUtils.logoutFromAMI();
        
    });


    it('AMI:1929:74_Checking Can edit Workspace Checkbox', function () {
        //Data retrieving
        var userName = genericUtils.csvFile('userData.csv', "LoginName", "value1");
        var workspaceOption = genericUtils.csvFile('userData.csv', "WorkspacesOption", "value1");
        var gadgetName = genericUtils.csvFile('userData.csv', "Gadgets", "value1");
        var userGroupName = genericUtils.csvFile('userData.csv', "UserGroup", "value1");
        var userName2 = genericUtils.csvFile('userData.csv', "UserName", "value1");


        //Elements retrieving
        var permissionHeaderElement = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'permissionSection');
        var canEditWorkspaceElement = genericUtils.jsonFile('userModuleElements.json', 'permissionScreen', 'canEditWorkspaceCheckbox');
        var workspaceDropdownElement = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'workspaceDropdown');
        var timeOut = genericUtils.jsonFile('configEnvironment.json', 'timeout', 'min');

        //Login to AMI.
        loginUtils.loginToAMI(userName);
        cy.log('User Successfully logged in application');

        //Selecting the Configuration Option in Workspace Dropdown
        changeDropdownUtils.changeWorkspace(workspaceOption);
        cy.log('User Successfully navigated to Configuration Options');

        //Clicking on user Gadget 
        userUtils.selectGadget(gadgetName);
        cy.log('User clicked on User gadget');

        //Selecting Admin user group
        userUtils.selectUserGroup(userGroupName);
        cy.log('User selected the userGroupName in Usergroup dropdown');

        //Selecting username
        userUtils.selectUserName(userName2);
        cy.log('User selected the userName in Username dropdown');

        //Expanding the permission header
        cy.wait(timeOut);
        cy.get(permissionHeaderElement).click();
        cy.log('User successfully clicked on permission header');

        //Checking Can edit workspace checkbox in permission section
        cy.get(canEditWorkspaceElement).check().should('be.checked');
        cy.log('Can edit Workspace Checkbox is Checked');

        //Checking Create new workspace... option is visible in workspace dropdown
        userUtils.availableOptionInDropdown(workspaceDropdownElement, 'Create new workspace...');
        cy.log('Successfully validated Create new workspace... option is present in  workspace dropdown');
    });

    it('AMI:1930:75_Uncheck Can edit Workspace Checkbox', function () {

        //Retrieving test data
        var userName = genericUtils.csvFile('userData.csv', "LoginName", "value1");
        const workspaceOption = genericUtils.csvFile('userData.csv', "WorkspacesOption", "value1");
        var gadgetName = genericUtils.csvFile('userData.csv', "Gadgets", "value1");
        var userGroupName = genericUtils.csvFile('userData.csv', "UserGroup", "value1");
        var userName2 = genericUtils.csvFile('userData.csv', "UserName", "value1");

        //Elements retrieving
        var permissionHeaderElement = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'permissionSection');
        var canEditWorkspaceElement = genericUtils.jsonFile('userModuleElements.json', 'permissionScreen', 'canEditWorkspaceCheckbox');
        var workspaceDropdownElement = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'workspaceDropdown');
        var timeOut = genericUtils.jsonFile('configEnvironment.json', 'timeout', 'min');
        var avg = genericUtils.jsonFile('configEnvironment.json', 'timeout', 'avg');

        //Login to AMI.
        loginUtils.loginToAMI(userName);
        cy.log('User Successfully logged in application');

        //Selecting the Configuration Option in Workspace Dropdown
        changeDropdownUtils.changeWorkspace(workspaceOption);
        cy.log('User Successfully navigated to Configuration Options');

        //Clicking on user Gadget
        userUtils.selectGadget(gadgetName);
        cy.log('User clicked on User gadget');

        //Selecting Admin user group
        userUtils.selectUserGroup(userGroupName);
        cy.log('User selected the userGroupName in Usergroup dropdown');

        //Selecting username
        userUtils.selectUserName(userName2);
        cy.log('User selected the userName in Username dropdown');

        cy.wait(timeOut);
        //Expanding the permission header
        cy.get(permissionHeaderElement, { timeout: avg }).click();
        cy.log('User successfully clicked on permission header');
        cy.get(canEditWorkspaceElement).should('be.visible');

        //Uncheck Can edit workspace checkbox in permission section
        cy.get(canEditWorkspaceElement).uncheck().should('not.be.checked');
        cy.log('Can edit Workspace Checkbox is UnChecked');

        //Logout from AMI application
        loginUtils.logoutFromAMI();
        cy.log('Successfully log out from AMI');

        //Login to AMI application
        loginUtils.loginToAMI(userName);
        cy.log('User Successfully logged in application');

        //Checking Create new workspace...and Edit current workspace... option is not visible in workspace dropdown
        userUtils.unAvailableOptionInDropdown(workspaceDropdownElement, 'Create new workspace...');
        userUtils.unAvailableOptionInDropdown(workspaceDropdownElement, 'Edit current workspace...');
        cy.log('Successfully validated Create new workspace and Edit current workspace is not visible');

        //Logout from AMI application
        loginUtils.logoutFromAMI();
        cy.log('Successfully log out from AMI');

    });
});