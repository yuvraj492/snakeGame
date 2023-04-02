const gameBoard=document.querySelector("#gameboard");
const ctx=gameBoard.getContext("2d");
const scoreText=document.querySelector("#scoreText");
const resetBtn=document.querySelector("resetBtn");
const gameWidth=gameBoard.width;
const gameHeight=gameBoard.height;
const boardbackground="white";
const snakecolor="lightgreen";
const snakeborder="black";
const foodcolor="red";
const unitsize=25;
let running =false;
let xVelocity=unitsize;
let yVelocity=0;
let foodx;
let foody;
let score=0;
let snake=[
    {x:unitsize*4,y:0},
    {x:unitsize*3,y:0},
    {x:unitsize*2,y:0},
    {x:unitsize,y:0},
    {x:0,y:0}
];
window.addEventListener("keydown",changeDirection);
resetBtn.addEventListener("click",resetGame);

gameStart();
createFood();
drawFood();

function gameStart(){
    running=true;
    scoreText.textContent=score;
    createFood();
    drawFood();
    nextTick();
};
function nextTick(){
    if(running){
        setTimeout(()=>{
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameover();
            nextTick();
        },75);
    }
    else{
        displayGameover();
    }
};
function clearBoard(){
    ctx.fillStyle=boardBackground;
    ctx.fillrect(0,0,gameWidth,gameHeight);
};
function createFood(){
    function randomFood(min,max){
        const randNum=Math.round((Math.random()*(max-min)+min)/unitsize)*unitsize;
        return randNum;
    }
    foodx=randomFood(0,gameWidth-unitsize);
    foody=randomFood(0,gameWidth-unitsize);
};
function drawFood(){
    ctx.fillStyle=foodcolor;
    ctx.fillrect(foodx,foody.unitsize,unitsize);
};
function moveSnake(){
    const head={x:snake[0].x+xVelocity,
                y:snake[0].y+yVelocity};
    snake.unshift(head);
    //if food is eaten
    if(snake[0].x==foodx&&snake[0].y==foody){
        score+=1;
        scoreText.textContent=score;
        createFood();
    }
    else{
        snake.pop();
    }
};
function drawSnake(){
    ctx.fillStyle=snakecolor;
    ctx.strokeStyle=snakeBorder;
    snake.forEach(snakePart=>{
        ctx.fillrect(snakePart.x,snakePart.y,unitsize,unitsize);
        ctx.fillrect(snakePart.x,snakePart.y,unitsize,unitsize);
    })
};
function changeDirection(event){
    const keyPressed=event.keyCode;
    const LEFT=37;
    const UP=38;
    const RIGHT=39;
    const DOWN=40;
    const goingUp=(yVelocity == -unitsize);
    const goingDown=(yVelocity == unitsize);
    const goingRight=(xVelocity == unitsize);
    const goingLeft=(xVelocity == -unitsize);

    switch(true){
        case(keyPressed==LEFT&&!goingRight):
            xVelocity=-unitsize;
            yVelocity=0;
            break;
        case(keyPressed==UP&&!goingDown):
            xVelocity=0;
            yVelocity=-unitsize;
            break;
        case(keyPressed==RIGHT&&!goingLeft):
            xVelocity=unitsize;
            yVelocity=0;
            break;
        case(keyPressed==DOWN&&!goingUp):
            xVelocity=0;
            yVelocity=unitsize;
            break;
    }
};
function checkGameover(){
    switch(true){
        case(snake[0].x<0):
            running=false;
            break;
        case(snake[0].x>=gameWidth):
            running=false;
            break;
        case(snake[0].y<0):
            running=false;
            break;
        case(snake[0].y>=gameHeight):
            running=false;
            break;
    }
    for(let i=1;i<snake.length;i+=1){
        if(snake[i].x==snake[0].x&&snake[i].y==snake[0].y){
            running=false;
        }
    }
};
function displayGameover(){
    ctx.font="50px MV Boli";
    ctx.fillStyle="black";
    ctx.textAlign="center";
    ctx.fillText("Game OVER!",gameWidth/2, gameHeight/2);
    running=false;
};
function resetGame(){
    score=0;
    xVelocity=unitsize;
    yVelocity=0;
    snake=[
        {x:unitsize*4,y:0},
        {x:unitsize*3,y:0},
        {x:unitsize*2,y:0},
        {x:unitsize,y:0},
        {x:0,y:0}
    ];
    gameStart();
};