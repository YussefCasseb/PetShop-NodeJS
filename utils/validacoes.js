const moment = require('moment');

class Validacoes {
    validarCamposAtendimento(atendimento) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss');

        const validacoes = [
            {
                campo: 'cliente',
                valido: atendimento.cliente.length > 3,
                mensagem: 'O nome do cliente deve ter pelo menos 4 letras.'
            },
            {
                campo: 'dataAgendamento',
                valido: atendimento.dataAgendamento ? moment(atendimento.dataAgendamento).isSameOrAfter(dataCriacao) : true,
                mensagem: 'A data e o horário do Agendamento devem ser iguais ou posteriores a data e horário atual.'
            }
        ];

        return validacoes.filter(validacao => !validacao.valido);
    }
}

module.exports = new Validacoes;