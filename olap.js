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
    return cube.dice({ year: [ { id: 1 }, { id: 2 } ] }).getCells();
}

const getDimensionMembers = (dimension) => {
    return cube.getDimensionMembers(dimension);
}

const slice = () => {
    let member = cube.getDimensionMembers('country')[0];
    let subCube = cube.slice('country', member);
    return subCube.getFacts();
}


const rollUp = (fromDimension, toDimension) => {
    let lowLevelMembers = getDimensionMembers(fromDimension);
    let highLevelMembers = cube.dice({ [fromDimension]: lowLevelMembers }).getDimensionMembers(toDimension);
    console.table(highLevelMembers);
    return highLevelMembers;
}

const drillDown = (fromDimension, toDimension) => {
    let highLevelMembers = getDimensionMembers(fromDimension);
    let lowLevelMembers = cube.dice({ [fromDimension]: highLevelMembers }).getDimensionMembers(toDimension);
    console.table(lowLevelMembers);
    return lowLevelMembers;
}

const setGenerator = (queryInput)=>{
    let set = {};
    getMemberId(set, 'country', 'Location.country', queryInput.country);
    getMemberId(set, 'city', 'Location.city', queryInput.city);
    getMemberId(set, 'year', 'Time.year', queryInput.year);
    getMemberId(set, 'month', 'Time.month', queryInput.month);
    getMemberId(set, 'maker', 'Maker.name', queryInput.maker);
    getMemberId(set, 'ceo', 'Maker.ceo', queryInput.ceo);
    getMemberId(set, 'fuel_type', 'CarModel.fuel_type', queryInput.fuel_type);
    getMemberId(set, 'factory', 'Location.factory', queryInput.factory);
    getMemberId(set, 'model', 'CarModel.name', queryInput.model);
    return set;
}

const query = (queryInput) => {
    let set = setGenerator(queryInput);
    let queryData = cube.dice(set).getFacts();
    queryData = queryData.map((data)=>{
        return {
            country: data['Location.country'],
            city: data['Location.city'],
            factory: data['Location.factory'],
            maker: data['Maker.name'],
            ceo: data['Maker.ceo'],
            model: data['CarModel.name'],
            fuel_type: data['CarModel.fuel_type'],
            year: data['Time.year'],
            month: data['Time.month'],
            mileage: data.mileage,
            engine_power: data.engine_power,
            price: data.price
        }
    });
    console.table(queryData);
    return queryData;
}

const getMemberId = (set, type, column, value) => {
    if(value){
        let filteredMembers = cube.getDimensionMembers(type).filter((member)=>{
            return member[column]===value;
        });
        set[type]=[];
        filteredMembers.map((member)=>{
            set[type].push({
                id: member.id
            });
        });
    }
}

module.exports = {
    initCube,
    slice,
    dice,
    getDimensionMembers,
    rollUp,
    drillDown,
    query
}