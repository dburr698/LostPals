'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LostPet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.LostPet.belongsTo(models.Pet, {as: 'pet', foreignKey: 'pet_id'})
    }
  };
  LostPet.init({
    pet_id: DataTypes.INTEGER,
    date_lost: DataTypes.DATE,
    circumstance: DataTypes.STRING,
    zipcode: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'LostPet',
  });
  return LostPet;
};