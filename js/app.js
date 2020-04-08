let scorePoints = document.getElementById("score-live")
let gameOver = document.getElementById("game-over")
let gameOverScore = document.getElementById("score-game-over")
let reloadGame = document.getElementById("reload-game")
let levelText = document.querySelector('#level > span')

const doctorYai = {
    ctx: undefined,
    canvasDom: undefined,
    size: {
        w: undefined,
        h: undefined,
    },
    speed: 700,
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
    level: 1,

    init() {
        this.canvasDom = document.getElementById("my-tetris")
        this.ctx = this.canvasDom.getContext("2d")
        this.setDimensions()
        this.start()
    },

    start() {
        this.getBkg()
        this.getPiece()
        this.setEventlisteners()
        levelText.style.color = '#00CC76'
        levelText.innerHTML = this.level
        this.interval = setInterval(() => {
            this.clearScreen()
            this.drawAll()
            this.movePiece(this.piece, this.piece.direction)
            this.checkSibling()
            this.checkGameOver()
            // console.log(this.boardDrawed.board[4][13])
            this.levelUp()
            // this.timeLimit(300000)
        }, this.speed)
    },

    setDimensions() {
        this.size.w = 500
        this.size.h = 700
        this.canvasDom.setAttribute("width", this.size.w)
        this.canvasDom.setAttribute("height", this.size.h)
    },

    setEventlisteners() {
        document.onkeydown = (e) => {
            e.keyCode === this.key.RIGHT ? (this.piece.direction = "right") : null
            e.keyCode === this.key.LEFT ? (this.piece.direction = "left") : null
            e.keyCode === this.key.DOWN ? this.movePiece(this.piece, "down") : null
        }
    },

    clearScreen() {
        this.ctx.clearRect(0, 0, this.size.w, this.size.h)
    },

    drawAll() {
        this.boardDrawed.draw()
        this.piece.draw()
        this.blockedPieces.forEach((pc) => pc.draw())
    },

    //Revisar time limit, porque salta nada más empezar
    timeLimit(time) {
        setTimeout(this.gameOver(), time)
    },

    setScore(points) {
        this.score += points
        scorePoints.innerHTML = this.score

    },

    //revisar los levelUPS
    //como hacerlo genérico, que cada X puntos suba un nivel, aumente la velocidad
    levelUp() {
        if (this.score >= 500) {
            this.clearScreen()
            this.drawAll()
            this.speed = this.speed - 100
            levelText.innerHTML = 2

        }
        if (this.score >= 1000) {
            this.clearScreen()
            this.drawAll()
            this.speed = this.speed - 100
            levelText.innerHTML = 3

        }
        if (this.score >= 2000) {
            this.clearScreen()
            this.drawAll()
            this.speed = this.speed - 100
            levelText.innerHTML = 4

        }
    },

    reLoad() {
        document.location.reload()
    },

    gameOver() {
        gameOver.style.display = "flex"
        gameOverScore.innerHTML = this.score
        window.clearInterval(this.interval)

        reloadGame.onclick = () => {
            this.reLoad()
        }
    },

    checkGameOver() {
        this.blockedPieces.some((pc) => pc.posY < 0) && this.gameOver()
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
                if (piece.posY >= checkArray[i].length - 1 || piece.posX <= 0 || piece.posX >= checkArray.length - 1) {
                    return true

                }
            }
        }
        return false
    },

    piecesCollision(item1, item2) {
        return (
            item1.posX < item2.posX + 1 &&
            item1.posX + 1 > item2.posX &&
            item1.posY < item2.posY + 1 &&
            item1.posY + 1 > item2.posY

        )
    },

    checkSibling() {
        let target = this.blockedPieces[this.blockedPieces.length - 1]
        //Reviso las posiciones ocupadas alrededor de la última pieza bloqueada. Si coinciden en color, las elimino
        this.blockedPieces.forEach((pc, index) => {
            if (target.posY === pc.posY && target.posX === pc.posX + 1) {
                if (target.color === pc.color) {
                    console.log("igual en misma Y, por la derecha")
                    this.blockedPieces.pop()
                    this.blockedPieces.splice(index, 1)
                    //si vacío el tablero, se suman 350 puntos, si solo emparejo, 100
                    this.blockedPieces.length === 0 ? this.setScore(350) : this.setScore(100)

                    // this.goingDown()
                }
            } else if (target.posY === pc.posY && target.posX === pc.posX - 1) {
                if (target.color === pc.color) {
                    console.log("igual en misma Y, por la izquierda")
                    this.blockedPieces.pop()
                    this.blockedPieces.splice(index, 1)
                    this.blockedPieces.length === 0 ? this.setScore(350) : this.setScore(100)

                }
            } else if (target.posY === pc.posY - 1 && target.posX === pc.posX) {
                if (target.color === pc.color) {
                    console.log("igual en misma X")
                    this.blockedPieces.pop()
                    this.blockedPieces.splice(index, 1)
                    this.blockedPieces.length === 0 ? this.setScore(350) : this.setScore(100)

                }
            }
        })
        return false
    },

    goingDown() {
        this.blockedPieces.some((pc) => {
            if (pc.posY + 1 === this.boardDrawed.board.empty) {
                pc.posY++

            }
        })
    },

    changeBoard(piece) {
        let checkArray = this.boardDrawed.board

        if (piece.isBlocked) {
            for (let i = 0; i < checkArray.length; i++) {
                for (let k = 0; k < checkArray[i].length; k++) {
                    checkArray[i][k] = piece.color

                }
            }
        }
    },

    movePiece(piece, dir) {
        let checkBoardRows = this.boardDrawed.rows
        let checkBoardColumns = this.boardDrawed.columns

        switch (dir) {
            case "left":
                //recupero su dirección down, porque deja de funcionar las normas de down
                piece.direction = "down"
                //Reviso si choca con otras piezas, y si choca, se apila
                if (this.blockedPieces.some((pc) => pc.posX === piece.posX - 1 && pc.posY === piece.posY)) {
                    piece.posX = piece.posX
                //Reviso si choca con los límites del array
                } else if (piece.posX <= 0) {
                    piece.posX = 0
                //movimiento hacia la izquierda
                } else {
                    piece.posX--

                }
                break
            case "right":
                piece.direction = "down"
                if (this.blockedPieces.some((pc) => pc.posX === piece.posX + 1 && pc.posY === piece.posY)) {
                    piece.posX = piece.posX

                } else if (piece.posX >= checkBoardColumns - 1) {
                    piece.posX = 9

                } else {
                    piece.posX++

                }
                break
            default:
                piece.direction = "down"
                if (this.blockedPieces.some((pc) => pc.posX === piece.posX && pc.posY === piece.posY + 1) || piece.posY >= checkBoardRows - 1) {
                    //si se apila o llega al fondo del tablero, la pieza pasa a formar parte del array de blockedPieces
                    piece.isBlocked = true
                    this.blockedPieces.push(piece)
                    //una vez la pieza anterior está bloqueada, se lanza una nueva
                    this.getPiece()

                } else {
                    piece.posY++

                }
                break
        }
    },
}