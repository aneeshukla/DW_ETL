const csv = require('csvtojson');

const getData = async (csvFilePath) => {
    return await csv().fromFile(csvFilePath);
}

module.exports = {
    getData
}
