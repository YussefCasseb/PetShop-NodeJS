const pets = require('../models/pets');

module.exports = app => {
    app.post('/pets', (req, res) => {
        pets.adicionar(req.body)
            .then((pet) => res.status(201).json(pet))
            .catch((erros) => res.status(500).json(erros));
    });
}