"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Activities", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.STRING,
      },
      content: {
        type: Sequelize.TEXT,
      },
      deletedAt: {
        type: Sequelize.TINYINT,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: new Date,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: new Date,
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Activities");
  },
};
