let bombAmount = 10;
let fieldSize = 10;

let time = 0;
const BOMB = '*';

let timerId = '';

const timerElement = document.getElementById('timer');


let timer = () => {
    return setInterval(function() {
        time += 1;
        timerElement.innerText = time;
    }, 1000) 
}

const gameElement = document.querySelector('.game');

const bombAmountElement = document.getElementById('bombAmount');
bombAmountElement.innerText = bombAmount;

const fieldSizeElement = document.getElementById('sizeField');
fieldSizeElement.value = fieldSize;

fieldSizeElement.addEventListener('change', function(event){
    fieldSize = event.target.value
    renderField(fieldSize)
}) 

let bombsField = document.getElementById('bombsField');
bombsField.value = bombAmount;
bombsField.addEventListener('change', function(event){
    bombAmount = event.target.value;
    document.getElementById('bombAmount').innerText = bombAmount;
})

renderField(fieldSize)

let checkZero = (x,y) => {
    if (fieldArr[y][x] === 0) {
        document.querySelector(`.cell[data-x='${x}'][data-y='${y}']`).innerText = fieldArr[y][x]
        return true
    } else {
        return false
    }
}



function renderField(size) {
    const prevFieldElement = document.querySelector('.field')
    if (prevFieldElement) {
        gameElement.removeChild(prevFieldElement);
    };


    const field = document.createElement('div');
    field.classList.add("field");
    for (let i = 0; i < size; i++) {
        const row = document.createElement('div');
        row.classList.add("row");
        field.appendChild(row);

        for (let j = 0; j < size; j++) {
            const cell = document.createElement('div');
            cell.classList.add("cell");
            cell.setAttribute('data-y', i);
            cell.setAttribute('data-x', j);
            row.appendChild(cell);
        }
    }
   

    
    gameElement.appendChild(field)
    field.addEventListener('click', function(event) {
        
        if (!timerId) {
            timerId = timer();
        }

        if (event.target.classList.contains('cell')) {
            const x = event.target.dataset.x;
            const y = event.target.getAttribute('data-y');
            event.target.innerText = fieldArr[y][x]
           


            if (fieldArr[y][x] === 0) {

                for( let i = y; i< fieldSize; i++) {
                    if (!checkZero(x,i)) {
                        break;
                    }
                } 
                
                for( let i = y; i>= 0; i--) {
                    if (!checkZero(x,i)) {
                        break;
                    }
                }

                for( let i = x; i < fieldSize; i++) {
                    if (!checkZero(i,y)) {
                        break;
                    }
                }

                for( let i = x; i>= 0; i--) {
                    if (!checkZero(i,y)) {
                        break;
                    }
                }

                for( let i = y, j = x ; i>= 0 && j >= 0; i--, j--) {
                    
                     if (!checkZero(i,j)) {
                            break;     
                    }
                }

                for( let i = y, j = x ; i>= 0 && j < fieldSize; i--, j++) {
                    
                    if (!checkZero(i,j)) {
                        break;
                    }
                
                }

                for( let i = y, j = x ; i< fieldSize && j >= 0; i++, j--) {
                    if (!checkZero(i,j)) {
                        break;
                    }
                    
                }

                for( let i = y, j = x ; i< fieldSize && j < fieldSize; i++, j++) {
                    
                    if (!checkZero(i,j)) {
                        break;
                    }
                }
            }
        }

    });

    
    field.addEventListener('contextmenu', function(event) {
        event.preventDefault();
        if (!timerId) {
            timerId = timer();
        };

        if (event.target.classList.contains('cell')) {
            if (event.target.innerText === '' ) {
                event.target.innerText = '!';
            } else if (event.target.innerText === '!') {
                event.target.innerText = '?'
            } else {
                event.target.innerText = '';
            };
        };
    })

  
}

const bombSetting = (x) => {
    return x === BOMB ? BOMB : (x + 1 || 1);
}

function bompPlanting() {
    let bombs = bombAmount;
    
    let field = [];

    for (let i = 0; i < fieldSize; i++) {
        field.push(Array(fieldSize));
        for (let k = 0; k < fieldSize ; k++) {
            field[i][k] = 0;
        }
    }
    // console.log(field)
    let varity = 0.1;

    for (let i = 0; i < fieldSize; i++) {
        varity = varity + varity / bombs;
        // console.log('varity: ', varity);
        for( let j = 0; j < fieldSize; j++) {
            const isBomb = bombs && Math.random() < varity;
            // console.log(j, i);

            if(isBomb) {
                bombs -= 1;
                field[i][j] = BOMB;
                
                // document.querySelector(`.cell[data-x='${j}'][data-y='${i}']`).innerText = '*';

                if(i > 0) {
                    if (j > 0) {
                        field[i - 1][j-1] = bombSetting(field[i-1][j - 1]);
                        // document.querySelector(`.cell[data-x='${j-1}'][data-y='${i-1}']`).innerText = field[i - 1][j-1];
                    }

                    field[i - 1][j] = bombSetting(field[i-1][j]);
                    // document.querySelector(`.cell[data-x='${j}'][data-y='${i - 1}']`).innerText = field[i - 1][j];
                    
                    if (j < fieldSize - 1) {
                        field[i - 1][j+1] = bombSetting(field[i-1][j + 1]);
                        // document.querySelector(`.cell[data-x='${j+1}'][data-y='${i-1}']`).innerText = field[i - 1][j+1];
                    }
                }
                
                if ( i < fieldSize - 1) {
                    if (j > 0) {
                        field[i + 1][j-1] = bombSetting(field[i + 1][j - 1]);
                        // document.querySelector(`.cell[data-x='${j-1}'][data-y='${i+1}']`).innerText = field[i + 1][j - 1];
                    }

                    field[i + 1][j] = bombSetting(field[i + 1][j]);
                    // document.querySelector(`.cell[data-x='${j}'][data-y='${i+1}']`).innerText = field[i + 1][j];

                    if (j < fieldSize - 1) {
                        field[i + 1][j+1] = bombSetting(field[i + 1][j + 1]);
                        // document.querySelector(`.cell[data-x='${j+1}'][data-y='${i+1}']`).innerText = field[i + 1][j + 1];
                    }
                }

                if (j > 0) {
                    field[i][j-1] = bombSetting(field[i][j - 1]);
                    // document.querySelector(`.cell[data-x='${j-1}'][data-y='${i}']`).innerText = field[i][j - 1];
                }

                if (j < fieldSize - 1) {
                    field[i][j+1] = bombSetting(field[i][j + 1]);
                    // document.querySelector(`.cell[data-x='${j}'][data-y='${i+1}']`).innerText = field[i][j + 1];
                }

            }
        }
    }
    return field
}

let fieldArr = bompPlanting();



