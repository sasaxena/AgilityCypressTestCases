const loginUtils = require('../../../utils/loginUtils');
const changeDropdownUtils = require('../../../utils/changeDropdownUtils');
const userUtils = require('../../../utils/userUtils');
const genericUtils = require('../../../utils/genericUtils');


describe('User Gadget Menu Functionality', function () {

    it('AMI:1901:46,AMI:1902:47,AMI:1903:48,1905:50,AMI:1904:49 User click action menu of user gadget and select add user option and enter all the fields and click on cancel button and select add user option,enter all the fields and click on ok button,', function () {

        //Retrieving test data
        var userName = genericUtils.csvFile('userData.csv', "LoginName", "value1");
        var workspaceOption = genericUtils.csvFile('userData.csv', "WorkspacesOption", "value1");
        var gadgetName = genericUtils.csvFile('userData.csv', "Gadgets", "value1");
        var userGroupName = genericUtils.csvFile('userData.csv', "UserGroup", "value1");
        var userName2 = genericUtils.csvFile('userData.csv', "UserName", "value1");
        var userNameValue = genericUtils.csvFile('userData.csv', "UserName", "value6");
        var loginNameValue = genericUtils.csvFile('userData.csv', "LoginName", "value3");
        var passwordValue = genericUtils.csvFile('userData.csv', "Password", "value1");
        var emailValue = genericUtils.csvFile('userData.csv', "Email_Id", "value4");
        var uiLocaleValue = genericUtils.csvFile('userData.csv', "UI Locale", "value2");
        var roleValue = genericUtils.csvFile('userData.csv', "Role", "value2");
        var defaultLanguageValue = genericUtils.csvFile('userData.csv', "Language", "value1");

        //Retrieving elements 
        var userNameDropDown = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'userName');
        var userHeader = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'userHeader');
        var actionMenu = genericUtils.jsonFile('userModuleElements.json', 'userOptions', 'actionMenu');
        var addUserOption = genericUtils.jsonFile('userModuleElements.json', 'userOptions', 'addNewUser');
        var disableUserOption = genericUtils.jsonFile('userModuleElements.json', 'userOptions', 'disableUser');
        var deleteUserOption = genericUtils.jsonFile('userModuleElements.json', 'userOptions', 'deleteUser');
        var re_enableUserOption = genericUtils.jsonFile('userModuleElements.json', 'userOptions', 're-enableUser');
        var refreshOption = genericUtils.jsonFile('userModuleElements.json', 'userOptions', 'refresh');
        var helpOption = genericUtils.jsonFile('userModuleElements.json', 'userOptions', 'help');
        var userNameField = genericUtils.jsonFile('userModuleElements.json', 'addUserScreen', 'userName');
        var loginName = genericUtils.jsonFile('userModuleElements.json', 'addUserScreen', 'loginName');
        var password = genericUtils.jsonFile('userModuleElements.json', 'addUserScreen', 'password');
        var email = genericUtils.jsonFile('userModuleElements.json', 'addUserScreen', 'email');
        var userGroup = genericUtils.jsonFile('userModuleElements.json', 'addUserScreen', 'userGroup');
        var uiLocale = genericUtils.jsonFile('userModuleElements.json', 'addUserScreen', 'uiLocale');
        var role = genericUtils.jsonFile('userModuleElements.json', 'addUserScreen', 'role');
        var defaultLanguage = genericUtils.jsonFile('userModuleElements.json', 'addUserScreen', 'defaultLanguage');
        var defaultWorkspace = genericUtils.jsonFile('userModuleElements.json', 'addUserScreen', 'defaultWorkspace');       
        var cancelButton = genericUtils.jsonFile('userModuleElements.json', 'disableUserScreen', 'cancelButton');
        var okButton = genericUtils.jsonFile('userModuleElements.json', 'disableUserScreen', 'okButton');

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

        //Selecting UserName
        userUtils.selectUserName(userName2);
        cy.log('User selected the userName in Username dropdown');

        //Clicking on action menu of user gadget
        cy.get(actionMenu).click();
        cy.log('User click on user action menu');

        //Validate all options in User action menu
        cy.get(addUserOption).should('be.visible');
        cy.log('Add new user option is validated successfully');

        cy.get(disableUserOption).should('be.visible');
        cy.log('Disable user option is validated successfully');

        cy.get(deleteUserOption).should('be.visible');
        cy.log('Delete user option is validated successfully');

        //Re-enable option should be in disabled mode
        cy.get(re_enableUserOption).should('have.attr', 'aria-disabled', 'true');
        cy.log('Re-enabled user option is in disabled mode validated successfully');

        cy.get(refreshOption).should('be.visible');
        cy.log('Refresh option is validated successfully');

        cy.get(helpOption).should('be.visible');
        cy.log('Help option is validated successfully');

        cy.get(addUserOption).click();
        cy.log('Add new user option is clicked successfully');

        //Validate all Elements in add new user window
        cy.get(userNameField).should('be.visible');
        cy.log('UserName field is validated successfully');

        cy.get(loginName).should('be.visible');
        cy.log('LoginName field is validated successfully');

        cy.get(password).should('be.visible');
        cy.log('Password field is validated successfully');

        cy.get(email).should('be.visible');
        cy.log('Email field is validated successfully');

        cy.get(userGroup).should('be.visible');
        cy.log('UserGroup field is validated successfully');

        cy.get(role).should('be.visible');
        cy.log('Role field is validated successfully');

        cy.get(uiLocale).should('be.visible');
        cy.log('UI Locale field is validated successfully');

        cy.get(defaultLanguage).should('be.visible');
        cy.log('DefaultLanguage is validated successfully');

        cy.get(defaultWorkspace).should('be.visible');
        cy.log('DefaultWorkspace field is validated successfully');

        cy.get(cancelButton).should('be.visible');  
        cy.log('Cancel button is validated successfully');

        cy.get(okButton).should('be.visible');//change to disabled
        cy.log('Ok button is validated successfully');

        //Entering all fields in add new user window
        cy.get(userNameField).type(userNameValue);
        cy.get(loginName).type(loginNameValue);
        cy.get(password).type(passwordValue);
        cy.get(email).type(emailValue);
        cy.get(userGroup).select(userGroupName);
        cy.get(role).select(roleValue);
        cy.get(uiLocale).select(uiLocaleValue);
        cy.get(defaultLanguage).select(defaultLanguageValue);
        cy.get(defaultWorkspace).select(workspaceOption);
        cy.log('Successfully entered all fields value');

        //Ok button should get enabled after entering all fields
        cy.get(okButton).should('be.enabled');
        cy.log('Successfully validated apply button is enabled');

        //Clicking on cancel button
        cy.get(cancelButton).should('be.enabled').click();
        cy.log('Successfully clicked on cancel button');

        //Checking user should not be creted under group
        cy.get(userNameDropDown).should('not.have.value', 'CypressTestUser13');
        cy.log('Successfully validated user is not created after clicking on cancel');
        
        //Clicking on action menu option
        cy.get(actionMenu).click();
        cy.log('User click on user action menu');

        //Clicking on add new user option
        cy.get(addUserOption).click();
        cy.log('User successfully clicked on add new user option');

        //Entering value in all fields
        cy.get(userNameField).type(userNameValue);
        cy.get(loginName).type(loginNameValue);
        cy.get(password).type(passwordValue);
        cy.get(email).type(emailValue);
        cy.get(userGroup).select(userGroupName);
        cy.get(uiLocale).select(uiLocaleValue);
        cy.get(role).select(roleValue);
        cy.get(defaultLanguage).select(defaultLanguageValue);
        cy.get(defaultWorkspace).select(workspaceOption);
        cy.log('Successfully entered all fields value in add new user window');

        //Clicking on ok button
        cy.get(okButton).should('be.enabled').click();
        cy.log('Successfully clicked on apply button');

        //User should get created in the corresponding group
        cy.get(userNameDropDown).should('have.value', 'cypress13');
        cy.log('Successfully validated the user in user name dropdown');
        
        //Deleting the created data-Making to original status
        cy.get(actionMenu).click();
        cy.get(deleteUserOption).click();
        cy.get(okButton).should('be.enabled').click();
        cy.get(userHeader).click();

        //Log out from AMI application
        loginUtils.logoutFromAMI();
    });



    it('AMI:1906:51,AMI:1907:52,AMI:1908:53 Enter an existing user name in add new user window and click ok, then error msg should be displayed and click on close icon of error message, and Click on User Group dropdown ,drop down should display all the user groups present along with created user in corresponding group', function () {

        //Retrieving test data
        var userName = genericUtils.csvFile('userData.csv', "LoginName", "value1");
        var workspaceOption = genericUtils.csvFile('userData.csv', "WorkspacesOption", "value1");
        var gadgetName = genericUtils.csvFile('userData.csv', "Gadgets", "value1");
        var userGroupName = genericUtils.csvFile('userData.csv', "UserGroup", "value1");
        var userName2 = genericUtils.csvFile('userData.csv', "UserName", "value1");
        var userNameValue = genericUtils.csvFile('userData.csv', "UserName", "value6");
        var passwordValue = genericUtils.csvFile('userData.csv', "Password", "value1");
        var emailValue = genericUtils.csvFile('userData.csv', "Email_Id", "value4");
        var uiLocaleValue = genericUtils.csvFile('userData.csv', "UI Locale", "value2");
        var roleValue = genericUtils.csvFile('userData.csv', "Role", "value2");
        var defaultLanguageValue = genericUtils.csvFile('userData.csv', "Language", "value1");
        var userNameValue2 = genericUtils.csvFile('userData.csv', "UserName", "value7");
        var loginNameValue2 = genericUtils.csvFile('userData.csv', "LoginName", "value7");

        //Elements retrieving
        var userGroupList = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'userGroupList');
        var userNameDropDown = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'userName');
        var userHeader = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'userHeader');
        var actionMenu = genericUtils.jsonFile('userModuleElements.json', 'userOptions', 'actionMenu');
        var addUserOption = genericUtils.jsonFile('userModuleElements.json', 'userOptions', 'addNewUser');
        var deleteUserOption = genericUtils.jsonFile('userModuleElements.json', 'userOptions', 'deleteUser');
        var userNameField = genericUtils.jsonFile('userModuleElements.json', 'addUserScreen', 'userName');
        var loginName = genericUtils.jsonFile('userModuleElements.json', 'addUserScreen', 'loginName');
        var password = genericUtils.jsonFile('userModuleElements.json', 'addUserScreen', 'password');
        var email = genericUtils.jsonFile('userModuleElements.json', 'addUserScreen', 'email');
        var userGroup = genericUtils.jsonFile('userModuleElements.json', 'addUserScreen', 'userGroup');
        var uiLocale = genericUtils.jsonFile('userModuleElements.json', 'addUserScreen', 'uiLocale');
        var role = genericUtils.jsonFile('userModuleElements.json', 'addUserScreen', 'role');
        var defaultLanguage = genericUtils.jsonFile('userModuleElements.json', 'addUserScreen', 'defaultLanguage');
        var defaultWorkspace = genericUtils.jsonFile('userModuleElements.json', 'addUserScreen', 'defaultWorkspace');
        var errorMsg = genericUtils.jsonFile('userModuleElements.json', 'addUserScreen', 'error');
        var closeErrorIcon = genericUtils.jsonFile('userModuleElements.json', 'addUserScreen', 'closeErrorIcon');
        var okButton = genericUtils.jsonFile('userModuleElements.json', 'disableUserScreen', 'okButton');

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

        //Selecting UserName
        userUtils.selectUserName(userName2);
        cy.log('User selected the userName in Username dropdown');

        //Clicking on action menu of user gadget
        cy.get(actionMenu).click();
        cy.log('User clicked on user action menu');

        //Clicking on add new user option
        cy.get(addUserOption).click();
        cy.log('Add new user option is clicked successfully');

        //Entering values in all fields
        cy.get(userNameField).type(userNameValue);
        cy.get(loginName).type(userName);
        cy.get(password).type(passwordValue);
        cy.get(email).type(emailValue);
        cy.get(userGroup).select(userGroupName);
        cy.get(uiLocale).select(uiLocaleValue);
        cy.get(role).select(roleValue);
        cy.get(defaultLanguage).select(defaultLanguageValue);
        cy.get(defaultWorkspace).select(workspaceOption);
        cy.log('Successfully entered all fields value in add new user window');

        //Clicking on ok button
        cy.get(okButton).should('be.enabled').click();
        cy.log('Successfully clicked on ok button');

        //Error message should get displayed
        cy.get(errorMsg).should('be.visible');
        cy.log('Successfully validated error message popup');

        //Clicking on close icon of error message
        cy.get(closeErrorIcon).click();
        cy.log('Successfully clicked on close icon of error message');

        //Able to clear and enter the new value
        cy.get(loginName).clear().type(userName);
        cy.log('Successfully clear and able to re-nter login name value');
        
        cy.get(userNameField).clear().type(userNameValue2);
        cy.get(loginName).clear().type(loginNameValue2);
        
        //Clicking on ok button
        cy.get(okButton).should('be.enabled').click();
        cy.log('Successfully clicked on ok button');

        //Checking all user group value
        cy.get(userGroupList).then((li) => {
            const allValues = li.text();
            cy.log(allValues);
        });

        //user should get created under the corresponding usergroup
        cy.get(userNameDropDown).should('have.value', 'cypress14');
        cy.get(userNameDropDown).should('contain', 'CypressTestUser14');
        cy.log('Successfully validated created user in username dropdown');

        //Deleting the created data-Making to original status
        cy.get(actionMenu).click();
        cy.get(deleteUserOption).click();
        cy.get(okButton).should('be.enabled').click();
        cy.get(userHeader).click();

        //Log out from AMI application
        loginUtils.logoutFromAMI();
    });
});

