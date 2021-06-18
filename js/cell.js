export class Cell {
    constructor(row, col, value, blank = false) {
        this.row = row;
        this.col = col;
        this.value = value;
        this.blank = blank;
    }
}