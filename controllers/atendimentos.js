const atendimento = require('../models/atendimentos');

module.exports = app => {
    app.get('/atendimentos', (req, res) => {
        atendimento.listarTodos()
            .then((resultados) => res.json(resultados))
            .catch((erros) => res.status(500).json(erros));
    });

    app.get('/atendimentos/:id', (req, res) => {
        atendimento.bucarPorId(parseInt(req.params.id))
            .then((resultados) => res.json(resultados))
            .catch((erros) => res.status(500).json(erros));
    });

    app.post('/atendimentos', (req, res) => {
        atendimento.adicionar(req.body)
            .then((atendimentoCadastrado) => res.status(201).json(atendimentoCadastrado))
            .catch((erros) => res.status(500).json(erros));
    });

    app.patch('/atendimentos/:id', (req, res) => {
        atendimento.atualizar(parseInt(req.params.id), req.body)
            .then(() => res.status(204).json())
            .catch((erros) => res.status(500).json(erros));
    });

    app.delete('/atendimentos/:id', (req, res) => {
        atendimento.deletar(parseInt(req.params.id))
            .then(() => res.status(204).json())
            .catch((erros) => res.status(500).json(erros));
    });
}