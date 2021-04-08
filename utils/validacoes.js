const moment = require('moment');

class Validacoes {
    validarCampos(atendimento) {
        const validacoes = [
            {
                campo: 'cliente',
                valido: atendimento.cliente.length > 3,
                mensagem: 'O nome do cliente deve ter pelo menos 4 letras.'
            },
            {
                campo: 'dataAgendamento',
                valido: this.validarDataAgendamento(atendimento.dataAgendamento),
                mensagem: 'A data e o horário do Agendamento devem ser iguais ou posteriores a data e horário atual.'
            }
        ];

        return validacoes.filter(validacao => !validacao.valido);
    }

    validarDataAgendamento(dataAgendamento) {
        const dataCriacao = moment().format('YYYY-MM-DD hh:mm:ss');

        if (dataAgendamento) {
            return moment(dataAgendamento).isSameOrAfter(dataCriacao);
        }

        return true;
    }
}

module.exports = new Validacoes;