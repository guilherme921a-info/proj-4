protegerPagina();

const tabelaTransacoes = document.getElementById('tabelaTransacoes');
const formTransacao = document.getElementById('formTransacao');
const mensagem = document.getElementById('mensagem');

async function carregarResumo() {
  const resumo = await apiRequest('/transacoes/resumo');

  const receitasEl = document.getElementById('receitas');
  const despesasEl = document.getElementById('despesas');
  const saldoEl = document.getElementById('saldo');

  if (receitasEl) receitasEl.textContent = formatarMoeda(resumo.receitas);
  if (despesasEl) despesasEl.textContent = formatarMoeda(resumo.despesas);
  if (saldoEl) {
    saldoEl.textContent = formatarMoeda(resumo.saldo);
    saldoEl.className = resumo.saldo >= 0 ? 'positive' : 'negative';
  }
}

async function carregarTransacoes() {
  if (!tabelaTransacoes) return;

  const transacoes = await apiRequest('/transacoes');
  tabelaTransacoes.innerHTML = '';

  transacoes.forEach((transacao) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${new Date(transacao.data).toLocaleDateString('pt-BR')}</td>
      <td>${transacao.tipo}</td>
      <td>${transacao.categoria}</td>
      <td>${transacao.descricao || '-'}</td>
      <td class="${transacao.tipo === 'receita' ? 'positive' : 'negative'}">
        ${formatarMoeda(transacao.valor)}
      </td>
      <td>
        <button class="button danger" type="button" data-id="${transacao.id}">Excluir</button>
      </td>
    `;
    tabelaTransacoes.appendChild(tr);
  });
}

if (tabelaTransacoes) {
  tabelaTransacoes.addEventListener('click', async (event) => {
    const botao = event.target.closest('button[data-id]');
    if (!botao) return;

    await apiRequest(`/transacoes/${botao.dataset.id}`, { method: 'DELETE' });
    await carregarTransacoes();
    await carregarResumo();
  });
}

if (formTransacao) {
  formTransacao.addEventListener('submit', async (event) => {
    event.preventDefault();

    const dados = {
      tipo: document.getElementById('tipo').value,
      categoria: document.getElementById('categoria').value,
      descricao: document.getElementById('descricao').value,
      valor: document.getElementById('valor').value,
      data: document.getElementById('data').value
    };

    try {
      await apiRequest('/transacoes', {
        method: 'POST',
        body: JSON.stringify(dados)
      });
      mostrarMensagem(mensagem, 'Transacao cadastrada com sucesso.', 'success');
      formTransacao.reset();
    } catch (error) {
      mostrarMensagem(mensagem, error.message, 'error');
    }
  });
}

carregarResumo().catch(console.error);
carregarTransacoes().catch(console.error);
