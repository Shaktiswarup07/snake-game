import {update as updateSnake, draw as drawSnake, getSnakeHead, snakeIntersect } from "./snake.js";
import {update as updateFood, draw as drawFood, outsideGrid } from "./food.js";


// let direction={x:0, y:0};
let snakeSpeed=12;
const gameOverSound=new Audio('gameover.mp3')
const gameBoard=document.getElementById('gameBoard');
let lastRenderTime=0;
let gameOver=false;
const easy=document.getElementById('easy');
const medium=document.getElementById('medium');
const hard=document.getElementById('hard');
// window.onload=function(){
//     musicSound.play();
// };


function main(currentTime){
    if(gameOver){
        gameOverSound.play();
        if(confirm('You lost. Press ok to restart.')){
            window.location='/snake-game/'
        }
        return;
    }
    window.requestAnimationFrame(main);
    const secondsSinceLastRendered=(currentTime-lastRenderTime)/1000;
    if(secondsSinceLastRendered< 1/snakeSpeed) return;

    // console.log('render');
    lastRenderTime=currentTime;

    update();
    draw(gameBoard);
}
// window.requestAnimationFrame(main);
easy.addEventListener('click',function(){
    snakeSpeed=8;
    window.requestAnimationFrame(main);
})
medium.addEventListener('click',function(){
    snakeSpeed=12;
    window.requestAnimationFrame(main);
})
hard.addEventListener('click',function(){
    snakeSpeed=16;
    window.requestAnimationFrame(main);
})


function update(){
    updateSnake();
    updateFood();
    checkFailure();
}

function draw(gameBoard){
    gameBoard.innerHTML='';
    drawSnake(gameBoard);
    drawFood(gameBoard);
}

function checkFailure(){
    gameOver=outsideGrid(getSnakeHead()) || snakeIntersect()
}
