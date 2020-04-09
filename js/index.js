window.onload = () => {
    const canvasHidden = document.getElementById('my-canvas')
    const startGame = document.getElementById('start-game')
    const endLogo = document.getElementById('init-game')
    const rulesPop = document.getElementById('instructions')
    const howTo = document.getElementById('rules')
    const gotIt = document.getElementById('ok')


    howTo.onclick = () => {
        rulesPop.style.display = 'flex'
    }
    gotIt.onclick = () => {
        rulesPop.style.display = 'none'
    }
    startGame.onclick = () => {
        doctorYai.init()
        canvasHidden.style.display = 'block'
        endLogo.style.display = 'none'
    }

}