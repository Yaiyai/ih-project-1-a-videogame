class Pieces {
    constructor(ctx) {
        this.ctx = ctx
        this.posX = Math.floor(Math.random() * 10) * 50
        this.posY = 0
        this.width = 50
        this.height = 50
        this.color = this.setColor()
        this.speed = 50
    }
    setColor() {
        let colours = ['#00CC76', '#B4D2D7', '#0B799D']
        return colours[Math.floor(Math.random() * colours.length)]
    }
    draw() {
        this.ctx.fillStyle = this.color
        this.ctx.fillRect(this.posX, this.posY, this.width, this.height)
        this.move()
    }
    move(dir) {
        this.posY += this.speed
        dir === 'left' ? this.posX -= this.speed : null
        dir === 'right' ? this.posX += this.speed : null
        dir === 'down' ? this.posY += this.speed : null

        //Border limits
        if (this.posY >= 650) {
            this.posY = 650
        }
        if (this.posX <= 0) {
            this.posX = 0
        }
        if (this.posX >= 650) {
            this.posY = 650
        }
    }
    autoCollision() {
        return 
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