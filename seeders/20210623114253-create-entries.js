'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Entries', [
      {
        name: 'Novedades Generales',
        image: 'images/novedad1.jpg',
        content: 'Phasellus dignissim dui sed consequat lobortis. In consequat purus urna, non dapibus dui vulputate at. Pellentesque eu luctus augue. Etiam eget lacus quis purus mollis mollis. Praesent iaculis ornare lorem. Quisque eget sapien justo. Nullam molestie facilisis dui, quis imperdiet magna.',
        categoryId: 1,
        type: 'news'
      },
      {
        name: 'Nuevo evento!',
        image: 'images/novedad2.jpg',
        content: 'Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Pellentesque rutrum id risus non fermentum. Suspendisse ultrices ipsum nec felis malesuada aliquam at vitae dolor. Nam ultricies elementum egestas.',
        categoryId: 2,
        type: 'news'
      },
      {
        name: 'Encuentro de la comunidad',
        image: 'images/novedad3.jpg',
        content: 'Etiam elementum tellus urna, sit amet pretium eros ullamcorper id. Vivamus et aliquet leo. Mauris at risus lorem. Aliquam feugiat magna at scelerisque pellentesque. Mauris feugiat eros non purus mollis cursus. Praesent et pellentesque elit, a semper erat. Nunc euismod augue at tincidunt tempor.',
        categoryId: 3,
        type: 'news'
      },
      {
        name: 'Novedad Educativa!',
        image: 'images/novedad4.jpg',
        content: 'Nullam rutrum egestas egestas. Pellentesque nisl orci, consequat at ultricies vel, dignissim id purus. Proin faucibus rutrum ipsum sed congue. Praesent lobortis consequat diam eget aliquam. Etiam eget diam scelerisque, cursus quam quis, hendrerit risus. Proin sed pretium tortor.',
        categoryId: 4,
        type: 'news'
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Entries', null, {});
  }
};
