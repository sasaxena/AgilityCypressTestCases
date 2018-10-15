const userUtils = require('../../../utils/userUtils');
const loginUtils = require('../../../utils/loginUtils');
const genericUtils = require('../../../utils/genericUtils');

describe('User Gadget Menu functionality', function () {
    it('AMI:1916:61,AMI:1917:62 Validating disable user poup with ok and cancel button after clicking on disable user option in user action menu and click on cancel button,then user should not get disabed', function () {

        var userName = genericUtils.csvFile('userData.csv', 1, 0);
        var userGroupName = genericUtils.csvFile('userData.csv', 1, 3);
    
        var dropDownUserName = genericUtils.csvFile('userData.csv', 10, 0);

        var userGadget = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'userGadget');
        var userOption = genericUtils.jsonFile('userModuleElements.json', 'userOptions', 'actionMenu');
        var disableUserOption = genericUtils.jsonFile('userModuleElements.json', 'userOptions', 'disableUser');
        var cancelButton = genericUtils.jsonFile('userModuleElements.json', 'disableUserScreen', 'cancelButton');
        var cofirmationMsg = genericUtils.jsonFile('userModuleElements.json', 'disableUserScreen', 'confirmationMsg');
        var userNameField = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'userName');
        
        // Login to AMI.
        loginUtils.loginToAMI(userName);

        // Clicks on user gadgets
        cy.get(userGadget).click();
        cy.log('Clicked on user gadget');

        // Selects 'User groups' in user group dropdown.
        userUtils.selectUserGroup(userGroupName);
        cy.log('Selected userGroup value in dropdown');

        //Selects 'user name' in User Name dropdown
        userUtils.selectUserName(dropDownUserName);
        cy.log('Selected User name value in dropdown');

        //Clicks On Option Button and Selects disable User option
        cy.get(userOption).click();
        cy.log('Successfully clicked on user option');

        cy.get(disableUserOption, { timeout: 20000 }).should('be.visible');
        cy.get(disableUserOption).click();
        cy.log('Clicked On disable User Option');

        //Pop Up Message will be displayed
        cy.get(cofirmationMsg).should('be.visible');
        cy.log('Pop up message is displayed');
       
        //User Clicks On Cancel button in disable user popUp
        cy.get(cancelButton).click();
        cy.log('Clicked on cancel button in disable user popup');

        //User should not be get disabled
        cy.get(userNameField).should('contain', 'cypress11');
        cy.log('validated successfully user is not disabled after clicking on cancel');

    });

    it('AMI:1918:63,AMI:1919:64,AMI:1920:65,AMI:1921:66,AMI:1922:67,AMI:1923:68,AMI:1924:69,AMI:1925:70 Disabling a user and checking re- enable user option should get enabled', function () {


        var userName = genericUtils.csvFile('userData.csv', 1, 0);
        var userGroupName = genericUtils.csvFile('userData.csv', 1, 3);
        var sortOptionValue1 = genericUtils.csvFile('userData.csv', 1, 11);
        var sortOptionValue2 = genericUtils.csvFile('userData.csv', 2, 11);
        var dropDownUserName = genericUtils.csvFile('userData.csv', 10, 0);

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

        // Login to AMI.
        loginUtils.loginToAMI(userName);

        // Clicks on user gadgets
        cy.get(userGadget).click();
        cy.log('Clicked On User Gadget');

        // Selects 'User groups' in user group dropdown.
        userUtils.selectUserGroup(userGroupName);
        cy.log('Selected UserGroup Value In dropdown');

        //Selects 'user name' in User Name dropdown
        userUtils.selectUserName(dropDownUserName);
        cy.log('Selected User name value In dropdown');

        //Clicks On Option Button and Selects disable User option
        cy.get(userOption).click();
        cy.log('Successfully Clicked On User Option');

        cy.get(disableUserOption, { timeout: 20000 }).should('be.visible');
       
        cy.get(disableUserOption).click();
        cy.log('Successfully Clicked On disable User option');
        cy.get(okButton).click();
        cy.log('Successfully clicked on Ok Button in disable User pop up');

        //Then user should get disabled
        cy.get(userNameField).should('not.have.value', 'cypress11');
        cy.log('The dropdown value is disabled');
   
        //click on Re-enable User Option 
        cy.get(userOption).click();
        cy.log('Clicked On User Option');
        
        cy.get(reEnableUserOption).click();

        //Re-eneble user window should come with a list of disabled users alongwith sort by dropdown ,disabled ok and enabled cancel button
        cy.get(sortDropDown).should('be.visible');
        cy.get(disableUsersList).should('contain', 'cypress11');
        cy.get(reEnableOkButton).should('be.disabled');
        cy.get(reEnableCancelButton).should('be.visible');
        
        //it should consists loginName and UserName options
        cy.get(sortDropDown).should('contain', 'Login Name');
        cy.get(sortDropDown).should('contain', 'User Name');

        //Select LoginName from sort dropdown 
        cy.get(sortDropDown).select(sortOptionValue1);
        cy.log('Login Name selected successfully in Dropdown');

        // login Name should be diplayed and should be sorted accordingly
        cy.get(sortDropDown).then(($option) => {
            const selectedOption = $option.find(':selected').text();
            if (selectedOption === sortOptionValue1) {
                cy.log('Login Name Option is Selected');
            }
        });
        cy.get(disableUsersList).should('contain', 'cypressTestUser11');//value is cypressTestUser11
      
        //Select UserName from sort dropdown
        cy.get(sortDropDown).select(sortOptionValue2);
        cy.log('UserName is selected in dropdown');

        // UserName should be diplayed and should be sorted accordingly
        cy.get(sortDropDown).then(($option) => {
            const selectedOption = $option.find(':selected').text();
            if (selectedOption === sortOptionValue2) {
                cy.log('User Name Option is Selected');
            }
        });
        cy.get(disableUsersList).should('contain', 'cypress11');
        
        //Select Any user from the list of user
        cy.get(disableUsersList).should('contain', 'cypress11').click();
        cy.log('Successfully Clicked on CheckBox');

        //Ok button should get enabled
        cy.get(reEnableOkButton).should('be.visible');

        //Select Any user from the list of user and click on Cancel button
        cy.get(reEnableCancelButton).click();
        cy.log('successfully clicked on Cancel Button');

        //renabled users window should get closed and user should not be renabled.
        cy.get(userNameField).should('not.have.value', 'cypress11');
        cy.log('username value is not renabled');

        //Select Any user from the list of user and click on ok button
        cy.get(userOption).click();
        cy.log('Clicked On User Option');
        cy.get(reEnableUserOption).click();
        cy.log('Clicked On reEnable User Option');
        cy.get(sortDropDown).select(sortOptionValue2);
        cy.log('Dropdown UserName is selected');
        cy.get(disableUsersList).should('contain', 'cypress11').click();
        cy.log('user clicked on checkbox value');
        cy.get(reEnableOkButton).click();
        cy.log('user clicked on Ok button of Re-enable Users');

        //user should get renabled and should display in userName dropdown.
        cy.get(userNameField).should('contain', 'cypress11');
        cy.log('The dropdown value is reenabled');

    });


    it.only('AMI:1859:71,72, Validations of all the fields in User view sections', function () {

        var userName = genericUtils.csvFile('userData.csv', 1, 0);
        var userGroupName = genericUtils.csvFile('userData.csv', 1, 3);
        var dropDownUserName = genericUtils.csvFile('userData.csv', 10, 0);

        var userOption = genericUtils.jsonFile('userModuleElements.json', 'userOptions', 'actionMenu');
        var refresh = genericUtils.jsonFile('userModuleElements.json', 'userOptions', 'refresh');
        var help = genericUtils.jsonFile('userModuleElements.json', 'userOptions', 'help');
        var userGadget = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'userGadget');

        // Login to AMI.
        loginUtils.loginToAMI(userName);

        // Clicks on user gadgets
        cy.get(userGadget).click();
        cy.log('Clicked On User Gadget');

        // Selects 'User groups' in user group dropdown.
        userUtils.selectUserGroup(userGroupName);
        cy.log('Selected UserGroup Value In dropdown');

        //Selects 'user name' in User Name dropdown
        userUtils.selectUserName(dropDownUserName);
        cy.log('Selected User name value In dropdown');

        //Click on refresh option,
        cy.get(userOption).click();
        cy.log('Clicked On User Option');
        cy.get(refresh).click();
        cy.log('Clicked On Refresh');

        //Click on help option
        cy.get(userOption).click();
        cy.log('Clicked On User Option');
        cy.get(help).click();
        cy.log('clicked On Help');

        

    });
});