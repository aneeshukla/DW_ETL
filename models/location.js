module.exports = (sequelize, type) => {
  return sequelize.define('Location', {
    // Model attributes are defined here
    id: {
      type: type.STRING,
      primaryKey: true,
      allowNull: false
    },
    country: {
      type: type.STRING
    },
    city: {
      type: type.STRING
    },
    factory: {
      type: type.STRING
    }
  }, {
    // Other model options go here
    timestamps: false,
    freezeTableName: true
  });
}