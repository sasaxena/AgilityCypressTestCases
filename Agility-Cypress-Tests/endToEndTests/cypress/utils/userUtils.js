const genericUtils = require('./genericUtils');
/**
 * Utility function to select Gadget.
 * @param {string} gadgetName - the name of the gadget to select to.
 **/
function selectGadget(gadgetName) {

    // Check we are now in the required workspace.
    var userGadget = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'userGadget');
    var allGadgets = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'allGadgets');
    var avg = genericUtils.jsonFile('configEnvironment.json', 'timeout', 'avg');
    var timeOut = genericUtils.jsonFile('configEnvironment.json', 'timeout', 'min');

    cy.get(userGadget, { timeout: avg }).then(() => {
        
        waitForObject(timeOut);
        cy.get(userGadget, { timeout: avg }).should('exist');
        cy.get(allGadgets).find('button').contains(gadgetName).click();
    });
}

/*
 * Utility function to select UserGroup
 * @param {string} userGroupName - the name of the user group to select to.
 */
function selectUserGroup(userGroupName) {

    // Check we are now in the User Gadget
    var userGroupDropdown = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'userGroup');
    var avg = genericUtils.jsonFile('configEnvironment.json', 'timeout', 'avg');
    cy.get(userGroupDropdown, { timeout: avg }).select(userGroupName);
        
    
}

/*
 * Utility function to select UserName
 *  @param {string} userName - the name of the user name to select to.
 */
function selectUserName(userName) {

    // Check we are now in the User Gadget
    var userNameDropdown = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'userName');
    var avg = genericUtils.jsonFile('configEnvironment.json', 'timeout', 'avg');

    cy.get(userNameDropdown, { timeout: avg }).then((option) => {
        const selectedOption = option.find(':selected').text();
        if (selectedOption != userName) {

            cy.get(userNameDropdown, { timeout: avg }).select(userName);
        }
    });

}
/*
 *  function to check checkbox in list
 *  @param {string} checkboxListObject - passed checkbox list object
 * @param {string} checkBoxName - name of the checkbox to check in list
 */
function _checkCheckboxes(checkboxListObject, checkBoxName) {

    var avg = genericUtils.jsonFile('configEnvironment.json', 'timeout', 'avg');

    cy.get(checkboxListObject, { timeout: avg }).find('label').contains(checkBoxName).parent('li').within(() => {
        cy.get('input').check();
    });
}

/*
 *  function to uncheck checkbox in list
 *  @param {string} checkboxListObject - passed checkbox list object
 * @param {string} checkBoxName - name of the checkbox to uncheck in list
 */

function _uncheckCheckboxes(checkboxListObject, checkBoxName) {

    var min = genericUtils.jsonFile('configEnvironment.json', 'timeout', 'min');
    var avg = genericUtils.jsonFile('configEnvironment.json', 'timeout', 'avg');

    waitForObject(min);
    cy.get(checkboxListObject, { timeout: avg }).find('label').contains(checkBoxName).parent('li').within(() => {
        cy.get('input', { timeout: avg }).uncheck();
    });
}

/*
 *  function to check workspace checkbox
 *   @param {string} checkBoxName - the name of the checkbox to check
 */
function checkWorkspaceCheckbox(checkBoxName) {

    //check we are in the workspace section

    var workspaceCheckboxList = genericUtils.jsonFile('userModuleElements.json', 'workspaceScreen', 'workspaceCheckboxList');
    _checkCheckboxes(workspaceCheckboxList, checkBoxName);
    
   
}

/*
 *  function to Uncheck workspace checkbox
 *  @param {string} checkBoxName - the name of the checkbox to Uncheck
 */
function uncheckWorkspaceCheckbox(checkBoxName) {

    //check we are in the workspace section

    var workspaceCheckboxList = genericUtils.jsonFile('userModuleElements.json', 'workspaceScreen', 'workspaceCheckboxList');
    _uncheckCheckboxes(workspaceCheckboxList, checkBoxName);
   
}

/*
 *  function to validate checked checkbox
 *  @param {string} checkBoxName - the name of the checkbox to validate checked checkbox
 */
function validateCheckedCheckbox(checkboxListObject, checkBoxName) {

    //check we are in the workspace/Language section

    var avg = genericUtils.jsonFile('configEnvironment.json', 'timeout', 'avg');

    cy.get(checkboxListObject).find('label').contains(checkBoxName).parent('li').within(() => {
        cy.get('input', { timeout: avg }).should('checked');
    });
}

/*
 *  function to validate Unchecked checkbox
 *   @param {string} checkBoxName - the name of the checkbox to validate unchecked checkbox
 */
function validateUncheckCheckbox(checkboxListObject, checkBoxName) {

    //check we are in the workspace/Language section

    var avg = genericUtils.jsonFile('configEnvironment.json', 'timeout', 'avg');

    cy.get(checkboxListObject, { timeout: avg }).find('label').contains(checkBoxName).parent('li').within(() => {
        cy.get('input', { timeout: avg }).should('not.checked');

    });
}

