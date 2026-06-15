const orcamentoService = require('../services/OrcamentoService');

class OrcamentoController {
  async listar(req, res, next) {
    try {
      const orcamentos = await orcamentoService.listar(req.usuario.id);
      res.json(orcamentos);
    } catch (error) {
      next(error);
    }
  }

  async criar(req, res, next) {
    try {
      const orcamento = await orcamentoService.criar(req.usuario.id, req.body);
      res.status(201).json(orcamento);
    } catch (error) {
      next(error);
    }
  }

  async atualizar(req, res, next) {
    try {
      await orcamentoService.atualizar(req.params.id, req.usuario.id, req.body);
      res.json({ mensagem: 'Orcamento atualizado com sucesso' });
    } catch (error) {
      next(error);
    }
  }

  async remover(req, res, next) {
    try {
      await orcamentoService.remover(req.params.id, req.usuario.id);
      res.json({ mensagem: 'Orcamento removido com sucesso' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new OrcamentoController();
