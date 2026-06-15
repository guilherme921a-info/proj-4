const Transacao = require('./Transacao');

class Receita extends Transacao {
  calcularImpacto() {
    return this.valor;
  }
}

module.exports = Receita;