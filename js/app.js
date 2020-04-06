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
            this.drawAll()
            this.checkPiece(this.piece)
            this.collisionBetweenPieces(this.piece)
            console.log(this.blockedPieces);

        }, 700)
    },
    setDimensions() {
        this.size.w = 500
        this.size.h = 700
        this.canvasDom.setAttribute('width', this.size.w)
        this.canvasDom.setAttribute('height', this.size.h)
    },
    setEventlisteners() {
        document.onkeyup = (e => {
            e.keyCode === this.key.RIGHT ? this.checkPiece(this.piece, 'right') : null
            e.keyCode === this.key.LEFT ? this.checkPiece(this.piece, 'left') : null
            // e.keyCode === this.key.DOWN ? this.checkPiece(this.piece, 'down') : null
        })
    },
    clearScreen() {
        this.ctx.clearRect(0, 0, this.size.w, this.size.h)
    },
    drawAll() {
        this.boardDrawed.draw()
        this.piece.draw()
        this.blockedPieces.forEach(pc => pc.draw())
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
    },

    //Metodos del tablero
    getBkg() {
        this.boardDrawed = new BoardBackground(this.ctx)
    },


    //Metodos de pieces
    getPiece() {
        this.piece = new Pieces(this.ctx)
    },
    isCollision(piece) {
        let checkArray = this.boardDrawed.board

        for (let i = 0; i < checkArray.length; i++) {
            for (let k = 0; k < checkArray[i].length; k++) {
                //compruebo si choca con los limites inferior y laterales

                if (piece.posY > checkArray[i].length - 1) {
                    piece.posY = checkArray[i].length - 1
                    piece.isBlocked = true
                    this.blockedPieces.push(piece)
                    this.piece = new Pieces(this.ctx)
                }

                if (piece.posX <= 0) {
                    piece.posX = 0
                }

                if (piece.posX >= checkArray.length - 1) { // columnas
                    piece.posX = checkArray.length - 1
                }

            }
        }
        return false
    },

    collisionBetweenPieces(piece) {
        if (this.blockedPieces.some(pc => piece.posY === pc.posY && piece.posX === pc.posX)) {
            piece.posY--
            piece.isBlocked = true
            this.blockedPieces.push(piece)
            this.piece = new Pieces(this.ctx)
        }
    },

    checkPiece(piece, dir) {

        piece.move()
        if (this.isCollision(piece)) {};

        switch (dir) {
            case 'left':
                piece.posX--;
                break;

            case 'right':
                piece.posX++;
                break;
        }

    },

}