const csvReader = require('./csvReader');

const {Location, Time, CarModel, Maker, Fact} = require('./db');

const _initLocations = async () => {
    await csvReader.getData('./data_files/location.csv').then(async (dataArray) => {
        await Location.bulkCreate(dataArray);
    });
}

const _initMakers = async () => {
    await csvReader.getData('./data_files/maker.csv').then(async (dataArray) => {
        await Maker.bulkCreate(dataArray);
    });
}
const _initCarModels = async () => {
    await csvReader.getData('./data_files/model.csv').then(async (dataArray) => {
        await CarModel.bulkCreate(dataArray);
    });
}
const _initTimes = async () => {
    await csvReader.getData('./data_files/time.csv').then(async (dataArray) => {
        await Time.bulkCreate(dataArray);
    });
}
const _initFacts = async () => {
    Fact.removeAttribute('id');
    await csvReader.getData('./data_files/fact.csv').then(async (dataArray) => {
        await Fact.bulkCreate(dataArray);
    });
}

const begin = () => {
    Promise.all([_initCarModels(), _initLocations(), _initMakers(), _initTimes(), _initFacts()]).then((result) => {
        console.log('DB successfully initialized! :D');
    }).catch((error)=>{
        console.log('Could not initialize DB :(\nError: '+error);
    });
}

module.exports = {
    begin
}