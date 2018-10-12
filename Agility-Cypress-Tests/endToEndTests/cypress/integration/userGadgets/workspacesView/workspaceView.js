const loginUtils = require('../../../utils/loginUtils');
const changeDropdownUtils = require('../../../utils/changeDropdownUtils');
const userUtils = require('../../../utils/userUtils');
const genericUtils = require('../../../utils/genericUtils');


describe('Workspaces View functionality', function () {

    it('AMI:1894:39 Workspaces which are checked should come up in Default workspace drop-down, Also Apply and Cancel button should get enabled.', function () {

        //Retrieving test data
        var userName = genericUtils.csvFile('userData.csv', 1, 0);
        var workspaceOption = genericUtils.csvFile('userData.csv', 1, 1);
        var gadgetName = genericUtils.csvFile('userData.csv', 1, 2);
        var userGroupName = genericUtils.csvFile('userData.csv', 1, 3);
        var userName2 = genericUtils.csvFile('userData.csv', 1, 4);
        var workspaceOption2 = genericUtils.csvFile('userData.csv', 6, 5);

        //rerieving elements 
        var workspaceHeaderElement = genericUtils.jsonFile('userModuleElements.json', 'workspaceScreen', 'workspaceSection');
        var defaultWorkspaceDropdown = genericUtils.jsonFile('userModuleElements.json', 'workspaceScreen', 'defaultWorkspaceDropdown');
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
        cy.log('User selected the userGroup in Usergroup dropdown');

        //selecting UserName
        userUtils.selectUserName(userName2);
        cy.log('User selected the userName in Username dropdown');
        userUtils.waitForObject(timeOut);

        //Expanding workspace section
        cy.get(workspaceHeaderElement, { timeout: timeOut }).click();
        cy.log('User successfully Expanded Workspace section');

        //validating workspace checkbox is unchecked
        userUtils.validateUncheckCheckbox(workspaceOption2);

        //checking workspace checkbox
        userUtils.checkWorkspaceCheckbox(workspaceOption2);

        //checking checked option in default workspaces
        cy.get(defaultWorkspaceDropdown).should('contain', 'Craig QA General');
        cy.log('User successfully Expanded Workspace section');

        //Checking apply button should be enabled
        cy.get(applyButton).should('be.enabled');

        //Checking Cancel button should be enabled
        cy.get(cancelButton).should('be.enabled');
        cy.log('successfully validated -Apply and cancel button enabled');

        //Log out from AMI application
        loginUtils.logoutFromAMI();
    });



    it('AMI:1895:40 Workspaces should get removed from drop-down and the workspaces should get unchecked from Workspace list.', function () {
        //Retrieving test data
        var userName = genericUtils.csvFile('userData.csv', 1, 0);
        const workspaceOption = genericUtils.csvFile('userData.csv', 1, 1);
        var gadgetName = genericUtils.csvFile('userData.csv', 1, 2);
        var userGroupName = genericUtils.csvFile('userData.csv', 1, 3);
        var userName2 = genericUtils.csvFile('userData.csv', 1, 4);
        var workspaceOption2 = genericUtils.csvFile('userData.csv', 6, 5);

        //rerieving elements
        var workspaceHeaderElement = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'workspaceSection');
        var defaultWorkspaceDropdown = genericUtils.jsonFile('userModuleElements.json', 'workspaceScreen', 'defaultWorkspaceDropdown');
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
        cy.log('User selected the userName in Username dropdown');

        //Expanding workspace section
        userUtils.waitForObject(timeOut);
        cy.get(workspaceHeaderElement, { timeout: timeOut }).click();
        cy.log('User successfully Expanded Workspace section');

        //validating checkbx is unchecked
        userUtils.validateUncheckCheckbox(workspaceOption2);

        //checking workspace checkbox and clicking ok cancel button
        userUtils.checkWorkspaceCheckbox(workspaceOption2);
        cy.get(cancelButton).should('be.enabled').click();
        cy.log('sucessfully clicked on cancel button');

        //selcting the Configuration Option in Workspace Dropdown
        changeDropdownUtils.changeWorkspace(workspaceOption);
        cy.log('User Successfully navigated to Configuration Options');

        //Clicking on user Gadget
        userUtils.selectGadget(gadgetName);
        cy.log('User clicked on User gadget');

        //selecting Admin user group
        userUtils.selectUserGroup(userGroupName);
        cy.log('User selected the userGroupName in Usergroup dropdown');

        //Selecting username
        userUtils.selectUserName(userName2);
        cy.log('User selected the userName in Username dropdown');

        //Expanding workspace section
        userUtils.waitForObject(timeOut);
        cy.get(workspaceHeaderElement, { timeout: timeOut }).click();
        cy.log('Click on workspace header');

        //validaing checkbox is unchecked
        userUtils.validateUncheckCheckbox('Craig QA General');
        cy.log('successfully validated -Craig QA General checkbox is unchecked');

        //Checking checked worrkspace option is present in default workspace dropdown
        cy.get(defaultWorkspaceDropdown).should('not.be.contain', 'Craig QA General');
        cy.log('successfully validated Craig QA General option is not present in default workspace dropdown');

        //logout to AMI
        loginUtils.logoutFromAMI();

    });


    it('AMI:1896:41 The checked workspaces should be present in default Workspace drop - down and the workspaces should remain checked in Workspace list.', function () {
        //Retrieving test data
        var userName = genericUtils.csvFile('userData.csv', 1, 0);
        const workspaceOption = genericUtils.csvFile('userData.csv', 1, 1);
        var gadgetName = genericUtils.csvFile('userData.csv', 1, 2);
        var userGroupName = genericUtils.csvFile('userData.csv', 1, 3);
        var userName2 = genericUtils.csvFile('userData.csv', 1, 4);
        var workspaceOption2 = genericUtils.csvFile('userData.csv', 7, 5);

        //rerieving elements
        var workspaceHeaderElement = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'workspaceSection');
        var defaultWorkspaceDropdown = genericUtils.jsonFile('userModuleElements.json', 'workspaceScreen', 'defaultWorkspaceDropdown');
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
        cy.log('User selected the userGroupName in Usergroup dropdown');

        //selecting Username
        userUtils.selectUserName(userName2);
        cy.log('User selected the userName in Username dropdown');

        //Expanding workspace section
        userUtils.waitForObject(timeOut);
        cy.get(workspaceHeaderElement, { timeout: timeOut }).click();
        cy.log('succssfully clicked on workspace header');

        //Checking workspace checkbox
        userUtils.validateUncheckCheckbox(workspaceOption2);
        userUtils.checkWorkspaceCheckbox(workspaceOption2);


        //Clicking on apply button
        cy.get(applyButton).should('be.enabled').click();
        changeDropdownUtils.changeWorkspace(workspaceOption);

        //Clicking on user Gadget
        userUtils.selectGadget(gadgetName);
        cy.log('User clicked on User gadget');

        //selecting Admin user group
        userUtils.selectUserGroup(userGroupName);
        cy.log('User selected the userGroup in Usergroup dropdown');

        //selecting username
        userUtils.selectUserName(userName2);
        cy.log('User selected the userName in Username dropdown');

        //Expanding workspace section
        userUtils.waitForObject(timeOut);
        cy.get(workspaceHeaderElement, { timeout: timeOut }).click();
        cy.log('succssfully clicked on workspace header');

        //Checking checked worrkspace option is present in default workspace dropdown
        cy.get(defaultWorkspaceDropdown).should('contain', 'Datasheet Gadget');
        userUtils.validateCheckedCheckbox(workspaceOption2);
        cy.log('validated checked worrkspace option is present in default workspace');

        //Making the previous state
        userUtils.uncheckWorkspaceCheckbox(workspaceOption2);
        cy.get(applyButton).should('be.enabled').click();


        cy.reload();
        //Log out from AMI application
        loginUtils.logoutFromAMI();

    });


    it('AMI:1897:42 Check few workspaces ,click on Apply button then workspaces comes up in Default workspace drop-down select any workspace from the drop-down and click on Apply button.', function () {
        //Retrieving test data
        var userName = genericUtils.csvFile('userData.csv', 1, 0);
        const workspaceOption = genericUtils.csvFile('userData.csv', 1, 1);
        var gadgetName = genericUtils.csvFile('userData.csv', 1, 2);
        var userGroupName = genericUtils.csvFile('userData.csv', 1, 3);
        var userName2 = genericUtils.csvFile('userData.csv', 1, 4);
        var workspaceOption2 = genericUtils.csvFile('userData.csv', 2, 5);
        var workspaceOption3 = genericUtils.csvFile('userData.csv', 4, 5);
        var dropDownName = genericUtils.csvFile('userData.csv', 23, 5);

        //rerieving elements 
        var workspaceHeaderElement = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'workspaceSection');
        var defaultWorkspaceDropdown = genericUtils.jsonFile('userModuleElements.json', 'workspaceScreen', 'defaultWorkspaceDropdown');
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
        cy.log('User selected the userGroup in Usergroup dropdown');

        //selecting Username
        userUtils.selectUserName(userName2);
        cy.log('User selected the userName in Username dropdown');

        //Expanding workspace section
        userUtils.waitForObject(timeOut);
        cy.get(workspaceHeaderElement, { timeout: timeOut }).click();
        cy.log('succssfully clicked on workspace header');

        //Checking workspace checkboxes
        userUtils.checkWorkspaceCheckbox(workspaceOption2);
        userUtils.checkWorkspaceCheckbox(workspaceOption3);
        cy.log('successfully click on workspace checkboxes');
        
        //Cliking on apply button
        cy.get(applyButton).should('be.enabled').click();
        cy.log('successfully clicked on apply button');
        changeDropdownUtils.changeWorkspace(workspaceOption);

        //Clicking on user Gadget
        userUtils.selectGadget(gadgetName);
        cy.log('User clicked on User gadget');

        //selecting Admin user group
        userUtils.selectUserGroup(userGroupName);
        cy.log('User selected the userGroupName in Usergroup dropdown');

        //selecting username
        userUtils.selectUserName(userName2);
        cy.log('User selected the userName in Username dropdown');

        //Expanding workspace section
        userUtils.waitForObject(timeOut);
        cy.get(workspaceHeaderElement).click();
        cy.log('succssfully clicked on workspace header');

        cy.get(defaultWorkspaceDropdown).should('contain', 'Agrex Example');
        cy.get(defaultWorkspaceDropdown).should('contain', 'CraigQA1');
        cy.log('successfully validated checked workspace present in default workspace dropdown');

        userUtils.waitForObject(timeOut);
        //selecting another option in default workspace dropdown
        cy.get(defaultWorkspaceDropdown, { timeout: avg }).select(dropDownName);
        cy.log('successfully selected another option in default workspace dropdown');

        //Cliking on apply button
        cy.get(applyButton).should('be.enabled').click();
        cy.log('successfully clicked on apply button');

        //Checking selected option becomes default workspace
        cy.get(defaultWorkspaceDropdown).find(':selected').contains(dropDownName);
        cy.log('validated successfully default workspace get changed');

        //making previous state
        userUtils.uncheckWorkspaceCheckbox(workspaceOption2);
        userUtils.uncheckWorkspaceCheckbox(workspaceOption3);
        cy.get(defaultWorkspaceDropdown, { timeout: avg }).select(workspaceOption);

        cy.get(applyButton).should('be.enabled').click();

        //Log out from AMI application
        //loginUtils.logoutFromAMI();
    });



    it('AMI:1898:43,AMI:1899:44,AMI:1900:45 Check few workspaces and Click on Apply then workspaces comes up in Default workspace.Select any workspace from drop-down and click on Cancel and uncheck few workspace,click on cancel and uncheck few workspace and click on apply', function () {
        //Retrieving test data
        var userName = genericUtils.csvFile('userData.csv', 1, 0);
        var workspaceOption = genericUtils.csvFile('userData.csv', 1, 1);
        var gadgetName = genericUtils.csvFile('userData.csv', 1, 2);
        var userGroupName = genericUtils.csvFile('userData.csv', 1, 3);
        var userName2 = genericUtils.csvFile('userData.csv', 1, 4);
        var workspaceOption2 = genericUtils.csvFile('userData.csv', 6, 5);
        var workspaceOption3 = genericUtils.csvFile('userData.csv', 7, 5);
        var workspaceOption4 = genericUtils.csvFile('userData.csv', 8, 5);
        var dropDownName = genericUtils.csvFile('userData.csv', 23, 5);

        //rerieving elements 
        var workspaceHeaderElement = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'workspaceSection');
        var defaultWorkspaceDropdown = genericUtils.jsonFile('userModuleElements.json', 'workspaceScreen', 'defaultWorkspaceDropdown');
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
        cy.log('User selected the userGroupName in Usergroup dropdown');

        //selecting Username
        userUtils.selectUserName(userName2);
        cy.log('User selected the userName in Username dropdown');

        //Expanding workspace section
        userUtils.waitForObject(timeOut);
        cy.get(workspaceHeaderElement).click();
        cy.log('succssfully clicked on workspace header');

        //Checking workspace checkboxes-
        userUtils.checkWorkspaceCheckbox(workspaceOption2);
        userUtils.checkWorkspaceCheckbox(workspaceOption3);
        userUtils.checkWorkspaceCheckbox(workspaceOption4);
        cy.log('clicking on few workspace checkboxes');

        //Cliking on apply button
        cy.get(applyButton).should('be.enabled').click();
        cy.log('successfully clicked on aplly button');
        changeDropdownUtils.changeWorkspace(workspaceOption);

        //Clicking on user Gadget
        userUtils.selectGadget(gadgetName);
        cy.log('User clicked on User gadget');

        //selecting Admin user group
        userUtils.selectUserGroup(userGroupName);
        cy.log('User selected the userGroupName in Usergroup dropdown');

        //selecting UserName 
        userUtils.selectUserName(userName2);
        cy.log('User selected the userName in Username dropdown');

        //Expanding workspace section
        userUtils.waitForObject(timeOut);
        cy.get(workspaceHeaderElement).click();
        cy.log('succssfully clicked on workspace header');


        //Checked Workspace checkbox should present in default workspace dropdown
        cy.get(defaultWorkspaceDropdown).should('contain', 'Craig QA General');
        cy.get(defaultWorkspaceDropdown).should('contain', 'Datasheet Gadget');
        cy.get(defaultWorkspaceDropdown).should('contain', 'Default');
        cy.log('successfully validated checked workspaces present in default workspace dropdown');

        //selecting another option in default workspace dropdown
        cy.get(defaultWorkspaceDropdown, { timeout: avg }).select(dropDownName);
        cy.log('successfully selected another option in default workspace dropdown');


        //Clicking on cancel button
        cy.get(cancelButton).should('be.enabled').click();
        cy.log('successfully clicked on vancel button');


        //Checking default workspace dropdown option should not change
        cy.get(defaultWorkspaceDropdown).then((option) => {
            const allValues = option.find(':selected').text();
            cy.log(allValues);
            if (allValues != dropDownName) {
                cy.log('defaut workspace is not changed');
            }
        });

        //Uncheck few workspace checkbox
        userUtils.uncheckWorkspaceCheckbox(workspaceOption2);
        userUtils.uncheckWorkspaceCheckbox(workspaceOption3);
        cy.log('successfully uncheck workspace checkbox');

        //click on cancel button
        cy.get(cancelButton).should('be.enabled').click();
        cy.log('successfully clicked on cancel button');

        //Workspace should not get removed from default workspace dropdown
        cy.get(defaultWorkspaceDropdown).should('contain', 'Craig QA General');
        cy.get(defaultWorkspaceDropdown).should('contain', 'Datasheet Gadget');
        cy.log('successfully validated default workspace dropdown options');

        //Unchecking few workspace checkbox
        userUtils.uncheckWorkspaceCheckbox(workspaceOption2);
        userUtils.uncheckWorkspaceCheckbox(workspaceOption3);
        userUtils.uncheckWorkspaceCheckbox(workspaceOption4);
        cy.log('successfully uncheck workspace checkox');

        //Click on apply button
        cy.get(applyButton).should('be.enabled').click();
        cy.log('successfully clicked on apply button');

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
        userUtils.waitForObject(timeOut);
        cy.get(workspaceHeaderElement).click();
        cy.log('succssfully clicked on workspace header');


        //Unchecked Workspace checkboxes get removed from default dropdown
        cy.get(defaultWorkspaceDropdown).should('not.have.value', workspaceOption2);
        cy.get(defaultWorkspaceDropdown).should('not.have.value', workspaceOption3);
        cy.get(defaultWorkspaceDropdown).should('not.have.value', workspaceOption4);
        cy.log('unchecked workspace checkboxes get removed from default dropdown');
        

        //Log out from AMI application
        loginUtils.logoutFromAMI();

    });
});