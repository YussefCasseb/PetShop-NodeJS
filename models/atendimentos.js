const moment = require('moment');
const conexao = require('../infraestrutura/conexao');
const validacoes = require('../utils/validacoes');

class Atendimentos {
    listarTodos(res) {
        const sql = 'SELECT * FROM tb_atendimentos';

        conexao.query(sql, (erro, resultado) => {
            if (erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json(resultado);
            }
        });
    }

    bucarPorId(id, res) {
        const sql = `SELECT * FROM tb_atendimentos WHERE id = ${id}`;

        conexao.query(sql, (erro, resultado) => {
            if (erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json(resultado);
            }
        });
    }

    adicionar(atendimento, res) {
        const dataCriacao = moment().format('YYYY-MM-DD hh:mm:ss');
        const dataAgendamento = moment(atendimento.dataAgendamento, 'DD/MM/YYYY hh:mm:ss').format('YYYY-MM-DD hh:mm:ss');

        const atendimentoDatado = {...atendimento, dataAgendamento, dataCriacao};

        const erros = validacoes.validarCampos(atendimentoDatado);

        if (erros.length) {
            res.status(400).json(erros);
        } else {
            const sql = 'INSERT INTO tb_atendimentos SET ?';

            conexao.query(sql, atendimentoDatado, (erro) => {
                if (erro) {
                    res.status(400).json(erro);
                } else {
                    res.status(201).json(atendimentoDatado);
                }
            });
        }
    }

    atualizar(id, valores, res) {
        let atendimento = {...valores};

        if (atendimento.dataAgendamento) {
            const dataAgendamento = moment(atendimento.dataAgendamento, 'DD/MM/YYYY hh:mm:ss').format('YYYY-MM-DD hh:mm:ss');

            atendimento = {...valores, dataAgendamento}
        }

        const erros = validacoes.validarCampos(atendimento);

        if (erros.length) {
            res.status(400).json(erros);
        } else {
            const sql = 'UPDATE tb_atendimentos SET ? WHERE id = ?';

            conexao.query(sql, [atendimento, id], (erro) => {
                if (erro) {
                    res.status(400).json(erro);
                } else {
                    res.status(200).json({id, ...atendimento});
                }
            });
        }
    }

    deletar(id, res) {
        const sql = 'DELETE FROM tb_atendimentos WHERE id = ?';

        conexao.query(sql, id, (erro) => {
            if (erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json({id});
            }
        });
    }
}

module.exports = new Atendimentos;