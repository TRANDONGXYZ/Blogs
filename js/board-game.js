import { INIT_STATE, MAX_ROWS, MAX_COLUMNS } from './const.js';

class Board {
    constructor(rows_size = 3, columns_size = 3, input_state = INIT_STATE, goal_state = INIT_STATE) {
        this.rows_size = rows_size;
        this.columns_size = columns_size;
        this.input_state = input_state;
        this.current_state = input_state;
        this.goal_state = goal_state;
    }

    getSizeBoard() {
        return {rows_size: this.rows_size, columns_size: this.columns_size};
    }

    getValueAtCell(row = 0, col = 0) {
        return this.current_state[row][col];
    }

    setValueAtCell(row = 0, col = 0, value = 0) {
        this.current_state[row][col] = value;
    }

    createInitState() {
        let initArray = [];
        for (let i = 0; i < this.rows_size; i++) {
            for (let j = 0; j < this.columns_size; j++) {
                initArray.push(i * this.columns_size + j + 1);
            }
        }
        initArray[initArray.length - 1] = 0;

        let initState = [];
        for (let i = 0; i < this.rows_size; i++) {
            initState.push([]);
            for (let j = 0; j < this.columns_size; j++) {
                initState[i].push(initArray[i * this.columns_size + j]);
            }
        }

        this.current_state = initState;
    }

    createRandomState() {
        let randomArray = [];
        for (let i = 0; i < this.rows_size; i++) {
            for (let j = 0; j < this.columns_size; j++) {
                randomArray.push(i * this.columns_size + j);
            }
        }
        this.shuffleArray(randomArray);
        
        let randomState = [];
        for (let i = 0; i < this.rows_size; i++) {
            randomState.push([]);
            for (let j = 0; j < this.columns_size; j++) {
                randomState[i].push(randomArray[i * this.columns_size + j]);
            }
        }

        this.input_state = randomState;
        this.current_state = randomState;
        // console.log(randomState);
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
}

function getSizeBoardFromInput() {
    const input_rows_size = document.querySelector('#input-size-rows');
    const input_columns_size = document.querySelector('#input-size-columns');
    let row = parseInt(input_rows_size.value), col = parseInt(input_columns_size.value);
    if (row > MAX_ROWS) {
        row = MAX_ROWS;
        input_rows_size.value = MAX_ROWS;
    }
    if (col > MAX_COLUMNS) {
        col = MAX_COLUMNS;
        input_columns_size.value = MAX_COLUMNS;
    }
    return {rows_size: row, columns_size: col};
}


export let board_game = new Board();
export let board_goal = new Board();

export function updateSizeBoardGame() {
    let size_board_game_input = getSizeBoardFromInput();
    board_game = new Board(size_board_game_input.rows_size, size_board_game_input.columns_size);
    board_goal = new Board(size_board_game_input.rows_size, size_board_game_input.columns_size);
    board_game.createRandomState();
}

updateSizeBoardGame();