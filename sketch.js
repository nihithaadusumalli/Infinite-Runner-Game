var gstate = "play"

function preload(){
  towerImg = loadImage("tower.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  doorImg = loadImage("door.png");
}

function setup(){
  createCanvas(600,600);
  tower = createSprite(300,300);
  tower.addImage(towerImg);
  
  tower.velocityY = 1;
  
  ghost = createSprite(300,300);
  ghost.addImage(ghostImg);
  ghost.scale = 0.5;
  
  doorG = new Group();
  obstacleG = new Group();
  climberG = new Group();
}

function draw(){
  background(0);
  
  if(gstate === "play"){
    
  
  if(tower.y>600){
    tower.y = height/2;
  }
  
  if(keyDown("up")){
   ghost.velocityY = -10; 
  }
  
  if(keyDown("left")){
   ghost.x -=2; 
  }
  
  if(keyDown("right")){
   ghost.x +=2; 
  }
  
  ghost.velocityY +=0.5;
  
  if(climberG.isTouching(ghost)){
    ghost.velocityY =0;
  }
  
  
  spawnDoor();
  drawSprites();
  
  if(obstacleG.isTouching(ghost) || ghost.y>600){
    ghost.destroy();
    
    gstate = "end";
  }
    
    
  }
  
  if (gstate === "end"){
    textSize(30);
    fill("yellow");
    text("Game over",200,300);
  }
}

function spawnDoor(){
  if(frameCount % 240 === 0){
   var door = createSprite(random(100,400),-50)
   door.addImage(doorImg);
    door.velocityY = 1;
    door.lifetime = 650;
    
    var climber = createSprite(door.x,door.y+50);
    climber.addImage(climberImg);
    climber.velocityY = 1;
    climber.lifetime = 650;
    
    var obstacle = createSprite(door.x,door.y+60,climber.width,2);
    obstacle.velocityY = 1;
    obstacle.lifetime = 650;
    obstacle.visible = false;
    
    ghost.depth = door.depth+1;
    
    doorG.add(door);
    climberG.add(climber);
    obstacleG.add(obstacle);
  }
}