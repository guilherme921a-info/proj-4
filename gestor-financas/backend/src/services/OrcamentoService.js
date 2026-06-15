const Orcamento = require('../models/Orcamento');
const orcamentoDAO = require('../dao/OrcamentoDAO');

class OrcamentoService {
  async listar(usuarioId) {
    return orcamentoDAO.listarPorUsuario(usuarioId);
  }

  async criar(usuarioId, dados) {
    this.validar(dados);

    const orcamento = new Orcamento({
      usuario_id: usuarioId,
      categoria: dados.categoria,
      valor_limite: Number(dados.valor_limite),
      mes: Number(dados.mes),
      ano: Number(dados.ano)
    });

    return orcamentoDAO.criar(orcamento);
  }

  async atualizar(id, usuarioId, dados) {
    this.validar(dados);

    const atualizado = await orcamentoDAO.atualizar(id, usuarioId, {
      categoria: dados.categoria,
      valor_limite: Number(dados.valor_limite),
      mes: Number(dados.mes),
      ano: Number(dados.ano)
    });

    if (!atualizado) {
      const erro = new Error('Orcamento nao encontrado');
      erro.status = 404;
      throw erro;
    }
  }

  async remover(id, usuarioId) {
    const removido = await orcamentoDAO.remover(id, usuarioId);

    if (!removido) {
      const erro = new Error('Orcamento nao encontrado');
      erro.status = 404;
      throw erro;
    }
  }

  validar(dados) {
    if (!dados.categoria || !dados.valor_limite || !dados.mes || !dados.ano) {
      const erro = new Error('Categoria, valor limite, mes e ano sao obrigatorios');
      erro.status = 400;
      throw erro;
    }

    if (Number(dados.valor_limite) <= 0) {
      const erro = new Error('Valor limite deve ser maior que zero');
      erro.status = 400;
      throw erro;
    }

    if (Number(dados.mes) < 1 || Number(dados.mes) > 12) {
      const erro = new Error('Mes deve estar entre 1 e 12');
      erro.status = 400;
      throw erro;
    }
  }
}

module.exports = new OrcamentoService();
