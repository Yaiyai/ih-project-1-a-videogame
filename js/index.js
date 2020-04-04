window.onload = () => {
    const startGame = document.getElementById('start-game')
    startGame.onclick = () => {
        doctorYai.init()
    }
}