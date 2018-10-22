/**
/ * Utility function to retrieve the data from csv(As per new requirement ,we added the new csvFile() function)
/ * @param {string} filename - the name of the csv file to select to.
/ * @param {string} row - row no.
/ * @param {string} column - column no
/ * @returns {resolve} -csv data
/ *

 function csvFile(filename, row, column) {

    return new Cypress.Promise((resolve) => {
        cy.fixture(filename, 'utf-8').as('csvFileData');

        cy.get('@csvFileData').then((csvFileData) => {
            resolve(csvFileData.split(/\n/)[row].split(',')[column]);
        });
    });

}
/ */       
        
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


/**
 * Utility function to retrieve the data from csv
 * @param {string} filename - the name of the csv file to select to.
 * @param {string} row1 - row name of csv data
 * @param {string} column - column name of csv data
 * @returns {resolve} -csv data
 */
function csvFile(filename, row1, column) {

    return new Cypress.Promise((resolve) => {
        cy.fixture(filename, 'utf-8').as('csvFileData');
        cy.get('@csvFileData').then((csvFileData) => {
            (csvFileData.split(/\n/));
            var data = csvFileData.split(/\n/);
            var length1 = csvFileData.split(/\n/).length;
            var header = null;
            for (var i = 0; i <= length1 - 1; i++) {
                var allData = data[i];
                var allDataSplit = allData.split(',');

                if (allDataSplit.indexOf(row1) != -1) {
                    header = allDataSplit.indexOf(row1);
                }

                if (allDataSplit.indexOf(column) != -1) {
                    var columnData = i;
                    var p = csvFileData.split(/\n/)[columnData].split(',')[header];
                    resolve(p);
                }

            }

        });
    });
}


module.exports = {


    csvFile: csvFile,
    jsonFile: jsonFile
};
