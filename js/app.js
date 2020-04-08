let scorePoints = document.getElementById("score-live")
let levelText = document.querySelector('#level > span')

let gameOver = document.getElementById("game-over")
let gameOverScore = document.getElementById("score-game-over")
let reloadGame = document.getElementById("reload-game")
let levelGameOver = document.querySelector('#level-game-over > span')

let newLevel = document.getElementById('new-level')
let levelScore = document.querySelector('#level > span')
let nextLevel = document.getElementById('next-level')


const doctorYai = {
    ctx: undefined,
    canvasDom: undefined,
    size: {
        w: undefined,
        h: undefined,
    },
    speed: 300,
    frameCounter: 300,
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

        this.interval = setInterval(() => {
            levelText.innerHTML = this.level
            this.frameCounter--
            this.clearScreen()
            this.drawAll()
            this.movePiece(this.piece, this.piece.direction)
            this.checkSibling()
            this.goingDown()
            this.moreLevel()
            this.frameCounter === 0 && this.gameOver()
            this.checkGameOver()

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

    //Métodos de puntuación y nivel
    setScore(points) {
        this.score += points
        scorePoints.innerHTML = this.score
    },

    moreLevel() {
        if (this.score == 1000) {
            this.levelUp(1)
        }
    },

    levelUp(level) {
        newLevel.style.display = "flex"
        levelScore.innerHTML = this.level + level

        nextLevel.onclick = () => {
            this.start()
            newLevel.style.display = "none"
            this.score = 0
            this.level = this.level + level
            this.blockedPieces = []
            scorePoints.innerHTML = this.score
            levelText.innerHTML = this.level + level
        }
    },

    //Metodos del game over
    reLoad() {
        document.location.reload()
    },

    gameOver() {
        gameOver.style.display = "flex"
        gameOverScore.innerHTML = this.score
        levelGameOver.innerHTML = this.level
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
                    //si se apila o llega al fondo del tablero, la pieza pasa a formar parte del array de blockedPieces.
                    piece.isBlocked = true
                    this.blockedPieces.push(piece)
                    //una vez la pieza anterior está bloqueada, se lanza una nueva.
                    this.getPiece()

                } else {
                    piece.posY++

                }
                break
        }
    },

    checkSibling() {
        let target = this.blockedPieces[this.blockedPieces.length - 1]
        //Reviso las posiciones ocupadas alrededor de la última pieza bloqueada. Si coinciden en color, las elimino
        this.blockedPieces.forEach((pc, index) => {

            if (target.posY === pc.posY && target.posX === pc.posX + 1 || target.posY === pc.posY && target.posX === pc.posX - 1 || target.posY === pc.posY - 1 && target.posX === pc.posX) {
                if (target.color === pc.color) {
                    //Solo se eliminan dos a dos estos colores.
                    if (pc.color === 'pink' || pc.color === '#44C3FD' || pc.color === '#F9C46B') {
                        //Ultima pieza añadida fuera.
                        this.blockedPieces.pop()
                        //Pieza valorada fuera.
                        this.blockedPieces.splice(index, 1)
                        //si vacío el tablero, se suman 350 puntos, si solo emparejo, 100.
                        this.blockedPieces.length === 0 ? this.setScore(350) : this.setScore(100)
                    }
                }
            }

            this.blockedPieces.forEach((pc2, index2) => {
                if (target.posY === pc.posY && target.posY === pc2.posY && target.posX === pc.posX + 1 && target.posX === pc2.posX + 2) {
                    if (target.color === pc.color && target.color === pc2.color) {
                        if (pc.color === '#00CC76' || pc.color === '#B4D2D7' || pc.color === '#0B799D') {
                            this.blockedPieces.pop()
                            this.blockedPieces.splice(index, 1)
                            this.blockedPieces.splice(index2, 1)
                            this.blockedPieces.length === 0 ? this.setScore(450) : this.setScore(200)

                        }
                    }
                }

                if (target.posY === pc.posY && target.posY === pc2.posY && target.posX === pc.posX - 1 && target.posX === pc2.posX - 2) {
                    if (target.color === pc.color && target.color === pc2.color) {
                        if (pc.color === '#00CC76' || pc.color === '#B4D2D7' || pc.color === '#0B799D') {
                            this.blockedPieces.pop()
                            this.blockedPieces.splice(index, 1)
                            this.blockedPieces.splice(index2, 1)
                            this.blockedPieces.length === 0 ? this.setScore(450) : this.setScore(200)

                        }
                    }
                }

                if (target.posY === pc.posY && target.posY === pc2.posY && target.posX === pc.posX - 1 && target.posX === pc2.posX + 1) {
                    if (target.color === pc.color && target.color === pc2.color) {
                        if (pc.color === '#00CC76' || pc.color === '#B4D2D7' || pc.color === '#0B799D') {
                            this.blockedPieces.pop()
                            this.blockedPieces.splice(index, 1)
                            this.blockedPieces.splice(index2, 1)
                            this.blockedPieces.length === 0 ? this.setScore(450) : this.setScore(200)

                        }
                    }
                }

                if (target.posX === pc.posX && target.posX === pc2.posX && target.posY === pc.posY - 1 && target.posY === pc2.posY - 2) {
                    if (target.color === pc.color && target.color === pc2.color) {
                        if (pc.color === '#00CC76' || pc.color === '#B4D2D7' || pc.color === '#0B799D') {
                            this.blockedPieces.pop()
                            this.blockedPieces.splice(index, 1)
                            this.blockedPieces.splice(index2, 1)
                            this.blockedPieces.length === 0 ? this.setScore(450) : this.setScore(200)

                        }
                    }
                }
            }) //Segundo for each



        }) //Primer for each
    },

    goingDown() {
        //Busco primero aquellas piezas que están bloqueadas por el eje inferior. Esas no van a descender más.
        let availablePieces = this.blockedPieces.filter(pc => pc.posY !== 13)
        //Dentro de las piezas que si pueden descender, busco aquellas que tengan un espacio debajo.
        availablePieces.forEach(pc => {
            if (!this.blockedPieces.some(piece => piece.posY === pc.posY + 1 && piece.posX === pc.posX)) {
                pc.posY++
            }
        })
    },
}