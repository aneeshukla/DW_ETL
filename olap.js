const Cube = require('olap-cube-js');
const controller = require('./controller');

let dimensionHierarchies = [(
    {
        dimensionTable: {
            dimension: 'locations',
            keyProps: ['Location.country', 'Location.city', 'Location.factory']
        }
    },
    {
        dimensionTable: {
            dimension: 'makers',
            keyProps: ['Maker.name', 'Maker.ceo']
        }
    },
    {
        dimensionTable: {
            dimension: 'models',
            keyProps: ['CarModel.name', 'CarModel.fuel_type']
        }
    },
    {
        dimensionTable: {
            dimension: 'times',
            keyProps: ['Time.year', 'Time.month']
        }
    }
)];

let cube = new Cube({ dimensionHierarchies });
// This is the data schema we need to obtain

const initCube = async () => {
    let facts = await controller.getFacts();
    // console.log(JSON.parse(factData))
    // console.log(JSON.stringify(cube.dimensionHierarchies[0]))
    await cube.addFacts(JSON.parse(JSON.stringify(facts)));
    return cube.dice({}).getCells();
}

module.exports = {
    initCube
}