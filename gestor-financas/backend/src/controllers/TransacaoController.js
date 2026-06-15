const transacaoService = require('../services/TransacaoService');

class TransacaoController {
  async listar(req, res, next) {
    try {
      const transacoes = await transacaoService.listar(req.usuario.id);
      res.json(transacoes);
    } catch (error) {
      next(error);
    }
  }

  async criar(req, res, next) {
    try {
      const transacao = await transacaoService.criar(req.usuario.id, req.body);
      res.status(201).json(transacao);
    } catch (error) {
      next(error);
    }
  }

  async atualizar(req, res, next) {
    try {
      await transacaoService.atualizar(req.params.id, req.usuario.id, req.body);
      res.json({ mensagem: 'Transacao atualizada com sucesso' });
    } catch (error) {
      next(error);
    }
  }

  async remover(req, res, next) {
    try {
      await transacaoService.remover(req.params.id, req.usuario.id);
      res.json({ mensagem: 'Transacao removida com sucesso' });
    } catch (error) {
      next(error);
    }
  }

  async resumo(req, res, next) {
    try {
      const resumo = await transacaoService.resumo(req.usuario.id);
      res.json(resumo);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TransacaoController();
