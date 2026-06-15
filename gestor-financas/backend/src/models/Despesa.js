const Transacao = require('./Transacao');

class Despesa extends Transacao {
  calcularImpacto() {
    return -this.valor;
  }
}

module.exports = Despesa;