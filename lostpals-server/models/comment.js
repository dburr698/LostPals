'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Comment.belongsTo(models.LostPet, {as: 'lostPet', foreignKey: 'lostPet_id'}),
      models.Comment.belongsTo(models.User, {as: 'user', foreignKey: 'user_id'})
    }
  };
  Comment.init({
    user_id: DataTypes.INTEGER,
    lostPet_id: DataTypes.INTEGER,
    message: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};