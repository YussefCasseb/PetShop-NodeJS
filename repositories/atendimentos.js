const query = require('../database/queries');

class Atendimentos {
    listarTodos() {
        const sql = 'SELECT * FROM tb_atendimentos';

        return query(sql);
    }

    buscarPorId(id) {
        const sql = 'SELECT * FROM tb_atendimentos WHERE id = ?';

        return query(sql, id);
    }

    adicionar(atendimento) {
        const sql = 'INSERT INTO tb_atendimentos SET ?';

        return query(sql, atendimento);
    }

    atualizar(id, atendimento) {
        const sql = 'UPDATE tb_atendimentos SET ? WHERE id = ?';

        return query(sql, [atendimento, id]);
    }

    deletar(id) {
        const sql = 'DELETE FROM tb_atendimentos WHERE id = ?';

        return query(sql, id);
    }
}

module.exports = new Atendimentos;