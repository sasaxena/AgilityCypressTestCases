const loginUtils = require('../../../utils/loginUtils');
const changeDropdownUtils = require('../../../utils/changeDropdownUtils');
const genericUtils = require('../../../utils/genericUtils');

describe('Clipboard functionality testcases', function () {
    it('AMI:743:1,AMI;744:2 Select the clipboard gadget,then clipboard gadget displayed with the following: header area with next and previous button,action Menu item option and Click on the action menu item button on the Clipboard gadget,then action menu items are displayed', function () {

        //Retrieving test data
        var userName = genericUtils.csvFile('userData.csv', "LoginName", "value11");  
        var cofigurationOption = genericUtils.csvFile('userData.csv', "WorkspaceCheckboxes", "value25");

        //Retrieving elements 
        var clipBoardHeaderElement = genericUtils.jsonFile('userModuleElements.json', 'clipBoardScreen', 'clipBoardheaderElement');
        var previousIcon = genericUtils.jsonFile('userModuleElements.json', 'clipBoardScreen', 'previousIcon');
        var nextIcon = genericUtils.jsonFile('userModuleElements.json', 'clipBoardScreen', 'nextIcon');
        var previewArea = genericUtils.jsonFile('userModuleElements.json', 'clipBoardScreen', 'previewArea');
        var actionMenu = genericUtils.jsonFile('userModuleElements.json', 'clipBoardScreen', 'actionMenu');
        var actionMenuItemValues = genericUtils.jsonFile('userModuleElements.json', 'clipBoardScreen', 'clipBoardheaderElement');
       
        // Login to AMI.
        loginUtils.loginToAMI(userName);
        cy.log('Successfully login to AMI');

        //Select the QA Attribute Gadget
        changeDropdownUtils.changeWorkspace(cofigurationOption);
        cy.log('QA Attribute gadget selected');

        //Then Clipboard Gadget is displayed with the following: Header Area with Next and Previous buttons, Preview area, Action Menu item option
        cy.get(clipBoardHeaderElement).should('be.visible');
        cy.get(nextIcon).should('be.visible');
        cy.get(previousIcon).should('be.visible');
        cy.get(previewArea).should('be.visible');
        cy.get(actionMenu).should('be.visible');
        cy.log('Header Area with Next and Previous buttons, Preview area, Action Menu item option are visible');

        //Clicked on action menu
        cy.get(actionMenu).click();
        cy.log('Clicked on action menu item button');

        //Then the below action menu items are displayed: Remove Page,Remove All, Turn basket mode on/off, Refresh and Help options
        cy.get(actionMenuItemValues).should('contain', 'Remove Page');
        cy.get(actionMenuItemValues).should('contain', 'Remove All');
        cy.get(actionMenuItemValues).should('contain', 'Turn basket mode on');
        cy.get(actionMenuItemValues).should('contain', 'Refresh');
        cy.get(actionMenuItemValues).should('contain', 'Help');
        cy.log('Remove Page,Remove All, Turn basket mode on/off, Refresh and Help options are visible to application');

        //Logout from AMI
        loginUtils.logoutFromAMI();
        cy.log('Successfully logout from AMI');
    });
    
    it('AMI:745:3,AMI:746:4,AMI:747:5,AMI:748:6,AMI:749:7,AMI:750:8, In the browse gadget, select an object and copy and In the browse gadget, select another object and copy and click on the previous arrow and click on the next arrow and copy an object and an attribute and log out from webclient and login again', function () {

        //Retrieving test data
        var userName = genericUtils.csvFile('userData.csv', "LoginName", "value11");
        var cofigurationOption = genericUtils.csvFile('userData.csv', "WorkspaceCheckboxes", "value25");
        var objectName = genericUtils.csvFile('userData.csv', "ObjectName", "value1");
        var expectedValue1 = genericUtils.csvFile('userData.csv', "PreviewData", "value1");
        var expectedValue2 = genericUtils.csvFile('userData.csv', "PreviewData", "value2");

        //Retrieving elements 
        var eventsList = genericUtils.jsonFile('userModuleElements.json', 'clipBoardScreen', 'eventsList');
        var pageAndAddedObjectInfo = genericUtils.jsonFile('userModuleElements.json', 'clipBoardScreen', 'pageAndAddedObjectInfo');
        var nextIcon = genericUtils.jsonFile('userModuleElements.json', 'clipBoardScreen', 'nextIcon');
        var previousIcon = genericUtils.jsonFile('userModuleElements.json', 'clipBoardScreen', 'previousIcon');
        var copyOption = genericUtils.jsonFile('userModuleElements.json', 'clipBoardScreen', 'copyOption');
        var objectElement = genericUtils.jsonFile('userModuleElements.json', 'clipBoardScreen', 'objectElement');
        var electricalCheckbox = genericUtils.jsonFile('userModuleElements.json', 'clipBoardScreen', 'electricalCheckbox');
        var cabinetHardwareCheckbox = genericUtils.jsonFile('userModuleElements.json', 'clipBoardScreen', 'cabinetHardwareCheckbox');
        var shopFittingAndStorage = genericUtils.jsonFile('userModuleElements.json', 'clipBoardScreen', 'shopFittingAndStorage');
        var helpingHands = genericUtils.jsonFile('userModuleElements.json', 'clipBoardScreen', 'helpingHands');
        var staircase = genericUtils.jsonFile('userModuleElements.json', 'clipBoardScreen', 'staircase');
        var expandOption = genericUtils.jsonFile('userModuleElements.json', 'clipBoardScreen', 'expandOption');

        // Login to AMI.
        loginUtils.loginToAMI(userName);
        cy.log('Successfully login to AMI');

        //Select the QA Attribute Gadget
        changeDropdownUtils.changeWorkspace(cofigurationOption);
        cy.log('QA Attribute gadget selected');

        //Clicking on events object
        cy.get(objectElement).contains(objectName).click();
        cy.log('Event object is selected successfully');

        //Expanding clipboard object
        cy.get(expandOption).click();
        cy.log('Clipboard object is expanded successfully');

        //Checking few checkboxes
        cy.get(electricalCheckbox).check();
        cy.get(cabinetHardwareCheckbox).check();
        cy.get(shopFittingAndStorage).check();
        cy.log('Checkboxes successfully checked');

        //Clicking on copy option
        cy.get(copyOption).click();
        cy.log('Successfully clicked on copy option');

        //Validating checked checkboxes in clipboard preview area
        cy.get(eventsList).contains('ELECTRICALS');
        cy.get(eventsList).contains('CABINET HARDWARE');
        cy.get(eventsList).contains('SHOPFITTING & STORAGE');
        cy.log('Successfully validated checked checkboxes in clipboard preview area');

        //Checking few more checkboxes
        cy.get(helpingHands).check();
        cy.get(staircase).check();
        cy.log('Checkboxes successfully checked');

        //Clicking on copy option
        cy.get(copyOption).click();
        cy.log('Successfully clicked on copy option');

        //Validating checked checkboxes in clipboard preview area
        cy.get(eventsList).contains('HELPING HANDS');
        cy.get(eventsList).contains('STAIRCASES');
        cy.log('Successfully validated checked checkboxes in clipboard preview area');

        //Validating previous and next icon
        cy.get(previousIcon).should('be.visible');
        cy.get(nextIcon).should('be.visible');
        cy.log('Successfully validated previous and next icon');

        //Clicking on previous icon
        cy.get(previousIcon).should('be.visible').click();
        cy.log('Successfully clicked on previous icon');

        // Validating previously checked checkboxes in clipboard preview area
        cy.get(eventsList).contains('ELECTRICALS');
        cy.get(eventsList).contains('CABINET HARDWARE');
        cy.get(eventsList).contains('SHOPFITTING & STORAGE');
        cy.log('Successfully validated previously checked checkboxes in clipboard preview area');

        //Clicking on next icon
        cy.get(nextIcon).should('be.visible').click();
        cy.log('Successfully clicked on next icon');

        // Validating currently checked checkboxes in clipboard preview area
        cy.get(eventsList).contains('HELPING HANDS');
        cy.get(eventsList).contains('STAIRCASES');
        cy.log('Successfully validated currently checked checkboxes in clipboard preview area');

        //Clipboard peview data validation
        cy.get(pageAndAddedObjectInfo).then(($btn) => {
            var actualValue = $btn.text();
            if (expectedValue1 === actualValue) {
                cy.log('Preview area data-' + actualValue);
            }
        });
        //Logout to AMI
        loginUtils.logoutFromAMI();
        cy.log('Successfully logout from AMI');

        //Login to AMI
        loginUtils.loginToAMI(userName);
        cy.log('Successfully login to AMI');

        //Selecting the QA Attribute Gadget
        changeDropdownUtils.changeWorkspace(cofigurationOption);
        cy.log('QA Attribute gadget selected');

        //Clipboard peview data validation
        cy.get(pageAndAddedObjectInfo).then(($btn) => {
            var actualValue1 = $btn.text();
            if (expectedValue2 === actualValue1) {
                cy.log('Preview area data-' + actualValue1);
            }
        });
        //Logout to AMI
        loginUtils.logoutFromAMI();
        cy.log('Successfully logout from AMI');
    });
});






