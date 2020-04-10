class Pieces {
    constructor(ctx) {
        this.ctx = ctx
        this.unit = 50 // unidad a partir de la cual se renderiza la cuadrícula. Un cuadrado de lado 50.
        this.color = this.setColor()
        this.posX = Math.floor(Math.random() * 10)
        this.posY = -1
        this.direction = 'down'
        this.isBlocked = false

    }
    setColor() {
        let colours = ['#00CC76', '#B4D2D7', '#0B799D', '#F9C46B', 'pink', '#44C3FD']
        return colours[Math.floor(Math.random() * colours.length)]
    }
    drawUnit(x, y) {
        //Posicion x e y dentro del tablero
        this.ctx.fillStyle = this.color
        this.ctx.fillRect(x * this.unit, y * this.unit, this.unit, this.unit)

        this.ctx.strokeStyle = '#07485E'
        this.ctx.lineWidth = 1

        this.ctx.strokeRect(x * this.unit, y * this.unit, this.unit, this.unit)
    }

    draw() {
        this.drawUnit(this.posX, this.posY)
    }

    move(dir) {
        !this.isBlocked && this.posY++

        if (dir === 'down') {
            !this.isBlocked && this.posY++
        }

    }
}
