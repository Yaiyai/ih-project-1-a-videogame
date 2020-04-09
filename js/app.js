let scorePoints = document.querySelector("#score-live > span")
let levelText = document.querySelector('#level > span')

let timerMinutes = document.getElementById('mins')
let timerSeconds = document.getElementById('secs')

let gameOver = document.getElementById("game-over")
let gameOverScore = document.getElementById("score-game-over")
let reloadGame = document.getElementById("reload-game")
let levelGameOver = document.querySelector('#level-game-over > span')

let newLevel = document.getElementById('new-level')
let levelScore = document.querySelector('#level-new > span')
let nextLevel = document.getElementById('next-level')

let helpMe = document.getElementById('help-me')
let howTo = document.getElementById('rules')
let gotIt = document.getElementById('ok')
let rulesPop = document.getElementById('instructions')

//Music
let audioMusic = new Audio('music/drYaiMusic.mp3')
let pointsMusic = new Audio('music/points.wav')
let levelMusic = new Audio('music/level.mp3')
let gameOverMusic = new Audio('music/game-over.wav')
let playMusic = document.getElementById('play-music')
let pauseMusic = document.getElementById('pause-music')


const doctorYai = {
    ctx: undefined,
    canvasDom: undefined,
    size: {
        w: undefined,
        h: undefined,
    },
    fps: 3,
    timeLimit: 200,
    frameCounter: 0,
    interval: undefined,
    key: {
        SPACE: 32,
        LEFT: 37,
        RIGHT: 39,
        DOWN: 40,
    },
    piece: undefined,
    blockedPieces: [],
    badPieces: [],
    boardDrawed: [],
    score: 0,
    level: 1,

    init() {
        audioMusic.addEventListener('ended', function () {
            this.currentTime = 0;
            this.play();
        }, false);
        playMusic.addEventListener('click', this.playMusic)
        pauseMusic.addEventListener('click', this.pauseMusic)
        this.canvasDom = document.getElementById("my-tetris")
        this.ctx = this.canvasDom.getContext("2d")
        levelText.innerHTML = this.level
        levelText.style.color = '#00CC76'
        this.setDimensions()
        this.start()
    },

    playMusic() {
        audioMusic.play()
        audioMusic.volume = 0.2
    },
    pauseMusic() {
        audioMusic.pause()
    },

    start() {
        this.getBkg()
        this.getPiece()
        this.setEventlisteners()
        this.playMusic()

        this.interval = setInterval(() => {
            this.setTimer()
            this.frameCounter++
            this.timeLimit--
            this.timeLimit === 0 && this.gameOver()
            this.clearScreen()
            this.drawAll()
            this.movePiece(this.piece, this.piece.direction)
            this.checkSibling()
            this.goingDown()
            this.moreLevel()
            this.complications()
            this.checkGameOver()
        }, 1000 / this.fps)

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
        helpMe.onclick = () => {
            rulesPop.style.display = 'flex'
        }
    },

    clearScreen() {
        this.ctx.clearRect(0, 0, this.size.w, this.size.h)
    },

    drawAll() {
        this.boardDrawed.draw()
        this.piece.draw()
        this.blockedPieces.forEach(pc => pc.draw())
        this.badPieces.forEach(bad => bad.draw())
    },

    //Métodos de puntuación y nivel
    setScore(points) {
        pointsMusic.play()
        this.score += points
        scorePoints.innerHTML = this.score
    },

    moreLevel() {
        if (this.level === 1 && this.score >= 300) {
            this.levelUp(2, 4, 300)
        }
        if (this.level === 2 && this.score >= 700) {
            this.levelUp(3, 5, 250)
        }
        if (this.level === 3 && this.score >= 1500) {
            this.levelUp(4, 6, 300)
        }
        if (this.level === 4 && this.score >= 2500) {
            this.levelUp(5, 7, 250)
        }
        if (this.level === 5 && this.score >= 4000) {
            this.levelUp(6, 8, 250)
        }
    },

    levelUp(level, fps, timer) {
        this.pauseMusic()
        levelMusic.play()
        levelMusic.volume = 0.5

        clearInterval(this.interval)
        newLevel.style.display = "flex"
        levelScore.innerHTML = level

        nextLevel.onclick = () => {
            this.start()
            this.frameCounter = 0
            this.level = level
            levelText.innerHTML = this.level
            newLevel.style.display = "none"

            this.blockedPieces = []
            this.badPieces = []
            this.timeLimit = timer
            this.fps = fps
        }
    },

    //Metodos del game over
    gameOver() {
        gameOverMusic.play()
        gameOverMusic.volume = 0.5
        this.pauseMusic()
        clearInterval(this.interval)
        gameOver.style.display = "flex"
        gameOverScore.innerHTML = this.score
        levelGameOver.innerHTML = levelText.innerHTML

        reloadGame.onclick = () => {
            document.location.reload()
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

    getBad(color) {
        this.badPieces.push(new Bad(this.ctx, color))
    },

    movePiece(piece, dir) {
        let checkBoardRows = this.boardDrawed.rows
        let checkBoardColumns = this.boardDrawed.columns
        let badRed = this.badPieces.filter(pc => pc.name === 'red')
        let badBlack = this.badPieces.filter(pc => pc.name === 'black')
        let badPlum = this.badPieces.filter(pc => pc.name === 'plum')

        switch (dir) {
            case "left":
                //recupero su dirección down, porque deja de funcionar las normas de down
                piece.direction = "down"
                //Reviso si choca con otras piezas, y si choca, se apila
                if (this.blockedPieces.some((pc) => pc.posX === piece.posX - 1 && pc.posY === piece.posY)) {
                    piece.posX = piece.posX

                } else if (badPlum.some((pc) => pc.posX === piece.posX - 1 && pc.posY === piece.posY)) {
                    piece.posX = piece.posX

                } else if (badRed.some((pc) => pc.posX === piece.posX - 1 && pc.posY === piece.posY)) {
                    piece.posX = piece.posX
                    this.blockedPieces = []

                } else if (badBlack.some((pc) => pc.posX === piece.posX - 1 && pc.posY === piece.posY)) {
                    this.gameOver()

                } else if (piece.posX <= 0) {
                    piece.posX = 0

                } else {
                    piece.posX--

                }
                break

            case "right":
                piece.direction = "down"

                if (this.blockedPieces.some((pc) => pc.posX === piece.posX + 1 && pc.posY === piece.posY)) {
                    piece.posX = piece.posX

                } else if (badPlum.some((pc) => pc.posX === piece.posX + 1 && pc.posY === piece.posY)) {
                    piece.posX = piece.posX

                } else if (badRed.some((pc) => pc.posX === piece.posX + 1 && pc.posY === piece.posY)) {
                    piece.posX = piece.posX
                    this.blockedPieces = []

                } else if (badBlack.some((pc) => pc.posX === piece.posX + 1 && pc.posY === piece.posY)) {
                    this.gameOver()

                } else if (piece.posX >= checkBoardColumns - 1) {
                    piece.posX = 9

                } else {
                    piece.posX++
                }
                break

            default:
                piece.direction = "down"

                if (this.blockedPieces.some((pc) => pc.posX === piece.posX && pc.posY === piece.posY + 1) || piece.posY >= checkBoardRows - 1) {
                    piece.isBlocked = true
                    this.blockedPieces.push(piece)
                    this.getPiece()

                } else if (badPlum.some((pc) => pc.posX === piece.posX && pc.posY === piece.posY + 1)) {
                    this.blockedPieces.push(piece)
                    this.getPiece()

                } else if (badRed.some((pc) => pc.posX === piece.posX && pc.posY === piece.posY + 1)) {
                    this.blockedPieces = []
                    this.getPiece()

                } else if (badBlack.some((pc) => pc.posX === piece.posX && pc.posY === piece.posY + 1)) {
                    this.gameOver()

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
            const twoCollide = {
                leftCol: target.posY === pc.posY && target.posX === pc.posX - 1,
                rightCol: target.posY === pc.posY && target.posX === pc.posX + 1,
                downCol: target.posY === pc.posY - 1 && target.posX === pc.posX
            }

            for (elm in twoCollide) {
                if (twoCollide[elm] && target.color === pc.color && (pc.color === 'pink' || pc.color === '#44C3FD' || pc.color === '#F9C46B')) {
                    this.blockedPieces.splice(index, 1)
                    this.blockedPieces.pop()
                    this.blockedPieces.length === 0 ? this.setScore(150) : this.setScore(50)
                }
            }

            //Eliminación a 3 piezas del mismo color
            this.blockedPieces.forEach((pc2, index2) => {

                const threeCollide = {
                    leftCol: target.posY === pc.posY && target.posY === pc2.posY && target.posX === pc.posX + 1 && target.posX === pc2.posX + 2,
                    rightCol: target.posY === pc.posY && target.posY === pc2.posY && target.posX === pc.posX - 1 && target.posX === pc2.posX - 2,
                    centerCol: target.posY === pc.posY && target.posY === pc2.posY && target.posX === pc.posX - 1 && target.posX === pc2.posX + 1,
                    downCol: target.posX === pc.posX && target.posX === pc2.posX && target.posY === pc.posY - 1 && target.posY === pc2.posY - 2,
                    upCol: target.posX === pc.posX && target.posX === pc2.posX && target.posY === pc.posY + 1 && target.posY === pc2.posY + 2,
                    midCol: target.posX === pc.posX && target.posX === pc2.posX && target.posY === pc.posY + 1 && target.posY === pc2.posY - 1,
                }

                for (elm2 in threeCollide) {
                    if (threeCollide[elm2] && target.color === pc.color && target.color === pc2.color && (pc.color === '#00CC76' || pc.color === '#B4D2D7' || pc.color === '#0B799D')) {
                        this.blockedPieces.pop()
                        this.blockedPieces.splice(index, 1)
                        this.blockedPieces.splice(index2, 1)
                        this.blockedPieces.length === 0 ? this.setScore(200) : this.setScore(100)
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

    //timer
    getMinutes() {
        return Math.floor((this.timeLimit / this.fps) / 60)
    },
    getSeconds() {
        return Math.floor((this.timeLimit / this.fps) - this.getMinutes() * 60)
    },
    // getMinutes = () => Math.floor((this.timeLimit / this.fps) / 60),
    // getSeconds = () => Math.floor((this.timeLimit / this.fps) - this.getMinutes() * 60)

    twoDigitsNumber(num) {
        const twoDigits = num.toString()

        let sumDigits = ""

        if (twoDigits.length === 1) {
            sumDigits = "0" + twoDigits
        } else {
            sumDigits = twoDigits
        }

        return sumDigits
    },
    setTimer() {
        timerSeconds.innerHTML = this.twoDigitsNumber(this.getSeconds())
        timerMinutes.innerHTML = this.twoDigitsNumber(this.getMinutes())
    },

    complications() {
        if (this.level === 2) {
            this.frameCounter % 50 === 0 && this.getBad('red')
        }
        if (this.level === 3) {
            this.frameCounter % 20 === 0 && this.getBad('red')
            this.frameCounter % 50 === 0 && this.getBad('plum')
        }
        if (this.level === 4) {
            this.frameCounter % 10 === 0 && this.getBad('red')
            this.frameCounter % 20 === 0 && this.getBad('plum')
            this.frameCounter % 30 === 0 && this.getBad('black')
        }
    },
}