function waitForObject(timeOut) {
    
    cy.wait(timeOut);
}

/*
 *  function to validate available option in dropdown
 *  @param {string} dropDown - passed dropdown list name
 * @param {string} item - the item in the dropdown list to validate
 */
 
function availableOptionInDropdown(dropDown, item) {

    // Allow 20 seconds to see all dropdown option.

    var avg = genericUtils.jsonFile('configEnvironment.json', 'timeout', 'avg');

    cy.get(dropDown, { timeout: avg }).within((selector) => {
        if (selector.text() !== item) {
            // Click to expand the dropDown
            selector.click();
            var result = false;
            cy.get('a').then((list) => {
                for (var i = 0; i < list.length; i++) {

                    cy.log(list[i].text);
                    if (list[i].text === item) {
                        result = true;
                        cy.log('true');
                    }
                }


                if (result === true) {
                    cy.log("Drpdown Option-" + item + "is present");
                } else {

                    throw new Error("Drpdown Option-" + item + "is not visible");


                }
            });

        }
    });
    
}


/*
 *  function to validate Unavailable option in dropdown
 *  @param {string} dropDown - passed dropdown list name
 * @param {string} item - the item in the dropdown list to validate of Unavailability
 */

function unAvailableOptionInDropdown(dropDown, item) {
    var avg = genericUtils.jsonFile('configEnvironment.json', 'timeout', 'avg');

    // Allow 20 seconds to see all dropdown option.
    cy.get(dropDown, { timeout: avg }).within((selector) => {

        if (selector.text() !== item) {
            // Click to expand the dropDown
            selector.click();
            var result = false;

            cy.get('a').then((list) => {
                for (var i = 0; i < list.length; i++) {

                    cy.log(list[i].text);
                    if (list[i].text === item) {
                        result = true;
                        cy.log('true');
                    }
                }


                if (result === false) {
                    cy.log("Drpdown Option-" + item + "is not present");

                } else {

                    throw new Error("Drpdown Option-" + item + "is visible");
                }
            });

        }
    });

}


/*
 * Utility function to select role
 *  @param {string} role - pass role name 
 */
function selectRole(role) {
    // Check we are now in the User Gadget
    var roleDropdown = genericUtils.jsonFile('userModuleElements.json', 'mainScreen', 'roleField');
    var avg = genericUtils.jsonFile('configEnvironment.json', 'timeout', 'avg');
    cy.get(roleDropdown, { timeout: avg }).select(role);
}

/*
 * Utility function to select role
 * @param {string} uiLocale - pass UI locale value
 */
function selectUILocale(uiLocale) {
    // Check we are now in the User Gadget
    var uiLocaleDropdown = genericUtils.jsonFile('userModuleElements.json', 'mainScreen', 'uiLocaleField');
    var avg = genericUtils.jsonFile('configEnvironment.json', 'timeout', 'avg');
    cy.get(uiLocaleDropdown, { timeout: avg }).select(uiLocale);
}

/*
 * Utility function to edit the text of any field
 *  @param {string} fieldObject - pass the object id
 *   @param {string} text - pass the text to be entered
 */
function editText(fieldObject, text) {
    // Check we are now in main section
    cy.get(fieldObject).clear();
    cy.get(fieldObject).type(text);
}


/*
 *  function to check language checkbox
 *   @param {string} checkBoxName - the name of the checkbox to check
 */
function checkLanguageCheckbox(checkBoxName) {

    //check we are in the language section

    var languageCheckboxList = genericUtils.jsonFile('userModuleElements.json', 'languageScreen', 'languageCheckboxList');
    _checkCheckboxes(languageCheckboxList, checkBoxName);


}
/*
 *  function to uncheck language checkbox
 *   @param {string} checkBoxName - the name of the checkbox to check
 */
function uncheckLanguageCheckbox(checkBoxName) {

    //check we are in the language section

    var languageCheckboxList = genericUtils.jsonFile('userModuleElements.json', 'languageScreen', 'languageCheckboxList');
    _uncheckCheckboxes(languageCheckboxList, checkBoxName);


}




module.exports = {
    selectGadget: selectGadget,
    selectUserGroup: selectUserGroup,
    selectUserName: selectUserName,
    availableOptionInDropdown: availableOptionInDropdown,
    unAvailableOptionInDropdown: unAvailableOptionInDropdown,
    checkWorkspaceCheckbox: checkWorkspaceCheckbox,
    validateUncheckCheckbox: validateUncheckCheckbox,
    validateCheckedCheckbox: validateCheckedCheckbox,
    uncheckWorkspaceCheckbox: uncheckWorkspaceCheckbox,
    waitForObject: waitForObject,
    selectRole: selectRole,
    selectUILocale: selectUILocale,
    editText: editText,
    _checkCheckboxes: _checkCheckboxes,
    _uncheckCheckboxes: _uncheckCheckboxes,
    checkLanguageCheckbox: checkLanguageCheckbox,
    uncheckLanguageCheckbox: uncheckLanguageCheckbox

};

