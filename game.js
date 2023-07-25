import renderField from "./helpers/renderField.js";
import bombPlanting from "./helpers/bombPlanting.js";

class Game {
    bombAmount;
    fieldSize;
    time;
    timerId;
    field;

    timerElement;
    gameElement;
    bombAmountElement;
    fieldSizeElement;
    bombsFieldElement;

    constructor() {
        this.bombAmount = 10;
        this.fieldSize = 10;
        this.time = 0;
        this.timerId = null;
        this.field = [];
        this.timerElement = document.getElementById('timer');
        this.gameElement = document.querySelector('.game');
        this.bombAmountElement = document.getElementById('bombAmount');
        this.fieldSizeElement = document.getElementById('sizeField');
        this.bombsFieldElement = document.getElementById('bombsField');
    }

    startTimer = () => {
        this.timerId = setInterval(() => {
            this.time += 1;
            this.timerElement.innerText = this.time;
        }, 1000)
    }

    stopTimer = () => {
        this.timerId = null;
        this.time = 0;
        timerElement.innerText = this.time;
    }

    init() {
        this.fieldSizeElement.value = this.fieldSize;
        this.bombAmountElement.innerText = this.bombAmount;
        this.bombsFieldElement.value = this.bombAmount;

        this.fieldSizeElement.addEventListener('change', function(event){
            fieldSize = event.target.value
            renderField(fieldSize)
        })
        
        this.bombsFieldElement.addEventListener('change', function(event){
            bombAmount = event.target.value;
            document.getElementById('bombAmount').innerText = bombAmount;
        })
        
        for (let i = 0; i < this.fieldSize; i++) {
            this.field.push(Array(this.fieldSize));
            for (let k = 0; k < this.fieldSize ; k++) {
                this.field[i][k] = 0;
            }
        }
    }
    renderField() { 
        renderField(this.fieldSize, this.gameElement, this.timerId, this.startTimer, this.field)
    }
    bombPlanting() {
        bombPlanting(this.fieldSize, this.field, this.bombAmount);
    }
}


export default Game;