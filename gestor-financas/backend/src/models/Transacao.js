class Transacao {
  #id;
  #usuario_id;
  #categoria;
  #descricao;
  #valor;
  #data;

  constructor({
    id,
    usuario_id,
    categoria,
    descricao,
    valor,
    data
  }) {
    this.#id = id;
    this.#usuario_id =usuario_id;
    this.#categoria = categoria;
    this.#descricao =descricao;
    this.setValor(valor);
    this.setData(data);
  }

  getid() {
    return this.#id;
  }

  getvalor() {
    return this.#valor;
  }

  setValor(valor) {
    if (valor <= 0) {
   throw new Error('Valor deve ser maior que zero');
    }

    this.#valor = valor;
  }
setData(data) {
    if (!data) {
      throw new Error('Data obrigatória');
    }

    this.#data = data;
  }

calcularImpacto() {
    return this.#valor;
  }
}

module.exports = Transacao;