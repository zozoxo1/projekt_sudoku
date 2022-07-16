class Sudoku {

    constructor() {
        this.grid = Array(9).fill(null).map(() => Array(9));

        Array.prototype.shuffle = this.#arrayShuffle;
    }

    #arrayShuffle(){
        var tmp, rand;
        for(var i =0; i < this.length; i++)
        {
            rand = Math.floor(Math.random() * this.length);
            tmp = this[i];
            this[i] = this[rand];
            this[rand] =tmp;
        }
    }

    generate() {

        // @see https://www.kostenlose-javascripts.de/javascripts/spiele/sudoku-generator/
        var felder = new Array();
        
        var reihe = new Array(1,2,3,4,5,6,7,8,9);
        reihe.shuffle();

        for (var i = 1; i <= 81; i++)
        {
            felder[i-1] = reihe[(i-1)%9];
            if (i %9 == 0) { var weg1 = reihe[0]; var weg2 = reihe[1]; var weg3 = reihe[2]; reihe.shift(); reihe.shift(); reihe.shift(); reihe[6] = weg1; reihe[7] = weg2; reihe[8] = weg3; }
            if (i %27 == 0) { var weg = reihe[0]; reihe.shift(); reihe[8] = weg; }
        }

        for (var anzahl = 0; anzahl < 400; anzahl++)   // sprich 400 vertauschte Reihen!
        {
            if (Math.random() >= 0.333)
            {
                var betr_reihe_1 = parseInt(Math.random() * 9);
                var betr_reihe_2 = 0;
                if (betr_reihe_1 == 0) {   if (Math.random() > 0.5) { betr_reihe_2 = 1; } else { betr_reihe_2 = 2; }   }
                if (betr_reihe_1 == 1) {   if (Math.random() > 0.5) { betr_reihe_2 = 0; } else { betr_reihe_2 = 2; }   }
                if (betr_reihe_1 == 2) {   if (Math.random() > 0.5) { betr_reihe_2 = 1; } else { betr_reihe_2 = 0; }   }
                if (betr_reihe_1 == 3) {   if (Math.random() > 0.5) { betr_reihe_2 = 4; } else { betr_reihe_2 = 5; }   }
                if (betr_reihe_1 == 4) {   if (Math.random() > 0.5) { betr_reihe_2 = 3; } else { betr_reihe_2 = 5; }   }
                if (betr_reihe_1 == 5) {   if (Math.random() > 0.5) { betr_reihe_2 = 4; } else { betr_reihe_2 = 3; }   }
                if (betr_reihe_1 == 6) {   if (Math.random() > 0.5) { betr_reihe_2 = 7; } else { betr_reihe_2 = 8; }   }
                if (betr_reihe_1 == 7) {   if (Math.random() > 0.5) { betr_reihe_2 = 6; } else { betr_reihe_2 = 8; }   }
                if (betr_reihe_1 == 8) {   if (Math.random() > 0.5) { betr_reihe_2 = 7; } else { betr_reihe_2 = 6; }   }
                var zwischen = new Array();

                for (var i = 0; i <= 8; i++) { zwischen[i] = felder[betr_reihe_1 * 9 + i]; }
                for (var i = 0; i <= 8; i++) { felder[betr_reihe_1 * 9 + i] = felder[betr_reihe_2 * 9 + i]; }
                for (var i = 0; i <= 8; i++) { felder[betr_reihe_2 * 9 + i] = zwischen[i]; }
            }
            else if (Math.random() >= 0.666)
            {
                var betr_spalte_1 = parseInt(Math.random() * 9);
                var betr_spalte_2 = 0;
                if (betr_spalte_1 == 0) {   if (Math.random() > 0.5) { betr_spalte_2 = 1; } else { betr_spalte_2 = 2; }   }
                if (betr_spalte_1 == 1) {   if (Math.random() > 0.5) { betr_spalte_2 = 0; } else { betr_spalte_2 = 2; }   }
                if (betr_spalte_1 == 2) {   if (Math.random() > 0.5) { betr_spalte_2 = 1; } else { betr_spalte_2 = 0; }   }
                if (betr_spalte_1 == 3) {   if (Math.random() > 0.5) { betr_spalte_2 = 4; } else { betr_spalte_2 = 5; }   }
                if (betr_spalte_1 == 4) {   if (Math.random() > 0.5) { betr_spalte_2 = 3; } else { betr_spalte_2 = 5; }   }
                if (betr_spalte_1 == 5) {   if (Math.random() > 0.5) { betr_spalte_2 = 4; } else { betr_spalte_2 = 3; }   }
                if (betr_spalte_1 == 6) {   if (Math.random() > 0.5) { betr_spalte_2 = 7; } else { betr_spalte_2 = 8; }   }
                if (betr_spalte_1 == 7) {   if (Math.random() > 0.5) { betr_spalte_2 = 6; } else { betr_spalte_2 = 8; }   }
                if (betr_spalte_1 == 8) {   if (Math.random() > 0.5) { betr_spalte_2 = 7; } else { betr_spalte_2 = 6; }   }
                var zwischen = new Array();

                for (var i = 0; i <= 8; i++) { zwischen[i] = felder[betr_spalte_1 + i * 9]; }
                for (var i = 0; i <= 8; i++) { felder[betr_spalte_1 + i * 9] = felder[betr_spalte_2 + i * 9]; }
                for (var i = 0; i <= 8; i++) { felder[betr_spalte_2 + i * 9] = zwischen[i]; }
            }
            else
            {
                var betr_reihe_block_1 = parseInt(Math.random() * 3);
                var betr_reihe_block_2 = 0;
                if (betr_reihe_block_1 == 0) {   if (Math.random() > 0.5) { betr_reihe_block_2 = 1; } else { betr_reihe_block_2 = 2; }   }
                if (betr_reihe_block_1 == 1) {   if (Math.random() > 0.5) { betr_reihe_block_2 = 0; } else { betr_reihe_block_2 = 2; }   }
                if (betr_reihe_block_1 == 2) {   if (Math.random() > 0.5) { betr_reihe_block_2 = 0; } else { betr_reihe_block_2 = 1; }   }
                var zwischen = new Array();

                for (var i = 0; i <= 26; i++) { zwischen[i] = felder[betr_reihe_block_1 * 27 + i]; }
                for (var i = 0; i <= 26; i++) { felder[betr_reihe_block_1 * 27 + i] = felder[betr_reihe_block_2 * 27 + i]; }
                for (var i = 0; i <= 26; i++) { felder[betr_reihe_block_2 * 27 + i] = zwischen[i]; }
            }
        }

        var row = 0;
        for(var i = 0; i < 81; i++) {
            if(i % 9 == 0 && i != 0) {
                row++;
            }

            if(row == 9) {
                return;
            }

            this.grid[row][i % 9] = felder[i];
        }
    }

    solve() {
        for(let i = 0; i < 9; i++) {
            for(let j = 0; j < 9; j++) {
                let id = this.indexToId(i, j);
                let value = this.grid[i][j];
                let element = document.getElementById(id);
                element.getElementsByTagName('span')[0].innerText = value;
            }
        }
    }

    // ${row} 0-2 ${part} 0-2 ${cell} 0-8
    idToIndex(row, part, cell) {
        let indexRow = 0;
        let indexCol = part * 3 + cell % 3;

        if(cell > 2 && cell < 6) {
            indexRow = row * 3 + 1;
        } else if(cell > 5) {
            indexRow = row * 3 + 2;
        } else {
            indexRow = row * 3;
        }

        return [indexRow, indexCol];
    }

    indexToId(indexRow, indexCol) {
        let row = Math.floor(indexRow / 3);
        let part = Math.floor(indexCol / 3);
        let cell = 0;

        switch(indexRow % 3) {
            case 0:
                cell = indexCol % 3;
                break;
            case 1:
                cell = indexCol % 3 + 3;
                break;
            case 2:
                cell = indexCol % 3 + 6;
                break;
            default:
                break;
        }

        return `${row}${part}${cell}`;
    }

    show() {
        let numbersToShow = 36; // TODO: make constant or changeable in constructor
        let objArray = [];

        for(let i = 0; i < 9; i++) {
            for(let j = 0; j < 9; j++) {
                // i = height
                // j = width
                const object = {
                    x: j,
                    y: i
                };

                objArray.push(object);
            }
        }

        objArray.shuffle();

        objArray = objArray.slice(0, numbersToShow);

        objArray.forEach((element) => {
            let id = this.indexToId(element.y, element.x);
            let value = this.grid[element.y][element.x];
            document.getElementById(id).getElementsByTagName('span')[0].innerText = value;
        });

    }

    hint() {
        let gamePartInputs = document.getElementsByClassName('game-part-input');
        let emptyInputs = [];

        for (let part of gamePartInputs) {
            let gamePartSpan = part.getElementsByTagName('span')[0];

            if (gamePartSpan.innerText === "") {
                emptyInputs.push(part);
            }
        }

        if (emptyInputs.length > 0) {
            let randomInput = emptyInputs[Math.floor(Math.random() * emptyInputs.length)];
            let randomInputId = randomInput.id;
            let randomInputIndex = this.idToIndex(randomInputId[0], randomInputId[1], randomInputId[2]);

            let value = this.grid[randomInputIndex[0]][randomInputIndex[1]];
            randomInput.getElementsByTagName('span')[0].innerText = value;

            return randomInput;
        }

        return null;
    }

    checkInput(cellId, number) {
        let index = this.idToIndex(cellId[0], cellId[1], cellId[2]);

        if(this.grid[index[0]][[index[1]]] == number) {
            return true;
        }

        return false;
    }

    hasWon() {
        for(let i = 0; i < 9; i++) {
            for(let j = 0; j < 9; j++) {
                let id = this.indexToId(i, j);
                let gridValue = this.grid[i][j];
                let idValue = document.getElementById(id).innerText;

                if(gridValue != idValue) {
                    return false;
                }
            }
        }

        return true;
    }

}