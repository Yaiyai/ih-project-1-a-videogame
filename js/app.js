const doctorYai = {
    ctx: undefined,
    size: {
        w: undefined,
        h: undefined
    },
    canvasDom: undefined,
    fps: 24,
    framesCounter: 0,
    interval: undefined,
    key: {
        SPACE: 32,
        LEFT: 37,
        RIGHT: 39,
        DOWN: 40,
    },
    piece: [],

    init() {
        this.canvasDom = document.getElementById('my-tetris')
        this.ctx = this.canvasDom.getContext('2d')
        this.setDimensions()
        this.start()
    },
    setDimensions() {
        this.size.w = 500
        this.size.h = 700
        this.canvasDom.setAttribute('width', this.size.w)
        this.canvasDom.setAttribute('height', this.size.h)
    },
    start() {
        this.reset()
        this.setEventListeners()

        this.interval = setInterval(() => {
            this.clearScreen()
            if (this.framesCounter > 5000) {
                this.framesCounter = 0
            }

            this.framesCounter++

            this.getPieces()
            this.drawBackground()

            this.piece.forEach(pcs => {
                pcs.draw()
                this.isCollision() ? console.log('hola') : null
            })

            console.log(this.piece)
        }, 1000)


    },
    clearScreen() {
        this.ctx.clearRect(0, 0, this.size.w, this.size.h)
    },
    setEventListeners() {
        document.onkeyup = e => {
            this.piece.forEach(pcs => {
                e.keyCode === 37 ? pcs.move('left') : null
                e.keyCode === 39 ? pcs.move('right') : null
                e.keyCode === 40 ? pcs.move('down') : null
            })
        }
    },
    reset() {
        this.drawBackground()
        this.getPieces()
    },
    drawBackground() {
        this.ctx.fillStyle = '#E1EBF0'
        this.ctx.fillRect(0, 0, this.size.w, this.size.h)
        this.ctx.strokeStyle = '#B4D2D7'
        this.ctx.lineWidth = 10
        this.ctx.strokeRect(0, 0, this.size.w, this.size.h)
    },

    getPieces() {
        this.piece.push(new Pieces(this.ctx))
    },

    isCollision() {
        return this.piece.some(obs => {
            return (
                this.piece.posX + this.piece.width >= obs.posX &&
                this.piece.posY + this.piece.height >= obs.posY &&
                this.piece.posX <= obs.posX + obs.width
            );
        });
    },

}