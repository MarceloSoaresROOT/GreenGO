/* ============================================================
   MODAL LOGIN / CADASTRO
============================================================ */
const modal = document.getElementById("modal-conta");
const btnConta = document.getElementById("btn-conta");
const closeModal = document.querySelector(".close");

// Variável para armazenar usuário logado
let usuarioLogado = null;

btnConta.onclick = (e) => {
  e.preventDefault();
  modal.classList.add("active");
  modal.style.display = "flex";
};

closeModal.onclick = () => {
  modal.classList.remove("active");
  modal.style.display = "none";
};

window.onclick = e => { 
  if (e.target === modal) {
    modal.classList.remove("active");
    modal.style.display = "none";
  }
};

/* Trocar entre Login e Cadastro */
const telaLogin = document.getElementById("tela-login");
const telaCadastro = document.getElementById("tela-cadastro");

document.getElementById("link-cadastro").onclick = (e) => {
  e.preventDefault();
  telaLogin.style.display = "none";
  telaCadastro.style.display = "block";
};

document.getElementById("link-login").onclick = (e) => {
  e.preventDefault();
  telaCadastro.style.display = "none";
  telaLogin.style.display = "block";
};

/* Mostrar/Esconder Senha */
document.querySelectorAll(".campo-senha .olho").forEach(icon => {
  icon.addEventListener("click", () => {
    const campo = document.getElementById(icon.dataset.input);
    if (campo.type === "password") {
      campo.type = "text";
      icon.classList.remove("fa-eye");
      icon.classList.add("fa-eye-slash");
    } else {
      campo.type = "password";
      icon.classList.remove("fa-eye-slash");
      icon.classList.add("fa-eye");
    }
  });
});

/* Login e Cadastro */
document.getElementById("login-form").onsubmit = (e) => {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const nomeUsuario = email.split('@')[0]; // Usa parte do email como nome
  usuarioLogado = nomeUsuario;
  
  // Atualizar texto do botão de conta
  btnConta.textContent = `Boas compras, ${nomeUsuario}`;
  
  alert("Login realizado com sucesso!");
  modal.classList.remove("active");
  modal.style.display = "none";
};

document.getElementById("signup-form").onsubmit = (e) => {
  e.preventDefault();
  const nome = document.getElementById("nome").value;
  usuarioLogado = nome;
  
  // Atualizar texto do botão de conta
  btnConta.textContent = `Boas compras, ${nome}`;
  
  alert("Cadastro realizado com sucesso!");
  telaCadastro.style.display = "none";
  telaLogin.style.display = "block";
};

/* ============================================================
   FILTRO DE CATEGORIAS COM SCROLL SUAVE
============================================================ */
function filtrarProdutos(categoria) {
  // Não esconder seções, apenas rolar suavemente
  switch(categoria) {
    case 'frutas':
      document.getElementById('catalogo-frutas').scrollIntoView({ behavior: 'smooth' });
      break;
    case 'verduras':
      document.getElementById('catalogo-verduras').scrollIntoView({ behavior: 'smooth' });
      break;
    case 'legumes':
      document.getElementById('catalogo-legumes').scrollIntoView({ behavior: 'smooth' });
      break;
    case 'ofertas':
      document.getElementById('ofertas').scrollIntoView({ behavior: 'smooth' });
      break;
  }
}

// Mostrar todas as seções inicialmente
window.addEventListener('load', () => {
  const secoes = document.querySelectorAll('.catalogo, .produtos');
  secoes.forEach(secao => {
    secao.style.display = 'block';
  });
});

/* ============================================================
   BARRA DE PESQUISA
============================================================ */
const searchBar = document.getElementById("search-bar");
searchBar.addEventListener('input', function() {
  const searchTerm = this.value.toLowerCase();
  
  // Pesquisar em todos os produtos
  const produtos = document.querySelectorAll('.produto-item, .produto');
  
  produtos.forEach(produto => {
    const nome = produto.querySelector('h3, p').textContent.toLowerCase();
    if (nome.includes(searchTerm)) {
      produto.style.display = 'block';
    } else {
      produto.style.display = 'none';
    }
  });
});

