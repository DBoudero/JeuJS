// Sound effect

function playSoundClick1() {
    var audio = new Audio('sounds/Click1.mp3');
    audio.play();
}

function playSoundClick2() {
    var audio = new Audio('sounds/Click2.mp3');
    audio.play();
}

// Mouvement

const player = document.querySelector('#player');
const target = document.querySelector('#target');
const body = document.querySelector('body');
let fontSize = player.style.fontSize
let position = { x: generateRandomNumber(0, 100 - player.offsetWidth / document.documentElement.clientWidth * 100), y: generateRandomNumber(0, 100 - player.offsetHeight / document.documentElement.clientHeight * 100) };
let IS_MOVING_RIGHT = false
let IS_MOVING_LEFT = false
let IS_MOVING_UP = false
let IS_MOVING_DOWN = false

window.requestAnimationFrame(deplacement)

function deplacement() {
    if (IS_MOVING_RIGHT & position.x < 100 - player.offsetWidth / document.documentElement.clientWidth * 100) {
        position.x++;
    }
    if (IS_MOVING_LEFT & position.x > 0) { // ne doit pas passer en dessous de 0
        position.x--;
    }
    if (IS_MOVING_DOWN & position.y < 100 - player.offsetHeight / document.documentElement.clientHeight * 100) {
        position.y++;
    }
    if (IS_MOVING_UP & position.y > 0) { // ne doit pas passer en dessous de 0
        position.y--;
    }

    if (elementsOverlap(player, target)){
        targetMove()
    }


    player.style.left = `${position.x}%`
    player.style.top = `${position.y}%`

    window.requestAnimationFrame(deplacement)
}


window.addEventListener("keydown", mouvement)
window.addEventListener("keyup", mouvement)

function mouvement(event) {
    switch (event.key) {
        case "ArrowDown":
            IS_MOVING_DOWN = event.type === "keydown";
            break;
        case "ArrowUp":
            IS_MOVING_UP = event.type === "keydown";
            break;
        case "ArrowLeft":
            IS_MOVING_LEFT = event.type === "keydown";
            break;
        case "ArrowRight":
            IS_MOVING_RIGHT = event.type === "keydown";
            break;
    }
}

// Souris Joueur

function playerSouris1() {
    player.innerHTML = " ♥/\n/| \n/ \\"
}
function playerSouris2() {
    player.innerHTML = " ♤ \n/|\\\n/ \\" //normal
}

// Check target et joueur
target.style.left = `${generateRandomNumber(0, 100 - target.offsetWidth / document.documentElement.clientWidth * 100)}%`
target.style.top = `${generateRandomNumber(0, 100 - target.offsetHeight / document.documentElement.clientHeight * 100)}%`
var score = 0


function elementsOverlap(div1, div2) {
    const domRect1 = div1.getBoundingClientRect();
    const domRect2 = div2.getBoundingClientRect();

    return !(
        domRect1.top > domRect2.bottom ||
        domRect1.right < domRect2.left ||
        domRect1.bottom < domRect2.top ||
        domRect1.left > domRect2.right
    );
}

function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function targetMove() {
    target.style.left = `${generateRandomNumber(0, 100 - target.offsetWidth / document.documentElement.clientWidth * 100)}%`
    target.style.top = `${generateRandomNumber(0, 100 - target.offsetHeight / document.documentElement.clientHeight * 100)}%`
    score++
    document.title = "Score : " + score
}