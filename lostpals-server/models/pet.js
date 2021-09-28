'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Pet.belongsTo(models.User, {as: 'user', foreignKey: 'user_id'})
    }
  };
  Pet.init({
    name: DataTypes.STRING,
    gender: DataTypes.STRING,
    color: DataTypes.STRING,
    breed: DataTypes.STRING,
    image: DataTypes.STRING,
    is_chipped: DataTypes.BOOLEAN,
    chip_id: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Pet',
  });
  return Pet;
};