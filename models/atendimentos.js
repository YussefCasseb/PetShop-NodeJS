const moment = require('moment');
const axios = require('axios');
const validacoes = require('../utils/validacoes');
const atendimentoRepository = require('../repositories/atendimentos');

class Atendimentos {
    listarTodos() {
        return atendimentoRepository.listarTodos();
    }

    bucarPorId(id) {
        return atendimentoRepository.buscarPorId(id)
            .then(async (resultado) => {
                const atendimento = resultado[0];
                
                try {
                    const { data } = await axios.get(`http://localhost:8082/${atendimento.cliente}`);

                    atendimento.cliente = data;

                    return atendimento;
                } catch (erros) {
                    return new Promise((resolve, reject) => reject({mensagemUsuario: "Serviço indisponivel no momento. Por favor tente novamente mais tarde."}));
                }
            });
    }

    adicionar(atendimento) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss');
        const dataAgendamento = moment(atendimento.dataAgendamento, 'DD/MM/YYYY HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');

        const atendimentoDatado = {...atendimento, dataAgendamento, dataCriacao};

        const erros = validacoes.validarCamposAtendimento(atendimentoDatado);

        if (erros.length) {
            return new Promise((resolve, reject) => reject(erros));
        } else {
            return atendimentoRepository.adicionar(atendimentoDatado)
                .then((resultados) => {
                    const id = resultados.insertId;

                    return ({id, ...atendimentoDatado});
                });
        }
    }

    atualizar(id, valores) {
        let atendimento = {...valores};

        if (atendimento.dataAgendamento) {
            const dataAgendamento = moment(atendimento.dataAgendamento, 'DD/MM/YYYY HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');

            atendimento = {...valores, dataAgendamento}
        }

        const erros = validacoes.validarCamposAtendimento(atendimento);

        if (erros.length) {
            return new Promise((resolve, reject) => reject(erros));
        } else {
            return atendimentoRepository.atualizar(id, atendimento);
        }
    }

    deletar(id) {
        return atendimentoRepository.deletar(id);
    }
}

module.exports = new Atendimentos;