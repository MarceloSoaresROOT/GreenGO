// ============ ABRIR E FECHAR MODAL ============
const modal = document.getElementById("modal-conta");
const btnConta = document.getElementById("btn-conta");
const closeModal = document.querySelector(".close");

btnConta.onclick = () => modal.style.display = "flex";
closeModal.onclick = () => modal.style.display = "none";

window.onclick = e => {
  if (e.target === modal) modal.style.display = "none";
};

// ============ TROCAR ENTRE LOGIN E CADASTRO ============
const telaLogin = document.getElementById("tela-login");
const telaCadastro = document.getElementById("tela-cadastro");
const linkCadastro = document.getElementById("link-cadastro");
const linkLogin = document.getElementById("link-login");

linkCadastro.onclick = () => {
  telaLogin.style.display = "none";
  telaCadastro.style.display = "block";
};

linkLogin.onclick = () => {
  telaCadastro.style.display = "none";
  telaLogin.style.display = "block";
};

// ============ MOSTRAR / ESCONDER SENHAS ============
document.querySelectorAll(".campo-senha i").forEach(icon => {
  icon.addEventListener("click", () => {
    const inputId = icon.getAttribute("data-input");
    const campo = document.getElementById(inputId);

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

// ============ BARRA DE PESQUISA ============
const searchBox = document.querySelector(".search-box");
const searchToggle = document.getElementById("search-toggle");

searchToggle.onclick = () => {
  searchBox.classList.toggle("active");
};
// ================= CATALOGO =================
function mostrarCatalogo(tipo) {
  document.querySelectorAll(".catalogo").forEach(c => c.classList.remove("active"));
  document.querySelector(`#catalogo-${tipo}`).classList.add("active");

  // esconde página de produto se estiver aberta
  document.getElementById("pagina-produto").style.display = "none";
}

// ================= PÁGINA DO PRODUTO =================
function abrirProduto(nome, preco, imagem) {
  document.querySelectorAll(".catalogo").forEach(c => c.style.display = "none");

  document.getElementById("produto-nome").textContent = nome;
  document.getElementById("produto-preco").textContent = preco;
  document.getElementById("produto-img").src = imagem;

  document.getElementById("pagina-produto").style.display = "block";
}

function voltarCatalogo() {
  document.getElementById("pagina-produto").style.display = "none";

  const frutas = document.getElementById("catalogo-frutas");
  frutas.style.display = "block";
}
// ========================
// CARRINHO LATERAL
// ========================

let carrinho = [];
const carrinhoPainel = document.getElementById("carrinho");
const overlayCarrinho = document.getElementById("overlay-carrinho");
const itemsCarrinho = document.getElementById("carrinho-itens");
const totalCarrinho = document.getElementById("carrinho-total");

// abrir carrinho
document.querySelector(".fa-cart-shopping").addEventListener("click", () => {
  carrinhoPainel.classList.add("ativo");
  overlayCarrinho.classList.add("ativo");
});

// fechar carrinho
document.getElementById("fechar-carrinho").addEventListener("click", fecharCarrinho);
overlayCarrinho.addEventListener("click", fecharCarrinho);

function fecharCarrinho() {
  carrinhoPainel.classList.remove("ativo");
  overlayCarrinho.classList.remove("ativo");
}

// adicionar ao carrinho
function adicionarAoCarrinho(nome, preco, img) {
  const itemExistente = carrinho.find(item => item.nome === nome);

  if (itemExistente) {
    itemExistente.qtd++;
  } else {
    carrinho.push({
      nome,
      preco: parseFloat(preco.replace("R$", "").replace(",", ".")),
      img,
      qtd: 1
    });
  }

  atualizarCarrinho();
}

// atualizar carrinho
function atualizarCarrinho() {
  itemsCarrinho.innerHTML = "";
  let total = 0;

  carrinho.forEach((item, index) => {
    total += item.preco * item.qtd;

    itemsCarrinho.innerHTML += `
      <div class="item-carrinho">
        <img src="${item.img}">
        
        <div class="item-info">
          <h4>${item.nome}</h4>
          <p>R$ ${item.preco.toFixed(2).replace(".", ",")}</p>

          <div class="qtd">
            <button onclick="diminuir(${index})">-</button>
            <span>${item.qtd}</span>
            <button onclick="aumentar(${index})">+</button>
          </div>

          <span class="remover-item" onclick="removerItem(${index})">Remover</span>
        </div>
      </div>`;
  });

  totalCarrinho.textContent = "R$ " + total.toFixed(2).replace(".", ",");
}

// aumentar quantidade
function aumentar(i) {
  carrinho[i].qtd++;
  atualizarCarrinho();
}

// diminuir quantidade
function diminuir(i) {
  if (carrinho[i].qtd > 1) {
    carrinho[i].qtd--;
  } else {
    carrinho.splice(i, 1);
  }
  atualizarCarrinho();
}

// remover item
function removerItem(i) {
  carrinho.splice(i, 1);
  atualizarCarrinho();
}

function esconderTudo() {
  // Seções principais
  document.querySelector('#inicio').style.display = "none";
  document.querySelector('#ofertas').style.display = "none";

  // Catálogos
  document.querySelector('#catalogo-frutas').style.display = "none";
  document.querySelector('#catalogo-verduras').style.display = "none";
  document.querySelector('#catalogo-legumes').style.display = "none";

  // Página de produto
  document.querySelector('#pagina-produto').style.display = "none";
}

// ---- MOSTRAR PÁGINA INICIAL ----
function mostrarInicio() {
  esconderTudo();
  document.querySelector('#inicio').style.display = "block";
  document.querySelector('#ofertas').style.display = "block";
}

// ---- MOSTRAR CADA CATÁLOGO ----
function mostrarFrutas() {
  esconderTudo();
  document.querySelector('#catalogo-frutas').style.display = "block";
}

function mostrarVerduras() {
  esconderTudo();
  document.querySelector('#catalogo-verduras').style.display = "block";
}

function mostrarLegumes() {
  esconderTudo();
  document.querySelector('#catalogo-legumes').style.display = "block";
}

// ---- ABRIR PÁGINA DE PRODUTO ----
function abrirProduto(nome, preco, imagem) {
  esconderTudo();
  document.querySelector('#pagina-produto').style.display = "block";

  document.querySelector('#produto-nome').innerText = nome;
  document.querySelector('#produto-preco').innerText = preco;
  document.querySelector('#produto-img').src = imagem;
}

// ---- VOLTAR PARA ÚLTIMO CATÁLOGO ----
function voltarCatalogo() {
  history.back();
}

// ---- INICIAR NA TELA INICIAL ----
document.addEventListener("DOMContentLoaded", mostrarInicio);

