const { Location, Time, Maker, CarModel, Fact } = require('./db');

const getLocations = async () => {
    const locations = await Location.findAll();
    console.log(locations.every(location => location instanceof Location)); // true
    console.log("All Locations:", JSON.stringify(locations, null, 2));
    return locations;
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
    const facts = await Fact.findAll({
        include: [
            Time,
            Location,
            CarModel,
            Maker
        ],
        raw: true
    });
    console.log(facts.every(fact => fact instanceof Fact)); // true
    console.log("All Facts:", JSON.stringify(facts, null, 2));
    return facts;
}

module.exports = {
    getModels,
    getFacts,
    getLocations,
    getMakers,
    getTimes
}