const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const usuarioDAO = require('../dao/UsuarioDAO');

class UsuarioService {
  async cadastrar(dados) {
    this.validarCadastro(dados);

    const usuarioExistente = await usuarioDAO.buscarPorEmail(dados.email);
    if (usuarioExistente) {
      const erro = new Error('Email ja cadastrado');
      erro.status = 409;
      throw erro;
    }

    const senhaHash = await bcrypt.hash(dados.senha, 10);
    const usuario = new Usuario({
      nome: dados.nome,
      email: dados.email,
      senha: senhaHash
    });

    return usuarioDAO.criar(usuario);
  }

  async login(email, senha) {
    if (!email || !senha) {
      const erro = new Error('Email e senha sao obrigatorios');
      erro.status = 400;
      throw erro;
    }

    const usuario = await usuarioDAO.buscarPorEmail(email);
    if (!usuario) {
      const erro = new Error('Credenciais invalidas');
      erro.status = 401;
      throw erro;
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      const erro = new Error('Credenciais invalidas');
      erro.status = 401;
      throw erro;
    }

    const token = jwt.sign(
      { id: usuario.id, nome: usuario.nome, email: usuario.email },
      process.env.JWT_SECRET || 'troque_esta_chave',
      { expiresIn: '8h' }
    );

    return {
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email
      }
    };
  }

  validarCadastro(dados) {
    if (!dados.nome || !dados.email || !dados.senha) {
      const erro = new Error('Nome, email e senha sao obrigatorios');
      erro.status = 400;
      throw erro;
    }

    if (dados.senha.length < 6) {
      const erro = new Error('A senha deve ter pelo menos 6 caracteres');
      erro.status = 400;
      throw erro;
    }
  }
}

module.exports = new UsuarioService();
