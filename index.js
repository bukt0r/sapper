import Game from "./game.js";

window.game = new Game();

game.init();
game.bombPlanting();
game.renderField();


const refresh = document.getElementById('header__button');
refresh.addEventListener('click', () => {
  location.reload();
});