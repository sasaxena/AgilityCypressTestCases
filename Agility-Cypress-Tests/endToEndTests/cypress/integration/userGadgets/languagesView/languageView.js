const loginUtils = require('../../../utils/loginUtils');
const changeDropdownUtils = require('../../../utils/changeDropdownUtils');
const userUtils = require('../../../utils/userUtils');
const genericUtils = require('../../../utils/genericUtils');


describe('Language View functionality', function () {
    it('AMI:1885:30 Check for list of all available languages and default language dropdown after clicking on language section', function () {

        //Retrieving test data
        var userName = genericUtils.csvFile('userData.csv', "LoginName", "value1");
        var workspaceOption = genericUtils.csvFile('userData.csv', "WorkspacesOption", "value1");
        var gadgetName = genericUtils.csvFile('userData.csv', "Gadgets", "value1");
        var userGroupName = genericUtils.csvFile('userData.csv', "UserGroup", "value1");
        var userName2 = genericUtils.csvFile('userData.csv', "UserName", "value1");
        
        //Retrieving elements 
        var languageHeaderElement = genericUtils.jsonFile('userModuleElements.json', 'languageScreen', 'languageHeaderElement');
        var defaultLanguageDropdown = genericUtils.jsonFile('userModuleElements.json', 'languageScreen', 'defaultLanguageDropdown');
        var allLanguageCheckbox = genericUtils.jsonFile('userModuleElements.json', 'languageScreen', 'languageCheckboxList');
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

        //Selecting UserName
        userUtils.selectUserName(userName2);
        cy.log('User selected the userName option in Username dropdown');
        cy.wait(timeOut);
        
        //Expanding language section
        cy.get(languageHeaderElement).click();
        cy.log('User successfully Expanded language section');
        
        for (var i = 0; i <= 9; i++) {
            cy.get(allLanguageCheckbox).eq(i).then(($btn) => {
                var values = $btn.text();
                cy.log(values);
            });
        }
        //Validating default language dropdown element
        cy.get(defaultLanguageDropdown).should('be.visible');
        cy.log('User successfully viewed default language dropdown');
     
        //Log out from AMI application
        loginUtils.logoutFromAMI();
    });
    
    it('AMI:1886:31,AMI:1887:32 language which are checked should come up in Default language drop-down, Also Apply and Cancel button should get enabled and After clicking on cancel button the selected languages in default language dropdown should be removed and in language list checked languages should become unchecked.', function () {

        //Retrieving test data
        var userName = genericUtils.csvFile('userData.csv', "LoginName", "value1");
        var workspaceOption = genericUtils.csvFile('userData.csv', "WorkspacesOption", "value1");
        var gadgetName = genericUtils.csvFile('userData.csv', "Gadgets", "value1");
        var userGroupName = genericUtils.csvFile('userData.csv', "UserGroup", "value1");
        var userName2 = genericUtils.csvFile('userData.csv', "UserName", "value2");
        var langauageCheckboxName1 = genericUtils.csvFile('userData.csv', "Language", "value3");
        var langauageCheckboxName2 = genericUtils.csvFile('userData.csv', "Language", "value4");

        //Retrieving elements 
        var languageHeaderElement = genericUtils.jsonFile('userModuleElements.json', 'languageScreen', 'languageHeaderElement');
        var allLanguageCheckbox = genericUtils.jsonFile('userModuleElements.json', 'languageScreen', 'languageCheckboxList');
        var defaultLanguageDropdown = genericUtils.jsonFile('userModuleElements.json', 'languageScreen', 'defaultLanguageDropdown');
        var applyButton = genericUtils.jsonFile('userModuleElements.json', 'workspaceScreen', 'applyButton');
        var cancelButton = genericUtils.jsonFile('userModuleElements.json', 'workspaceScreen', 'cancelButton');
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

        //Selecting UserName
        userUtils.selectUserName(userName2);
        cy.log('User selected the userName option in Username dropdown');
        cy.wait(timeOut);
        
        //Expanding language section
        cy.get(languageHeaderElement).click();
        cy.log('User successfully Expanded Workspace section');

        //Check few languages checkboxes in language list
        userUtils.checkLanguageCheckbox(langauageCheckboxName1);
        userUtils.checkLanguageCheckbox(langauageCheckboxName2);
        
        //Checking checked option in default language
        cy.get(defaultLanguageDropdown).should('contain', 'French');
        cy.get(defaultLanguageDropdown).should('contain', 'Test Child Language');
        cy.log('Successfully validated checked checkboxes in default language dropdown');

        //Checking apply button should be enabled
        cy.get(applyButton).should('be.enabled');

        //Checking Cancel button should be enabled
        cy.get(cancelButton).should('be.enabled');
        cy.log('Apply and cancel button enabled');

        //Clicking on cancel button
        cy.get(cancelButton).should('be.enabled').click();
        cy.log('Clicked on cancel button');

        //Checking checked language checkboxes should not present in default language dropdown after clicking on cancel button
        cy.get(defaultLanguageDropdown).should('not.be.contain', langauageCheckboxName1);
        cy.get(defaultLanguageDropdown).should('not.be.contain', langauageCheckboxName2);
        cy.log('Checked checkboxes is not present in default language dropdown after clicking on cancel');
        cy.wait(timeOut);
       
        userUtils.validateUncheckCheckbox(allLanguageCheckbox, langauageCheckboxName1);
        userUtils.validateUncheckCheckbox(allLanguageCheckbox, langauageCheckboxName2);
        cy.log('Validated checkboxes should be unchek');
       
        //Log out from AMI application
        loginUtils.logoutFromAMI();
        cy.log('Logout from AMI');
    });

    it('AMI:1888:33 The checked languages should be present in default language drop - down and the languages should remain checked in language list.', function () {
        //Retrieving test data
        var userName = genericUtils.csvFile('userData.csv', "LoginName", "value1");
        const workspaceOption = genericUtils.csvFile('userData.csv', "WorkspacesOption", "value1");
        var gadgetName = genericUtils.csvFile('userData.csv', "Gadgets", "value1");
        var userGroupName = genericUtils.csvFile('userData.csv', "UserGroup", "value1");
        var userName2 = genericUtils.csvFile('userData.csv', "UserName", "value2");
        var langauageCheckboxName1 = genericUtils.csvFile('userData.csv', "Language", "value3");
        var langauageCheckboxName2 = genericUtils.csvFile('userData.csv', "Language", "value4");
       
        //Retrieving elements
        var userHeader = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'userHeader');
        var languageHeaderElement = genericUtils.jsonFile('userModuleElements.json', 'languageScreen', 'languageHeaderElement');
        var allLanguageCheckbox = genericUtils.jsonFile('userModuleElements.json', 'languageScreen', 'languageCheckboxList');
        var defaultLanguageDropdown = genericUtils.jsonFile('userModuleElements.json', 'languageScreen', 'defaultLanguageDropdown');
        var applyButton = genericUtils.jsonFile('userModuleElements.json', 'workspaceScreen', 'applyButton');
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

        //Selecting Username
        userUtils.selectUserName(userName2);
        cy.log('User selected the userName in Username dropdown');

        //Expanding language section
        cy.wait(timeOut);
        cy.get(languageHeaderElement).click();
        
        userUtils.validateUncheckCheckbox(allLanguageCheckbox, langauageCheckboxName1);
        userUtils.validateUncheckCheckbox(allLanguageCheckbox, langauageCheckboxName2);

        //Checking few language checkboxes
        userUtils.checkLanguageCheckbox(langauageCheckboxName1);
        userUtils.checkLanguageCheckbox(langauageCheckboxName2);
        cy.log('Checkboxes checked successfully');

        //Clicking on apply button
        cy.get(applyButton).should('be.enabled').click();
        cy.log('Successfully clicked on apply button');

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

        //Expanding language section
        cy.wait(timeOut);
       
        //Checking checked language option are present in default language dropdown
        cy.get(defaultLanguageDropdown).should('contain', 'French');
        cy.get(defaultLanguageDropdown).should('contain', 'Test Child Language');
        cy.log('Validated checked language option are present in default language dropdown');

        //Validated checked language checkboxes should be checked
        userUtils.validateCheckedCheckbox(allLanguageCheckbox, langauageCheckboxName1);
        userUtils.validateCheckedCheckbox(allLanguageCheckbox, langauageCheckboxName2);
        cy.log('Validated checked language checkboxes should be checked');

        //Making the previous state
        userUtils.uncheckLanguageCheckbox(langauageCheckboxName1);
        userUtils.uncheckLanguageCheckbox(langauageCheckboxName2);
        cy.get(applyButton).should('be.enabled').click();

        cy.get(userHeader).click();
        //Log out from AMI application
        loginUtils.logoutFromAMI();
        cy.log('Logout from AMI');
    });

    it('AMI:1884:34 Check few languages ,click on Apply button then languages comes up in Default language drop-down select any language from the drop-down and click on Apply button.', function () {

        //Retrieving test data
        var userName = genericUtils.csvFile('userData.csv', "LoginName", "value1");
        const workspaceOption = genericUtils.csvFile('userData.csv', "WorkspacesOption", "value1");
        var gadgetName = genericUtils.csvFile('userData.csv', "Gadgets", "value1");
        var userGroupName = genericUtils.csvFile('userData.csv', "UserGroup", "value1");
        var userName2 = genericUtils.csvFile('userData.csv', "UserName", "value2");
        var languageOption = genericUtils.csvFile('userData.csv', "Language", "value1");
        var dropDownName = genericUtils.csvFile('userData.csv', "Language", "value5");
        var langauageCheckboxName1 = genericUtils.csvFile('userData.csv', "Language", "value5");
        var langauageCheckboxName2 = genericUtils.csvFile('userData.csv', "Language", "value6");
        
        //Retrieving elements 
        var languageHeaderElement = genericUtils.jsonFile('userModuleElements.json', 'languageScreen', 'languageHeaderElement');
        var defaultLanguageDropdown = genericUtils.jsonFile('userModuleElements.json', 'languageScreen', 'defaultLanguageDropdown');
        var applyButton = genericUtils.jsonFile('userModuleElements.json', 'workspaceScreen', 'applyButton');
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

        //Selecting Username
        userUtils.selectUserName(userName2);
        cy.log('User selected the userName in Username dropdown');

        //Expanding language section
        cy.wait(timeOut);
        cy.get(languageHeaderElement).click();

        //Checking language checkboxes
        userUtils.checkLanguageCheckbox(langauageCheckboxName1);
        userUtils.checkLanguageCheckbox(langauageCheckboxName2);
        cy.log('Successfully checked few language checkboxes');

        //Cliking on apply button
        cy.get(applyButton).should('be.enabled').click();
        cy.log('Successfully clicked on apply button');

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

        //Expanding language section
        cy.wait(timeOut);
        cy.get(defaultLanguageDropdown).should('contain', 'Yorkshire');
        cy.get(defaultLanguageDropdown).should('contain', 'Estonian');
        cy.log('Successfully validated checked language checkboxes present in default language dropdown');
        cy.wait(timeOut);

        //Selecting another option in default language dropdown
        cy.get(defaultLanguageDropdown, { timeout: avg }).select(dropDownName);
        cy.log('Successfully selected another option in default language dropdown');

        //Clicking on apply button
        cy.get(applyButton).should('be.enabled').click();
        cy.log('Successfully clicked on apply button');

        //Checking selected option becomes default language
        cy.get(defaultLanguageDropdown).find(':selected').contains(dropDownName);
        cy.log('Validated successfully selected option becomes default language');

        //Making previous state
        cy.wait(timeOut);
        cy.get(defaultLanguageDropdown, { timeout: avg }).select(languageOption);
        userUtils.uncheckLanguageCheckbox(langauageCheckboxName1);
        userUtils.uncheckLanguageCheckbox(langauageCheckboxName2);
        
        cy.get(applyButton).should('be.enabled').click();
        //Log out from AMI application
        //loginUtils.logoutFromAMI();
    });

    it('AMI:1885:35,AMI:1886:36,AMI:1887:37 Check few languages and Click on Apply then languages comes up in Default language.Select any language from drop-down and click on Cancel and uncheck few language,click on cancel and uncheck few language and click on apply', function () {
        //Retrieving test data
        var userName = genericUtils.csvFile('userData.csv', "LoginName", "value1");
        var workspaceOption = genericUtils.csvFile('userData.csv', "WorkspacesOption", "value1");
        var gadgetName = genericUtils.csvFile('userData.csv', "Gadgets", "value1");
        var userGroupName = genericUtils.csvFile('userData.csv', "UserGroup", "value1");
        var userName2 = genericUtils.csvFile('userData.csv', "UserName", "value2");
        var languageOption2 = genericUtils.csvFile('userData.csv', "Language", "value7");
        var languageOption3 = genericUtils.csvFile('userData.csv', "Language", "value8");
        var languageOption4 = genericUtils.csvFile('userData.csv', "Language", "value10");
        var dropDownName = genericUtils.csvFile('userData.csv', "Language", "value10");

        //Retrieving elements 
        var languageHeaderElement = genericUtils.jsonFile('userModuleElements.json', 'languageScreen', 'languageHeaderElement');
        var defaultLanguageDropdown = genericUtils.jsonFile('userModuleElements.json', 'languageScreen', 'defaultLanguageDropdown');
        var applyButton = genericUtils.jsonFile('userModuleElements.json', 'workspaceScreen', 'applyButton');
        var cancelButton = genericUtils.jsonFile('userModuleElements.json', 'workspaceScreen', 'cancelButton');
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

        //Selecting Username
        userUtils.selectUserName(userName2);
        cy.log('User selected the userName in Username dropdown');

        //Expanding language section
        cy.wait(timeOut);
        cy.get(languageHeaderElement).click();
        cy.log('Successfully clicked on language header section');

        //Checking language checkboxes-
        userUtils.checkLanguageCheckbox(languageOption2);
        userUtils.checkLanguageCheckbox(languageOption3);
        userUtils.checkLanguageCheckbox(languageOption4);
        cy.log('Successfully checked few language checkboxes');

        //Clicking on apply button
        cy.get(applyButton).should('be.enabled').click();
        cy.log('Successfully clicked on apply button');

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

        //Expanding language section
        cy.wait(timeOut);
        //Checked language checkbox should present in default language dropdown
        cy.get(defaultLanguageDropdown).should('contain', 'Korean');
        cy.get(defaultLanguageDropdown).should('contain', 'Ripon');
        cy.get(defaultLanguageDropdown).should('contain', 'Canadian French');
        cy.log('Validated successfully checked language checkboxes present in default language dropdown');

        //Selecting another option in default language dropdown
        cy.get(defaultLanguageDropdown, { timeout: avg }).select(dropDownName);
        cy.log('Successfully selected another option in default language dropdown');

        //Clicking on cancel button
        cy.get(cancelButton).should('be.enabled').click();
        cy.log('Successfully clicked on cancel button');

        cy.get(defaultLanguageDropdown).then((option) => {
            const allValues = option.find(':selected').text();
            cy.log(allValues);
            if (allValues != dropDownName) {
                cy.log('Defaut language is not changed');
            }
        });
        //Uncheck few language checkbox
        userUtils.uncheckLanguageCheckbox(languageOption2);
        userUtils.uncheckLanguageCheckbox(languageOption3);
        cy.log('Successfully unchecked few language checkboxes');

        //Click on cancel button
        cy.get(cancelButton).should('be.enabled').click();
        cy.log('Successfully clicked on cancel button');

        //Language should not get removed from default language dropdown
        cy.get(defaultLanguageDropdown).should('contain', 'Korean');
        cy.get(defaultLanguageDropdown).should('contain', 'Ripon');
        cy.log('Successfully validated language should not get removed from default language dropdown');

        //Unchecking few language checkbox
        userUtils.uncheckLanguageCheckbox(languageOption2);
        userUtils.uncheckLanguageCheckbox(languageOption3);
        userUtils.uncheckLanguageCheckbox(languageOption4);
        cy.log('Successfully unchecked few language checkboxes');

        //Click on apply button
        cy.get(applyButton).should('be.enabled').click();
        cy.log('Successfully clicked on apply button');

        //Clicking on user Gadget
        userUtils.selectGadget(gadgetName);
        cy.log('User clicked on User gadget');

        //Selecting Admin user group
        userUtils.selectUserGroup(userGroupName);
        cy.log('User selected the userGroupName in Usergroup dropdown');

        //Selecting UserName
        userUtils.selectUserName(userName2);
        cy.log('User selected the userName in Username dropdown');

        //Expanding language section
        cy.wait(timeOut);
      
        //Unchecked language checkboxes get removed from default language dropdown
        cy.get(defaultLanguageDropdown).should('not.have.value', languageOption2);
        cy.get(defaultLanguageDropdown).should('not.have.value', languageOption3);
        cy.get(defaultLanguageDropdown).should('not.have.value', languageOption4);
        cy.log('Unchecked language checkboxes get removed from default dropdown');

        //Log out from AMI application
        loginUtils.logoutFromAMI();
        cy.log('Successfully logout from AMI');
    });
});