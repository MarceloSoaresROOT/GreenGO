// Captura o formulário
const form = document.getElementById('signup-form');

// Escuta o evento de envio
form.addEventListener('submit', function (e) {
    e.preventDefault(); // Impede o reload da página

    // Coleta os valores dos campos
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value.trim();

    // Verificação simples (pode ser expandida)
    if (!nome || !email || !senha) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    // Simula criação de conta
    alert(`Conta criada com sucesso!\nBem-vindo(a), ${nome}!`);

    // Limpa os campos
    form.reset();

    
});
// Mostrar/ocultar senha
const checkbox = document.getElementById('mostrar-senha');
const senha = document.getElementById('senha');

checkbox.addEventListener('change', () => {
  senha.type = checkbox.checked ? 'text' : 'password';
});
