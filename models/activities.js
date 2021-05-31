"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Slide extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  Slide.init(
    {
      name: DataTypes.STRING,
      content: DataTypes.STRING,
      
    },
    {
      sequelize,
      modelName: "Slide",
    }
  );
  return Slide;
};