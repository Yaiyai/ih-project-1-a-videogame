window.onload = () => {
    const canvasHidden = document.getElementById('my-canvas')
    const startGame = document.getElementById('start-game')
    const endLogo = document.getElementById('init-game')
    startGame.onclick = () => {
        doctorYai.init()
        canvasHidden.style.display = 'block'
        endLogo.style.display = 'none'
    }
}