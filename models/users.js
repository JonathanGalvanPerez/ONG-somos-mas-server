module.exports = (sequelize, type) =>{
    return sequelize.define('users',{
        id:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: type.STRING,
        
        
    })
    
}