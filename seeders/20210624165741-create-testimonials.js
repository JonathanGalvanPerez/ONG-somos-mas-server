'use strict';
/**
 *     name: DataTypes.STRING,
    image: DataTypes.STRING,
    content: DataTypes.STRING
    */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'testimonials',
      [
        {
          name: 'Ignacio',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
          image: "https://firebasestorage.googleapis.com/v0/b/ragemp-ddbb9.appspot.com/o/testiperson1.jpg?alt=media&token=2d35d161-f4ae-4ddd-a10e-d2bce02f4404",
        },
        {
          name: 'María',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
          image: "https://firebasestorage.googleapis.com/v0/b/ragemp-ddbb9.appspot.com/o/testiperson4.jpg?alt=media&token=208ddd15-9655-4faf-b66f-852dc46e1ddf",
        },
        {
          name: 'Dolores',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
          image: "https://firebasestorage.googleapis.com/v0/b/ragemp-ddbb9.appspot.com/o/testiperson3.jpg?alt=media&token=4254381e-0365-426b-b211-548f26c0f0c1",
        },
        {
          name: 'Patricia',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
          image: "https://firebasestorage.googleapis.com/v0/b/ragemp-ddbb9.appspot.com/o/testiperson2.jpg?alt=media&token=4585d234-06b6-406a-829f-713654c20fd1",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
