import { board_game, updateSizeBoardGame } from "./board-game.js";
// import { DELTA_ROW, DELTA_COLUMN, BLANK_CELL, FAIL } from "./const.js";
import * as CONST from "./const.js";


document.addEventListener("keydown", keyboardEvent);


const randomButtons = document.querySelectorAll('.randomButton');
randomButtons.forEach(randomButton => randomButton.addEventListener('click', createRandomStateEvent));
const inputs_size = document.querySelectorAll('.input-size');
inputs_size.forEach(input_size => input_size.addEventListener('change', updateSizeBoardGameEvent));
const table_input_state = document.querySelector('.table-input-state');
table_input_state.addEventListener('click', () => {
    const wrapperTableInput = document.querySelector('.wrapper-table-input');
    const blur = document.querySelector('.input-state');
    wrapperTableInput.classList.toggle('open');
    blur.classList.toggle('open');
});
const closeButton = document.querySelector('.close-button');
closeButton.addEventListener('click', () => {
    const wrapperTableInput = document.querySelector('.wrapper-table-input');
    const blur = document.querySelector('.input-state');
    wrapperTableInput.classList.toggle('open');
    blur.classList.toggle('open');
});
const okButton = document.querySelector('.ok-table-input');
okButton.addEventListener('click', () => {
    const wrapperTableInput = document.querySelector('.wrapper-table-input');
    const blur = document.querySelector('.input-state');
    wrapperTableInput.classList.toggle('open');
    blur.classList.toggle('open');
    updateBoardGameFromTableInput();
});


let size_board_game;

export function init() {
    updateBoardGame();
    updateBoardGoal();
    updateTableInputState();
}

function updateBoardGame() {
    size_board_game = board_game.getSizeBoard();
    const board_game_play = document.querySelector('.board-play');
    removeAllChildren(board_game_play);
    board_game_play.setAttribute('style', 'grid-template-columns: repeat(' + size_board_game.columns_size + ', 1fr);');

    for (let i = 0; i < size_board_game.rows_size; i++) {
        for (let j = 0; j < size_board_game.columns_size; j++) {
            const newCell = document.createElement('div');
            newCell.classList.add('cell');
            newCell.setAttribute('row', i);
            newCell.setAttribute('column', j);
            newCell.addEventListener('click', cellClick);

            if (!isBlankCell(board_game.getCurrentValueAtCell(i, j))) {
                newCell.innerHTML = board_game.getCurrentValueAtCell(i, j);
            }
            else {
                newCell.innerHTML = "";
                newCell.classList.add('blank');
            }

            board_game_play.appendChild(newCell);
        }
    }
}

function updateBoardGoal() {
    size_board_game = board_game.getSizeBoard();
    const board_game_goal = document.querySelector('.board-goal');
    removeAllChildren(board_game_goal);
    board_game_goal.setAttribute('style', 'grid-template-columns: repeat(' + size_board_game.columns_size + ', 1fr);');

    for (let i = 0; i < size_board_game.rows_size; i++) {
        for (let j = 0; j < size_board_game.columns_size; j++) {
            const newCell = document.createElement('div');
            newCell.classList.add('cell-goal');
            newCell.setAttribute('row', i);
            newCell.setAttribute('column', j);

            if (!isBlankCell(board_game.getGoalValueAtCell(i, j))) {
                newCell.innerHTML = board_game.getGoalValueAtCell(i, j);
            }
            else {
                newCell.innerHTML = "";
                newCell.classList.add('blank');
            }

            board_game_goal.appendChild(newCell);
        }
    }
}

function updateTableInputState() {
    size_board_game = board_game.getSizeBoard();
    const input_state_body = document.querySelector('.input-state-body');
    removeAllChildren(input_state_body);
    input_state_body.setAttribute('style', 'grid-template-columns: repeat(' + size_board_game.columns_size + ', 1fr);');

    for (let i = 0; i < size_board_game.rows_size; i++) {
        for (let j = 0; j < size_board_game.columns_size; j++) {
            const newCellInput = document.createElement('input');
            newCellInput.classList.add('form-control');
            newCellInput.classList.add('form-control-sm');
            newCellInput.classList.add('text-center');
            newCellInput.classList.add('cell-input');

            newCellInput.setAttribute('type', 'text');
            newCellInput.setAttribute('aria-label', '.form-control-sm example');
            newCellInput.setAttribute('style', 'background-color: transparent');

            newCellInput.setAttribute('row', i);
            newCellInput.setAttribute('column', j);
            newCellInput.addEventListener('change', checkValidationTableInput);
            input_state_body.appendChild(newCellInput);
        }
    }
}

