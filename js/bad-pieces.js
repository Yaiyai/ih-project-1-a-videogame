class Bad {
    constructor(ctx, name) {
        this.ctx = ctx
        this.unit = 50 // unidad a partir de la cual se renderiza la cuadrícula. Un cuadrado de lado 50.
        this.name = name
        this.posX = Math.floor(Math.random() * 10)
        this.posY = this.setY()
    }

    setY() {
        let y = Math.floor(Math.random() * 12)

        if (y !== 0) {
            return y
        } else {
            return y = 2
        }
    }
    drawUnit(x, y) {
        // Posicion x e y dentro del tablero
        this.ctx.fillStyle = 'white'
        this.ctx.fillRect(x * this.unit, y * this.unit, this.unit, this.unit)

        this.ctx.strokeStyle = this.name
        this.ctx.lineWidth = 5
        this.ctx.strokeRect(x * this.unit, y * this.unit, this.unit, this.unit)
    }

    draw() {
        this.drawUnit(this.posX, this.posY)
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