const loginUtils = require('../../../utils/loginUtils');
const changeDropdownUtils = require('../../../utils/changeDropdownUtils');
const userUtils = require('../../../utils/userUtils');
const genericUtils = require('../../../utils/genericUtils');


describe('User Gadget Menu Functionality', function () {

    it('AMI:1901:46,AMI:1902:47,AMI:1903:48,1905:50,AMI:1904:49 User click action menu of user gadget and select add user option and enter all the fields and click on cancel button and select add user option,enter all the fields and click on ok button,', function () {
        //Retrieving test data
        var userName = genericUtils.csvFile('userData.csv', 1, 0);
        var workspaceOption = genericUtils.csvFile('userData.csv', 1, 1);
        var gadgetName = genericUtils.csvFile('userData.csv', 1, 2);
        var userGroupName = genericUtils.csvFile('userData.csv', 1, 3);
        var userName2 = genericUtils.csvFile('userData.csv', 1, 4);

        var userNameValue = genericUtils.csvFile('userData.csv', 6, 4);
        var loginNameValue = genericUtils.csvFile('userData.csv', 3, 0);
        var passwordValue = genericUtils.csvFile('userData.csv', 1, 7);
        var emailValue = genericUtils.csvFile('userData.csv', 4, 6);
        var uiLocaleValue = genericUtils.csvFile('userData.csv', 2, 9);
        var roleValue = genericUtils.csvFile('userData.csv', 2, 8);
        var defaultLanguageValue = genericUtils.csvFile('userData.csv', 1, 10);

        //rerieving elements 
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
        cy.log('User selected the userGroupName in Usergroup dropdown');

        //selecting UserName
        userUtils.selectUserName(userName2);
        cy.log('User selected the userName in Username dropdown');

        //Cliking on action menu of user gadget
        cy.get(actionMenu).click();
        cy.log('User click on user action menu');

        //validate all options in User action menu
        cy.get(addUserOption).should('be.visible');
        cy.log('Add new user option is validated sucessfully');

        cy.get(disableUserOption).should('be.visible');
        cy.log('Disable user option is validated sucessfully');

        cy.get(deleteUserOption).should('be.visible');
        cy.log('Delete user option is validated sucessfully');

        //Re-enable option should be in disabled mode
        cy.get(re_enableUserOption).should('have.attr', 'aria-disabled', 'true');
        cy.log('re-enabled user option is in disabled mode validated successfully');

        cy.get(refreshOption).should('be.visible');
        cy.log('refresh option is validated sucessfully');

        cy.get(helpOption).should('be.visible');
        cy.log('help option is validated sucessfully');

        //new testcase-47
        cy.get(addUserOption).click();
        cy.log('Add new user option is clicked sucessfully');

        //validate all Elements in add new user window
        cy.get(userNameField).should('be.visible');
        cy.log('userNameField is validated sucessfully');

        cy.get(loginName).should('be.visible');
        cy.log('loginName field is validated sucessfully');

        cy.get(password).should('be.visible');
        cy.log('password field is validated sucessfully');

        cy.get(email).should('be.visible');
        cy.log('email field is validated sucessfully');

        cy.get(userGroup).should('be.visible');
        cy.log('userGroup field is validated sucessfully');

        cy.get(role).should('be.visible');
        cy.log('role field is validated sucessfully');

        cy.get(uiLocale).should('be.visible');
        cy.log('uiLocale field is validated sucessfully');

        cy.get(defaultLanguage).should('be.visible');
        cy.log('defaultLanguage is validated sucessfully');

        cy.get(defaultWorkspace).should('be.visible');
        cy.log('defaultWorkspace field is validated sucessfully');

        cy.get(cancelButton).should('be.visible');  
        cy.log('cancelButton is validated sucessfully');

        cy.get(okButton).should('be.visible');//change to disabled
        cy.log('okButton is validated sucessfully');

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
        cy.log('successfully entered all fields value');

        //ok button should get enabled after entering all fields
        cy.get(okButton).should('be.enabled');
        cy.log('successfully validated apply button is enabled');

        //Cliking on cancel button
        cy.get(cancelButton).should('be.enabled').click();
        cy.log('successfully clicked on cancel button');

        //Checking user should not be creted under group
        cy.get(userNameDropDown).should('not.have.value', 'CypressTestUser13');
        cy.log('successfully validated user is not created after clicking on cancel');
        
        //Entering all fields in add new user window
        cy.get(actionMenu).click();
        cy.log('User click on user action menu');

        //clicking on add new user option
        cy.get(addUserOption).click();
        cy.log('user successfully clicked on add new user option');

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
        cy.log('successfully entered all fields value in add new user window');

        //Clicking on ok button
        cy.get(okButton).should('be.enabled').click();
        cy.log('successfully clicked on apply button');

        //User should get created in the corresponding group
        cy.get(userNameDropDown).should('have.value', 'cypress13');
        cy.log('successfully validated the user in user name dropdown');
        
        //Deleting the created data-Making to original status
        cy.get(actionMenu).click();
        cy.get(deleteUserOption).click();
        cy.get(okButton).should('be.enabled').click();
        cy.get(userHeader).click();

        //Log out from AMI application
        loginUtils.logoutFromAMI();
    });



    it('AMI:1906:51,AMI:1907:52 Enter an existing user name in add new user window and click ok, then error msg should be displayed and click on close icon of error message, and Click on User Group dropdown ,drop down should display all the user groups present along with created user in corresponding group', function () {
        //Retrieving test data
        var userName = genericUtils.csvFile('userData.csv', 1, 0);
        var workspaceOption = genericUtils.csvFile('userData.csv', 1, 1);
        var gadgetName = genericUtils.csvFile('userData.csv', 1, 2);
        var userGroupName = genericUtils.csvFile('userData.csv', 1, 3);
        var userName2 = genericUtils.csvFile('userData.csv', 1, 4);
        var userNameValue = genericUtils.csvFile('userData.csv', 6, 4);
        var passwordValue = genericUtils.csvFile('userData.csv', 1, 7);
        var emailValue = genericUtils.csvFile('userData.csv', 4, 6);
        var uiLocaleValue = genericUtils.csvFile('userData.csv', 2, 9);
        var roleValue = genericUtils.csvFile('userData.csv', 2, 8);
        var defaultLanguageValue = genericUtils.csvFile('userData.csv', 1, 10);

        var userNameValue2 = genericUtils.csvFile('userData.csv', 7, 4);
        var loginNameValue2 = genericUtils.csvFile('userData.csv', 7, 0);

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
        cy.log('User selected the userGroupName in Usergroup dropdown');

        //selecting UserName
        userUtils.selectUserName(userName2);
        cy.log('User selected the userName in Username dropdown');

        //Cliking on action menu of user gadget
        cy.get(actionMenu).click();
        cy.log('User clicked on user action menu');

        //clicking on add new user option
        cy.get(addUserOption).click();
        cy.log('Add new user option is clicked sucessfully');

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
        cy.log('successfully entered all fields value in add new user window');

        //Clicking on ok button
        cy.get(okButton).should('be.enabled').click();
        cy.log('successfully clicked on ok button');

        //error message should get displayed
        cy.get(errorMsg).should('be.visible');
        cy.log('successfully validated error message popup');

        //Clicking on close icon of error message
        cy.get(closeErrorIcon).click();
        cy.log('successfully clicked on close icon of error message');


        //Able to clear and enter the new value
        cy.get(loginName).clear().type(userName);
        cy.log('successfully clear and able to renter login name value');
        
        cy.get(userNameField).clear().type(userNameValue2);
        cy.get(loginName).clear().type(loginNameValue2);
        
        //Clicking on ok button
        cy.get(okButton).should('be.enabled').click();
        cy.log('successfully clicked on ok button');

        //Ckecking all user group value
        cy.get(userGroupList).then((li) => {
            const allValues = li.text();
            cy.log(allValues);
        });

        //user should get created under the corresponding group
        cy.get(userNameDropDown).should('have.value', 'cypress14');
        cy.get(userNameDropDown).should('contain', 'CypressTestUser14');
        cy.log('successfully validated created user in username dropdown');

        //Deleting the created data-Making to original status
        cy.get(actionMenu).click();
        cy.get(deleteUserOption).click();
        cy.get(okButton).should('be.enabled').click();
        cy.get(userHeader).click();

        //Log out from AMI application
        loginUtils.logoutFromAMI();


    });
});

