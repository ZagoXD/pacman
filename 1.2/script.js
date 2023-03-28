document.addEventListener('DOMContentLoaded', () => {

    const grid = document.querySelector('.grid')
    const Display = document.getElementById('pontos')
    const width = 28
    let pontuacao = 0
    let comidas = 234

    const layout = [
      1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
      1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
      1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
      1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
      1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
      1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
      1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
      1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
      1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
      1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
      1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
      1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
      1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
      4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
      1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
      1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
      1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
      1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
      1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
      1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
      1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
      1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
      1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
      1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
      1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
      1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
      1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
      1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
    ]
    // legenda: 0 - comida, 1 - parede, 2 - parede fantasmas, 3 - poder, 4 - nada 
    const pixels = []
  
    //tabuleiro
    function tabuleiro() {
      for (let i = 0; i < layout.length; i++) {
        const pixel = document.createElement('div')
        grid.appendChild(pixel)
     pixels.push(pixel)
  
        if(layout[i] === 0) {
            pixels[i].classList.add('comida')
        } 
        else if (layout[i] === 1) {
            pixels[i].classList.add('parede')
        } 
        else if(layout[i] === 2) {
            pixels[i].classList.add('covil')
        }
        else if (layout[i] === 3) {
            pixels[i].classList.add('poder')
        }
      }
    }
    tabuleiro()

    let localPacman = 490
 pixels[localPacman].classList.add('pacman')

    // movimentação
    function movi(e){
        pixels[localPacman].classList.remove('pacman')
    switch(e.keyCode) {
      case 37: // esquerda
        if(
          localPacman % width !== 0 &&
          !pixels[localPacman -1].classList.contains('parede') &&
          !pixels[localPacman -1].classList.contains('covil')
        )
        localPacman -= 1
        // inverter posição
        if (pixels[localPacman -1] === pixels[363]) {
          localPacman = 391
        }
        break
      case 38: // cima
        if(
          localPacman - width >= 0 &&
          !pixels[localPacman -width].classList.contains('parede') &&
          !pixels[localPacman -width].classList.contains('covil')
          ) 
        localPacman -= width
        break
      case 39: // direita
        if(
          localPacman % width < width - 1 &&
          !pixels[localPacman +1].classList.contains('parede') &&
          !pixels[localPacman +1].classList.contains('covil')
        )
        localPacman += 1
        // inverter posição
        if (pixels[localPacman +1] === pixels[392]) {
          localPacman = 364
        }
        break
      case 40: // baixo
        if (
          localPacman + width < width * width &&
          !pixels[localPacman +width].classList.contains('parede') &&
          !pixels[localPacman +width].classList.contains('covil')
        )
        localPacman += width
        break
        }

     pixels[localPacman].classList.add('pacman')
     // adicionar funções
     comer()
     power()
     morte()
     vitoria()
    }
    document.addEventListener('keydown', movi)

    
    // pontuação
    function comer(){
        if (pixels[localPacman].classList.contains('comida')) {
            pontuacao++
            comidas--
            Display.innerHTML = pontuacao
            pixels[localPacman].classList.remove('comida')
        }
    }

    function power(){
        if(pixels[localPacman].classList.contains('poder')) {
            pontuacao +=10
            Display.innerHTML = pontuacao
            fantasmas.forEach(fantasma => fantasma.medo = true)
            setTimeout(sairMedo, 10000)
            pixels[localPacman].classList.remove('poder')
        }
    }

    function sairMedo() {
        fantasmas.forEach(fantasma => fantasma.medo = false)
    }



    //fantasmas
    class fantasma {
        constructor(nome, comeco, velocidade) {
          this.nome = nome
          this.comeco = comeco
          this.velocidade = velocidade
          this.local = comeco
          this.medo = false
          this.tempo = NaN
        }
    }
    
    fantasmas = [
        new fantasma('blinky', 348, 250),
        new fantasma('pinky', 376, 400),
        new fantasma('inky', 351, 300),
        new fantasma('clyde', 379, 500)
    ]
    
    fantasmas.forEach(fantasma => {
        pixels[fantasma.local].classList.add(fantasma.nome)
        pixels[fantasma.local].classList.add('fantasma')
    })

    // mover fantasma

    fantasmas.forEach(fantasma => moverFantasma(fantasma))

    function moverFantasma(fantasma){
       const direcoes = [-1, +1, width, -width] 
       let direcao = direcoes[Math.floor(Math.random() * direcoes.length)]

        fantasma.tempo = setInterval(function() {
            if (!pixels[fantasma.local + direcao].classList.contains('fantasma') && !pixels[fantasma.local + direcao].classList.contains('parede') ) {
                pixels[fantasma.local].classList.remove(fantasma.nome)
                pixels[fantasma.local].classList.remove('fantasma', 'medo')
  
                fantasma.local += direcao
                pixels[fantasma.local].classList.add(fantasma.nome, 'fantasma')

            } 
            else{
                direcao = direcoes[Math.floor(Math.random() * direcoes.length)]
            }
        
        if (fantasma.medo){
            pixels[fantasma.local].classList.add('medo')
        }

        if(fantasma.medo && pixels[fantasma.local].classList.contains('pacman')){
          pixels[fantasma.local].classList.remove(fantasma.nome, 'fantasma', 'medo')
          fantasma.local = fantasma.comeco
          pontuacao +=50
          Display.innerHTML = pontuacao
          pixels[fantasma.local].classList.add(fantasma.nome, 'fantasma')
        }
        morte()
        }, fantasma.velocidade)
    }

    function morte(){
        if(pixels[localPacman].classList.contains('fantasma') && !pixels[localPacman].classList.contains('medo')){
            fantasmas.forEach(fantasma => clearInterval(fantasma.tempo))
            document.removeEventListener('keydown', movi)
            setTimeout(function(){
                alert('Fim de Jogo, Você Perdeu!')
                location.reload()
            }, 500)
        }
    }

    function vitoria(){
        if (comidas === 0){
            fantasmas.forEach(fantasma => clearInterval(fantasma.tempo))
            document.removeEventListener('keydown', movi)
            setTimeout(function(){ 
                alert(`Você ganhou, sua pontuação final: ${pontuacao}`);
                location.reload() 
            }, 500)          
        }
    }

})