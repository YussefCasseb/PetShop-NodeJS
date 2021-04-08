const fs = require('fs');
const path = require('path');

module.exports = (caminho, recuperarImagemEnviada) => {
    const tiposValidos = ['jpg', 'jpeg', 'png'];
    const tipo = path.extname(caminho);
    const isTipoValido = tiposValidos.indexOf(tipo.substring(1)) !== -1;

    if (isTipoValido) {
        const novoNomeArquivo = `${Date.now()}${tipo}`;

        fs.createReadStream(caminho)
            .pipe(fs.createWriteStream(`./assets/image/${novoNomeArquivo}`))
            .on('finish', () => recuperarImagemEnviada(false, novoNomeArquivo));
    } else {
        recuperarImagemEnviada('O tipo de arquivo enviado não é válido!', '');
    }
}