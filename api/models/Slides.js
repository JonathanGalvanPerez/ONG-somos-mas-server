const { DataTypes, Model } = require("sequelize");
/* const db = require("") */

Slides.init(
  {
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    organizacionId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // sequelize: db,
    modelName: "Slides",
  }
);

module.exports = Slides;
