var gameState = 0
var score = 0
var playerFinal


function preload()

{
run = loadAnimation("run1.png","run2.png","run3.png","run4.png","run5.png","run6.png",);
run1=loadAnimation("Rambogun4.png","Rambogun3.png")
bgImg = loadImage("B2jpg.jpg")
bg2Img = loadImage("B3.jpg")
enemyImg = loadImage("enemy.png")
gun = loadAnimation("Rambogun1.png", "Rambogun2.png", "Rambogun3.png", "Rambogun4.png")
bulletImg = loadImage("bullet.png")
gun2 = loadImage("RamboFInal.png")
gun3 = loadImage("Rambogun4.png")
helicopterImg = loadImage("helicopter.png")
bombImg = loadImage("bomb.png")
}


function setup()
{
createCanvas(windowWidth,windowHeight)

enemyGroup = new Group()
player = new Group()
bulletGroup = new Group()
playerFinalGroup = new Group()
helicopterGroup = new Group()
bombGroup = new Group()

bg = createSprite(0, 370, 1000, 700)
bg.addImage(bgImg)
bg.scale = 4
  
pla = createSprite (350, 900,100,100)
pla.addAnimation("running",run)
pla.scale = 1
player.add(pla)

pla2 = createSprite(pla.x, pla.y, 100, 100)
pla2.addAnimation("gunnning", gun)
pla2.scale = 1
pla2.visible = false
player.add(pla2)
  
  
ground = createSprite(450, 920, 600, 10)
ground.visible = false

playerFinal = createSprite(windowWidth/2, pla.y - 100, 100, 100)
playerFinal.visible = false


}

function draw(){
  //background(0)
  pla.collide(ground)
  
  
if(gameState === 0){
  bg.velocityX = -8
  if(bg.x< 800){
    bg.x = 1300
  }




if(keyDown(UP_ARROW)){
  if(pla.y > 700){
  
  pla.velocityY = -25
  }
}
pla.velocityY = pla.velocityY + 0.8

  
  Enemy()
  helo()
  
  
  
  if (keyDown('space')){
   // pla.changeImage(gun)
    pla2.visible = true
    pla.visible = false
    pla2.x = pla.x
    pla2.y = pla.y
    bg.velocityX = 0
    createBullet()
    
  }
  else{
    pla.visible = true
    pla2.visible = false
  }
  
}
    
else{
  background(bg2Img)
  player.destroyEach()
  Enemy2()
  playerFinalFunction()
  //bg.changeAnimation("bg2",bg2Img)
  
}

drawSprites()
  scoreBoard()
}
function Enemy(){
  if(frameCount%25=== 0){
  enemy = createSprite(Math.round(random(windowWidth, windowWidth-200)), 770, 100, 100)
  enemy.addImage(enemyImg)
  enemy.scale = 1.2
  enemy.velocityX = -7
  enemyGroup.add(enemy)
  //enemyGroup.lifetime = -100
  //enemy.debug = true
  }
  /*if(pla.isTouching(enemyGroup)|| pla2.isTouching(enemyGroup)){
    enemyGroup.destroyEach()
    player.destroyEach()
    console.log("Game Over")
    
  } */

  if(bulletGroup.isTouching(enemyGroup)){
      enemyGroup.destroyEach()
      bulletGroup.destroyEach()
      console.log("enemy killed")
  }
  
  
}
function helo(){
  if(frameCount%200=== 0){
    helicopter = createSprite(Math.round(random(windowWidth, windowWidth-200)), 250, 100, 100)
    helicopter.addImage(helicopterImg)
    helicopter.scale = 2
    helicopter.velocityX = -10
    helicopterGroup.add(helicopter)
    Bomb()
  }
 
    if(bulletGroup.isTouching(helicopterGroup)){
      helicopterGroup.destroyEach()
      
      bulletGroup.destroyEach()
      console.log("Helo Down")
  }

  }

function createBullet() {
  var bullet = createSprite(pla2.x + 70,pla2.y - 35, 60, 10);
  bullet.addImage(bulletImg);
  
  bullet.velocityX = 4;
  bullet.lifetime = 500; 
  bullet.scale = 0.05;
  bulletGroup.add(bullet)
 // bullet.debug = true
}
function createBullet2() {
  var bullet = createSprite(playerFinal.x + 70,playerFinal.y - 50, 60, 10);
  bullet.addImage(bulletImg);
  
  bullet.velocityX = 4;
  bullet.lifetime = 500; 
  bullet.scale = 0.05;
  bulletGroup.add(bullet)
 // bullet.debug = true
}
function createBullet3() {
  var bullet = createSprite(playerFinal.x + 70,playerFinal.y - 50, 60, 10);
  bullet.addImage(bulletImg);
  
  bullet.velocityX = -4;
  bullet.lifetime = 500; 
  bullet.scale = 0.05;
  bulletGroup.add(bullet)
 // bullet.debug = true
}
function scoreBoard(){
  textSize(50)
  fill("white")
  text("Distance :"+ score + "m", windowWidth*4/5, 80)
  if (frameCount%10 === 0 && pla.visible === true){
    score+=1
  }
  
  if(score >= 20){
    gameState = 1
    textSize(50)
    fill("white")
    text("Welcome to the next Level", 350, 300)
    
  }

}
function Bomb(){
  if( helicopterGroup.x === player.x ){
    bomb = createSprite(windowWidth/5, 350 + 50, 100, 100)
    bomb.addImage(bombImg)
    bomb.velocityY = 2
    
    bomb.scale = 0.25
    console.log(bomb.y)
    console.log("Game Over")
  }
}
function Enemy2(){
  if(frameCount%(120/2) === 0 ){
  enemy2 = createSprite(Math.round(random(1000, 800)), 770, 100, 100)
  enemy2.addImage(enemyImg)
  enemy2.scale = 1.2
  enemy2.velocityX = -4
  enemyGroup.add(enemy2)
  //enemyGroup.lifetime = -100
  //enemy.debug = true
  }
  if(enemyGroup.x === 350){
    
    gameState = 3
    
  } 

  if(bulletGroup.isTouching(enemyGroup)){
      enemyGroup.destroyEach()
      console.log("enemy killed")
  }
  
  }
  function playerFinalFunction(){
    if (gameState === 1){
      playerFinal.visible = true
      playerFinal.addImage(gun3)
      playerFinal.scale = 1
      playerFinalGroup.add(playerFinal)
      console.log("Welcome")
      if (keyDown(RIGHT_ARROW)){
        playerFinal.x = playerFinal.x - 10
        playerFinal.addImage(gun3)
        if (keyDown("space")){
          createBullet2()
        }
      }
      else if(keyDown(LEFT_ARROW)){
        playerFinal.x = playerFinal.x + 10
        playerFinal.addImage(gun2)
        if (keyDown("space")){
          createBullet3()
        }
      }
      
      
  }
}
  //    var enemy
      // switch(variable){
        // case 1:enemy = 0, 250
        //case 1: enemy.x = Math.round(random(0, 250))
      