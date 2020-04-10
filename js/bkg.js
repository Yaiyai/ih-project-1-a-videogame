class BoardBackground {
    constructor(ctx) {
        this.ctx = ctx
        this.unit = 50 // unidad a partir de la cual se renderiza la cuadrícula. Un cuadrado de lado unit.
        this.columns = 10 //valores que pueden variar. Columnas y filas.
        this.rows = 14
        this.empty = '#F5F6F9' // color de la unidad vacía.
        this.board = []

        for (let i = 0; i < this.columns; i++) {
            this.board[i] = [];
            for (let k = 0; k < this.rows; k++) {
                this.board[i][k] = this.empty
            }
        }
    }
    drawUnit(x, y) {
        //Posicion x e y dentro del tablero
        this.ctx.fillStyle = this.empty
        this.ctx.fillRect(x * this.unit, y * this.unit, this.unit, this.unit)

        this.ctx.strokeStyle = '#B4D2D7' // light blue
        this.ctx.lineWidth = 1

        this.ctx.strokeRect(x * this.unit, y * this.unit, this.unit, this.unit)
    }
    draw() {
        this.board.forEach((e, idx) => e.forEach((elm, i) => this.drawUnit(idx, i)))
    }

}