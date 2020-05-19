module.exports = (sequelize, type) => {
  return sequelize.define('Time', {
    // Model attributes are defined here
    id: {
      type: type.STRING,
      primaryKey: true,
      allowNull: false
    },
    year: {
      type: type.STRING
      // allowNull defaults to true
    },
    month: {
      type: type.STRING
    }
  }, {
    timestamps: false,
    freezeTableName: true
  });
}