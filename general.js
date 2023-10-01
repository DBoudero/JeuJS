// Mouvement

const player = document.querySelector('#player');
const target = document.querySelector('#target');
const body = document.querySelector('body');

let fontSize = player.style.fontSize
let position = { x: generateRandomNumber(0, 100 - player.offsetWidth / document.documentElement.clientWidth * 100), y: generateRandomNumber(0, 100 - player.offsetHeight / document.documentElement.clientHeight * 100) };
let IS_MOVING_RIGHT = false
let IS_MOVING_LEFT = false
let IS_MOVING_UP = false
let IS_JUMPING = false
let IS_MOVING_DOWN = false

let velocite = 0

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
    
    
    /*Gravité et Saut
    if (position.y < 100 - player.offsetHeight / document.documentElement.clientHeight * 100 & !IS_JUMPING) {
        position.y = position.y + 3;
    }
    if (IS_JUMPING & position.y > 0) { // ne doit pas passer en dessous de 0
        if(position.y > 20){
            velocite = 1
        }
        if(position.y > 50){
            velocite = 2
        }
        if(position.y > 70){
            velocite = 3
        }
        position.y = position.y - velocite;
    }
    */

    console.log(position.y)



    if(!IS_MOVING_RIGHT & flagAnimationDroite)
    {
        clearInterval(animationDroiteID);
        flagAnimationDroite = false;
        player.innerHTML = repos
    }
    if(!IS_MOVING_LEFT & flagAnimationGauche)
    {
        clearInterval(animationGaucheID);
        flagAnimationGauche = false;
        player.innerHTML = repos
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
            if(flagAnimationGauche==false){
                animationGaucheID = setInterval(animationMarcheGauche, 150);
                flagAnimationGauche = true;
            }
            break;
        case "ArrowRight":
            IS_MOVING_RIGHT = event.type === "keydown";
            if(flagAnimationDroite==false){
                animationDroiteID = setInterval(animationMarcheDroite, 150);
                flagAnimationDroite = true;
            }
        break;
    }
}


// Check target et joueur
target.style.left = `${generateRandomNumber(0, 100 - target.offsetWidth / document.documentElement.clientWidth * 100)}%`
target.style.top = `${generateRandomNumber(0, 100 - target.offsetHeight / document.documentElement.clientHeight * 100)}%`
var score = 0

//collisions, true if collision
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

//random numbre
function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function targetMove() {
    target.style.left = `${generateRandomNumber(0, 100 - target.offsetWidth / document.documentElement.clientWidth * 100)}%`
    target.style.top = `${generateRandomNumber(0, 100 - target.offsetHeight / document.documentElement.clientHeight * 100)}%`
    score++
    document.title = "Score : " + score
}

// Animations Joueur

function playerSouris1() {
    player.innerHTML = " ♥/\n/| \n/ \\"
    var audio = new Audio('sounds/Click1.mp3');
    audio.play();
}
function playerSouris2() {
    player.innerHTML = " ♥ \n/|\\\n/ \\" //normal
    var audio = new Audio('sounds/Click2.mp3');
    audio.play();
}

let repos = " ♥ \n/|\\\n/ \\" // Repos
let animationMarcheDroite1 = " ♥ \n/|\\\n >\\"
let animationMarcheDroite2 = " ♥ \n/|\\\n |>"
let animationMarcheDroite3 = " ♥ \n/|\\\n/ >"
let animationMarcheDroite4 = " ♥ \n/|\\\n/ \\"

let animationMarcheGauche1 = " ♥ \n/|\\\n/< "
let animationMarcheGauche2 = " ♥ \n/|\\\n<| "
let animationMarcheGauche3 = " ♥ \n/|\\\n< \\"
let animationMarcheGauche4 = " ♥ \n/|\\\n/ \\"

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
        player.innerHTML = animationMarcheDroite4
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
        player.innerHTML = animationMarcheGauche4
    }
}


/* animation de marche droite

 ♥
/|\
/ \

 ♥
/|\
 >\

 ♥
/|\
 |>

 ♥
/|\
/ >

*/

/* animation de marche gauche

 ♥
/|\
/ \

 ♥
/|\
/<

 ♥
/|\
<|

 ♥
/|\
< \

*/


/* animation saut

\♥/
 |
/ \


 ♥
/|\
< >


*/