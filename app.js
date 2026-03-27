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
  // TODO: Passo 1// 1. Limpar TODAS as linhas antigas da tabela
  //    (innerHTML = '' apaga todo o conteúdo interno do <tbody>)
  corpoTabela.innerHTML = '';

  // 2. Para cada item do vetor, criar uma linha <tr> na tabela
  for (let i = 0; i < dispositivos.length; i++) {
    const item = dispositivos[i];

    // 2a. Criar o elemento <tr> (linha da tabela)
    const linha = document.createElement('tr');

    // 2b. Criar cada célula <td> e preenchê-la
    const celulaId = document.createElement('td');
    celulaId.textContent = item.id;

    const celulaNome = document.createElement('td');
    celulaNome.textContent = item.name;

    // IMPORTANTE: Antes de acessar propriedades de item.data,
    // SEMPRE verificamos se item.data existe E se a propriedade existe.
    // Usamos o operador && ("e lógico"): a segunda parte só é avaliada
    // se a primeira for verdadeira. Isso evita o erro:
    // "Cannot read properties of null".
    // Nem todos os objetos da API possuem o campo data preenchido.

    const celulaCor = document.createElement('td');
    if (item.data && item.data.color) {
      celulaCor.textContent = item.data.color;
    } else {
      celulaCor.textContent = '—';
    }

    const celulaCapacidade = document.createElement('td');
    if (item.data && item.data.capacity) {
      celulaCapacidade.textContent = item.data.capacity;
    } else {
      celulaCapacidade.textContent = '—';
    }

    const celulaPreco = document.createElement('td');
    if (item.data && item.data.price) {
      // Formatar o preço em reais (R$) com duas casas decimais
      celulaPreco.textContent = item.data.price.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      });
    } else {
      celulaPreco.textContent = '—';
    }

    // 2c. Anexar as células à linha
    linha.appendChild(celulaId);
    linha.appendChild(celulaNome);
    linha.appendChild(celulaCor);
    linha.appendChild(celulaCapacidade);
    linha.appendChild(celulaPreco);

    // 2d. Anexar a linha ao corpo da tabela
    corpoTabela.appendChild(linha);
  }
}

// ============================================================
// FUNÇÕES CRUD (vocês vão implementar cada uma)
// ============================================================

async function listarDispositivos() {
     try {
    // 1. Fazer a requisição GET para a API
    //    (GET é o método padrão do fetch — não precisamos configurar nada)
    const respostaHTTP = await fetch(URL_API);

    // 2. Converter a resposta HTTP em um objeto JavaScript
    //    (a API retorna texto JSON, o .json() transforma em objeto/vetor)
    const dados = await respostaHTTP.json();

    // 3. Salvar os dados no vetor local
    dispositivos = dados;

    // 4. Redesenhar a tabela com os novos dados
    renderizar();

    // 5. Informar o usuário
    mostrarMensagem(dispositivos.length + ' dispositivos encontrados.', 'sucesso');

  } catch (erro) {
    mostrarMensagem('Erro ao listar: ' + erro.message, 'erro');
  }
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