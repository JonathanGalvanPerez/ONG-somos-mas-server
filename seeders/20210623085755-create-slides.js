'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Slides', [
      {
        imageUrl: 'images/slide1.jpg',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean blandit dolor vel magna aliquam eleifend. Praesent varius pulvinar justo. Nulla facilisi. Cras sodales sem vel neque viverra tristique.',
        order: 1,
        organizationId: 1,
      },
      {
        imageUrl: 'images/slide2.jpg',
        text: 'Etiam cursus porttitor leo, et faucibus nunc finibus in. Nunc non sem id massa interdum laoreet. Fusce ultricies consequat nulla, et sodales libero auctor non.',
        order: 2,
        organizationId: 1,
      },
      {
        imageUrl: 'images/slide3.jpg',
        text: 'Vestibulum nunc magna, imperdiet tristique lacinia eget, imperdiet eget leo. Suspendisse eget erat vitae magna sodales tincidunt sit amet quis tellus. Integer nec semper est.',
        order: 3,
        organizationId: 1,
      },
      {
        imageUrl: 'images/slide4.jpg',
        text: 'Proin nec augue semper, efficitur metus vulputate, viverra felis. Donec eu viverra mauris. Cras fringilla malesuada dictum. Nunc semper a lorem sit amet laoreet.',
        order: 4,
        organizationId: 1,
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Slides', null, {});
  }
};
