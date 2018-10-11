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

        // Login to AMI.
        loginUtils.loginToAMI(userName);
        cy.log('User Successfully logged in application');
        
        //selcting the Configuration Option in Workspace Dropdown
        //changeDropdownUtils.changeWorkspace('Configuration Options');
        changeDropdownUtils.changeWorkspace(workspaceOption);
        cy.log('User Successfully navigated to Configuration Options');

        //Clicking on user Gadget
        userUtils.selectGadget(gadgetName);
        cy.log('User clicked on User gadget');

        //selecting Admin user group
        userUtils.selectUserGroup(userGroupName);
        cy.log('User selected the-' + userGroupName + ' option in Usergroup');

        //selecting UserName
        userUtils.selectUserName(userName2);
        cy.log('User selected the' + userName2 + 'option in Username');
        cy.wait(1000);

        //Expanding workspace section
        cy.get(workspaceHeaderElement).click();
        cy.log('User sucessfully Expanded Workspace section');

        userUtils.validateUncheckCheckbox(workspaceOption2);

        userUtils.checkWorkspaceCheckbox(workspaceOption2);

        //checking option in default workspaces
        cy.get(defaultWorkspaceDropdown).should('contain', 'Craig QA General');
        cy.log('User sucessfully Expanded Workspace section');

        //Checking apply button should be enabled
        cy.get(applyButton).should('be.enabled');
        

        //Checking Cancel button should be enabled
        cy.get(cancelButton).should('be.enabled');
        cy.log('Apply and cancel button enabled');

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




        // Login to AMI.
        loginUtils.loginToAMI(userName);
        cy.log('User Successfully logged in application');

        //selcting the Configuration Option in Workspace Dropdown
        //changeDropdownUtils.changeWorkspace('Configuration Options');
        changeDropdownUtils.changeWorkspace(workspaceOption);
        cy.log('User Successfully navigated to Configuration Options');

        //Clicking on user Gadget
        userUtils.selectGadget(gadgetName);
        cy.log('User clicked on User gadget');

        //selecting Admin user group
        userUtils.selectUserGroup(userGroupName);
        cy.log('User selected the-' + userGroupName + ' option in Usergroup');

        //selecting UserName
        userUtils.selectUserName(userName2);
        cy.log('User selected the' + userName2 + 'option in Username');

        //Expanding workspace section
        cy.wait(1000);
        cy.get(workspaceHeaderElement).click();



        userUtils.validateUncheckCheckbox(workspaceOption2);

        userUtils.checkWorkspaceCheckbox(workspaceOption2);


        cy.get(cancelButton).should('be.enabled').click();

        //selcting the Configuration Option in Workspace Dropdown

        changeDropdownUtils.changeWorkspace(workspaceOption);
        cy.log('User Successfully navigated to Configuration Options');

        //Clicking on user Gadget
        userUtils.selectGadget(gadgetName);
        cy.log('User clicked on User gadget');

        //selecting Admin user group
        userUtils.selectUserGroup(userGroupName);
        cy.log('User selected the-' + userGroupName + ' option in Usergroup');
        
        //Selecting username
        userUtils.selectUserName(userName2);
        cy.log('User selected the' + userName2 + 'option in Username');

        //Expanding workspace section
        cy.wait(1000);
        cy.get(workspaceHeaderElement).click();

        userUtils.validateUncheckCheckbox('Craig QA General');

        //Checking checked worrkspace option is present in default workspace dropdown
        cy.get(defaultWorkspaceDropdown).should('not.be.contain', 'Craig QA General');
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

       
        // Login to AMI.
        loginUtils.loginToAMI(userName);
        cy.log('User Successfully logged in application');

        //selcting the Configuration Option in Workspace Dropdown
        //changeDropdownUtils.changeWorkspace('Configuration Options');
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

        //Expanding workspace section
        cy.wait(1000);
        cy.get(workspaceHeaderElement).click();

        userUtils.validateUncheckCheckbox(workspaceOption2);

        userUtils.checkWorkspaceCheckbox(workspaceOption2);

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

        //Expanding workspace section
        cy.wait(1000);
        cy.get(workspaceHeaderElement).click();
        
        //Checking checked worrkspace option is present in default workspace dropdown
        cy.get(defaultWorkspaceDropdown).should('contain', 'Datasheet Gadget');
        userUtils.validateCheckedCheckbox(workspaceOption2);

        //Making the previous state
        userUtils.uncheckWorkspaceCheckbox(workspaceOption2);

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
        //var workspaceOption4 = genericUtils.csvFile('userData.csv', 10, 5);

        //rerieving elements 
        var workspaceHeaderElement = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'workspaceSection');
        var defaultWorkspaceDropdown = genericUtils.jsonFile('userModuleElements.json', 'workspaceScreen', 'defaultWorkspaceDropdown');
        var applyButton = genericUtils.jsonFile('userModuleElements.json', 'workspaceScreen', 'applyButton');




        // Login to AMI.
        loginUtils.loginToAMI(userName);
        cy.log('User Successfully logged in application');

        //selcting the Configuration Option in Workspace Dropdown
        //changeDropdownUtils.changeWorkspace('Configuration Options');
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

        //Expanding workspace section
        cy.wait(1000);
        cy.get(workspaceHeaderElement).click();

        //Checking workspace checkboxes
        userUtils.checkWorkspaceCheckbox(workspaceOption2);
        userUtils.checkWorkspaceCheckbox(workspaceOption3);
        // userUtils.checkWorkspaceCheckbox(workspaceOption4);
        


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

        //Expanding workspace section
        cy.wait(1000);

        //var expandValue = cy.get(workspaceHeaderElement).invoke('attr', 'aria-expanded')

       
        cy.get(workspaceHeaderElement).click();
        
        //cy.get(workspaceHeaderElement).click();

        cy.get(defaultWorkspaceDropdown).should('contain', 'Agrex Example');
        cy.get(defaultWorkspaceDropdown).should('contain', 'CraigQA1');
        // cy.get(defaultWorkspaceDropdown).should('contain', 'Error Space');
        

        //selecting another option in default workspace dropdown
        var dropDownName = genericUtils.csvFile('userData.csv', 23, 5);
        //var defaultWorkspace = genericUtils.jsonFile('userModuleElements.json', 'workspaceScreen', 'defaultWorkspaceDropdown');
        //cy.wait(1000);
        cy.get(defaultWorkspaceDropdown, { timeout: 20000 }).select(dropDownName);

        
        //Cliking on apply button
        cy.get(applyButton).should('be.enabled').click();
        //Checking selected option becomes default workspace
        cy.get(defaultWorkspaceDropdown).find(':selected').contains(dropDownName);

        //making previous state

        userUtils.uncheckWorkspaceCheckbox(workspaceOption2);
        userUtils.uncheckWorkspaceCheckbox(workspaceOption3);
        //userUtils.uncheckWorkspaceCheckbox(workspaceOption4);

        cy.get(applyButton).should('be.enabled').click();
        //Log out from AMI application
        //loginUtils.logoutFromAMI();
    });
});







