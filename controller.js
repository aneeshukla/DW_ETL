const Location = require('./models/location');
const Maker = require('./models/maker');
const CarModel = require('./models/carModel');
const Time = require('./models/time');
const Fact = require('./models/fact');

const getLocations = async () => {
    const locations = await Location.findAll();
    console.log(locations.every(location => location instanceof Location)); // true
    console.log("All Locations:", JSON.stringify(locations, null, 2));
}
const getMakers = async () => {
    const makers = await Maker.findAll();
    console.log(makers.every(maker => maker instanceof Maker)); // true
    console.log("All Maker:", JSON.stringify(makers, null, 2));
}
const getModels = async () => {
    const models = await CarModel.findAll();
    console.log(models.every(model => model instanceof CarModel)); // true
    console.log("All Models:", JSON.stringify(models, null, 2));
}
const getTimes = async () => {
    const times = await Time.findAll();
    console.log(times.every(time => time instanceof Time)); // true
    console.log("All Times:", JSON.stringify(times, null, 2));
}
const getFacts = async () => {
    const facts = await Fact.findAll();
    console.log(facts.every(fact => fact instanceof Fact)); // true
    console.log("All Facts:", JSON.stringify(facts, null, 2));
}

const createLocation = async (location) => {
    return await Location.create(location);
}

module.exports = {
    getModels,
    getFacts,
    getLocations,
    getMakers,
    getTimes,
    createLocation
}