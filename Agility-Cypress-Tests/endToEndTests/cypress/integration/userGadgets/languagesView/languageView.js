const loginUtils = require('../../../utils/loginUtils');
const changeDropdownUtils = require('../../../utils/changeDropdownUtils');
const userUtils = require('../../../utils/userUtils');
const genericUtils = require('../../../utils/genericUtils');


describe('Language View functionality', function () {


    it('AMI:1885:30 language which are checked should come up in Default language drop-down, Also Apply and Cancel button should get enabled.', function () {

        //Retrieving test data
        var userName = genericUtils.csvFile('userData.csv', 1, 0);
        var workspaceOption = genericUtils.csvFile('userData.csv', 1, 1);
        var gadgetName = genericUtils.csvFile('userData.csv', 1, 2);
        var userGroupName = genericUtils.csvFile('userData.csv', 1, 3);
        var userName2 = genericUtils.csvFile('userData.csv', 1, 4);
        
        //rerieving elements 
        var languageHeaderElement = genericUtils.jsonFile('userModuleElements.json', 'languageScreen', 'languageHeaderElement');
        var defaultLanguageDropdown = genericUtils.jsonFile('userModuleElements.json', 'languageScreen', 'defaultLanguageDropdown');
        var allLanguageCheckbox = genericUtils.jsonFile('userModuleElements.json', 'languageScreen', 'languageCheckboxList');
        var timeOut = genericUtils.jsonFile('configEnvironment.json', 'timeout', 'min');

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
        cy.log('User selected the userName option in Username dropdown');
        userUtils.waitForObject(timeOut);

        //Expanding language section
        cy.get(languageHeaderElement).click();
        cy.log('User sucessfully Expanded language section');
        
        for (var i = 0; i <= 9; i++) {
            cy.get(allLanguageCheckbox).eq(i).then(($btn) => {
                var values = $btn.text();
               
                cy.log(values);
            });
        }

        
        cy.get(defaultLanguageDropdown).should('be.visible');
        cy.log('User sucessfully viewed default language dropdown');
        

        //Log out from AMI application
        loginUtils.logoutFromAMI();
    });



    it('AMI:1886:31,AMI:1887:32 language which are checked should come up in Default language drop-down, Also Apply and Cancel button should get enabled.', function () {

        //Retrieving test data
        var userName = genericUtils.csvFile('userData.csv', 1, 0);
        var workspaceOption = genericUtils.csvFile('userData.csv', 1, 1);
        var gadgetName = genericUtils.csvFile('userData.csv', 1, 2);
        var userGroupName = genericUtils.csvFile('userData.csv', 1, 3);
        var userName2 = genericUtils.csvFile('userData.csv', 2, 4);
        
        //rerieving elements 
        var languageHeaderElement = genericUtils.jsonFile('userModuleElements.json', 'languageScreen', 'languageHeaderElement');
        var allLanguageCheckbox = genericUtils.jsonFile('userModuleElements.json', 'languageScreen', 'languageCheckboxList');
        var defaultLanguageDropdown = genericUtils.jsonFile('userModuleElements.json', 'languageScreen', 'defaultLanguageDropdown');
        var applyButton = genericUtils.jsonFile('userModuleElements.json', 'workspaceScreen', 'applyButton');
        var cancelButton = genericUtils.jsonFile('userModuleElements.json', 'workspaceScreen', 'cancelButton');
        var timeOut = genericUtils.jsonFile('configEnvironment.json', 'timeout', 'min');

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
        cy.log('User selected the userName option in Username dropdown');
        userUtils.waitForObject(timeOut);

        //Expanding language section
        cy.get(languageHeaderElement).click();
        cy.log('User sucessfully Expanded Workspace section');

       
        var langauageCheckboxName1 = genericUtils.csvFile('userData.csv', 3, 10);
        var langauageCheckboxName2 = genericUtils.csvFile('userData.csv', 4, 10);

        userUtils.checkLanguageCheckbox(langauageCheckboxName1);
        userUtils.checkLanguageCheckbox(langauageCheckboxName2);

       
        //checking option in default language
        cy.get(defaultLanguageDropdown).should('contain', 'French');
        cy.get(defaultLanguageDropdown).should('contain', 'Test Child Language');
        //Checking apply button should be enabled
        cy.get(applyButton).should('be.enabled');

        //Checking Cancel button should be enabled
        cy.get(cancelButton).should('be.enabled');
        cy.log('Apply and cancel button enabled');

        cy.get(cancelButton).should('be.enabled').click();
        cy.log('clicked on cancel button');


        cy.get(defaultLanguageDropdown).should('not.be.contain', langauageCheckboxName1);
        cy.get(defaultLanguageDropdown).should('not.be.contain', langauageCheckboxName2);

        userUtils.waitForObject(timeOut);
        userUtils.validateUncheckCheckbox(allLanguageCheckbox, langauageCheckboxName1);
        userUtils.validateUncheckCheckbox(allLanguageCheckbox, langauageCheckboxName2);

       

        //Log out from AMI application
        loginUtils.logoutFromAMI();
    });


            


    it('AMI:1888:33 The checked languages should be present in default language drop - down and the languages should remain checked in language list.', function () {
        //Retrieving test data
        var userName = genericUtils.csvFile('userData.csv', 1, 0);
        const workspaceOption = genericUtils.csvFile('userData.csv', 1, 1);
        var gadgetName = genericUtils.csvFile('userData.csv', 1, 2);
        var userGroupName = genericUtils.csvFile('userData.csv', 1, 3);
        var userName2 = genericUtils.csvFile('userData.csv', 2, 4);
       
        //rerieving elements
        var languageHeaderElement = genericUtils.jsonFile('userModuleElements.json', 'languageScreen', 'languageHeaderElement');
        var allLanguageCheckbox = genericUtils.jsonFile('userModuleElements.json', 'languageScreen', 'languageCheckboxList');
        var defaultLanguageDropdown = genericUtils.jsonFile('userModuleElements.json', 'languageScreen', 'defaultLanguageDropdown');

        var applyButton = genericUtils.jsonFile('userModuleElements.json', 'workspaceScreen', 'applyButton');
        var timeOut = genericUtils.jsonFile('configEnvironment.json', 'timeout', 'min');

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

        //selecting Username
        userUtils.selectUserName(userName2);
        cy.log('User selected the' + userName2 + 'option in Username');

        //Expanding language section
        userUtils.waitForObject(timeOut);
        cy.get(languageHeaderElement).click();

        var langauageCheckboxName1 = genericUtils.csvFile('userData.csv', 3, 10);
        var langauageCheckboxName2 = genericUtils.csvFile('userData.csv', 4, 10);

        userUtils.validateUncheckCheckbox(allLanguageCheckbox, langauageCheckboxName1);
        userUtils.validateUncheckCheckbox(allLanguageCheckbox, langauageCheckboxName2);

        userUtils.checkLanguageCheckbox(langauageCheckboxName1);
        userUtils.checkLanguageCheckbox(langauageCheckboxName2);

        cy.get(applyButton).should('be.enabled').click();

        changeDropdownUtils.changeWorkspace(workspaceOption);

        //Clicking on user Gadget
        userUtils.selectGadget(gadgetName);
        cy.log('User clicked on User gadget');

        //selecting Admin user group
        userUtils.selectUserGroup(userGroupName);
        cy.log('User selected the-' + userGroupName + ' option in Usergroup');

        //selecting username
        userUtils.selectUserName(userName2);
        cy.log('User selected the' + userName2 + 'option in Username');

        //Expanding language section
        userUtils.waitForObject(timeOut);
       

        //Checking checked language option is present in default language dropdown
        cy.get(defaultLanguageDropdown).should('contain', 'French');
        cy.get(defaultLanguageDropdown).should('contain', 'Test Child Language');

        userUtils.validateCheckedCheckbox(allLanguageCheckbox, langauageCheckboxName1);
        userUtils.validateCheckedCheckbox(allLanguageCheckbox, langauageCheckboxName2);

        //Making the previous state
        userUtils.uncheckLanguageCheckbox(langauageCheckboxName1);
        userUtils.uncheckLanguageCheckbox(langauageCheckboxName2);
        cy.get(applyButton).should('be.enabled').click();

        //Log out from AMI application
        loginUtils.logoutFromAMI();

    });


    it('AMI:1884:34 Check few languages ,click on Apply button then languages comes up in Default language drop-down select any language from the drop-down and click on Apply button.', function () {
        //Retrieving test data
        var userName = genericUtils.csvFile('userData.csv', 1, 0);
        const workspaceOption = genericUtils.csvFile('userData.csv', 1, 1);
        var gadgetName = genericUtils.csvFile('userData.csv', 1, 2);
        var userGroupName = genericUtils.csvFile('userData.csv', 1, 3);
        var userName2 = genericUtils.csvFile('userData.csv', 2, 4);
        var languageOption = genericUtils.csvFile('userData.csv', 1, 10);
        var dropDownName = genericUtils.csvFile('userData.csv', 5, 10);

        

        //rerieving elements 
        var languageHeaderElement = genericUtils.jsonFile('userModuleElements.json', 'languageScreen', 'languageHeaderElement');
        var defaultLanguageDropdown = genericUtils.jsonFile('userModuleElements.json', 'languageScreen', 'defaultLanguageDropdown');
        var applyButton = genericUtils.jsonFile('userModuleElements.json', 'workspaceScreen', 'applyButton');
        var timeOut = genericUtils.jsonFile('configEnvironment.json', 'timeout', 'min');
        var avg = genericUtils.jsonFile('configEnvironment.json', 'timeout', 'avg');

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

        //selecting Username
        userUtils.selectUserName(userName2);
        cy.log('User selected the' + userName2 + 'option in Username');

        //Expanding language section
        userUtils.waitForObject(timeOut);
        cy.get(languageHeaderElement).click();

        var langauageCheckboxName1 = genericUtils.csvFile('userData.csv', 5, 10);
        var langauageCheckboxName2 = genericUtils.csvFile('userData.csv', 6, 10);

        //Checking language checkboxes
        userUtils.checkLanguageCheckbox(langauageCheckboxName1);
        userUtils.checkLanguageCheckbox(langauageCheckboxName2);
       
        //Cliking on apply button
        cy.get(applyButton).should('be.enabled').click();
        changeDropdownUtils.changeWorkspace(workspaceOption);

        //Clicking on user Gadget
        userUtils.selectGadget(gadgetName);
        cy.log('User clicked on User gadget');

        //selecting Admin user group
        userUtils.selectUserGroup(userGroupName);
        cy.log('User selected the-' + userGroupName + ' option in Usergroup');

        userUtils.selectUserName(userName2);
        cy.log('User selected the' + userName2 + 'option in Username');

        //Expanding language section
        userUtils.waitForObject(timeOut);

        cy.get(defaultLanguageDropdown).should('contain', 'Yorkshire');
        cy.get(defaultLanguageDropdown).should('contain', 'Estonian');

        userUtils.waitForObject(timeOut);
        //selecting another option in default language dropdown
        
        cy.get(defaultLanguageDropdown, { timeout: avg }).select(dropDownName);

        //Cliking on apply button
        cy.get(applyButton).should('be.enabled').click();
        //Checking selected option becomes default language
        cy.get(defaultLanguageDropdown).find(':selected').contains(dropDownName);

        //making previous state
        cy.get(defaultLanguageDropdown, { timeout: avg }).select(languageOption);
        userUtils.uncheckLanguageCheckbox(langauageCheckboxName1);
        userUtils.uncheckLanguageCheckbox(langauageCheckboxName2);
        

        cy.get(applyButton).should('be.enabled').click();
        //Log out from AMI application
        //loginUtils.logoutFromAMI();
    });



    it('AMI:1885:35,AMI:1886:36,AMI:1887:37 Check few languages and Click on Apply then languages comes up in Default language.Select any language from drop-down and click on Cancel and uncheck few language,click on cancel and uncheck few language and click on apply', function () {
        //Retrieving test data
        var userName = genericUtils.csvFile('userData.csv', 1, 0);
        var workspaceOption = genericUtils.csvFile('userData.csv', 1, 1);
        var gadgetName = genericUtils.csvFile('userData.csv', 1, 2);
        var userGroupName = genericUtils.csvFile('userData.csv', 1, 3);
        var userName2 = genericUtils.csvFile('userData.csv', 2, 4);
        var languageOption2 = genericUtils.csvFile('userData.csv', 7, 10);
        var languageOption3 = genericUtils.csvFile('userData.csv', 8, 10);
        var languageOption4 = genericUtils.csvFile('userData.csv', 8, 10);
        var dropDownName = genericUtils.csvFile('userData.csv', 7, 10);

        //rerieving elements 
        var languageHeaderElement = genericUtils.jsonFile('userModuleElements.json', 'languageScreen', 'languageHeaderElement');
        var defaultLanguageDropdown = genericUtils.jsonFile('userModuleElements.json', 'languageScreen', 'defaultLanguageDropdown');
        var applyButton = genericUtils.jsonFile('userModuleElements.json', 'workspaceScreen', 'applyButton');
        var cancelButton = genericUtils.jsonFile('userModuleElements.json', 'workspaceScreen', 'cancelButton');
        var timeOut = genericUtils.jsonFile('configEnvironment.json', 'timeout', 'min');
        var avg = genericUtils.jsonFile('configEnvironment.json', 'timeout', 'avg');

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

        //selecting Username
        userUtils.selectUserName(userName2);
        cy.log('User selected the' + userName2 + 'option in Username');

        //Expanding language section
        userUtils.waitForObject(timeOut);
        cy.get(languageHeaderElement).click();

        //Checking language checkboxes-
        userUtils.checkLanguageCheckbox(languageOption2);
        userUtils.checkLanguageCheckbox(languageOption3);
        userUtils.checkLanguageCheckbox(languageOption4);

        //Cliking on apply button
        cy.get(applyButton).should('be.enabled').click();

        changeDropdownUtils.changeWorkspace(workspaceOption);

        //Clicking on user Gadget
        userUtils.selectGadget(gadgetName);
        cy.log('User clicked on User gadget');

        //selecting Admin user group
        userUtils.selectUserGroup(userGroupName);
        cy.log('User selected the-' + userGroupName + ' option in Usergroup');

        ////selecting UserName 
        userUtils.selectUserName(userName2);
        cy.log('User selected the' + userName2 + 'option in Username');

        //Expanding language section
        userUtils.waitForObject(timeOut);
       
        //Checked language checkbox should present in default language dropdown
        cy.get(defaultLanguageDropdown).should('contain', 'Korean');
        cy.get(defaultLanguageDropdown).should('contain', 'Ripon');
        cy.get(defaultLanguageDropdown).should('contain', 'York');

        //selecting another option in default language dropdown
        cy.get(defaultLanguageDropdown, { timeout: avg }).select(dropDownName);

        //Clicking on cancel button
        cy.get(cancelButton).should('be.enabled').click();

        cy.get(defaultLanguageDropdown).then((option) => {
            const allValues = option.find(':selected').text();
            cy.log(allValues);
            if (allValues != dropDownName) {
                cy.log('defaut workspace is not changed');
            }
        });


        //44 testcase
        //Uncheck few language checkbox
        userUtils.uncheckLanguageCheckbox(languageOption2);
        userUtils.uncheckLanguageCheckbox(languageOption3);

        //click on cancel button
        cy.get(cancelButton).should('be.enabled').click();

        //language should not get removed from default language dropdown
        cy.get(defaultLanguageDropdown).should('contain', 'Korean');
        cy.get(defaultLanguageDropdown).should('contain', 'Ripon');

        //45
        //Unchecking few language checkbox
        userUtils.uncheckLanguageCheckbox(languageOption2);
        userUtils.uncheckLanguageCheckbox(languageOption3);
        userUtils.uncheckLanguageCheckbox(languageOption4);

        //Click on apply button
        cy.get(applyButton).should('be.enabled').click();

        //Clicking on user Gadget
        userUtils.selectGadget(gadgetName);
        cy.log('User clicked on User gadget');

        //selecting Admin user group
        userUtils.selectUserGroup(userGroupName);
        cy.log('User selected the-' + userGroupName + ' option in Usergroup');

        //Select UserName
        userUtils.selectUserName(userName2);
        cy.log('User selected the' + userName2 + 'option in Username');

        //Expanding language section
        userUtils.waitForObject(timeOut);
      

        //Unchecked language checkboxes get removed from default language dropdown
        cy.get(defaultLanguageDropdown).should('not.have.value', languageOption2);
        cy.get(defaultLanguageDropdown).should('not.have.value', languageOption3);
        cy.get(defaultLanguageDropdown).should('not.have.value', languageOption4);
        cy.log('unchecked workspace checkboxes get removed from default dropdown');


        //Log out from AMI application
        loginUtils.logoutFromAMI();

    });
});