// scripts/main.js

// Adiciona um 'ouvinte de evento' que espera o documento HTML principal ser
// completamente carregado e analisado pelo navegador antes de executar qualquer código JavaScript.
// Isso garante que o <body> e outros elementos já existam quando o script tentar manipulá-los.
document.addEventListener("DOMContentLoaded", function () {

  // --- Função para ativar o menu hambúrguer ---
  // Colocamos a lógica do menu dentro de uma função para organizar e, crucialmente, para que
  // possamos chamá-la no momento exato (depois que o cabeçalho for carregado).
  function ativarMenuHamburguer() {
    // Encontra o primeiro elemento na página que tem a classe '.menu' e o armazena na constante 'botaoMenu'.
    const botaoMenu = document.querySelector('.menu'); // Nota: Nos seus arquivos anteriores, esta classe era '.menu-hamburguer'. Certifique-se de que está consistente.
    
    // Encontra a primeira tag `<nav>` na página e a armazena na constante 'navMenu'.
    const navMenu = document.querySelector('nav');

    // Verifica se ambos os elementos (o botão e a navegação) foram encontrados na página.
    // Isso é uma boa prática para evitar erros caso o script rode em uma página sem esses elementos.
    if (botaoMenu && navMenu) {
      
      // Adiciona um 'ouvinte de evento' que espera por um clique no botão do menu.
      botaoMenu.addEventListener('click', () => {
        
        // A função 'toggle' adiciona a classe 'ativo' se ela não existir, e a remove se ela já existir.
        // Isso alterna o estado visual do botão (de hambúrguer para 'X' e vice-versa via CSS).
        botaoMenu.classList.toggle('ativo');
        
        // Faz o mesmo para o elemento de navegação, alternando sua visibilidade (mostrando ou escondendo o menu lateral).
        navMenu.classList.toggle('ativo');

        // Verifica se o menu de navegação AGORA possui a classe 'ativo'...
        const estaAberto = navMenu.classList.contains('ativo');
        
        // ...e atualiza o atributo 'aria-expanded' do botão. Isso é MUITO importante para a acessibilidade,
        // informando leitores de tela se o menu está aberto (true) ou fechado (false).
        botaoMenu.setAttribute('aria-expanded', estaAberto);
      });
    }
  }

  // --- Início da montagem da página ---
  // Cria um novo elemento <div> na memória, mas ainda não o insere na página.
  const headerPlaceholder = document.createElement('div');
  
  // Define o atributo 'id' deste novo div como 'header-placeholder'.
  headerPlaceholder.setAttribute('id', 'header-placeholder');
  
  // Insere o 'headerPlaceholder' como o PRIMEIRO filho do <body> da página.
  document.body.prepend(headerPlaceholder);

  // Cria um segundo <div> na memória para o rodapé.
  const footerPlaceholder = document.createElement('div');
  
  // Define seu 'id' como 'footer-placeholder'.
  footerPlaceholder.setAttribute('id', 'footer-placeholder');
  
  // Insere o 'footerPlaceholder' como o ÚLTIMO filho do <body> da página.
  document.body.append(footerPlaceholder);

  // --- CARREGA O HEADER ---
  // Inicia uma requisição de rede para buscar o conteúdo do arquivo 'header.html' no servidor.
  fetch('/includes/header.html')
    // O primeiro '.then()' é executado quando o servidor responde. Ele pega a resposta ('response')...
    .then(response => response.text()) // ...e a converte em formato de texto puro.
    
    // O segundo '.then()' é executado quando a conversão para texto termina.
    // O conteúdo HTML do arquivo agora está disponível na variável 'data'.
    .then(data => {
      // 1. Encontra o placeholder do header pelo seu ID e substitui seu conteúdo vazio
      //    pelo HTML que foi baixado do arquivo 'header.html'.
      document.getElementById('header-placeholder').innerHTML = data;

      // 2. O PONTO-CHAVE: AGORA que o HTML do cabeçalho (incluindo o botão do menu) foi
      //    inserido na página, nós finalmente chamamos a função para ativar sua funcionalidade.
      ativarMenuHamburguer();
    });

  // --- CARREGA O FOOTER ---
  // Inicia uma requisição de rede para buscar o conteúdo do arquivo 'footer.html'.
  fetch('/includes/footer.html')
    // Pega a resposta do servidor e a converte em texto.
    .then(response => response.text())
    // Quando a conversão termina...
    .then(data => {
      // Encontra o placeholder do rodapé e insere o HTML baixado dentro dele.
      document.getElementById('footer-placeholder').innerHTML = data;
    });
});