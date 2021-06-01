const router = require('express').Router();
const {Entries} = require('../db');





    router.get('/', async (req, res) =>{
    try {
        
        //Se realiza consulta a la tabla correspondiente
        let news = await Entries.findAll( {
            where:{type:"news"}
        } );
        if(news.length === 0) throw new Error('No existe ningún news');
        
        res.json(news) ;

    } catch (error) {
        console.error('Error');   
        
        res.status(413).send("Error");
    }
    });  




module.exports = router;
