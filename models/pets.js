const uploadImagem = require('../utils/arquivos');
const petsRepository = require('../repositories/pets');

class Pets {
    adicionar(pet) {
        return new Promise((resolve, reject) => {
            uploadImagem(pet.imagem, (erroImagem, imagemEnviada) => {
                if (erroImagem) {
                    reject(erroImagem);
                } else {
                    const novoPet = {
                        nome: pet.nome,
                        imagem: imagemEnviada
                    }

                    petsRepository.adicionar(novoPet)
                        .then(() => resolve(novoPet))
                        .catch((erros) => reject(erros));
                }
            });
        })
    }
}

module.exports = new Pets;