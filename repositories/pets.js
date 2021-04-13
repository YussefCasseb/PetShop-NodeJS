const query = require('../database/queries');

class Pets {
    adicionar(pet) {
        const sql = 'INSERT INTO tb_pets SET ?';

        return query(sql, pet);
    }
}

module.exports = new Pets;