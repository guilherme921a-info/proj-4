class Usuario {
  #id;
  #nome;
  #email;
  #senha;

  constructor({ id, nome, email, senha }) {
    this.#id = id;
    this.#nome = nome;
    this.setEmail(email);
    this.setSenha(senha);
  }

  getid() {
    return this.#id;
  }

  getnome() {
    return this.#nome;
  }

  getemail() {
    return this.#email;
  }

  setEmail(email) {
    if (!email || !email.includes('@')) {
      throw new Error('Email inválido');
    }
    this.#email = email;
  }

  setSenha(senha) {
    if (!senha || senha.length < 6) {
      throw new Error('Senha deve ter no mínimo 6 caracteres');
    }
    this.#senha = senha;
  }
}

module.exports = Usuario;