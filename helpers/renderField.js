const FLAG = '🏴';
const QUESTION = '❓';

const checkZero = (x,y, fieldArr) => {
    console.log(x,y)
    if (fieldArr[y][x] === 0) {
        document.querySelector(`.cell[data-x='${x}'][data-y='${y}']`).innerText = fieldArr[y][x]
        return true
    } else {
        return false
    }
}

function renderField(size, gameElement, timerId, timer, fieldArr) {
    
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
        console.log(fieldArr);
        if (!timerId) {
            timerId = timer();
        }

        if (event.target.classList.contains('cell')) {
            const x = +event.target.dataset.x;
            const y = +event.target.getAttribute('data-y');
            event.target.innerText = fieldArr[y][x]
           


            if (fieldArr[y][x] === 0) {

                for( let i = y; i< size; i++) {
                    if (!checkZero(x,i, fieldArr)) {
                        break;
                    }
                } 
                
                for( let i = y; i>= 0; i--) {
                    if (!checkZero(x,i, fieldArr)) {
                        break;
                    }
                }

                for( let i = x; i < size; i++) {
                    if (!checkZero(i,y, fieldArr)) {
                        break;
                    }
                }

                for( let i = x; i>= 0; i--) {
                    if (!checkZero(i,y, fieldArr)) {
                        break;
                    }
                }

                for( let i = y, j = x ; i>= 0 && j >= 0; i--, j--) {
                    
                     if (!checkZero(i,j, fieldArr)) {
                            break;     
                    }
                }

                for( let i = y, j = x ; i>= 0 && j < size; i--, j++) {
                    
                    if (!checkZero(i,j, fieldArr)) {
                        break;
                    }
                
                }

                for( let i = y, j = x ; i< size && j >= 0; i++, j--) {
                    if (!checkZero(i,j, fieldArr)) {
                        break;
                    }
                    
                }

                for( let i = y, j = x ; i< size && j < size; i++, j++) {
                    
                    if (!checkZero(i,j, fieldArr)) {
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
                event.target.innerText = FLAG;
            } else if (event.target.innerText === FLAG) {
                event.target.innerText = QUESTION
            } else {
                event.target.innerText = '';
            };
        };
    })

  
}

export default renderField;