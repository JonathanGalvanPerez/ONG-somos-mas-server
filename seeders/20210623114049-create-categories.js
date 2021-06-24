'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Categories', [
      {
        name: 'General',
        description: 'Novedades de tipo general'
      },
      {
        name: 'Eventos',
        description: 'Anuncios de nuevos eventos'
      },
      {
        name: 'Encuentros',
        description: 'Anuncio de nuevos encuentros'
      },
      {
        name: 'Educación',
        description: 'Novedades sobre educación'
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
