'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('OrganizationContacts', [{
      facebook: 'Somos_Más',
      instagram: 'SomosMás',
      twitter: '@somosmas',
      email: 'somosfundacionmas@gmail.com',
      createdAt: new Date,
      updatedAt: new Date
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
