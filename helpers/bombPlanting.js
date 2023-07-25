const BOMB = '💣';


const bombSetting = (x) => {
    return x === BOMB ? BOMB : (x + 1 || 1);
}

function bombPlanting(fieldSize, field, bombAmount) {
    let bombs = bombAmount;
    
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
    return field;
}

export default bombPlanting;