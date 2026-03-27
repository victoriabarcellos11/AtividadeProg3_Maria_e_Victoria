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
  // TODO: Passo 1
}

async function buscarPorId() {
  // 1. Pegar o valor que o usuário digitou no campo ID
  const id = campoId.value.trim();

  // 2. Validar: se o campo está vazio, avisar e parar
  if (!id) {
    mostrarMensagem('Digite um ID para buscar.', 'erro');
    return;   // "return" encerra a função aqui, nada abaixo executa
  }

  try {
    // 3. Fazer a requisição GET, agora com o ID na URL
    //    (Template Literal: o acento grave permite inserir variáveis com ${})
    const respostaHTTP = await fetch(`${URL_API}/${id}`);

    // 4. Verificar se a API encontrou o objeto
    if (!respostaHTTP.ok) {
      mostrarMensagem('Dispositivo não encontrado (ID: ' + id + ').', 'erro');
      return;
    }

    // 5. Converter a resposta em objeto JavaScript
    const item = await respostaHTTP.json();

    // 6. Preencher o formulário com os dados retornados
    //    (isso facilita a edição — o aluno vê os dados atuais e altera o que quiser)
    if (item.name) {
      campoNome.value = item.name;
    } else {
      campoNome.value = '';
    }

    if (item.data && item.data.color) {
      campoCor.value = item.data.color;
    } else {
      campoCor.value = '';
    }

    if (item.data && item.data.capacity) {
      campoCapacidade.value = item.data.capacity;
    } else {
      campoCapacidade.value = '';
    }

    if (item.data && item.data.price) {
      campoPreco.value = item.data.price;
    } else {
      campoPreco.value = '';
    }

    // 7. Atualizar o vetor local: colocar somente este item para visualização
    dispositivos = [item];
    renderizar();

    mostrarMensagem('Dispositivo "' + item.name + '" encontrado.', 'sucesso');

  } catch (erro) {
    mostrarMensagem('Erro ao buscar: ' + erro.message, 'erro');
  }
  // TODO: Passo 2
}

async function cadastrarDispositivo() {
  // 1. Ler os valores dos campos do formulário
  const nome = campoNome.value.trim();
  const cor = campoCor.value.trim();
  const capacidade = campoCapacidade.value.trim();
  const preco = campoPreco.value;

  // 2. Validação mínima: nome é obrigatório
  if (!nome) {
    mostrarMensagem('O nome do dispositivo é obrigatório.', 'erro');
    return;
  }

  // 3. Montar o objeto no formato que a API espera
  //    (consulte a documentação da API para saber o formato)
  // parseFloat() converte texto para número decimal.
  // Se o campo estiver vazio, parseFloat('') retorna NaN (Not a Number).
  // Usamos o operador || para substituir NaN por 0.
  const precoNumerico = parseFloat(preco) || 0;

  const novoDispositivo = {
    name: nome,
    data: {
      color: cor,
      capacity: capacidade,
      price: precoNumerico
    }
  };

  try {
    // 4. Fazer a requisição POST
    //    Diferente do GET, aqui precisamos configurar:
    //    - method: qual verbo HTTP usar
    //    - headers: avisar que estamos enviando JSON
    //    - body: os dados convertidos de objeto JS para texto JSON
    const respostaHTTP = await fetch(URL_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(novoDispositivo)
    });

    // 5. Verificar se a resposta foi bem-sucedida
    if (!respostaHTTP.ok) {
      mostrarMensagem('Erro ao cadastrar. A API retornou status ' + respostaHTTP.status + '.', 'erro');
      return;
    }

    // 6. Converter a resposta (a API retorna o objeto criado, agora com um ID)
    const itemCriado = await respostaHTTP.json();

    // 6. Adicionar o novo item ao vetor local
    dispositivos.push(itemCriado);

    // 7. Redesenhar a tabela para mostrar o novo item
    renderizar();

    // 8. Limpar o formulário e informar o usuário
    limparFormulario();
    mostrarMensagem('Dispositivo "' + itemCriado.name + '" cadastrado! ID: ' + itemCriado.id, 'sucesso');

  } catch (erro) {
    mostrarMensagem('Erro ao cadastrar: ' + erro.message, 'erro');
  }
  // TODO: Passo 3
}

async function atualizarDispositivo() {
  // TODO: Passo 4
  const id = campoId.value.trim();
  const nome = campoNome.value.trim();
  const cor = campoCor.value.trim();
  const capacidade = campoCapacidade.value.trim();
  const preco = campoPreco.value;

  //validação do campo nome
  if (!nome) {
    mostrarMensagem('O nome do dispositivo é obrigatório.', 'erro');
    return;
  }

  //validação do preço
 const precoNumerico = parseFloat(preco) || 0;

 //objeto
  const dispositivoEditado = {
    name: nome,
    data: {
      color: cor,
      capacity: capacidade,
      price: precoNumerico
    }
  };

const respostaHTTP = await fetch(`${URL_API}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dispositivoEditado)
    });

    // 5. Verificar se a resposta foi bem-sucedida
    if (!respostaHTTP.ok) {
      mostrarMensagem('Erro ao editar. A API retornou status ' + respostaHTTP.status + '.', 'erro');
      return;
    }

  const itemAtualizado = await respostaHTTP.json();

  // findIndex() percorre o vetor e retorna a POSIÇÃO (0, 1, 2...)
// do primeiro item que satisfaz a condição.
// Se não encontrar, retorna -1.
const posicao = dispositivos.findIndex(d => d.id === id);

if (posicao !== -1) {
  // Substituir o item antigo pelo atualizado
  dispositivos[posicao] = itemAtualizado;
}
renderizar();
mostrarMensagem();
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