module.exports = (sequelize, type) => {
  return sequelize.define('CarModel', {
    id: {
      type: type.STRING,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: type.STRING
    },
    fuel_type: {
      type: type.STRING
    }
  }, {
    timestamps: false,
    freezeTableName: true
  });
}