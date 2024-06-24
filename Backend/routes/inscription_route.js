module.exports = (app) => {
    const inscription = require('../controller/inscription_controller.js');

    let routeur = require('express').Router();

    routeur.put('/inscription', inscription.postIncscritpion);


    

    app.use('/api', routeur);
}
