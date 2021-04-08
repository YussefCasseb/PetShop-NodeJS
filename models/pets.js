const conexao = require('../infraestrutura/conexao');
const uploadImagem = require('../utils/arquivos');

class Pets {
    adicionar(pet, res) {
        console.log(pet)
        const sql = 'INSERT INTO tb_pets SET ?';

        uploadImagem(pet.imagem, (erroImagem, imagemEnviada) => {
            if (erroImagem) {
                res.status(400).json({erroImagem});
            } else {
                const novoPet = {
                    nome: pet.nome,
                    imagem: imagemEnviada
                }

                conexao.query(sql, novoPet, (erro) => {
                    if (erro) {
                        res.status(400).json(erro);
                    } else {
                        res.status(201).json(novoPet);
                    }
                });
            }
        });
    }
}

module.exports = new Pets;