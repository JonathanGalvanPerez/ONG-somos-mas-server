'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'members', [
       {
        name: 'Cecilia Mendez',
        image: 'https://i.imgur.com/etdDYat.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },{
      name: 'Marco Fernandez',
      image: 'https://i.imgur.com/wiizMyt.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {
      name: 'Maria Garcia',
      image: 'https://i.imgur.com/XPsuBDi.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
    name: 'Maria Irola',
    image: 'https://i.imgur.com/cyen4LK.jpg',
    createdAt: new Date(),
    updatedAt: new Date(),
},
{
    name: 'Marita Gomez',
    image: 'https://i.imgur.com/2liK3AZ.jpg',
    createdAt: new Date(),
    updatedAt: new Date(),
},
{
  name: 'Miriam Rodriguez',
  image: 'https://i.imgur.com/Xi4zy9e.jpg',
  createdAt: new Date(),
  updatedAt: new Date(),
},
    {
      name: 'Rodrigo Fuente',
      image: 'https://i.imgur.com/Qp30ehA.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    ], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('members');
  }
};
