const userUtils = require('../../../utils/userUtils');
const loginUtils = require('../../../utils/loginUtils');
const changeDropdownUtils = require('../../../utils/changeDropdownUtils');
const genericUtils = require('../../../utils/genericUtils');

describe('User Gadget Menu functionality', function () {
    it('AMI:1916:61,AMI:1917:62 Validating disable user poup with ok and cancel button after clicking on disable user option in user action menu and click on cancel button,then user should not get disabed', function () {

        //Retrieving test data
        var userName = genericUtils.csvFile('userData.csv', "LoginName", "value1");
        var workspaceOption = genericUtils.csvFile('userData.csv', "WorkspacesOption", "value1");
        var userGroupName = genericUtils.csvFile('userData.csv', "UserGroup", "value1");
        var dropDownUserName = genericUtils.csvFile('userData.csv', "LoginName", "value10");
        
        //Retrieving elements
        var userGadget = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'userGadget');
        var userOption = genericUtils.jsonFile('userModuleElements.json', 'userOptions', 'actionMenu');
        var disableUserOption = genericUtils.jsonFile('userModuleElements.json', 'userOptions', 'disableUser');
        var cancelButton = genericUtils.jsonFile('userModuleElements.json', 'disableUserScreen', 'cancelButton');
        var cofirmationMsg = genericUtils.jsonFile('userModuleElements.json', 'disableUserScreen', 'confirmationMsg');
        var userNameField = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'userName');
        
        //Login to AMI.
        loginUtils.loginToAMI(userName);
        cy.log('User Successfully logged in application');

        //Selecting the Configuration Option in Workspace Dropdown
        changeDropdownUtils.changeWorkspace(workspaceOption);
        cy.log('User Successfully navigated to Configuration Options');

        //Click on user gadgets
        cy.get(userGadget).click();
        cy.log('Successfully clicked on user gadget');

        //Selects 'User groups' in user group dropdown.
        userUtils.selectUserGroup(userGroupName);
        cy.log('Selected usergroup value in dropdown');

        //Selects 'user name' in User Name dropdown
        userUtils.selectUserName(dropDownUserName);
        cy.log('Selected User name value in dropdown');

        //Clicks On Option Button and Selects disable User option
        cy.get(userOption).click();
        cy.log('Successfully clicked on user option');

        //clicking on disable user option
        cy.get(disableUserOption, { timeout: 20000 }).should('be.visible');
        cy.get(disableUserOption).click();
        cy.log('Clicked on disable User Option');

        //Pop Up Message will be displayed
        cy.get(cofirmationMsg).should('be.visible');
        cy.log('Validated popup message successfully');
       
        //User Clicks On Cancel button in disable user popUp
        cy.get(cancelButton).click();
        cy.log('Clicked on cancel button in disable user popup');

        //User should not be get disabled after clicking on cancel
        cy.get(userNameField).should('contain', 'cypress11');
        cy.log('Validated successfully user is not disabled after clicking on cancel');

    });

    it('AMI:1918:63,AMI:1919:64,AMI:1920:65,AMI:1921:66,AMI:1922:67,AMI:1923:68,AMI:1924:69,AMI:1925:70 Disabling a user and checking re- enable user option should get enabled', function () {

        //Retrieving test data
        var userName = genericUtils.csvFile('userData.csv', "LoginName", "value1");
        var workspaceOption = genericUtils.csvFile('userData.csv', "WorkspacesOption", "value1");
        var userGroupName = genericUtils.csvFile('userData.csv', "UserGroup", "value1");
        var sortOptionValue1 = genericUtils.csvFile('userData.csv', "sortOptions", "value1");
        var sortOptionValue2 = genericUtils.csvFile('userData.csv', "sortOptions", "value2");
        var dropDownUserName = genericUtils.csvFile('userData.csv', "LoginName", "value10");

        //Retrieving elements
        var userGadget = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'userGadget');
        var userNameField = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'userName');
        var userOption = genericUtils.jsonFile('userModuleElements.json', 'userOptions', 'actionMenu');
        var disableUserOption = genericUtils.jsonFile('userModuleElements.json', 'userOptions', 'disableUser');
        var reEnableUserOption = genericUtils.jsonFile('userModuleElements.json', 'userOptions', 're-enableUser');
        var okButton = genericUtils.jsonFile('userModuleElements.json', 'disableUserScreen', 'okButton');
        var disableUsersList = genericUtils.jsonFile('userModuleElements.json', 're-enableUserScreen', 'allDisabledUserList');
        var reEnableCancelButton = genericUtils.jsonFile('userModuleElements.json', 're-enableUserScreen', 'cancelButton');
        var reEnableOkButton = genericUtils.jsonFile('userModuleElements.json', 're-enableUserScreen', 'okButton');
        var sortDropDown = genericUtils.jsonFile('userModuleElements.json', 're-enableUserScreen', 'sortDropDown');

        //Login to AMI.
        loginUtils.loginToAMI(userName);
        cy.log('User Successfully logged in application');

        //Selecting the Configuration Option in Workspace Dropdown
        changeDropdownUtils.changeWorkspace(workspaceOption);
        cy.log('User Successfully navigated to Configuration Options');

        //Click on user gadgets
        cy.get(userGadget).click();
        cy.log('Successfully clicked On user gadget');

        //Selects 'User groups' in user group dropdown.
        userUtils.selectUserGroup(userGroupName);
        cy.log('Selected userGroup value in dropdown');

        //Selects 'user name' in User Name dropdown
        userUtils.selectUserName(dropDownUserName);
        cy.log('Selected user name value in dropdown');

        //Clicks On Option Button and Selects disable User option
        cy.get(userOption).click();
        cy.log('Successfully clicked on user option');

        cy.get(disableUserOption, { timeout: 20000 }).should('be.visible');

        //Click on disable user option
        cy.get(disableUserOption).click();
        cy.log('Successfully clicked on disable user option');

        //Click on ok button
        cy.get(okButton).click();
        cy.log('Successfully clicked on ok button in disable user pop up');

        //Then user should get disabled
        cy.get(userNameField).should('not.have.value', 'cypress11');
        cy.log('The dropdown value is disabled');
   
        //Click on User Option 
        cy.get(userOption).click();
        cy.log('Clicked on user option');

        //Select re-enabled option
        cy.get(reEnableUserOption).click();
        cy.log('Clicked on re-enable user option');

        //Re-enable user window should come with a list of disabled users alongwith sort by dropdown ,disabled ok and enabled cancel button
        cy.get(sortDropDown).should('be.visible');
        cy.get(disableUsersList).should('contain', 'cypress11');
        cy.get(reEnableOkButton).should('be.disabled');
        cy.get(reEnableCancelButton).should('be.visible');
        cy.log('Successfully validated the disabled user list,sort by dropdown along with ok and cancel button');
        
        //It should consists loginName and UserName options
        cy.get(sortDropDown).should('contain', 'Login Name');
        cy.get(sortDropDown).should('contain', 'User Name');
        cy.log('Successfully validated the sort by dropdown options');

        //Select loginname from sort dropdown 
        cy.get(sortDropDown).select(sortOptionValue1);
        cy.log('Login Name selected successfully in dropdown');

        //Login Name should be diplayed and should be sorted accordingly
        cy.get(sortDropDown).then(($option) => {
            const selectedOption = $option.find(':selected').text();
            if (selectedOption === sortOptionValue1) {
                cy.log('Login Name option is selected');
            }
        });
        cy.get(disableUsersList).should('contain', 'cypressTestUser11');//value is cypressTestUser11

        //Select UserName from sort dropdown
        cy.get(sortDropDown).select(sortOptionValue2);
        cy.log('UserName is selected in dropdown');

        //UserName should be diplayed and should be sorted accordingly
        cy.get(sortDropDown).then(($option) => {
            const selectedOption = $option.find(':selected').text();
            if (selectedOption === sortOptionValue2) {
                cy.log('User Name option is selected');
            }
        });
        cy.get(disableUsersList).should('contain', 'cypress11');
        cy.log('Successfully validated the disable user in re-enable user window');
        
        //Select any user from the list of user
        cy.get(disableUsersList).should('contain', 'cypress11').click();
        cy.log('Successfully clicked on disable user checkbox');

        //Ok button should get enabled
        cy.get(reEnableOkButton).should('be.visible');
        cy.log('Successfully validated the re-enabled ok button should get enabled');

        //Select any user from the list of user and click on Cancel button
        cy.get(reEnableCancelButton).click();
        cy.log('Successfully clicked on cancel button');

        //Re-enabled users window should get closed and user should not be renabled.
        cy.get(userNameField).should('not.have.value', 'cypress11');
        cy.log('Username value should not get re-enabled');

        //Select any user from the list of user and click on ok button
        cy.get(userOption).click();
        cy.log('Clicked on user option');

        //Clicking on re-enable user option
        cy.get(reEnableUserOption).click();
        cy.log('Clicked on re-enable user option');

        //Selecting username in sort dropdown
        cy.get(sortDropDown).select(sortOptionValue2);
        cy.log('Dropdown Username is selected');

        //Checking disable user in window
        cy.get(disableUsersList).should('contain', 'cypress11').click();
        cy.log('User clicked on checkbox value');

        //Click on re-enabled ok button
        cy.get(reEnableOkButton).click();
        cy.log('User clicked on ok button of re-enable users');

        //User should get renabled and should display in userName dropdown.
        cy.get(userNameField).should('contain', 'cypress11');
        cy.log('The dropdown value is re-enabled');

    });

    it('AMI:1859:71,72, Validations of all the fields in User view sections', function () {

        //Retrieving test data
        var userName = genericUtils.csvFile('userData.csv', "LoginName", "value1");
        var workspaceOption = genericUtils.csvFile('userData.csv', "WorkspacesOption", "value1");
        var userGroupName = genericUtils.csvFile('userData.csv', "UserGroup", "value1");
        var dropDownUserName = genericUtils.csvFile('userData.csv', "LoginName", "value10");

        //Retrieving elements
        var userOption = genericUtils.jsonFile('userModuleElements.json', 'userOptions', 'actionMenu');
        var refresh = genericUtils.jsonFile('userModuleElements.json', 'userOptions', 'refresh');
        var help = genericUtils.jsonFile('userModuleElements.json', 'userOptions', 'help');
        var userGadget = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'userGadget');

        //Login to AMI.
        loginUtils.loginToAMI(userName);
        cy.log('User Successfully logged in application');

        //Selecting the Configuration Option in Workspace Dropdown
        changeDropdownUtils.changeWorkspace(workspaceOption);
        cy.log('User Successfully navigated to Configuration Options');

        //Clicks on user gadgets
        cy.get(userGadget).click();
        cy.log('Clicked on user gadget');

        //Selects 'User groups' in user group dropdown.
        userUtils.selectUserGroup(userGroupName);
        cy.log('Selected usergroup value in dropdown');

        //Selects 'user name' in User Name dropdown
        userUtils.selectUserName(dropDownUserName);
        cy.log('Selected user name value in dropdown');

        //Click on refresh option,
        cy.get(userOption).click();
        cy.log('Clicked On User Option');
        cy.get(refresh).click();
        cy.log('Clicked On Refresh');

        //Click on help option
        cy.get(userOption).click();
        cy.log('Clicked On User Option');
        cy.get(help).click();
        cy.log('Clicked On Help');    

    });
});