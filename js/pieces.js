class Pieces {
    constructor(ctx) {
        this.ctx = ctx
        this.unit = 50 // unidad a partir de la cual se renderiza la cuadrícula. Un cuadrado de lado 50.
        this.empty = "white" // color de la unidad vacía
        this.columns = 10 //valores que pueden variar. Columnas y filas.
        this.rows = 14
        this.color = this.setColor()
        // this.minPiece = [
        //     [0, 0, 0],
        //     [0, 1, 0],
        //     [0, 0, 0]
        // ]
        this.minPiece = [
            [1]
        ]
        this.activePiece = this.minPiece
        this.posX = 0
        this.posY = 0
    }
    setColor() {
        let colours = ['#00CC76', '#B4D2D7', '#B4D2D7']
        return colours[Math.floor(Math.random() * colours.length)]
    }
    drawUnit(x, y) {
        this.ctx.fillStyle = this.color
        this.ctx.fillRect(x * this.unit, y * this.unit, this.unit, this.unit)

        this.ctx.strokeStyle = '#07485E? '
        this.ctx.strokeRect(x * this.unit, y * this.unit, this.unit, this.unit)
    }

    draw() {
        for (let i = 0; i < this.activePiece.length; i++) {
            for (let k = 0; k < this.activePiece.length; k++) {
                //Si el elemento no está vacío, dibuja una unidad.
                if (this.activePiece[i][k]) {
                    //La posición inicial + el número de la columna o fila
                    this.drawUnit(this.posX + i, this.posY + k, this.color)
                }
            }
        }
        this.move()
    }

    move(dir) {
        //Llamada a las keys
        dir === 'left' ? this.posX-- : null
        dir === 'right' ? this.posX++ : null
        dir === 'down' ? this.posY++ : null

        this.posY++

        //Límites del tablero
        if (this.posY >= this.rows - 1) {
            this.posY = this.rows - 1
        }
        if (this.posX >= this.columns - 1) {
            this.posX = this.columns - 1
        }
        if (this.posX <= 0) {
            this.posX = 0
        }


    }

}

/* colors:
almost white: #F5F6F9
light green: #A5E887
dark green: #00CC76
xlight blue: #E1EBF0
light blue: #B4D2D7
blue: #0B799D
dark blue: #07485E */