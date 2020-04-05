class Pieces {
    constructor(ctx) {
        this.ctx = ctx
        this.unit = 50 // unidad a partir de la cual se renderiza la cuadrícula. Un cuadrado de lado 50.
        this.empty = "white" // color de la unidad vacía
        this.columns = 10 //valores que pueden variar. Columnas y filas.
        this.rows = 14
        this.color = this.setColor()
        this.initPiece = [
            [1]
        ]
        this.posX = 4
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
        for (let i = 0; i < this.initPiece.length; i++) {
            for (let k = 0; k < this.initPiece.length; k++) {
                //Si el elemento no está vacío, dibuja una unidad.
                if (this.initPiece[i][k]) {
                    //La posición inicial + el número de la columna o fila
                    this.drawUnit(this.posX + i, this.posY + k, this.color)
                }
            }
        }
        this.move()
    }

    down() {
        this.posY++
        // if (!this.colision) {
        //     this.posY++
        // } else {
        //     //la pieza se para
        //     //el juego suelta otra pieza
        // }

    }
    right() {

        // if (!this.colision) {
        //     this.posX++
        // } else {
        //     //la pieza se para
        //     //el juego suelta otra pieza
        // }

    }

    left() {

        // if (!this.colision) {
        //     this.posX--
        // } else {
        //     //la pieza se para
        //     //el juego suelta otra pieza
        // }
    }

    move(dir) {
        dir === 'down' ? this.posY++ : null
        dir === 'right' ? this.posX++ : null
        dir === 'left' ? this.posX-- : null

        this.down()
        this.left()
        this.right()

        //Límites del tablero, parte de las colisiones
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

    colision() {
        //Hay colision cuando pilla un borde lateral o el de abajo
        //Hay colision cuando se encuentra con una pieza quieta, entonces se queda ahi
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