const usuarioService = require('../services/UsuarioService');

class AuthController {
  async cadastrar(req, res, next) {
    try {
      const usuario = await usuarioService.cadastrar(req.body);
      res.status(201).json(usuario);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, senha } = req.body;
      const resposta = await usuarioService.login(email, senha);
      res.json(resposta);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
