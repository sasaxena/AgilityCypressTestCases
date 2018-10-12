/**
 * Utility function to retrieve the data from csv
 * @param {string} filename - the name of the csv file to select to.
 * @param {string} row - row no.
 * @param {string} column - column no
 * @returns {resolve} -csv data
 */
function csvFile(filename, row, column) {

    return new Cypress.Promise((resolve) => {
        cy.fixture(filename, 'utf-8').as('csvFileData');

        cy.get('@csvFileData').then((csvFileData) => {
            resolve(csvFileData.split(/\n/)[row].split(',')[column]);
        });
    });

}
        
        
/**
 * Utility function to select the data from json(object)
 * @param {string} filename - the name of the csv file to select to.
 * @param {string} obj - Screen Name
 * @param {string} key - Key name to retrieve value
 */

function jsonFile(filename, obj, key) {

    return new Cypress.Promise((resolve) => {

        cy.fixture(filename).as('jsonFileData');

        cy.get('@jsonFileData').then((jsonFileData) => {

            const val = jsonFileData[obj];
            resolve(val[key]);

        });

    });
}

module.exports = {


    csvFile: csvFile,
    jsonFile: jsonFile
};
