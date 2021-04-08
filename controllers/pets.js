const pets = require('../models/pets');

module.exports = app => {
    app.post('/pets', (req, res) => pets.adicionar(req.body, res));
}