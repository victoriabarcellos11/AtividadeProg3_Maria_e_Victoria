// ============================================================
// CONSTANTES
// ============================================================

// Endereço base da API pública de testes
const URL_API = 'https://api.restful-api.dev/objects';

// ============================================================
// VETOR LOCAL (nosso "espelho" dos dados da API)
// ============================================================

// Este vetor armazena os dispositivos que buscamos da API.
// Toda vez que fizermos uma operação (listar, cadastrar, etc.),
// atualizamos este vetor e chamamos renderizar() para redesenhar a tabela.
let dispositivos = [];

// ============================================================
// REFERÊNCIAS AO DOM (pegamos os elementos uma única vez)
// ============================================================

const campoId         = document.getElementById('campoId');
const campoNome       = document.getElementById('campoNome');
const campoCor        = document.getElementById('campoCor');
const campoCapacidade = document.getElementById('campoCapacidade');
const campoPreco      = document.getElementById('campoPreco');
const corpoTabela     = document.getElementById('corpoTabela');
const divMensagem     = document.getElementById('mensagem');

// ============================================================
// FUNÇÕES AUXILIARES (já prontas — não precisam alterar)
// ============================================================

/**
 * Exibe uma mensagem de feedback para o usuário.
 * @param {string} texto - A mensagem a exibir.
 * @param {string} tipo  - 'sucesso' ou 'erro'.
 */
function mostrarMensagem(texto, tipo) {
  divMensagem.textContent = texto;
  divMensagem.className = tipo;  // aplica a classe CSS 'sucesso' ou 'erro'
}

/**
 * Limpa todos os campos do formulário.
 */
function limparFormulario() {
  campoId.value = '';
  campoNome.value = '';
  campoCor.value = '';
  campoCapacidade.value = '';
  campoPreco.value = '';
}

/**
 * Renderiza o vetor 'dispositivos' na tabela HTML.
 * Esta função APAGA todas as linhas antigas e recria do zero
 * a partir do conteúdo atual do vetor.
 *
 * >>> VOCÊS VÃO IMPLEMENTAR ESTA FUNÇÃO NO PASSO 1 <<<
 */
function renderizar() {
  // TODO: Passo 1
}

// ============================================================
// FUNÇÕES CRUD (vocês vão implementar cada uma)
// ============================================================

async function listarDispositivos() {
  alert('Botão LISTAR clicado!');
  // TODO: Passo 1
}

async function buscarPorId() {
  alert('Botão BUSCAR POR ID clicado!');
  // TODO: Passo 2
}

async function cadastrarDispositivo() {
  alert('Botão CADASTRAR clicado!');
  // TODO: Passo 3
}

async function atualizarDispositivo() {
  alert('Botão ATUALIZAR clicado!');
  // TODO: Passo 4
}

async function excluirDispositivo() {
  alert('Botão EXCLUIR clicado!');
  // TODO: Passo 5
}

// ============================================================
// EVENT LISTENERS (conectam os botões às funções)
// ============================================================

document.getElementById('btnListar').addEventListener('click', listarDispositivos);
document.getElementById('btnBuscar').addEventListener('click', buscarPorId);
document.getElementById('btnCadastrar').addEventListener('click', cadastrarDispositivo);
document.getElementById('btnAtualizar').addEventListener('click', atualizarDispositivo);
document.getElementById('btnExcluir').addEventListener('click', excluirDispositivo);