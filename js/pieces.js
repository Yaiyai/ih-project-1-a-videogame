class Pieces {
    constructor(ctx) {
        this.ctx = ctx
        this.unit = 50 // unidad a partir de la cual se renderiza la cuadrícula. Un cuadrado de lado 50.
        this.empty = 'white' // color de la unidad vacía
        this.color = this.setColor()
        this.initPiece = [
            [1]
        ]
        this.posX = 4
        this.posY = -1
        this.direction = 'down'
        this.isBlocked = false

    }
    setColor() {
        let colours = ['#00CC76', '#B4D2D7', '#0B799D', 'red', 'pink', 'blue']
        return colours[Math.floor(Math.random() * colours.length)]
    }
    drawUnit(x, y) {
        this.ctx.fillStyle = this.color
        this.ctx.fillRect(x * this.unit, y * this.unit, this.unit, this.unit)

        this.ctx.strokeStyle = '#07485E'
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

    }

    move(dir) {
        !this.isBlocked && this.posY++

        if (dir === 'down') {
            !this.isBlocked && this.posY++
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