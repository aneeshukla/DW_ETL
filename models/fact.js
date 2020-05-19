module.exports = (sequelize, type) => {
  return sequelize.define('Fact', {
    maker_id: {
      type: type.STRING,
      references: {
        model: sequelize.models.Maker,
        key: 'id'
      }
    },
    location_id: {
      type: type.STRING,
      references: {
        model: sequelize.models.Location,
        key: 'id'
      }
    },
    model_id: {
      type: type.STRING,
      references: {
        model: sequelize.models.CarModel,
        key: 'id'
      }
    },
    time_id: {
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