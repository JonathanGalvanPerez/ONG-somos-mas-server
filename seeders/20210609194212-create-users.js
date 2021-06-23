"use strict";

// La contraseña para los usuarios es 123456

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          firstName: "Facundo",
          lastName: "Martinez",
          email: "test0@test0.com",
          // Important: Password not encrypted yet!
          password: "$2a$10$iSpsSfZI.pkjNf.ieNGNe.8rCqhshrW.oWUDsceea8Y1PZ6sFuQEe",
          roleId: 1,
          image:
            "https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Alejandro",
          lastName: "Sosa",
          email: "test1@test1.com",
          // Important: Password not encrypted yet!
          password: "$2a$10$iSpsSfZI.pkjNf.ieNGNe.8rCqhshrW.oWUDsceea8Y1PZ6sFuQEe",
          roleId: 1,
          image:
            "https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Braulio",
          lastName: "Salazar",
          email: "test2@test2.com",
          // Important: Password not encrypted yet!
          password: "$2a$10$iSpsSfZI.pkjNf.ieNGNe.8rCqhshrW.oWUDsceea8Y1PZ6sFuQEe",
          roleId: 1,
          image:
            "https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Fabian",
          lastName: "Romero",
          email: "test3@test3.com",
          // Important: Password not encrypted yet!
          password: "$2a$10$iSpsSfZI.pkjNf.ieNGNe.8rCqhshrW.oWUDsceea8Y1PZ6sFuQEe",
          roleId: 1,
          image:
            "https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Brian",
          lastName: "Retamar",
          email: "test4@test4.com",
          // Important: Password not encrypted yet!
          password: "$2a$10$iSpsSfZI.pkjNf.ieNGNe.8rCqhshrW.oWUDsceea8Y1PZ6sFuQEe",
          roleId: 1,
          image:
            "https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Mariano",
          lastName: "Collavino",
          email: "test5@test5.com",
          // Important: Password not encrypted yet!
          password: "$2a$10$iSpsSfZI.pkjNf.ieNGNe.8rCqhshrW.oWUDsceea8Y1PZ6sFuQEe",
          roleId: 1,
          image:
            "https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Jonathan",
          lastName: "Perez",
          email: "test6@test6.com",
          // Important: Password not encrypted yet!
          password: "$2a$10$iSpsSfZI.pkjNf.ieNGNe.8rCqhshrW.oWUDsceea8Y1PZ6sFuQEe",
          roleId: 1,
          image:
            "https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Samuel",
          lastName: "Benitez",
          email: "test7@test7.com",
          // Important: Password not encrypted yet!
          password: "$2a$10$iSpsSfZI.pkjNf.ieNGNe.8rCqhshrW.oWUDsceea8Y1PZ6sFuQEe",
          roleId: 1,
          image:
            "https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Victor",
          lastName: "Valenzuela",
          email: "test8@test8.com",
          // Important: Password not encrypted yet!
          password: "$2a$10$iSpsSfZI.pkjNf.ieNGNe.8rCqhshrW.oWUDsceea8Y1PZ6sFuQEe",
          roleId: 1,
          image:
            "https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Dante",
          lastName: "Militello",
          email: "test9@test9.com",
          // Important: Password not encrypted yet!
          password: "$2a$10$iSpsSfZI.pkjNf.ieNGNe.8rCqhshrW.oWUDsceea8Y1PZ6sFuQEe",
          roleId: 1,
          image:
            "https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "John",
          lastName: "Smith",
          email: "john@smith.com",
          // Important: Password not encrypted yet!
          password: "$2a$10$iSpsSfZI.pkjNf.ieNGNe.8rCqhshrW.oWUDsceea8Y1PZ6sFuQEe",
          roleId: 2,
          image:
            "https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Joe",
          lastName: "Smith",
          email: "joe@smith.com",
          // Important: Password not encrypted yet!
          password: "$2a$10$iSpsSfZI.pkjNf.ieNGNe.8rCqhshrW.oWUDsceea8Y1PZ6sFuQEe",
          roleId: 2,
          image:
            "https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Bob",
          lastName: "Smith",
          email: "bob@smith.com",
          // Important: Password not encrypted yet!
          password: "$2a$10$iSpsSfZI.pkjNf.ieNGNe.8rCqhshrW.oWUDsceea8Y1PZ6sFuQEe",
          roleId: 2,
          image:
            "https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Mike",
          lastName: "Smith",
          email: "mike@smith.com",
          // Important: Password not encrypted yet!
          password: "$2a$10$iSpsSfZI.pkjNf.ieNGNe.8rCqhshrW.oWUDsceea8Y1PZ6sFuQEe",
          roleId: 2,
          image:
            "https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Juan",
          lastName: "Carlos",
          email: "juan@carlos.com",
          // Important: Password not encrypted yet!
          password: "$2a$10$iSpsSfZI.pkjNf.ieNGNe.8rCqhshrW.oWUDsceea8Y1PZ6sFuQEe",
          roleId: 2,
          image:
            "https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Jane",
          lastName: "Smith",
          email: "jane0@smith.com",
          // Important: Password not encrypted yet!
          password: "$2a$10$iSpsSfZI.pkjNf.ieNGNe.8rCqhshrW.oWUDsceea8Y1PZ6sFuQEe",
          roleId: 2,
          image:
            "https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Mike",
          lastName: "Jones",
          email: "mike@jones.com",
          // Important: Password not encrypted yet!
          password: "$2a$10$iSpsSfZI.pkjNf.ieNGNe.8rCqhshrW.oWUDsceea8Y1PZ6sFuQEe",
          roleId: 2,
          image:
            "https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "David",
          lastName: "Smith",
          email: "david0@smith.com",
          // Important: Password not encrypted yet!
          password: "$2a$10$iSpsSfZI.pkjNf.ieNGNe.8rCqhshrW.oWUDsceea8Y1PZ6sFuQEe",
          roleId: 2,
          image:
            "https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Linda",
          lastName: "Chandler",
          email: "linda0@chandler.com",
          // Important: Password not encrypted yet!
          password: "$2a$10$iSpsSfZI.pkjNf.ieNGNe.8rCqhshrW.oWUDsceea8Y1PZ6sFuQEe",
          roleId: 2,
          image:
            "https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Hilda",
          lastName: "Hills",
          email: "hilda@hills.com",
          // Important: Password not encrypted yet!
          password: "$2a$10$iSpsSfZI.pkjNf.ieNGNe.8rCqhshrW.oWUDsceea8Y1PZ6sFuQEe",
          roleId: 2,
          image:
            "https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  },
};
