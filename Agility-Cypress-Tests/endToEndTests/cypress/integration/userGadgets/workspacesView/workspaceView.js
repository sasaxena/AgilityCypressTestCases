const loginUtils = require('../../../utils/loginUtils');
const changeDropdownUtils = require('../../../utils/changeDropdownUtils');
const userUtils = require('../../../utils/userUtils');
const genericUtils = require('../../../utils/genericUtils');


describe('Workspaces View functionality', function () {
    it('AMI:1893:38 The workspaces section should list all the workspaces with a checkbox next to each along with Default workspace drop-down.', function () {

        //Retrieving test data
        var userName = genericUtils.csvFile('userData.csv', "LoginName", "value1");
        var workspaceOption = genericUtils.csvFile('userData.csv', "WorkspacesOption", "value1");
        var gadgetName = genericUtils.csvFile('userData.csv', "Gadgets", "value1");
        var userGroupName = genericUtils.csvFile('userData.csv', "UserGroup", "value1");
        var userName2 = genericUtils.csvFile('userData.csv', "UserName", "value1");
       
        //Retieving elements 
        var workspaceHeaderElement = genericUtils.jsonFile('userModuleElements.json', 'workspaceScreen', 'workspaceSection');
        var workspaceCheckboxList = genericUtils.jsonFile('userModuleElements.json', 'workspaceScreen', 'workspaceCheckboxList');
        var timeOut = genericUtils.jsonFile('configEnvironment.json', 'timeout', 'min');

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
        cy.log('User selected the userGroup in Usergroup dropdown');

        //Selecting UserName
        userUtils.selectUserName(userName2);
        cy.log('User selected the userName in Username dropdown');
        cy.wait(timeOut);

        //Expanding workspace section
        cy.get(workspaceHeaderElement, { timeout: timeOut }).click();
        cy.log('User successfully Expanded Workspace section');

        for (var i = 1; i <= 11; i++) {
            cy.get(workspaceCheckboxList).eq(i).then(($btn) => {
                var values = $btn.text();
                cy.log(values);

            });
        }

        //Log out from AMI application
        loginUtils.logoutFromAMI();
    });

    it('AMI:1894:39 Workspaces which are checked should come up in Default workspace drop-down, Also Apply and Cancel button should get enabled.', function () {

        //Retrieving test data
        var userName = genericUtils.csvFile('userData.csv', "LoginName", "value1");
        var workspaceOption = genericUtils.csvFile('userData.csv', "WorkspacesOption", "value1");
        var gadgetName = genericUtils.csvFile('userData.csv', "Gadgets", "value1");
        var userGroupName = genericUtils.csvFile('userData.csv', "UserGroup", "value1");
        var userName2 = genericUtils.csvFile('userData.csv', "UserName", "value1");
        var workspaceOption2 = genericUtils.csvFile('userData.csv', "WorkspaceCheckboxes", "value6");

        //Retrieving elements 
        var workspaceHeaderElement = genericUtils.jsonFile('userModuleElements.json', 'workspaceScreen', 'workspaceSection');
        var workspaceCheckboxList = genericUtils.jsonFile('userModuleElements.json', 'workspaceScreen', 'workspaceCheckboxList');
        var defaultWorkspaceDropdown = genericUtils.jsonFile('userModuleElements.json', 'workspaceScreen', 'defaultWorkspaceDropdown');
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
        cy.log('User selected the userGroup in Usergroup dropdown');

        //Selecting UserName
        userUtils.selectUserName(userName2);
        cy.log('User selected the userName in Username dropdown');
        cy.wait(timeOut);

        //Expanding workspace section
        cy.get(workspaceHeaderElement, { timeout: timeOut }).click();
        cy.log('User successfully Expanded Workspace section');

        //Validating workspace checkbox is unchecked
        userUtils.validateUncheckCheckbox(workspaceCheckboxList, workspaceOption2);

        //Checking workspace checkbox
        userUtils.checkWorkspaceCheckbox(workspaceOption2);
        cy.log('Succeessfully checked workspace checkbox');

        //Checking checked option in default workspaces
        cy.get(defaultWorkspaceDropdown).should('contain', 'Craig QA General');
        cy.log('User successfully validated currently checked workspace checkbox in default workspace dropdown');

        //Checking apply button should be enabled
        cy.get(applyButton).should('be.enabled');

        //Checking Cancel button should be enabled
        cy.get(cancelButton).should('be.enabled');
        cy.log('Successfully validated -Apply and cancel button enabled');

        //Log out from AMI application
        loginUtils.logoutFromAMI();
    });



    it('AMI:1895:40 Workspaces should get removed from drop-down and the workspaces should get unchecked from Workspace list.', function () {

        //Retrieving test data
        var userName = genericUtils.csvFile('userData.csv', "LoginName", "value1");
        const workspaceOption = genericUtils.csvFile('userData.csv', "WorkspacesOption", "value1");
        var gadgetName = genericUtils.csvFile('userData.csv', "Gadgets", "value1");
        var userGroupName = genericUtils.csvFile('userData.csv', "UserGroup", "value1");
        var userName2 = genericUtils.csvFile('userData.csv', "UserName", "value1");
        var workspaceOption2 = genericUtils.csvFile('userData.csv', "WorkspaceCheckboxes", "value6");

        //Retrieving elements
        var workspaceHeaderElement = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'workspaceSection');
        var workspaceCheckboxList = genericUtils.jsonFile('userModuleElements.json', 'workspaceScreen', 'workspaceCheckboxList');
        var defaultWorkspaceDropdown = genericUtils.jsonFile('userModuleElements.json', 'workspaceScreen', 'defaultWorkspaceDropdown');
        var cancelButton = genericUtils.jsonFile('userModuleElements.json', 'workspaceScreen', 'cancelButton');
        var timeOut = genericUtils.jsonFile('configEnvironment.json', 'timeout', 'min');

        //Login to AMI.
        loginUtils.loginToAMI(userName);
        cy.log('User Successfully logged in application');

        //Selcting the Configuration Option in Workspace Dropdown
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

        //Expanding workspace section
        cy.wait(timeOut);
        cy.get(workspaceHeaderElement, { timeout: timeOut }).click();
        cy.log('User successfully Expanded Workspace section');

        //Validating checkbox is unchecked
        userUtils.validateUncheckCheckbox(workspaceCheckboxList, workspaceOption2);

        //Checking workspace checkbox and clicking cancel button
        userUtils.checkWorkspaceCheckbox(workspaceOption2);
        cy.get(cancelButton).should('be.enabled').click();
        cy.log('Sucessfully clicked on cancel button');

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

        //Expanding workspace section
        cy.wait(timeOut);
        cy.get(workspaceHeaderElement, { timeout: timeOut }).click();
        cy.log('Click on workspace header');

        //Validating checkbox is unchecked
        userUtils.validateUncheckCheckbox(workspaceCheckboxList, 'Craig QA General');
        cy.log('Successfully validated -Craig QA General checkbox is unchecked');

        //Checking checked worrkspace option is present in default workspace dropdown
        cy.get(defaultWorkspaceDropdown).should('not.be.contain', 'Craig QA General');
        cy.log('Successfully validated Craig QA General option is not present in default workspace dropdown');

        //Logout to AMI
        loginUtils.logoutFromAMI();

    });


    it('AMI:1896:41 The checked workspaces should be present in default Workspace drop - down and the workspaces should remain checked in Workspace list.', function () {
        //Retrieving test data
        var userName = genericUtils.csvFile('userData.csv', "LoginName", "value1");
        const workspaceOption = genericUtils.csvFile('userData.csv', "WorkspacesOption", "value1");
        var gadgetName = genericUtils.csvFile('userData.csv', "Gadgets", "value1");
        var userGroupName = genericUtils.csvFile('userData.csv', "UserGroup", "value1");
        var userName2 = genericUtils.csvFile('userData.csv', "UserName", "value1");
        var workspaceOption2 = genericUtils.csvFile('userData.csv', "WorkspaceCheckboxes", "value7");

        //Retrieving elements
        var workspaceHeaderElement = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'workspaceSection');
        var workspaceCheckboxList = genericUtils.jsonFile('userModuleElements.json', 'workspaceScreen', 'workspaceCheckboxList');
        var defaultWorkspaceDropdown = genericUtils.jsonFile('userModuleElements.json', 'workspaceScreen', 'defaultWorkspaceDropdown');
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

        //Expanding workspace section
        cy.wait(timeOut);
        cy.get(workspaceHeaderElement, { timeout: timeOut }).click();
        cy.log('Successfully clicked on workspace header');

        //Checking workspace checkbox
        userUtils.validateUncheckCheckbox(workspaceCheckboxList, workspaceOption2);
        userUtils.checkWorkspaceCheckbox(workspaceOption2);

        //Clicking on apply button
        cy.get(applyButton).should('be.enabled').click();
        changeDropdownUtils.changeWorkspace(workspaceOption);

        //Clicking on user Gadget
        userUtils.selectGadget(gadgetName);
        cy.log('User clicked on User gadget');

        //Selecting Admin user group
        userUtils.selectUserGroup(userGroupName);
        cy.log('User selected the userGroup in Usergroup dropdown');

        //Selecting username
        userUtils.selectUserName(userName2);
        cy.log('User selected the userName in Username dropdown');

        //Expanding workspace section
        cy.wait(timeOut);
        cy.get(workspaceHeaderElement, { timeout: timeOut }).click();
        cy.log('Successfully clicked on workspace header');

        //Checking checked workspace option is present in default workspace dropdown
        cy.get(defaultWorkspaceDropdown).should('contain', 'Datasheet Gadget');
        userUtils.validateCheckedCheckbox(workspaceCheckboxList, workspaceOption2);
        cy.log('Validated checked workspace option is present in default workspace');

        //Making the previous state
        userUtils.uncheckWorkspaceCheckbox(workspaceOption2);
        cy.get(applyButton).should('be.enabled').click();

        cy.reload();
        //Log out from AMI application
        loginUtils.logoutFromAMI();
    });

    it('AMI:1897:42 Check few workspaces ,click on Apply button then workspaces comes up in Default workspace drop-down select any workspace from the drop-down and click on Apply button.', function () {

        //Retrieving test data
        var userName = genericUtils.csvFile('userData.csv', "LoginName", "value1");
        const workspaceOption = genericUtils.csvFile('userData.csv', "WorkspacesOption", "value1");
        var gadgetName = genericUtils.csvFile('userData.csv', "Gadgets", "value1");
        var userGroupName = genericUtils.csvFile('userData.csv', "UserGroup", "value1");
        var userName2 = genericUtils.csvFile('userData.csv', "UserName", "value1");
        var workspaceOption2 = genericUtils.csvFile('userData.csv', "WorkspaceCheckboxes", "value2");
        var workspaceOption3 = genericUtils.csvFile('userData.csv', "WorkspaceCheckboxes", "value4");
        var dropDownName = genericUtils.csvFile('userData.csv', "WorkspaceCheckboxes", "value23");

        //Retrieving elements 
        var workspaceHeaderElement = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'workspaceSection');
        var defaultWorkspaceDropdown = genericUtils.jsonFile('userModuleElements.json', 'workspaceScreen', 'defaultWorkspaceDropdown');
        var applyButton = genericUtils.jsonFile('userModuleElements.json', 'workspaceScreen', 'applyButton');
        var timeOut = genericUtils.jsonFile('configEnvironment.json', 'timeout', 'min');
        var avg = genericUtils.jsonFile('configEnvironment.json', 'timeout', 'avg');

        // Login to AMI.
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
        cy.log('User selected the userGroup in Usergroup dropdown');

        //Selecting Username
        userUtils.selectUserName(userName2);
        cy.log('User selected the userName in Username dropdown');

        //Expanding workspace section
        cy.wait(timeOut);
        cy.get(workspaceHeaderElement, { timeout: timeOut }).click();
        cy.log('Successfully clicked on workspace header');

        //Checking workspace checkboxes
        userUtils.checkWorkspaceCheckbox(workspaceOption2);
        userUtils.checkWorkspaceCheckbox(workspaceOption3);
        cy.log('Successfully click on workspace checkboxes');
        
        //Clicking on apply button
        cy.get(applyButton).should('be.enabled').click();
        cy.log('Successfully clicked on apply button');
        changeDropdownUtils.changeWorkspace(workspaceOption);

        //Clicking on user Gadget
        userUtils.selectGadget(gadgetName);
        cy.log('User clicked on User gadget');

        //Selecting Admin user group
        userUtils.selectUserGroup(userGroupName);
        cy.log('User selected the userGroupName in Usergroup dropdown');

        //Selecting username
        userUtils.selectUserName(userName2);
        cy.log('User selected the userName in Username dropdown');

        //Expanding workspace section
        cy.wait(timeOut);
        cy.get(workspaceHeaderElement).click();
        cy.log('Successfully clicked on workspace header');

        //Validating checked workspace should present in default workspace dropdown
        cy.get(defaultWorkspaceDropdown).should('contain', 'Agrex Example');
        cy.get(defaultWorkspaceDropdown).should('contain', 'CraigQA1');
        cy.log('Successfully validated checked workspace present in default workspace dropdown');

        cy.wait(timeOut);
        //Selecting another option in default workspace dropdown
        cy.get(defaultWorkspaceDropdown, { timeout: avg }).select(dropDownName);
        cy.log('Successfully selected another option in default workspace dropdown');

        //Clicking on apply button
        cy.get(applyButton).should('be.enabled').click();
        cy.log('Successfully clicked on apply button');

        //Checking selected option becomes default workspace
        cy.get(defaultWorkspaceDropdown).find(':selected').contains(dropDownName);
        cy.log('Validated successfully default workspace get changed');

        //Making previous state
        userUtils.uncheckWorkspaceCheckbox(workspaceOption2);
        userUtils.uncheckWorkspaceCheckbox(workspaceOption3);
        cy.get(defaultWorkspaceDropdown, { timeout: avg }).select(workspaceOption);

        cy.get(applyButton).should('be.enabled').click();

        //Log out from AMI application
        //loginUtils.logoutFromAMI();
    });



    it('AMI:1898:43,AMI:1899:44,AMI:1900:45 Check few workspaces and Click on Apply then workspaces comes up in Default workspace.Select any workspace from drop-down and click on Cancel and uncheck few workspace,click on cancel and uncheck few workspace and click on apply', function () {

        //Retrieving test data
        var userName = genericUtils.csvFile('userData.csv', "LoginName", "value1");
        var workspaceOption = genericUtils.csvFile('userData.csv', "WorkspacesOption", "value1");
        var gadgetName = genericUtils.csvFile('userData.csv', "Gadgets", "value1");
        var userGroupName = genericUtils.csvFile('userData.csv', "UserGroup", "value1");
        var userName2 = genericUtils.csvFile('userData.csv', "UserName", "value1");
        var workspaceOption2 = genericUtils.csvFile('userData.csv', "WorkspaceCheckboxes", "value6");
        var workspaceOption3 = genericUtils.csvFile('userData.csv', "WorkspaceCheckboxes", "value7");
        var workspaceOption4 = genericUtils.csvFile('userData.csv', "WorkspaceCheckboxes", "value8");
        var dropDownName = genericUtils.csvFile('userData.csv', "WorkspaceCheckboxes", "value23");

        //Retrieving elements 
        var workspaceHeaderElement = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'workspaceSection');
        var defaultWorkspaceDropdown = genericUtils.jsonFile('userModuleElements.json', 'workspaceScreen', 'defaultWorkspaceDropdown');
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

        //Expanding workspace section
        cy.wait(timeOut);
        cy.get(workspaceHeaderElement).click();
        cy.log('Successfully clicked on workspace header');

        //Checking workspace checkboxes-
        userUtils.checkWorkspaceCheckbox(workspaceOption2);
        userUtils.checkWorkspaceCheckbox(workspaceOption3);
        userUtils.checkWorkspaceCheckbox(workspaceOption4);
        cy.log('Clicking on few workspace checkboxes');

        //Clicking on apply button
        cy.get(applyButton).should('be.enabled').click();
        cy.log('Successfully clicked on apply button');
        changeDropdownUtils.changeWorkspace(workspaceOption);

        //Clicking on user Gadget
        userUtils.selectGadget(gadgetName);
        cy.log('User clicked on User gadget');

        //Selecting Admin user group
        userUtils.selectUserGroup(userGroupName);
        cy.log('User selected the userGroupName in Usergroup dropdown');

        //Selecting UserName 
        userUtils.selectUserName(userName2);
        cy.log('User selected the userName in Username dropdown');

        //Expanding workspace section
        cy.wait(timeOut);
        cy.get(workspaceHeaderElement).click();
        cy.log('Successfully clicked on workspace header');

        //Checked Workspace checkbox should present in default workspace dropdown
        cy.get(defaultWorkspaceDropdown).should('contain', 'Craig QA General');
        cy.get(defaultWorkspaceDropdown).should('contain', 'Datasheet Gadget');
        cy.get(defaultWorkspaceDropdown).should('contain', 'Default');
        cy.log('Successfully validated checked workspaces present in default workspace dropdown');

        //Selecting another option in default workspace dropdown
        cy.get(defaultWorkspaceDropdown, { timeout: avg }).select(dropDownName);
        cy.log('Successfully selected another option in default workspace dropdown');

        //Clicking on cancel button
        cy.get(cancelButton).should('be.enabled').click();
        cy.log('Successfully clicked on cancel button');
        
        //Checking default workspace dropdown option should not change
        cy.get(defaultWorkspaceDropdown).then((option) => {
            const allValues = option.find(':selected').text();
            cy.log(allValues);
            if (allValues != dropDownName) {
                cy.log('Defaut workspace is not changed');
            }
        });

        //Uncheck few workspace checkbox
        userUtils.uncheckWorkspaceCheckbox(workspaceOption2);
        userUtils.uncheckWorkspaceCheckbox(workspaceOption3);
        cy.log('Successfully uncheck workspace checkbox');

        //Click on cancel button
        cy.get(cancelButton).should('be.enabled').click();
        cy.log('Successfully clicked on cancel button');

        //Workspace should not get removed from default workspace dropdown
        cy.get(defaultWorkspaceDropdown).should('contain', 'Craig QA General');
        cy.get(defaultWorkspaceDropdown).should('contain', 'Datasheet Gadget');
        cy.log('Successfully validated default workspace dropdown options');

        //Unchecking few workspace checkbox
        userUtils.uncheckWorkspaceCheckbox(workspaceOption2);
        userUtils.uncheckWorkspaceCheckbox(workspaceOption3);
        userUtils.uncheckWorkspaceCheckbox(workspaceOption4);
        cy.log('Successfully uncheck workspace checkox');

        //Click on apply button
        cy.get(applyButton).should('be.enabled').click();
        cy.log('Successfully clicked on apply button');

        //Clicking on user Gadget
        userUtils.selectGadget(gadgetName);
        cy.log('User clicked on User gadget');

        //selecting Admin user group
        userUtils.selectUserGroup(userGroupName);
        cy.log('User selected the userGroupName in Usergroup dropdown');

        //Select UserName
        userUtils.selectUserName(userName2);
        cy.log('User selected the userName in Username dropdown');

        //Expanding workspace section
        cy.wait(timeOut);
        cy.get(workspaceHeaderElement).click();
        cy.log('Successfully clicked on workspace header');
        
        //Unchecked Workspace checkboxes get removed from default dropdown
        cy.get(defaultWorkspaceDropdown).should('not.have.value', workspaceOption2);
        cy.get(defaultWorkspaceDropdown).should('not.have.value', workspaceOption3);
        cy.get(defaultWorkspaceDropdown).should('not.have.value', workspaceOption4);
        cy.log('Unchecked workspace checkboxes get removed from default dropdown');
        
        //Log out from AMI application
        loginUtils.logoutFromAMI();

    });
});