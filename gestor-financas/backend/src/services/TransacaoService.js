const Transacao = require('../models/Transacao');
const transacaoDAO = require('../dao/TransacaoDAO');

class TransacaoService {
  async listar(usuarioId) {
    return transacaoDAO.listarPorUsuario(usuarioId);
  }

  async criar(usuarioId, dados) {
    this.validar(dados);

    const transacao = new Transacao({
      usuario_id: usuarioId,
      tipo: dados.tipo,
      categoria: dados.categoria,
      descricao: dados.descricao || '',
      valor: Number(dados.valor),
      data: dados.data
    });

    return transacaoDAO.criar(transacao);
  }

  async atualizar(id, usuarioId, dados) {
    this.validar(dados);

    const atualizado = await transacaoDAO.atualizar(id, usuarioId, {
      tipo: dados.tipo,
      categoria: dados.categoria,
      descricao: dados.descricao || '',
      valor: Number(dados.valor),
      data: dados.data
    });

    if (!atualizado) {
      const erro = new Error('Transacao nao encontrada');
      erro.status = 404;
      throw erro;
    }
  }

  async remover(id, usuarioId) {
    const removido = await transacaoDAO.remover(id, usuarioId);

    if (!removido) {
      const erro = new Error('Transacao nao encontrada');
      erro.status = 404;
      throw erro;
    }
  }

  async resumo(usuarioId) {
    const resumo = await transacaoDAO.resumo(usuarioId);
    const receitas = Number(resumo.receitas);
    const despesas = Number(resumo.despesas);

    return {
      receitas,
      despesas,
      saldo: receitas - despesas
    };
  }

  validar(dados) {
    const tiposValidos = ['receita', 'despesa'];

    if (!tiposValidos.includes(dados.tipo)) {
      const erro = new Error('Tipo deve ser receita ou despesa');
      erro.status = 400;
      throw erro;
    }

    if (!dados.categoria || !dados.valor || !dados.data) {
      const erro = new Error('Categoria, valor e data sao obrigatorios');
      erro.status = 400;
      throw erro;
    }

    if (Number(dados.valor) <= 0) {
      const erro = new Error('Valor deve ser maior que zero');
      erro.status = 400;
      throw erro;
    }
  }
}

module.exports = new TransacaoService();