function updateBoardGameFromTableInput() {
    const input_state = document.querySelectorAll('.cell-input');
    input_state.forEach(cell => {
        let row = parseInt(cell.getAttribute('row')), col = parseInt(cell.getAttribute('column'));
        board_game.setCurrentValueAtCell(row, col, parseInt(cell.value));
    })
    updateBoardGame();
}

function showMessageError(error_name) {
    const input_error_alert = document.querySelector('.input-error-alert');
    input_error_alert.innerHTML = error_name;
}

function isContinousArray(array) {
    let temp_array = array.map(ele => parseInt(ele));
    temp_array.sort();
    for (let i = 0; i < temp_array.length; i++)
        if (temp_array[i] !== i)
            return false;
    return true;
}

function checkValidationTableInput() {
    const cellsInput = document.querySelectorAll('.cell-input');
    let input_state = [];
    cellsInput.forEach(cell => input_state.push(cell.value));

    let error_name = "";
    for (let index = 0; index < input_state.length; index++) {
        const value = input_state[index];
        if (value === "") {
            error_name = CONST.VALUE_IS_NOT_FILLED;
            break;
        }

        if (!isNumber(value)) {
            error_name = CONST.VALUE_IS_NOT_A_NUMBER;
            break;
        }
    }

    if (error_name === "") {
        if (!isContinousArray(input_state)) {
            error_name = CONST.INPUT_IS_NOT_VALID;
        }
    }

    showMessageError(error_name);

    const okButton = document.querySelector('.ok-table-input');
    if (error_name === "") {
        okButton.classList.remove('disabled');
    }
    else {
        okButton.classList.add('disabled');
    }
}

function removeAllChildren(node) {
    while (node.firstChild) {
        node.removeChild(node.lastChild);
    }
}

function isNumber(n) {
    return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
}

function isBlankCell(value) {
    return value === CONST.BLANK_CELL;
}

function isFail(value) {
    return value === CONST.FAIL;
}

function moveCell(row, col, direct) {
    board_game.setCurrentValueAtCell(row + CONST.DELTA_ROW[direct], col + CONST.DELTA_COLUMN[direct], board_game.getCurrentValueAtCell(row, col));
    board_game.setCurrentValueAtCell(row, col, 0);
    updateBoardGame();
}

function isAdjacencyBlankCell(row, col) {
    for (let direct = 0; direct < 4; direct++) {
        if (row + CONST.DELTA_ROW[direct] < size_board_game.rows_size && row + CONST.DELTA_ROW[direct] >= 0 &&
            col + CONST.DELTA_COLUMN[direct] < size_board_game.columns_size && col + CONST.DELTA_COLUMN[direct] >= 0 &&
            isBlankCell(board_game.getCurrentValueAtCell(row + CONST.DELTA_ROW[direct], col + CONST.DELTA_COLUMN[direct])))
            return direct;
    }
    return -1;
}

function cellClick() {
    const row = parseInt(this.getAttribute('row')), col = parseInt(this.getAttribute('column'));
    const direct = isAdjacencyBlankCell(row, col);
    if (!isFail(direct)) {
        moveCell(row, col, direct);
    }
}

function createRandomStateEvent() {
    board_game.createRandomState();
    updateBoardGame();
}

function updateSizeBoardGameEvent() {
    updateSizeBoardGame();
    updateBoardGame();
    updateBoardGoal();
    updateTableInputState();
    showMessageError("");
    const okButton = document.querySelector('.ok-table-input');
    okButton.classList.add('disabled');
}

function keyboardEvent(event) {
    switch (event.key) {
        case 'r': case 'R':
            createRandomStateEvent();
            break;
        
        case 'i': case 'I':
            table_input_state.click();
            break;
    }
}



























// document.onkeydown = function(e) {
//     switch (e.which) {
//         case 37:
//             console.log('left');
//             break;

//         case 38: // up
//             console.log('up');
//             break;

//         case 39: // right
//             console.log('right');
//             break;

//         case 40: // down
//             console.log('down');
//             break;

//         default: return; // exit this handler for other keys
//     }
//     e.preventDefault(); // prevent the default action (scroll / move caret)

//     console.log(e.which);
// };