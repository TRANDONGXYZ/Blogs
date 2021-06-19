import { board_game, board_goal, updateSizeBoardGame } from "./board-game.js";
import { DELTA_ROW, DELTA_COLUMN, BLANK_CELL, FAIL } from "./const.js";


document.addEventListener("keydown", keyboardEvent);


const randomButtons = document.querySelectorAll('.randomButton');
randomButtons.forEach(randomButton => randomButton.addEventListener('click', createRandomStateEvent));
const inputs_size = document.querySelectorAll('.input-size');
inputs_size.forEach(input_size => input_size.addEventListener('change', updateSizeBoardGameEvent));
const table_input_state = document.querySelector('.table-input-state');
table_input_state.addEventListener('click', () => {
    const wrapperTableInput = document.querySelector('.wrapper-input-state');
    wrapperTableInput.classList.toggle('open');
});
const closeButton = document.querySelector('.close-button');
closeButton.addEventListener('click', () => {
    const wrapperTableInput = document.querySelector('.wrapper-input-state');
    wrapperTableInput.classList.toggle('open');
});
const okButton = document.querySelector('.ok-table-input');
okButton.addEventListener('click', () => {
    const wrapperTableInput = document.querySelector('.wrapper-input-state');
    wrapperTableInput.classList.toggle('open');
});


let size_board_game;
let start = true;

export function init() {
    size_board_game = board_game.getSizeBoard();
    const board_game_play = document.querySelector('.board-play');
    board_game_play.setAttribute('style', 'grid-template-columns: repeat(' + size_board_game.columns_size + ', 1fr);');

    for (let i = 0; i < size_board_game.rows_size; i++) {
        for (let j = 0; j < size_board_game.columns_size; j++) {
            const newCell = document.createElement('div');
            newCell.classList.add('cell');
            newCell.setAttribute('row', i);
            newCell.setAttribute('column', j);
            newCell.addEventListener('click', cellClick);

            if (!isBlankCell(board_game.getValueAtCell(i, j))) {
                // console.log(board_game.getValueAtCell(i, j));
                newCell.innerHTML = board_game.getValueAtCell(i, j);
            }
            else {
                newCell.innerHTML = "";
                newCell.classList.add('blank');
            }

            board_game_play.appendChild(newCell);
        }
    }

    if (start) {
        updateBoardGoal();

        const input_state_body = document.querySelector('.input-state-body');
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
                newCellInput.addEventListener('change', updateBoardGameFromTableInput);
                input_state_body.appendChild(newCellInput);
            }
        }

        start = false;
    }
}

function updateBoardGoal() {
    const board_game_goal = document.querySelector('.board-goal');
    removeAllChildren(board_game_goal);
    board_game_goal.setAttribute('style', 'grid-template-columns: repeat(' + size_board_game.columns_size + ', 1fr);');

    board_goal.createInitState();
    for (let i = 0; i < size_board_game.rows_size; i++) {
        for (let j = 0; j < size_board_game.columns_size; j++) {
            const newCell = document.createElement('div');
            newCell.classList.add('cell-goal');
            newCell.setAttribute('row', i);
            newCell.setAttribute('column', j);

            if (!isBlankCell(board_game.getValueAtCell(i, j))) {
                // console.log(board_game.getValueAtCell(i, j));
                newCell.innerHTML = board_game.getValueAtCell(i, j);
            }
            else {
                newCell.innerHTML = "";
                newCell.classList.add('blank');
            }

            board_game_goal.appendChild(newCell);
        }
    }
}

function removeAllChildren(node) {
    while (node.firstChild) {
        node.removeChild(node.lastChild);
    }
}

function updateBoardGameFromTableInput() {
    const input_state = document.querySelectorAll('.cell-input');
    input_state.forEach(cell => {
        // console.log(cell.value);
        let row = parseInt(cell.getAttribute('row')), col = parseInt(cell.getAttribute('column'));
        console.log(row, col);
        board_game.setValueAtCell(row, col, parseInt(cell.value));
    })
    updateBoardGame();
}

function updateBoardGame() {
    const board_game_play = document.querySelector('.board-play');
    removeAllChildren(board_game_play);
    init();
}

function isBlankCell(value) {
    return value === BLANK_CELL;
}

function isFail(value) {
    return value === FAIL;
}

function moveCell(row, col, direct) {
    board_game.setValueAtCell(row + DELTA_ROW[direct], col + DELTA_COLUMN[direct], board_game.getValueAtCell(row, col));
    board_game.setValueAtCell(row, col, 0);
    updateBoardGame();
}

function isAdjacencyBlankCell(row, col) {
    for (let direct = 0; direct < 4; direct++) {
        if (row + DELTA_ROW[direct] < size_board_game.rows_size && row + DELTA_ROW[direct] >= 0 &&
            col + DELTA_COLUMN[direct] < size_board_game.columns_size && col + DELTA_COLUMN[direct] >= 0 &&
            isBlankCell(board_game.getValueAtCell(row + DELTA_ROW[direct], col + DELTA_COLUMN[direct])))
            return direct;
    }
    return -1;
}

function cellClick() {
    const row = parseInt(this.getAttribute('row')), col = parseInt(this.getAttribute('column'));
    const direct = isAdjacencyBlankCell(row, col);
    if (!isFail(direct)) {
        console.log(1);
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
}

function keyboardEvent(event) {
    switch(event.key) {
        case 'r': case 'R':
            createRandomStateEvent();
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