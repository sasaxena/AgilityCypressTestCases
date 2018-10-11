/**
 * Utility function to select Gadget.
 **/

const genericUtils = require('./genericUtils');

function selectGadget(gadgetName) {
    // Check we are now in the required workspace.
    var userGadget = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'userGadget');
    var implicit = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'implicit');
    var allGadgets = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'allGadgets');
    cy.get(userGadget, { timeout: 30000 }).then(() => {
        cy.wait(implicit);
        cy.get(userGadget, { timeout: 30000 }).should('exist');
        cy.get(allGadgets).find('button').contains(gadgetName).click();

       
       
    });
}

/*
 * Utility function to select UserGroup
 */
function selectUserGroup(userGroupName) {
    // Check we are now in the User Gadget
    var userGroupDropdown = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'userGroup');
    cy.get(userGroupDropdown, { timeout: 20000 }).select(userGroupName);

}


/*
 * Utility function to select UserName
 */
function selectUserName(userName) {
    // Check we are now in the User Gadget
    var userNameDropdown = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'userName');
    cy.get(userNameDropdown, { timeout: 20000 }).select(userName);
    


}


/*function _selectOptionFromDropdownList(dropDown, item) {
    // Allow 30 seconds in case we've just logged in.
    cy.get(dropDown, { timeout: 20000 }).within((selector) => {
       if()
       var value=cy.get(dropDown).select(item);
        }
    });
}
*/
/*
 *  function to select check workspace checkbox
 */
function checkWorkspaceCheckbox(checkBoxName) {
    //check we are in the workspace section
    var workspaceCheckboxList = genericUtils.jsonFile('userModuleElements.json', 'workspaceScreen', 'workspaceCheckboxList');
    cy.get(workspaceCheckboxList).find('label').contains(checkBoxName).parent('li').within(() => {
        cy.get('input').check();
    });

}
/*
 *  function to select Uncheck workspace checkbox
 */
function uncheckWorkspaceCheckbox(checkBoxName) {

    //check we are in the workspace section
    var implicit = genericUtils.jsonFile('userModuleElements.json', 'userScreen', 'implicit');

    var workspaceCheckboxList = genericUtils.jsonFile('userModuleElements.json', 'workspaceScreen', 'workspaceCheckboxList');
    cy.wait(implicit);
    cy.get(workspaceCheckboxList, { timeout: 3000 }).find('label').contains(checkBoxName).parent('li').within(() => {
        cy.get('input', { timeout: 20000 }).uncheck();
    });

}

/*
 *  function to validate checked workspace checkbox
 */
function validateCheckedCheckbox(name) {

    //check we are in the workspace section
    var workspaceCheckboxList = genericUtils.jsonFile('userModuleElements.json', 'workspaceScreen', 'workspaceCheckboxList');
    cy.get(workspaceCheckboxList).find('label').contains(name).parent('li').within(() => {
        cy.get('input', { timeout: 2000 }).should('checked');
    });
}

/*
 *  function to validate Unchecked workspace checkbox
 */
function validateUncheckCheckbox(name) {

    //check we are in the workspace section
    var workspaceCheckboxList = genericUtils.jsonFile('userModuleElements.json', 'workspaceScreen', 'workspaceCheckboxList');
    cy.get(workspaceCheckboxList).find('label').contains(name).parent('li').within(() => {
        cy.get('input', { timeout: 2000 }).should('not.checked');

    });
}



/*
 *  function to validate available option in dropdown
 */
function availableOptionInDropdown(dropDown, item) {
    // Allow 20 seconds to see all dropdown option.
    cy.get(dropDown, { timeout: 20000 }).within((selector) => {
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
 */
function unAvailableOptionInDropdown(dropDown, item) {

    // Allow 20 seconds to see all dropdown option.
    cy.get(dropDown, { timeout: 30000 }).within((selector) => {

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


module.exports = {
    selectGadget: selectGadget,
    selectUserGroup: selectUserGroup,
    selectUserName: selectUserName,
    availableOptionInDropdown: availableOptionInDropdown,
    unAvailableOptionInDropdown: unAvailableOptionInDropdown,
    checkWorkspaceCheckbox: checkWorkspaceCheckbox,
    validateUncheckCheckbox: validateUncheckCheckbox,
    validateCheckedCheckbox: validateCheckedCheckbox,
    uncheckWorkspaceCheckbox: uncheckWorkspaceCheckbox
};

