module.exports = (sequelize, type) => {
  return sequelize.define('Fact', {
    MakerId: {
      type: type.STRING,
      references: {
        model: sequelize.models.Maker,
        key: 'id'
      }
    },
    LocationId: {
      type: type.STRING,
      references: {
        model: sequelize.models.Location,
        key: 'id'
      }
    },
    CarModelId: {
      type: type.STRING,
      references: {
        model: sequelize.models.CarModel,
        key: 'id'
      }
    },
    TimeId: {
      type: type.STRING,
      references: {
        model: sequelize.models.Time,
        key: 'id'
      }
    },
    mileage: {
      type: type.INTEGER
    },
    engine_power: {
      type: type.INTEGER
    },
    price: {
      type: type.INTEGER
    }
  }, {
    timestamps: false,
    freezeTableName: true
  });
}