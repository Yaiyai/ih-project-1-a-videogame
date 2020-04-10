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

let winPop = document.getElementById('win')
let winWin = document.getElementById('win-again')

let helpMe = document.getElementById('help-me')
let howTo = document.getElementById('rules')
let gotIt = document.getElementById('ok')
let rulesPop = document.getElementById('instructions')

//Music
let audioMusic = new Audio('music/drYaiMusic.mp3')
let pointsMusic = new Audio('music/points.wav')
let levelMusic = new Audio('music/level.mp3')
let gameOverMusic = new Audio('music/game-over.wav')
let winMusic = new Audio('music/win.wav')
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
        //To play music on loop
        audioMusic.addEventListener('ended', function () {
            this.currentTime = 0;
            this.play();
        })
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

            this.levelUp()
            this.badGuys()

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
        document.onkeydown = e => {
            e.keyCode === this.key.RIGHT ? (this.piece.direction = "right") : null
            e.keyCode === this.key.LEFT ? (this.piece.direction = "left") : null
            e.keyCode === this.key.DOWN ? this.movePiece(this.piece, "down") : null
        }
        helpMe.onclick = () => rulesPop.style.display = 'flex'
        playMusic.onclick = () => this.playMusic()
        pauseMusic.onclick = () => this.pauseMusic()
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

    getBadPiece(color) {
        this.badPieces.push(new Bad(this.ctx, color))
    },

    drawAll() {
        this.boardDrawed.draw()
        this.piece.draw()
        this.blockedPieces.forEach(pc => pc.draw())
        this.badPieces.forEach(bad => bad.draw())
    },

    setScore(points) {
        pointsMusic.play()
        this.score += points
        scorePoints.innerHTML = this.score
    },

    levelPop(level, fps) {
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
            this.timeLimit = 300
            this.fps = fps
        }
    },

    levelUp() {
        this.level === 1 && this.score >= 300 && this.levelPop(2, 4)
        this.level === 2 && this.score >= 700 && this.levelPop(3, 5)
        this.level === 3 && this.score >= 1000 && this.levelPop(4, 6)
        this.level === 4 && this.score >= 1500 && this.levelPop(5, 7)
        this.level === 5 && this.score >= 2100 && this.levelPop(6, 8)
        this.level === 6 && this.score >= 3000 && this.levelPop(7, 8)
        this.level === 7 && this.score >= 3500 && this.levelPop(8, 8)
        this.level === 8 && this.score >= 4000 && this.youWin()
    },

    badGuys() {

        if (this.level === 2) {
            this.frameCounter % 50 === 0 && this.getBadPiece('red')
        }
        if (this.level === 3) {
            this.frameCounter % 30 === 0 && this.getBadPiece('red')
            this.frameCounter % 50 === 0 && this.getBadPiece('plum')
        }
        if (this.level === 4) {
            this.frameCounter % 30 === 0 && this.getBadPiece('red')
            this.frameCounter % 35 === 0 && this.getBadPiece('plum')
            this.frameCounter % 40 === 0 && this.getBadPiece('black')
        }
        if (this.level === 5) {
            this.frameCounter % 25 === 0 && this.getBadPiece('red')
            this.frameCounter % 30 === 0 && this.getBadPiece('plum')
            this.frameCounter % 35 === 0 && this.getBadPiece('black')
        }
        if (this.level === 6) {
            this.frameCounter % 20 === 0 && this.getBadPiece('red')
            this.frameCounter % 25 === 0 && this.getBadPiece('plum')
            this.frameCounter % 30 === 0 && this.getBadPiece('black')
        }
        if (this.level === 7) {
            this.frameCounter % 15 === 0 && this.getBadPiece('red')
            this.frameCounter % 20 === 0 && this.getBadPiece('plum')
            this.frameCounter % 25 === 0 && this.getBadPiece('black')
        }
        if (this.level === 8) {
            this.frameCounter % 10 === 0 && this.getBadPiece('red')
            this.frameCounter % 15 === 0 && this.getBadPiece('plum')
            this.frameCounter % 20 === 0 && this.getBadPiece('black')
        }
    },

    youWin() {
        clearInterval(this.interval)
        this.pauseMusic()
        winMusic.play()
        winPop.style.display = 'flex'

        winWin.onclick = () => {
            document.location.reload()
        }
    },

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
        this.blockedPieces.some(pc => pc.posY < 0) && this.gameOver()
    },

    movePiece(piece, dir) {
        let checkBoardRows = this.boardDrawed.rows
        let checkBoardColumns = this.boardDrawed.columns
        let badRed = this.badPieces.filter(pc => pc.name === 'red')
        let badBlack = this.badPieces.filter(pc => pc.name === 'black')
        let badPlum = this.badPieces.filter(pc => pc.name === 'plum')

        switch (dir) {
            case "left":
                piece.direction = "down"

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
        //Check if last piece added to blocked pieces.
        let target = this.blockedPieces[this.blockedPieces.length - 1]

        //2 pieces in the same color
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

            //3 pieces in the same color
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

            })

        })
    },

    //When siblings is run, it is necessary to check if there is and empty space below, and if it is, move vertically.
    goingDown() {
        //Look for the pieces that are in the limit. Those won't need to descend.
        let availablePieces = this.blockedPieces.filter(pc => pc.posY !== 13)
        //Look for the pieces with space belown them.
        availablePieces.forEach(pc => !this.blockedPieces.some(piece => piece.posY === pc.posY + 1 && piece.posX === pc.posX) && pc.posY++)
    },

    //timer
    twoDigitsNumber(num) {
        let twoDigits = num.toString()
        let sumDigits = ""
        twoDigits.length === 1 ? sumDigits = "0" + twoDigits : sumDigits = twoDigits
        return sumDigits
    },

    setTimer() {
        let getMinutes = () => Math.floor((this.timeLimit / this.fps) / 60)
        let getSeconds = () => Math.floor((this.timeLimit / this.fps) - getMinutes() * 60)

        timerSeconds.innerHTML = this.twoDigitsNumber(getSeconds())
        timerMinutes.innerHTML = this.twoDigitsNumber(getMinutes())
    },

}