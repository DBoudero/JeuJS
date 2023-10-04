// Mouvement

const player = document.querySelector('#player')
const target = document.querySelector('#target')
const body = document.querySelector('body')

let position = { x: generateRandomNumber(0, 100 - player.offsetWidth / document.documentElement.clientWidth * 100), y: generateRandomNumber(0, 100 - player.offsetHeight / document.documentElement.clientHeight * 100) }
let targetPosition = { x: generateRandomNumber(0, 100 - target.offsetWidth / document.documentElement.clientWidth * 100), y: generateRandomNumber(0, 100 - target.offsetHeight / document.documentElement.clientHeight * 100) }
let IS_MOVING_RIGHT = false
let IS_MOVING_LEFT = false
let IS_MOVING_UP = false
let IS_MOVING_DOWN = false
let targetDesigns = ['♥','♠','♦','♣']
let targetDesignState = 0
var score = 0

window.requestAnimationFrame(main)

function main() {

    // Update des positions
    target.style.left =  `${targetPosition.x}%`
    target.style.top =  `${targetPosition.y}%`
    player.style.left = `${position.x}%`
    player.style.top = `${position.y}%`


    // Déplacements
    if (IS_MOVING_RIGHT & position.x < 100 - player.offsetWidth / document.documentElement.clientWidth * 100) {
        position.x++
    }
    if (IS_MOVING_LEFT & position.x > 0) { // ne doit pas passer en dessous de 0
        position.x--
    }
    if (IS_MOVING_DOWN & position.y < 100 - player.offsetHeight / document.documentElement.clientHeight * 100) {
        position.y++
    }
    if (IS_MOVING_UP & position.y > 0) { // ne doit pas passer en dessous de 0
        position.y--
    }
    
    // Animations déplacements
    if(!IS_MOVING_RIGHT & flagAnimationDroite)
    {
        clearInterval(animationDroiteID)
        flagAnimationDroite = false
        player.innerHTML = animationRepos
    }
    if(!IS_MOVING_LEFT & flagAnimationGauche)
    {
        clearInterval(animationGaucheID)
        flagAnimationGauche = false
        player.innerHTML = animationRepos
    }

    // Joueur atteint cible
    if (elementsOverlap(player, target)){
        targetMove()
        score++
        document.title = "Score : " + score
    }

    window.requestAnimationFrame(main)
}

// Detection des mouvements
window.addEventListener("keydown", mouvement)
window.addEventListener("keyup", mouvement)
function mouvement(event) {
    switch (event.key) {
        case "ArrowDown":
            IS_MOVING_DOWN = event.type === "keydown"
            break
        case "ArrowUp":
            IS_MOVING_UP = event.type === "keydown"
            break
        case "ArrowLeft":
            IS_MOVING_LEFT = event.type === "keydown"
            if(flagAnimationGauche==false){
                animationGaucheID = setInterval(animationMarcheGauche, 150)
                flagAnimationGauche = true
            }
            break
        case "ArrowRight":
            IS_MOVING_RIGHT = event.type === "keydown"
            if(flagAnimationDroite==false){
                animationDroiteID = setInterval(animationMarcheDroite, 150)
                flagAnimationDroite = true
            }
        break
    }
}

// Collisions
function elementsOverlap(div1, div2) {
    const domRect1 = div1.getBoundingClientRect()
    const domRect2 = div2.getBoundingClientRect()

    return !(
        domRect1.top > domRect2.bottom ||
        domRect1.right < domRect2.left ||
        domRect1.bottom < domRect2.top ||
        domRect1.left > domRect2.right
    )
}

// Nombre Aléatoire
function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// Déplacement de la cible
function targetMove() {
    targetPosition.y = generateRandomNumber(0, 100 - target.offsetWidth / document.documentElement.clientWidth * 100)
    targetPosition.x = generateRandomNumber(0, 100 - target.offsetHeight / document.documentElement.clientHeight * 100)
    changeTarget()
}

// Changement de design
function changeTarget(){
    targetDesignState++
    if(targetDesignState > 3)
    {
        targetDesignState = 0
    }
    target.innerHTML = targetDesigns[targetDesignState]

    if(targetDesignState%2 == 0)
    {
        target.style.color = 'Red'
    }
    else
    {
        target.style.color = 'White'
    }
    
}

// Animations Joueur Souris
function playerSouris1() {
    player.innerHTML = " o/\n/| \n/ \\"
    audio.play()
}
function playerSouris2() {
    player.innerHTML = " o \n/|\\\n/ \\"
    audio.play()
}

// Animations Joueur Marche
let animationRepos = " o \n/|\\\n/ \\" 
let animationMarcheDroite1 = " o \n/|\\\n >\\"
let animationMarcheDroite2 = " o \n/|\\\n |>"
let animationMarcheDroite3 = " o \n/|\\\n/ >"

let animationMarcheGauche1 = " o \n/|\\\n/< "
let animationMarcheGauche2 = " o \n/|\\\n<| "
let animationMarcheGauche3 = " o \n/|\\\n< \\"

let flagAnimationDroite = false
let iAnimationMarcheDroite = 0
function animationMarcheDroite(){
    iAnimationMarcheDroite++
    if(iAnimationMarcheDroite > 4)
    {
        iAnimationMarcheDroite = 1
    }
    if(iAnimationMarcheDroite == 1)
    {
        player.innerHTML = animationMarcheDroite1
    }
    if(iAnimationMarcheDroite == 2)
    {
        player.innerHTML = animationMarcheDroite2
    }
    if(iAnimationMarcheDroite == 3)
    {
        player.innerHTML = animationMarcheDroite3
    }
    if(iAnimationMarcheDroite == 4)
    {
        player.innerHTML = animationRepos
    }
}

let flagAnimationGauche = false
let iAnimationMarcheGauche = 0
function animationMarcheGauche(){
    iAnimationMarcheGauche++
    if(iAnimationMarcheGauche > 4)
    {
        iAnimationMarcheGauche = 1
    }
    if(iAnimationMarcheGauche == 1)
    {
        player.innerHTML = animationMarcheGauche1
    }
    if(iAnimationMarcheGauche == 2)
    {
        player.innerHTML = animationMarcheGauche2
    }
    if(iAnimationMarcheGauche == 3)
    {
        player.innerHTML = animationMarcheGauche3
    }
    if(iAnimationMarcheGauche == 4)
    {
        player.innerHTML = animationRepos
    }
}