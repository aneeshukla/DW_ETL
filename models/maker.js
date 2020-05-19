module.exports = (sequelize, type) => {
  return sequelize.define('Maker', {
    id: {
      type: type.STRING,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: type.STRING
    },
    ceo: {
      type: type.STRING
    }
  }, {
    timestamps: false,
    freezeTableName: true
  });
}