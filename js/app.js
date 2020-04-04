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
        this.drawAll()
        this.setEventListeners()

        this.interval = setInterval(() => {
            this.clearScreen()

            this.framesCounter++
            this.framesCounter % 1000 ? this.drawPieces() : null
            this.drawBackground()
            this.piece.forEach(pcs => {
                pcs.draw()
            })


        }, 2000)


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
    drawAll() {
        this.drawBackground()
    },
    drawBackground() {
        this.ctx.fillStyle = '#E1EBF0'
        this.ctx.fillRect(0, 0, this.size.w, this.size.h)
        this.ctx.strokeStyle = '#B4D2D7'
        this.ctx.lineWidth = 10
        this.ctx.strokeRect(0, 0, this.size.w, this.size.h)
    },
    drawPieces() {
        this.piece.push(new Pieces(this.ctx))
    },

    isStoped() {

    }


}