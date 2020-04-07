let scorePoints = document.getElementById('score-live')
let gameOver = document.getElementById('game-over')
let gameOverScore = document.getElementById('score-game-over')
let reloadGame = document.getElementById('reload-game')

const doctorYai = {
    ctx: undefined,
    canvasDom: undefined,
    size: {
        w: undefined,
        h: undefined
    },
    fps: 24,
    framesCounter: 0,
    interval: undefined,
    key: {
        SPACE: 32,
        LEFT: 37,
        RIGHT: 39,
        DOWN: 40,
    },
    piece: undefined,
    blockedPieces: [],
    boardDrawed: [],
    score: 0,

    init() {
        this.canvasDom = document.getElementById('my-tetris')
        this.ctx = this.canvasDom.getContext('2d')
        this.setDimensions()
        this.start()
    },
    start() {
        this.getBkg()
        this.getPiece()
        this.setEventlisteners()

        this.interval = setInterval(() => {
            this.clearScreen()
            if (this.piece.isBlocked) {
                this.blockedPieces.push(this.piece)
                this.piece = new Pieces()
            }
            this.drawAll()
            checkCollisions(piece)
        }, 1000)
    },
    setDimensions() {
        this.size.w = 500
        this.size.h = 700
        this.canvasDom.setAttribute('width', this.size.w)
        this.canvasDom.setAttribute('height', this.size.h)
    },
    setEventlisteners() {
        document.onkeyup = (e => {
            // e.keyCode === this.key.RIGHT ? this.checkpice('right') : null
            e.keyCode === this.key.RIGHT ? this.piece.move('right') : null
            e.keyCode === this.key.LEFT ? this.piece.move('left') : null
            e.keyCode === this.key.DOWN ? this.piece.move('down') : null
        })
    },
    checkPiece(dir) { 
                //switch dir:  prgunto is collision de esta dir, si hay colision, this.state: blocked
                //can move
                //is bloqued
    },
    
    clearScreen() {
        this.ctx.clearRect(0, 0, this.size.w, this.size.h)
    },
    getBkg() {
        this.boardDrawed = new BoardBackground(this.ctx)
    },
    getPiece() {
        this.piece = new Pieces(this.ctx)
    },
    drawAll() {
        this.boardDrawed.draw()
        this.piece.draw()
        this.blockedPieces.forEach(pieza pieza.draw())
    },
    setScore() {
        this.score += 100
        scorePoints.innerHTML = this.score
    },
    gameOver(score) {
        gameOver.style.display = 'flex'
        gameOverScore.innerHTML = score
        reloadGame.onclick(document.location.reload())
        window.clearInterval(this.interval)
    }
}