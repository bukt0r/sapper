const BOMB = '💣';


const bombSetting = (x) => {
    return x === BOMB ? BOMB : (x + 1 || 1);
}

function bombPlanting(fieldSize, field, bombAmount) {
    let bombs = bombAmount;
    
    
    let varity = 0.1;

    for (let i = 0; i < fieldSize; i++) {
        varity = varity + varity / bombs;
        
        for( let j = 0; j < fieldSize; j++) {
            const isBomb = bombs && Math.random() < varity;
            

            if(isBomb) {
                bombs -= 1;
                field[i][j] = BOMB;
                
                

                if(i > 0) {
                    if (j > 0) {
                        field[i - 1][j-1] = bombSetting(field[i-1][j - 1]);
                        
                    }

                    field[i - 1][j] = bombSetting(field[i-1][j]);
                    
                    
                    if (j < fieldSize - 1) {
                        field[i - 1][j+1] = bombSetting(field[i-1][j + 1]);
                        
                    }
                }
                
                if ( i < fieldSize - 1) {
                    if (j > 0) {
                        field[i + 1][j-1] = bombSetting(field[i + 1][j - 1]);
                        
                    }

                    field[i + 1][j] = bombSetting(field[i + 1][j]);
                    

                    if (j < fieldSize - 1) {
                        field[i + 1][j+1] = bombSetting(field[i + 1][j + 1]);
                       
                    }
                }

                if (j > 0) {
                    field[i][j-1] = bombSetting(field[i][j - 1]);
                    
                }

                if (j < fieldSize - 1) {
                    field[i][j+1] = bombSetting(field[i][j + 1]);
                    
                }

            }
        }
    }
    return field;
}

export default bombPlanting;