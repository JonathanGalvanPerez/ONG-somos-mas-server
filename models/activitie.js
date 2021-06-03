"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Activitie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  Activitie.init(
    {
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      content: DataTypes.TEXT,
      deletedAt: DataTypes.TINYINT
    },
    {
      sequelize,
      modelName: "Activitie",
    }
  );
  return Activitie;
};

