import {onSnake, expandSnake} from './snake.js'

let food=getRandomFoodPosition();
const expansionRate=1;
const foodSound=new Audio('food.mp3')

export function update(){
    if(onSnake(food)){
        foodSound.play();
        expandSnake(expansionRate);
        food=getRandomFoodPosition();
    }
}

export function draw(gameBoard){
        const foodElement=document.createElement('div');
        foodElement.style.gridRowStart=food.y;
        foodElement.style.gridColumnStart=food.x;
        foodElement.classList.add('food')
        gameBoard.appendChild(foodElement);
    
} 

function getRandomFoodPosition(){
    let newFoodPosition;
    while(newFoodPosition == null || onSnake(newFoodPosition)){
        newFoodPosition=randomGridPosition();
    }
    return newFoodPosition;
}

function randomGridPosition(){
    return{
        x:Math.floor(Math.random()*20)+1,
        y:Math.floor(Math.random()*20)+1
    }
}
export function outsideGrid(pos){
    return pos.x<1 || pos.x>20 || pos.y<1 || pos.y>20;
}