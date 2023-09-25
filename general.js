const isaac = document.querySelector('#isaac')

let position = { x: 0, y: 0 };
let IS_MOVING_RIGHT = false
let IS_MOVING_LEFT = false
let IS_MOVING_UP = false
let IS_MOVING_DOWN = false

function playSoundClick1() {
    var audio = new Audio('sounds/Click1.mp3');
    audio.play();
}

function playSoundClick2() {
    var audio = new Audio('sounds/Click2.mp3');
    audio.play();
}

window.requestAnimationFrame(deplacement)

function deplacement() {
    if (IS_MOVING_RIGHT & position.x < 100) {
        position.x++;
    }
    if (IS_MOVING_LEFT & position.x > 0) {
        position.x--;
    }
    if (IS_MOVING_UP & position.y > 0) {
        position.y--;
    }
    if (IS_MOVING_DOWN & position.y < 100) {
        position.y++;
    }
    console.table(position);

    isaac.style.left=`${position.x}%`
    isaac.style.top=`${position.y}%`

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