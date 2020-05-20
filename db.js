const { Sequelize } = require("sequelize");
const LocationModel = require('./models/location');
const MakerModel = require('./models/maker');
const CarModelModel = require('./models/carModel');
const TimeModel = require('./models/time');
const FactModel = require('./models/fact');

const sequelize = new Sequelize("sqlite::memory:");

const Location = LocationModel(sequelize, Sequelize);
const Maker = MakerModel(sequelize, Sequelize);
const CarModel = CarModelModel(sequelize, Sequelize);
const Time = TimeModel(sequelize, Sequelize);
const Fact = FactModel(sequelize, Sequelize);

Time.hasMany(Fact);
Fact.belongsTo(Time);

Location.hasMany(Fact);
Fact.belongsTo(Location);

Maker.hasMany(Fact);
Fact.belongsTo(Maker);

CarModel.hasMany(Fact);
Fact.belongsTo(CarModel);

console.log(sequelize.models)
sequelize.sync({ force: true })
    .then(() => {
        console.log(`Database & tables created!`)
    })

module.exports = {
    Location: Location,
    CarModel: CarModel,
    Maker: Maker,
    Time: Time,
    Fact: Fact,
    sequelize: sequelize,
    Sequelize: Sequelize
}