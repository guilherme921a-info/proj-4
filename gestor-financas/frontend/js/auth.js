const loginForm = document.getElementById('loginForm');
const cadastroForm = document.getElementById('cadastroForm');
const mensagem = document.getElementById('mensagem');

if (loginForm) {
  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    try {
      const resposta = await apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, senha })
      });
      salvarSessao(resposta);
      window.location.href = 'home.html';
    } catch (error) {
      mostrarMensagem(mensagem, error.message, 'error');
    }
  });
}

if (cadastroForm) {
  cadastroForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const nome = document.getElementById('nomeCadastro').value;
    const email = document.getElementById('emailCadastro').value;
    const senha = document.getElementById('senhaCadastro').value;

    try {
      await apiRequest('/auth/cadastro', {
        method: 'POST',
        body: JSON.stringify({ nome, email, senha })
      });
      mostrarMensagem(mensagem, 'Cadastro realizado. Redirecionando para login...', 'success');
      cadastroForm.reset();
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 1200);
    } catch (error) {
      mostrarMensagem(mensagem, error.message, 'error');
    }
  });
}
