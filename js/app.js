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
            this.movePiece(this.piece, this.piece.direction)

            // this.blockedPieces.forEach(pc => {
            //     this.piecesCollision(this.piece, pc) ? console.log('choca') : null
            // })

        }, 200)
    },
    setDimensions() {
        this.size.w = 500
        this.size.h = 700
        this.canvasDom.setAttribute('width', this.size.w)
        this.canvasDom.setAttribute('height', this.size.h)
    },
    setEventlisteners() {
        document.onkeyup = (e => {
            e.keyCode === this.key.RIGHT ? this.piece.direction = "right" : null
            e.keyCode === this.key.LEFT ? this.piece.direction = "left" : null
            e.keyCode === this.key.DOWN ? this.movePiece(this.piece, 'down') : null
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
    reLoad() {
        document.location.reload()
    },
    gameOver() {
        gameOver.style.display = 'flex'
        gameOverScore.innerHTML = this.setScore()
        window.clearInterval(this.interval)

        // reloadGame.onclick(() => {
        //     this.init()
        // })
    },
    checkGameOver() {
        this.blockedPieces.some(pc => pc.posY < 0) && this.gameOver()
    },

    //Metodos del tablero
    getBkg() {
        this.boardDrawed = new BoardBackground(this.ctx)
    },

    //Metodos de pieces
    getPiece() {
        this.piece = new Pieces(this.ctx)
    },

    borderCollision(piece) {
        let checkArray = this.boardDrawed.board

        for (let i = 0; i < checkArray.length; i++) {

            for (let k = 0; k < checkArray[i].length; k++) {
                //compruebo si choca con los limites inferior y laterales

                if (piece.posY + 1 > checkArray[i].length - 1) {
                    return true
                }

                if (piece.posX - 1 < 0) {
                    return true
                }

                if (piece.posX + 1 >= checkArray.length - 1) {
                    return true
                }

            }
        }
        return false
    },

    piecesCollision(item1, item2) {
        return item1.posX < item2.posX + 1 &&
            item1.posX + 1 > item2.posX &&
            item1.posY < item2.posY + 1 &&
            item1.posY + 1 > item2.posY
    },


    movePiece(piece, dir) {
        let checkArray = this.boardDrawed.board
        console.log(piece.posX, piece.direction, piece.posY)


        switch (dir) {
            case 'left':
                piece.direction = 'down'
                if (this.blockedPieces.some(pc => pc.posX === piece.posX - 1 && pc.posY === piece.posY)) {
                    piece.posX = piece.posX
                } else if (piece.posX <= 0) {
                    piece.posX = 0
                } else {
                    piece.posX--;
                }
                break;
            case 'right':
                piece.direction = 'down'
                if (this.blockedPieces.some(pc => pc.posX === piece.posX + 1 && pc.posY === piece.posY)) {
                    piece.posX = piece.posX
                } else if (piece.posX >= 9) {
                    piece.posX = 9
                } else {
                    piece.posX++;
                }
                break;
            default:
                piece.direction = 'down'
                if (this.blockedPieces.some(pc => pc.posX === piece.posX && pc.posY === piece.posY + 1) || piece.posY >= 13) {
                    piece.isBlocked = true
                    this.blockedPieces.push(piece)
                    //checkSibling
                    this.piece = new Pieces(this.ctx)
                } else {
                    piece.posY++;
                }
                break;

        }


    },

}