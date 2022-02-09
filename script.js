// arrays com possibilidades de jogo para vitória
const line1 = [0, 1, 2];
const line2 = [3, 4, 5];
const line3 = [6, 7, 8];

const col1 = [0, 3, 6];
const col2 = [1, 4, 7];
const col3 = [2, 5, 8];

const diag1 = [0, 4, 8];
const diag2 = [2, 4, 6];

// Array com as bossibilidades para varredura de defesa e atack do script
const gamePossibilyts = [line1, line2, line3, col1, col2, col3, diag1, diag2];
// Array que armazena as jogadas de cada jogador
const played = [];

function atack() {
  // se a casa do meio anda não houver sido marcada, o script vai atacar por lá.
  if (played[4] !== 'player-1' && played[4] !== 'player-2') {
    document.getElementById(4).className += ' player-2';
    played[4] = 'player-2';
  } else {
    for (let index = 0; index < gamePossibilyts.length; ++index) {
      let player1 = 0;
      let player2 = 0;
      let empity = null;

      for (let value of gamePossibilyts[index]) {
        if (played[value] === 'player-1') player1 += 1;
        if (played[value] === 'player-2') {
          player2 += 1;
        } else {
          empity = value;
        }
      }

      if (player1 > 0) continue

      if (player2 > 0 && empity !== null || player2 === 0 && empity !== null) {
        document.getElementById(empity).className += ' player-2';
        played[empity] = 'player-2';
        break;
      }
      player2 = 0;
      empity = null;
    }
  }
}

function defend() {
  let defended = false;
  for (let index = 0; index < gamePossibilyts.length; ++index) {
    let player1 = 0;
    let player2 = 0;
    let empity = null;

    gamePossibilyts[index].forEach((value) => {
      if (played[value] === 'player-1') player1 += 1;
      if (played[value] === 'player-2') player2 += 1;
      if (played[value] !== 'player-1' && played[value] !== 'player-2') empity = value;
    })

    if (player1 === 2 && empity !== null) {
      document.getElementById(empity).className += ' player-2';
      played[empity] = 'player-2';
      defended = true;
      break
    }
    if (player2 === 2 && empity !== null) {
      document.getElementById(empity).className += ' player-2';
      played[empity] = 'player-2';
      defended = true;
      break
    }
    player1 = 0;
    player2 = 0;
    empity = null;
  }
  if (!defended) {
    atack();
  }
}

function addListem() {
  const marks = document.querySelectorAll('.mark');
  marks.forEach((mark) => {
    mark.addEventListener('click', (event) => {
      event.target.className += ' player-1';
      played[event.target.id] = 'player-1';
      console.log(played);
      defend();
    })
  })
}

window.onload = () => {
  addListem();
}