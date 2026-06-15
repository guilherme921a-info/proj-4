class Orcamento {
  #id;
  #usuario_id;
  #categoria;
  #valor_limite;
  #mes;
  #ano;

  constructor({ id, usuario_id, categoria, valor_limite, mes, ano }) {
    this.#id = id;
    this.#usuario_id = usuario_id;
    this.#categoria = categoria;
    this.setValor(valor_limite);
    this.setMes(mes);
    this.setAno(ano);
  }

  getid() {
    return this.#id;
  }

  getvalor_limite() {
    return this.#valor_limite;
  }

  setValor(valor) {
    if (valor <= 0) {
      throw new Error('Valor limite inválido');
    }
    this.#valor_limite = valor;
  }

  setMes(mes) {
    if (mes < 1 || mes > 12) {
      throw new Error('Mês inválido');
    }
    this.#mes = mes;
  }

  setAno(ano) {
    if (ano < 2000) {
      throw new Error('Ano inválido');
    }
    this.#ano = ano;
  }
}

module.exports = Orcamento;