const Sequelize = require('sequelize')

const UsersModel = require('./models/users')

const sequelize = new Sequelize('ONG', 'root', '',{
    host:'localhost',
    dialect:'mysql',
    
});


const User = UsersModel(sequelize,Sequelize );



sequelize.sync({force:false})
    .then(() =>{
        console.log('Tablas sincronizadas');
    })

    module.exports ={

        User
        
    }