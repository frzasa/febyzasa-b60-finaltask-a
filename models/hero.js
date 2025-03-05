'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class hero extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  hero.init({
    name: DataTypes.STRING,
    type_id: DataTypes.INTEGER,
    photo: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    postedAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'hero',
  });
  return hero;
};