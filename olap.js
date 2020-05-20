const Cube = require('olap-cube-js');
const controller = require('./controller');

let dimensionHierarchies = [
    {
        dimensionTable: {
            dimension: 'country',
            keyProps: ['Location.id', 'Location.country']
        },
        level: [
            {
                dimensionTable: {
                    dimension: 'city',
                    keyProps: ['Location.city']
                },
                level: [
                    {
                        dimensionTable: {
                            dimension: 'factory',
                            keyProps: ['Location.factory']
                        }
                    }
                ]
            }
        ]
    },
    {
        dimensionTable: {
            dimension: 'maker',
            keyProps: ['Maker.id', 'Maker.name']
        },
        level: [
            {
                dimensionTable: {
                    dimension: 'ceo',
                    keyProps: ['Maker.ceo']
                }
            }
        ]
    },
    {
        dimensionTable: {
            dimension: 'model',
            keyProps: ['CarModel.id', 'CarModel.name']
        },
        level: [
            {
                dimensionTable: {
                    dimension: 'fueltype',
                    keyProps: ['CarModel.fuel_type']
                }
            }
        ]
    },
    {
        dimensionTable: {
            dimension: 'year',
            keyProps: ['Time.id', 'Time.year']
        },
        level: [
            {
                dimensionTable: {
                    dimension: 'month',
                    keyProps: ['Time.month']
                }
            }
        ]
    }
];

let cube = new Cube({ dimensionHierarchies });

const initCube = async () => {
    let facts = await controller.getFacts();
    cube.addFacts(facts);
    return 'Cube initialized! :D';
}

const dice = async () => {
    return cube.dice({}).getCells();
}

const getDimensionMembers = () => {
    cube.getDimensionMembers('locations')
}

const slice = () => {
    let member = cube.getDimensionMembers('country')[0];
    console.log(member);
    let subCube = cube.slice('country', member);
    console.log(subCube.getCells())
    return subCube.getCells();
}

const drillUp = () => {
    let countryMembers = cube.getDimensionMembers('country');
    let cityMembers = cube.dice({ 'country': countryMembers }).getDimensionMembers('city');
    return cityMembers;
}

const drillDown = () => {
    let cityMembers = cube.getDimensionMembers('city');
    let countryMembers = cube.dice({ 'city': cityMembers }).getDimensionMembers('country')
    return countryMembers;
}

module.exports = {
    initCube,
    slice,
    dice,
    getDimensionMembers,
    drillUp,
    drillDown
}