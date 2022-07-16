let sudoku = new Sudoku();
let inputCheck = false;
let resultCheck = false;

window.addEventListener('DOMContentLoaded', () => {
    inputCheck = isSettingActive("inputCheckSetting");
    // resultCheck = isSettingActive("resultCheckSetting");

    loadGrid();
    generateSudoku();

    let tippTool = document.getElementsByClassName("tool-hint")[0];
    let newGameTool = document.getElementsByClassName("tool-new-game")[0];
    let solveTool = document.getElementsByClassName("tool-solve")[0];

    tippTool.addEventListener('click', () => {
        const hintPart = sudoku.hint();
        
        if (hintPart !== null) {
            deselectAllCells();
            selectCell(hintPart.id);
        }

        checkForWin();
    });

    newGameTool.addEventListener('click', () => {
        let gameDiv = document.getElementById("game-div");
        gameDiv.innerHTML = "";

        loadGrid();
        generateSudoku();
        checkForWin();
    });

    solveTool.addEventListener('click', () => {
        sudoku.solve();
        checkWrongInputs();
        checkForWin();
    });

    inputCheckSetting.addEventListener('change', () => {
        inputCheck = isSettingActive("inputCheckSetting");
        checkWrongInputs();
    });

    resultCheckSetting.addEventListener('change', () => {
        resultCheck = isSettingActive("resultCheckSetting");
    });

});

function generateSudoku() {
    sudoku = new Sudoku();
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
        key.onclick = () => handleInput(key);
        key.classList.contains("disabled") ? key.classList.remove("disabled") : undefined;
    }
}

function deactivateKeyboard() {
    let keyBoardKeys = document.getElementsByClassName("key-input-div");
    for(let key of keyBoardKeys) {
        key.onclick = null;
        key.classList.contains("disabled") ? undefined : key.classList.add("disabled");
    }
}

function handleInput(key) {
    let selectedCell = document.getElementsByClassName("selected")[0];
    let selectedKeyboardValue = key.innerText;

    deselectAllCells();
    submitNumber(selectedCell, selectedKeyboardValue);
    deactivateKeyboard();
}

function checkForWin() {
    if(sudoku.hasWon()) {
        let gameDiv = document.getElementById("game-div");
        gameDiv.style.color = "green";
    } else {
        let gameDiv = document.getElementById("game-div");
        gameDiv.style.color = "black";
    }
}

function submitNumber(cell, number) {
    cell.getElementsByTagName("span")[0].innerText = number;
    const isInputCorrect = sudoku.checkInput(cell.id, number);

    if (inputCheck) {
        checkWrongInputs();
    }

    checkForWin();
}

function checkWrongInputs() {
    for(let row = 0; row < 3; row++) {
        for(let part = 0; part < 3; part++) {
            for(let cell = 0; cell < 9; cell++) {
                let cellId = `${row}${part}${cell}`;
                let cellElement = document.getElementById(cellId);
                let cellElementText = cellElement.getElementsByTagName("span")[0].innerText;
                let isInputCorrect = sudoku.checkInput(cellId, cellElementText);

                if (cellElementText !== "") {
                    isInputCorrect ? cellElement.classList.remove("wrong-input") : cellElement.classList.add("wrong-input");
                } else {
                    cellElement.classList.remove("wrong-input");
                }

                if (!inputCheck) {
                    cellElement.classList.remove("wrong-input");
                }
            }
        }
    }
}

function isSettingActive(settingId) {
    return document.getElementById(settingId).checked;
}