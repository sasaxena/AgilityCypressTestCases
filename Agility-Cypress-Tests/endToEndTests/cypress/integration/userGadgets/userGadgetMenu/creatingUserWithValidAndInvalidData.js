const loginUtils = require('../../../utils/loginUtils');
const changeDropdownUtils = require('../../../utils/changeDropdownUtils');
const userUtils = require('../../../utils/userUtils');
const genericUtils = require('../../../utils/genericUtils');



describe('User gadget menu functionality', function () {
    

    it('AMI:1909:54,AMI:1910:55,AMI:1911:56 Click on role drop down,drop down should contain Administrator,standard,Viewer,supplier and click on UI locale,dropdown should display list of locals and Click on Language dropdown,drop down should display all languages present in the Database', function () {
        //Retrieving test data
        var userName = genericUtils.csvFile('userData.csv', 1, 0);
        var workspaceOption = genericUtils.csvFile('userData.csv', 1, 1);
        var gadgetName = genericUtils.csvFile('userData.csv', 1, 2);
        var userGroupName = genericUtils.csvFile('userData.csv', 1, 3);
        var userName2 = genericUtils.csvFile('userData.csv', 1, 4);

        var actionMenu = genericUtils.jsonFile('userModuleElements.json', 'userOptions', 'actionMenu');
        var addUserOption = genericUtils.jsonFile('userModuleElements.json', 'userOptions', 'addNewUser');
        var role = genericUtils.jsonFile('userModuleElements.json', 'addUserScreen', 'role');
        var uiLocale = genericUtils.jsonFile('userModuleElements.json', 'addUserScreen', 'uiLocale');
        var defaultLanguage = genericUtils.jsonFile('userModuleElements.json', 'addUserScreen', 'defaultLanguage');
        var cancelButton = genericUtils.jsonFile('userModuleElements.json', 'disableUserScreen', 'cancelButton');
        
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
        cy.log('User selected the userGroupName option in Usergroup');

        //selecting UserName
        userUtils.selectUserName(userName2);
        cy.log('User selected the userName option in Username');

        //Clicking on user action menu
        cy.get(actionMenu).click();
        cy.log('User clicked on user action menu');

        //Clicking on add new user option
        cy.get(addUserOption).click();
        cy.log('Add new user option is clicked sucessfully');

       
        var i;
        //Checking all the available role options 
        for (i = 0; i < 4; i++) {
           
            cy.get(role).find('option').eq(i).then(($btn) => {
                var values = ($btn.text());
                cy.log(values + '-option present in role dropdown');
                 
              
            });
        }

        //Checking all the available UI locale options 
        cy.get(uiLocale).find('option').then((li) => {
            var allValues = li.text();
            cy.log(allValues);
            expect(li).to.have.length(353);
        });
        
      
        //Checking all the available language options 
        cy.get(defaultLanguage).find('option').then((li) => {
            var allValues = li.text();
            cy.log(allValues);
            expect(li).to.have.length(10);
        });


        cy.get(cancelButton).should('be.enabled').click();
        //Log out from AMI application
        loginUtils.logoutFromAMI();

    });

    it('AMI:1913:58 Enteran invalid format Email in add new user window and click on ok,then error msg should display.', function () {

        var userName = genericUtils.csvFile('userData.csv', 1, 0);
        var workspaceOption = genericUtils.csvFile('userData.csv', 1, 1);
        var gadgetName = genericUtils.csvFile('userData.csv', 1, 2);
        var userGroupName = genericUtils.csvFile('userData.csv', 1, 3);
        var userName2 = genericUtils.csvFile('userData.csv', 1, 4);
        var userNameValue = genericUtils.csvFile('userData.csv', 6, 4);
        var loginNameValue = genericUtils.csvFile('userData.csv', 3, 0);
        var passwordValue = genericUtils.csvFile('userData.csv', 1, 7);
        var emailValue = genericUtils.csvFile('userData.csv', 3, 6);  //invalid format
        var uiLocaleValue = genericUtils.csvFile('userData.csv', 2, 9);
        var roleValue = genericUtils.csvFile('userData.csv', 2, 8);
        var defaultLanguageValue = genericUtils.csvFile('userData.csv', 1, 10);

        var actionMenu = genericUtils.jsonFile('userModuleElements.json', 'userOptions', 'actionMenu');
        var addUserOption = genericUtils.jsonFile('userModuleElements.json', 'userOptions', 'addNewUser');

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
        var cancelButton = genericUtils.jsonFile('userModuleElements.json', 'disableUserScreen', 'cancelButton');
        
        //login to AMI
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
        
        //clicking on user action menu
        cy.get(actionMenu).click();
        cy.log('successfully clicked on user action menu');

        cy.get(addUserOption).click();
        cy.log('Add new user option is clicked sucessfully');

        //Entering the value in fields along with invalid email format
        cy.get(userNameField).type(userNameValue);
        cy.get(loginName).type(loginNameValue);
        cy.get(password).type(passwordValue);
        cy.get(email).type(emailValue);
        cy.get(userGroup).select(userGroupName);
        cy.get(role).select(roleValue);
        cy.get(uiLocale).select(uiLocaleValue);
        cy.get(defaultLanguage).select(defaultLanguageValue);
        cy.get(defaultWorkspace).select(workspaceOption);
        cy.log('successfully entered all value with invalid email format value in add new user window');

        //clicking on ok button
        cy.get(okButton).should('be.enabled').click();
        cy.log('successfully cliked on ok button');

        //error message should get displayed
        cy.get(errorMsg).should('be.visible');
        cy.log('sucessfully validated error message popup');

        //cliccking on close icon of error msg
        cy.get(closeErrorIcon).click();
        cy.log('sucessfully clicked on close icon of error message popup');

        cy.get(cancelButton).should('be.enabled').click();

        //Log out from AMI application
        loginUtils.logoutFromAMI();

        
    });

    it('AMI:1914:59,AMI:1915:60 Enter all the details in Add New User with space in the Password field. Click Ok then validation should be passed and enter space in the User Name and Login Name field. Click Ok then validation should be passed.', function () {

        var userName = genericUtils.csvFile('userData.csv', 1, 0);
        var workspaceOption = genericUtils.csvFile('userData.csv', 1, 1);
        var gadgetName = genericUtils.csvFile('userData.csv', 1, 2);
        var userGroupName = genericUtils.csvFile('userData.csv', 1, 3);
        var userName2 = genericUtils.csvFile('userData.csv', 1, 4);
        var userNameValue1 = genericUtils.csvFile('userData.csv', 8, 4);
        var loginNameValue1 = genericUtils.csvFile('userData.csv', 8, 0);
        var passwordValue1 = genericUtils.csvFile('userData.csv', 2, 7); //Enter spaces in pass field
        var emailValue1 = genericUtils.csvFile('userData.csv', 5, 6);
        var uiLocaleValue = genericUtils.csvFile('userData.csv', 2, 9);
        var roleValue = genericUtils.csvFile('userData.csv', 2, 8);
        var defaultLanguageValue = genericUtils.csvFile('userData.csv', 1, 10);
        var userNameValue2 = genericUtils.csvFile('userData.csv', 9, 4);
        var loginNameValue2 = genericUtils.csvFile('userData.csv', 9, 0);
        var passwordValue2 = genericUtils.csvFile('userData.csv', 1, 7);
        var emailValue2 = genericUtils.csvFile('userData.csv', 6, 6);

        var userNameDropDown = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'userName');
        var userHeader = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'userHeader');
        var actionMenu = genericUtils.jsonFile('userModuleElements.json', 'userOptions', 'actionMenu');
        var deleteUserOption = genericUtils.jsonFile('userModuleElements.json', 'userOptions', 'deleteUser');
        var addUserOption = genericUtils.jsonFile('userModuleElements.json', 'userOptions', 'addNewUser');

        var userNameField = genericUtils.jsonFile('userModuleElements.json', 'addUserScreen', 'userName');
        var loginName = genericUtils.jsonFile('userModuleElements.json', 'addUserScreen', 'loginName');
        var password = genericUtils.jsonFile('userModuleElements.json', 'addUserScreen', 'password');
        var email = genericUtils.jsonFile('userModuleElements.json', 'addUserScreen', 'email');
        var userGroup = genericUtils.jsonFile('userModuleElements.json', 'addUserScreen', 'userGroup');
        var uiLocale = genericUtils.jsonFile('userModuleElements.json', 'addUserScreen', 'uiLocale');
        var role = genericUtils.jsonFile('userModuleElements.json', 'addUserScreen', 'role');
        var defaultLanguage = genericUtils.jsonFile('userModuleElements.json', 'addUserScreen', 'defaultLanguage');
        var defaultWorkspace = genericUtils.jsonFile('userModuleElements.json', 'addUserScreen', 'defaultWorkspace');
        var okButton = genericUtils.jsonFile('userModuleElements.json', 'disableUserScreen', 'okButton');

        //login to AMI
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
        cy.log('User selected the userGroupName in userGroup dropdown');


        //selecting UserName
        userUtils.selectUserName(userName2);
        cy.log('User selected the userName in Username dropdown');

        //clicking on user action menu
        cy.get(actionMenu).click();
        cy.log('successfully clicked on user action menu');

        //clicking on add new user option
        cy.get(addUserOption).click();
        cy.log('Add new user option is clicked sucessfully');

        // Creating cypress13-login Name
        //entering value in all fields
        cy.get(userNameField).type(userNameValue1);
        cy.get(loginName).type(loginNameValue1);
        cy.get(password).type(passwordValue1);//entering spaces in password field
        cy.get(email).type(emailValue1);
        cy.get(userGroup).select(userGroupName);
        cy.get(role).select(roleValue);
        cy.get(uiLocale).select(uiLocaleValue);
        cy.get(defaultLanguage).select(defaultLanguageValue);
        cy.get(defaultWorkspace).select(workspaceOption);
        cy.log('successfully entered all values with spaces in password field in add new user window');
        
        //clicking on ok button
        cy.get(okButton).should('be.enabled').click();
        cy.log('successfully cliked on ok button');

        //user should get created in the corressponding group
        cy.get(userNameDropDown).should('contain', 'CypressTestUser15');
        cy.log('successfully validated the created user in username dropdown');
        
        //clicking on user action menu
        cy.get(actionMenu).click();
        cy.log('successfully clicked on user action menu');

        //clicking on add new user option
        cy.get(addUserOption).click();
        cy.log('Add new user option is clicked sucessfully');

        //entering value in all fields
        cy.get(userNameField).type(userNameValue2); //spaces in user name field
        cy.get(loginName).type(loginNameValue2);  //spaces in login name field
        cy.get(password).type(passwordValue2);
        cy.get(email).type(emailValue2);
        cy.get(userGroup).select(userGroupName);
        cy.get(role).select(roleValue);
        cy.get(uiLocale).select(uiLocaleValue);
        cy.get(defaultLanguage).select(defaultLanguageValue);
        cy.get(defaultWorkspace).select(workspaceOption);
        cy.log('successfully entered all values with spaces in username and loginname field in add new user window');

        //clicking on ok button
        cy.get(okButton).should('be.enabled').click();
        cy.log('successfully clicked on ok button');

        //user should get created in the corressponding group
        cy.get(userNameDropDown).should('contain', 'Cypress Test User16');
        cy.log('created user validated successfully in username dropdown');

        //Deleting created user-Making previous state
        cy.get(actionMenu).click();
        cy.get(deleteUserOption).click();
        cy.get(okButton).should('be.enabled').click();
        cy.get(userHeader).click();
        cy.get(userNameDropDown).select(userNameValue1);
        cy.get(actionMenu).click();
        cy.get(deleteUserOption).click();
        cy.get(okButton).should('be.enabled').click();
        cy.get(userHeader).click();
        
        //Log out from AMI application
        loginUtils.logoutFromAMI();



    });



});



