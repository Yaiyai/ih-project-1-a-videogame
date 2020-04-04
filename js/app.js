const doctorYai = {
    canvas: undefined,
    ctx: undefined,
    size: {
        w: undefined,
        h: undefined
    },
    canvasDom: undefined,
    fps: 24,
    key: {
        SPACE: 32,
        LEFT: 37,
        RIGHT: 39,
        DOWN: 40,
    },
    pieces: [],

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
        setInterval(() => {
            this.clearScreen()
            this.drawBackground()
        }, 1000 / this.fps)
    },
    clearScreen() {
        this.ctx.clearRect(0, 0, this.size.w, this.size.h)
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


}