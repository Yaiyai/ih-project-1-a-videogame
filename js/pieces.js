class Pieces {
    constructor(ctx, posX, posY, width, height, color) {
        this.ctx = ctx
        this.posX = posX
        this.posY = posY
        this.width = width
        this.height = height
        this.color = color
        this.speed = 100
    }
    draw() {
        this.ctx.fillRect(this.ctx, this.posX, this.posY, this.width, this.height, this.color)
        this.move()
    }
    move(dir) {
        dir === 'left' ? this.posX -= this.vel : null
        dir === 'right' ? this.posX += this.vel : null
        dir === 'down' ? this.posY += this.vel : null


    }
}