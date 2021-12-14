
var ball
var Bricks
var life=3

var gameState="start"






function preload() {

  ballImg = loadImage("Red_ball.png")
  bgImg = loadImage("breakout_bg.png")
  endImg = loadImage("gameover.png")
  clickSd = loadSound("click.wav")
  bgSd = loadSound("bg.mp3")
  

}




function setup() {
  createCanvas(800,400);
  ball = createSprite(400, 250, 50, 50);
  ball.addImage(ballImg)
  ball.scale = 0.07

  paddle = createSprite(400,350,90,15)
  Bricks = createGroup();

  gameOver = createSprite(400,150,60,60)
  gameOver.addImage(endImg)
  gameOver.scale = 0.5

  gameOver.visible = false

 


  createBrick(50,"red");
  createBrick(90,"orange");
  createBrick(130,"yellow");
  createBrick(170,"green");

  edges = createEdgeSprites();



 



  


}

function draw() {
  background(bgImg);  
  drawSprites();

  


  textSize(20)
  fill("blue")
    stroke("white")
    strokeWeight(3)
  text("Lives: "+life,20,50)
  

if(gameState==="start") {
    ball.velocityX = 0
    ball.velocityY = 0
    ball.x =400
    ball.y = 250

    textSize(20)
    fill("blue")
    stroke("white")
    strokeWeight(3)
    
    text("Press the SPACE BUTTON to start playing!",190,350)


    if(keyDown("SPACE")) {
      
      clickSd.play()

      ball.velocityX = 3
      ball.velocityY = 3
      gameState="play"
      
    }

  } else if(gameState==="end") {
    

    ball.remove()
    Bricks.destroyEach()
    paddle.remove()

    gameOver.visible = true
  } else {
    playGame();

    
  }


  

}

function createBrick(y,color) {
  for(var i=130; i<650; i=i+60) {
    brick = createSprite(i,y,50,30)
    brick.shapeColor = color

    Bricks.add(brick);
  }
}


function destroyBrick(ball,brick) {
  brick.remove();



}

function playGame() {
  paddle.x = mouseX

  ball.bounceOff(paddle)
  ball.bounceOff(edges[0])
  ball.bounceOff(edges[1])
  ball.bounceOff(edges[2])

  ball.bounceOff(Bricks,destroyBrick)

  if(ball.isTouching(edges[3])) {
    lifeOver();
  }

if(!bgSd.isPlaying()) {
  bgSd.play();

}



}

function lifeOver() {
  life=life-1

  if(life>=1) {
    gameState = "start"
  } else {
    gameState = "end"
  }

}



