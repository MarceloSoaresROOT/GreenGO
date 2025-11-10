// ===== Modal controle =====
const btnConta = document.getElementById('btn-conta');
const modal = document.getElementById('modal-conta');
const closeBtn = document.querySelector('.close');

btnConta.addEventListener('click', () => {
  modal.style.display = 'flex';
});
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});
window.addEventListener('click', (e) => {
  if (e.target === modal) modal.style.display = 'none';
});

// ===== Alternar telas (login ↔ cadastro) =====
const telaLogin = document.getElementById('tela-login');
const telaCadastro = document.getElementById('tela-cadastro');
const linkCadastro = document.getElementById('link-cadastro');
const linkLogin = document.getElementById('link-login');

linkCadastro.addEventListener('click', (e) => {
  e.preventDefault();
  telaLogin.style.display = 'none';
  telaCadastro.style.display = 'block';
});
linkLogin.addEventListener('click', (e) => {
  e.preventDefault();
  telaCadastro.style.display = 'none';
  telaLogin.style.display = 'block';
});

// ===== Lógica Login =====
document.getElementById('login-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('login-email').value.trim();
  const senha = document.getElementById('login-senha').value.trim();
  if (!email || !senha) {
    alert('Preencha todos os campos!');
    return;
  }
  alert('Login realizado com sucesso!');
  modal.style.display = 'none';
});

// ===== Lógica Cadastro =====
const form = document.getElementById('signup-form');
form.addEventListener('submit', function (e) {
  e.preventDefault();
  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const senha = document.getElementById('senha').value.trim();
  if (!nome || !email || !senha) {
    alert('Por favor, preencha todos os campos!');
    return;
  }
  alert(`Conta criada com sucesso!\nBem-vindo(a), ${nome}!`);
  form.reset();
  modal.style.display = 'none';
});

// Mostrar/ocultar senha login
document.getElementById('mostrar-login-senha').addEventListener('change', (e) => {
  const senha = document.getElementById('login-senha');
  senha.type = e.target.checked ? 'text' : 'password';
});

// Mostrar/ocultar senha cadastro
document.getElementById('mostrar-senha').addEventListener('change', (e) => {
  const senha = document.getElementById('senha');
  senha.type = e.target.checked ? 'text' : 'password';
});

