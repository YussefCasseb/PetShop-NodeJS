class Tabelas {
    init(conexao) {
        this.conexao = conexao;
        
        this.criarAtendimentos();
        this.criarPets();
    }

    criarAtendimentos() {
        const sql = 'CREATE TABLE IF NOT EXISTS tb_atendimentos (id INT NOT NULL AUTO_INCREMENT, cliente VARCHAR(11) NOT NULL, pet VARCHAR(20), servico VARCHAR(20) NOT NULL, status VARCHAR(20) NOT NULL, observacoes TEXT, dataAgendamento DATETIME NOT NULL, dataCriacao DATETIME NOT NULL, PRIMARY KEY(id))';

        this.conexao.query(sql, (erro) => {
            if (erro) {
                console.log(erro);
            }
        });
    }

    criarPets() {
        const sql = 'CREATE TABLE IF NOT EXISTS tb_pets (id INT NOT NULL AUTO_INCREMENT, nome VARCHAR(50) NOT NULL, imagem VARCHAR(255) NOT NULL, PRIMARY KEY(id))';

        this.conexao.query(sql, (erro) => {
            if (erro) {
                console.log(erro);
            }
        });
    }
}

module.exports = new Tabelas;