/* ============================================================
   NAVEGAÇÃO POR ÂNCORAS - CORRIGIDO
============================================================ */
document.querySelectorAll('.menu-links a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    
    // Ignora o link "Minha Conta"
    if (href === '#' || this.id === 'btn-conta') {
      return;
    }
    
    e.preventDefault();
    const targetId = href.substring(1);
    const targetSection = document.getElementById(targetId);
    
    if (targetSection) {
      targetSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

/* ============================================================
   PÁGINA DO PRODUTO
============================================================ */
let produtoAtual = null;

function abrirProduto(nome, preco, imagem) {
  const precoNumerico = parseFloat(preco.replace("R$", "").replace("/", "").replace("Kg", "").replace("Un", "").trim().replace(",", "."));
  
  produtoAtual = {
    nome: nome,
    preco: precoNumerico,
    imagem: imagem
  };

  document.getElementById("produto-nome").textContent = nome;
  document.getElementById("produto-preco").textContent = preco;
  document.getElementById("produto-img").src = imagem;
  document.getElementById("produto-qtd").textContent = "1";
  document.getElementById("produto-total").textContent = precoNumerico.toFixed(2).replace(".", ",");

  document.getElementById("pagina-produto").style.display = "block";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function fecharProduto() {
  document.getElementById("pagina-produto").style.display = "none";
  produtoAtual = null;
}

function alterarQtdProduto(valor) {
  const qtdElement = document.getElementById("produto-qtd");
  let qtd = parseInt(qtdElement.textContent);
  qtd = Math.max(1, qtd + valor);
  qtdElement.textContent = qtd;

  const total = produtoAtual.preco * qtd;
  document.getElementById("produto-total").textContent = total.toFixed(2).replace(".", ",");
}

function adicionarProdutoAoCarrinho() {
  if (!produtoAtual) return;

  const qtd = parseInt(document.getElementById("produto-qtd").textContent);
  
  for (let i = 0; i < qtd; i++) {
    adicionarAoCarrinho(produtoAtual.nome, produtoAtual.preco.toString(), produtoAtual.imagem);
  }

  alert(`${qtd}x ${produtoAtual.nome} adicionado(s) ao carrinho!`);
  fecharProduto();
}

/* ============================================================
   CARRINHO LATERAL
============================================================ */
let carrinho = [];
const carrinhoPainel = document.getElementById("carrinho");
const overlayCarrinho = document.getElementById("overlay-carrinho");
const itemsCarrinho = document.getElementById("carrinho-itens");
const totalCarrinho = document.getElementById("carrinho-total");
const cartCounter = document.getElementById("cart-counter");

document.querySelector(".cart-icon").addEventListener("click", () => {
  carrinhoPainel.classList.add("ativo");
  overlayCarrinho.classList.add("ativo");
});

function fecharCarrinho() {
  carrinhoPainel.classList.remove("ativo");
  overlayCarrinho.classList.remove("ativo");
}

document.getElementById("fechar-carrinho").onclick = fecharCarrinho;
overlayCarrinho.onclick = fecharCarrinho;

function adicionarAoCarrinho(nome, preco, img) {
  const precoNumerico = parseFloat(preco.replace(",", "."));
  
  const itemExistente = carrinho.find(p => p.nome === nome);
  
  if (itemExistente) {
    itemExistente.qtd++;
  } else {
    carrinho.push({
      nome: nome,
      preco: precoNumerico,
      img: img,
      qtd: 1
    });
  }
  
  atualizarCarrinho();
  atualizarContadorCarrinho();
}

function atualizarContadorCarrinho() {
  const totalItens = carrinho.reduce((total, item) => total + item.qtd, 0);
  cartCounter.textContent = totalItens;
  
  // Mostrar/ocultar contador
  if (totalItens > 0) {
    cartCounter.style.display = 'flex';
  } else {
    cartCounter.style.display = 'none';
  }
}

function atualizarCarrinho() {
  itemsCarrinho.innerHTML = "";
  let total = 0;

  if (carrinho.length === 0) {
    itemsCarrinho.innerHTML = '<p style="text-align: center; color: #999; padding: 20px;">Carrinho vazio</p>';
    totalCarrinho.textContent = "R$ 0,00";
    return;
  }

  carrinho.forEach((item, index) => {
    total += item.preco * item.qtd;
    
    itemsCarrinho.innerHTML += `
      <div class="item-carrinho">
        <img src="${item.img}" alt="${item.nome}">
        <div class="item-info">
          <h4>${item.nome}</h4>
          <p>R$ ${item.preco.toFixed(2).replace(".", ",")}</p>
          <div class="qtd">
            <button onclick="alterarQuantidade(${index}, 'diminuir')">-</button>
            <span>${item.qtd}</span>
            <button onclick="alterarQuantidade(${index}, 'aumentar')">+</button>
          </div>
          <span class="remover-item" onclick="removerItem(${index})">Remover</span>
        </div>
      </div>
    `;
  });

  totalCarrinho.textContent = "R$ " + total.toFixed(2).replace(".", ",");
}

function alterarQuantidade(index, tipo) {
  if (tipo === 'diminuir' && carrinho[index].qtd > 1) {
    carrinho[index].qtd--;
  } else if (tipo === 'aumentar') {
    carrinho[index].qtd++;
  }
  atualizarCarrinho();
  atualizarContadorCarrinho();
}

function removerItem(index) {
  carrinho.splice(index, 1);
  atualizarCarrinho();
  atualizarContadorCarrinho();
}

function finalizarCompra() {
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }
  
  const total = carrinho.reduce((sum, item) => sum + (item.preco * item.qtd), 0);
  alert(`Compra finalizada!\nTotal: R$ ${total.toFixed(2).replace(".", ",")}\n\nObrigado por comprar na GreenGo! 🥬🍅`);
  
  carrinho = [];
  atualizarCarrinho();
  atualizarContadorCarrinho();
  fecharCarrinho();
}

// Inicializar contador do carrinho
atualizarContadorCarrinho();