//board size
let blockSize = 15;
let rows = 30;
let cols = 30;
let board;
let context;
//snake head
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;
//speed
let velocityX = 0;
let velocityY = 0;
//snake body
let snakeBody = [];
//food
let foodX;
let foodY;
//score
let scorepoint = document.querySelector('#scorePoint')
//GG
let gameOver = false;
//Audio
const eatSound = new Audio("point.mp3");
const hitSound = new Audio("hit.mp3");
const endSound  = new Audio("end.mp3");
//start
window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");
    placeFood();
    document.addEventListener("keyup", changeDirection);
    setInterval(update, 1000/8);
}
function update() {
    if (gameOver) {
        return;
    }
    //board info
    context.fillStyle="black";
    context.fillRect(0, 0, board.width, board.height);
    //food info
    context.fillStyle="red";
    context.fillRect(foodX, foodY, blockSize, blockSize);
    //body grow
    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
        scorepoint += 1;
        document.getElementById("scorePoint").innerHTML = scorepoint;
        eatSound.play();
    }
    //how to move the body
    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }
    //body info
    context.fillStyle="lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }
    //game over conditions
    //hit the wall
    if (snakeX < 0 || snakeX > cols*blockSize-1 || snakeY < 0 || snakeY > rows*blockSize-1) {
        gameOver = true;
        hitSound.play();
        alert("Game Over");
        endSound.play();
    }
    //bite itself
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            hitSound.play();
            alert("Game Over");
            endSound.play();
        }
    }
}
//control
function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}
//spawn new fruit
function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}
