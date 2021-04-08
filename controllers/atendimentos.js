const atendimento = require('../models/atendimentos');

module.exports = app => {
    app.get('/atendimentos', (req, res) => atendimento.listarTodos(res));

    app.get('/atendimentos/:id', (req, res) => atendimento.bucarPorId(parseInt(req.params.id), res));

    app.patch('/atendimentos/:id', (req, res) => atendimento.atualizar(parseInt(req.params.id), req.body, res));

    app.delete('/atendimentos/:id', (req, res) => atendimento.deletar(parseInt(req.params.id), res));

    app.post('/atendimentos', (req, res) => atendimento.adicionar(req.body, res));
}