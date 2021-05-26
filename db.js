const Sequelize = require('sequelize')




const sequelize = new Sequelize('ONG', 'root', '',{
    host:'localhost',
    dialect:'mysql',
    
});




sequelize.sync({force:false})
    .then(() =>{
        console.log('Tablas sincronizadas');
    })

    module.exports ={
        
    }