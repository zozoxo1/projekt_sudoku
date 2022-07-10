window.addEventListener('DOMContentLoaded', () => {
    loadGrid();
    generateSudoku();
});

function generateSudoku() {
    const sudoku = new Sudoku();
    sudoku.generate();
    sudoku.show();
}

function loadGrid() {
    let grid = document.getElementById("game-div");

    for(let row = 0; row < 3; row++) {
        let rowDiv = document.createElement("div");
        rowDiv.classList.add("game-row");

        let breakRowDiv = document.createElement("div");
        breakRowDiv.classList.add("break");

        for(let part = 0; part < 3; part++) {
            let partDiv = document.createElement("div");
            partDiv.classList.add("game-part");

            for(let cell = 0; cell < 9; cell++) {
                let cellId = `${row}${part}${cell}`;
                let cellElement = document.createElement('div');
                cellElement.classList.add("game-part-input");
                cellElement.id = cellId;
                let cellElementText = document.createElement('span');
                cellElementText.innerText = "";

                cellElement.addEventListener('click', () => {
                    isCellSelected(cellId) ? deselectCell(cellId) : selectCell(cellId);
                    isCellSelected(cellId) ? activateKeyboard() : deactivateKeyboard();
                });

                cellElement.appendChild(cellElementText);
                partDiv.appendChild(cellElement);
            }

            rowDiv.appendChild(partDiv);
        }

        grid.appendChild(rowDiv);
        grid.appendChild(breakRowDiv);
    }
}

function deselectAllCells() {
    for(let row = 0; row < 3; row++) {
        for(let part = 0; part < 3; part++) {
            for(let cell = 0; cell < 9; cell++) {
                let cellId = `${row}${part}${cell}`;
                let cellElement = document.getElementById(cellId);
                cellElement.classList.remove("selected");
            }
        }
    }
}

function isCellSelected(cell) {
    return document.getElementById(cell).classList.contains("selected");
}

function selectCell(cell) {
    deselectAllCells();
    document.getElementById(cell).classList.add("selected");
}

function deselectCell(cell) {
    document.getElementById(cell).classList.remove("selected");
}

function activateKeyboard() {
    let keyBoardKeys = document.getElementsByClassName("key-input-div");
    for(let key of keyBoardKeys) {
        key.classList.contains("disabled") ? key.classList.remove("disabled") : undefined;
        key.classList.contains("selected-key") ? key.classList.remove("selected-key") : undefined;

        if(key.innerText !== "ENTER") {
            key.addEventListener('click', () => {
                for (let key of keyBoardKeys) {
                    key.classList.contains("selected-key") ? key.classList.remove("selected-key") : undefined;
                }
    
                key.classList.add("selected-key");
                activateEnter();
            });
        }
    }

    deactivateEnter();
}

function deactivateKeyboard() {
    let keyBoardKeys = document.getElementsByClassName("key-input-div");
    for(let key of keyBoardKeys) {
        key.classList.contains("disabled") ? undefined : key.classList.add("disabled");
        key.classList.contains("selected-key") ? key.classList.remove("selected-key") : undefined;

        key.removeEventListener('click', () => {
            for (let key of keyBoardKeys) {
                key.classList.contains("selected-key") ? key.classList.remove("selected-key") : undefined;
            }

            key.classList.add("selected-key");
            activateEnter();
        });
    }

    deactivateEnter();
}

function activateEnter() {
    let enterButton = document.getElementById("enter-button");
    enterButton.classList.remove("disabled");

    enterButton.addEventListener('click', () => {
        let selectedCell = document.getElementsByClassName("selected")[0];
        let selectedKeyboardValue = document.getElementsByClassName("selected-key")[0].innerText;

        submitNumber(selectedCell, selectedKeyboardValue);
        deactivateKeyboard();
        deselectAllCells();
    });
}

function deactivateEnter() {
    let enterButton = document.getElementById("enter-button");
    enterButton.classList.add("disabled");

    enterButton.removeEventListener('click', () => {
        let selectedCell = document.getElementsByClassName("selected")[0].id;
        let selectedKeyboardValue = document.getElementsByClassName("selected-key")[0].innerText;

        submitNumber(selectedCell, selectedKeyboardValue);
        deactivateKeyboard();
        deselectAllCells();
    });
}

function submitNumber(cell, number) {
    cell.getElementsByTagName("span")[0].innerText = number;
}