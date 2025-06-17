// Adiciona um 'ouvinte de evento' ao documento. Ele aguarda o HTML ser completamente
// carregado e analisado antes de executar o código interno. É uma prática essencial para
// garantir que todos os elementos que o script precisa manipular já existam na página.
document.addEventListener('DOMContentLoaded', () => {

  // Procura na página pelo primeiro elemento que tenha a classe CSS '.slider-container'.
  // Este é o elemento pai de todo o nosso componente slider.
  const sliderContainer = document.querySelector('.slider-container');
  
  // Esta é uma verificação de segurança crucial, chamada de "guard clause".
  // Se 'sliderContainer' for nulo (ou seja, o elemento não foi encontrado na página)...
  if (!sliderContainer) {
    // ...a instrução 'return' para a execução de todo o script imediatamente.
    // Isso evita que o código cause erros em outras páginas do site que não têm o slider.
    return;
  }

  // A partir daqui, o código só executa se o slider existir na página.
  // Dentro do 'sliderContainer' já encontrado, procura pelo elemento com a classe '.slider'.
  // Este é o elemento que realmente se move para a esquerda e para a direita.
  const slider = sliderContainer.querySelector('.slider');
  
  // Dentro do 'sliderContainer', encontra TODOS os elementos com a classe '.slide'.
  // 'querySelectorAll' retorna uma NodeList (similar a um array) com todos os slides.
  const slides = sliderContainer.querySelectorAll('.slide');
  
  // Dentro do 'sliderContainer', encontra o botão com o ID '#prev-btn'.
  const prevBtn = sliderContainer.querySelector('#prev-btn');
  
  // Dentro do 'sliderContainer', encontra o botão com o ID '#next-btn'.
  const nextBtn = sliderContainer.querySelector('#next-btn');

  // Declara uma variável (usando 'let' porque seu valor mudará) para rastrear qual slide está visível.
  // Começa em 0, que representa o primeiro slide.
  let currentIndex = 0;
  
  // Armazena o número total de slides encontrados. A propriedade '.length' nos dá essa contagem.
  // É uma 'const' porque o número de slides na página não mudará após o carregamento.
  const totalSlides = slides.length;

  // Define uma função reutilizável que move o slider para um slide específico.
  // Ela recebe 'index' como o número do slide para o qual queremos ir.
  function goToSlide(index) {
    
    // Se o índice desejado for menor que 0 (ocorre ao clicar 'anterior' no primeiro slide)...
    if (index < 0) {
      // ...ele "dá a volta" e define o índice atual como o do último slide.
      currentIndex = totalSlides - 1;
    
    // Senão, se o índice for igual ou maior que o número total de slides (ocorre ao clicar 'próximo' no último slide)...
    } else if (index >= totalSlides) {
      // ...ele "dá a volta" e define o índice de volta para 0, o primeiro slide.
      currentIndex = 0;
    
    // Se o índice estiver dentro dos limites normais...
    } else {
      // ...simplesmente atualiza o índice atual para o valor solicitado.
      currentIndex = index;
    }
    
    // Esta é a linha que realiza a mágica visual.
    // Ela aplica uma transformação CSS ao elemento '.slider' para movê-lo horizontalmente.
    // O cálculo `-currentIndex * 100` determina o deslocamento:
    // - Slide 0 (currentIndex=0): `translateX(0%)`   -> O slider fica no início.
    // - Slide 1 (currentIndex=1): `translateX(-100%)` -> O slider move 100% para a esquerda.
    // - Slide 2 (currentIndex=2): `translateX(-200%)` -> O slider move 200% para a esquerda, e assim por diante.
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  // Adiciona um 'ouvinte de evento' que espera por um clique no botão 'anterior'.
  prevBtn.addEventListener('click', () => {
    // Quando o botão é clicado, chama a função 'goToSlide' passando o índice do slide anterior.
    goToSlide(currentIndex - 1);
  });

  // Adiciona um 'ouvinte de evento' que espera por um clique no botão 'próximo'.
  nextBtn.addEventListener('click', () => {
    // Quando o botão é clicado, chama a função 'goToSlide' passando o índice do próximo slide.
    goToSlide(currentIndex + 1);
  });

});