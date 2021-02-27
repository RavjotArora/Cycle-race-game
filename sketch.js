var path,mainCyclist;
var pathImg,mainRacerImg1,mainRacerImg2;
var Opponent_1, Opponent1Img, Opponent1Img2;
var Opponent_2, Opponent2Img, Opponent2Img2;
var Opponent_3, Opponent3Img, Opponent3Img2;
var Game_over, GameoverImg;
var obstacle1, Obstacle1Img;
var obstacle2, Obstacle2Img;
var obstacle3, Obstacle3Img;
var bell_Sound;
var player1, player2, player3;


var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;

function preload(){
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2= loadAnimation("images/mainPlayer3.png");
  
  Opponent1Img = loadAnimation("opponent1.png","opponent2.png");
  Opponent1Img2= loadAnimation("opponent3.png");
  
  Opponent2Img = loadAnimation("opponent4.png","opponent5.png");
  Opponent2Img2= loadAnimation("opponent6.png");
  
  Opponent3Img = loadAnimation("opponent7.png","opponent8.png");
  Opponent3Img2= loadAnimation("opponent9.png");
  
  Obstacle1Img= loadAnimation("obstacle1.png");
  
  Obstacle2Img= loadAnimation("obstacle2.png");
  
  Obstacle3Img= loadAnimation("obstacle3.png");
  
  GameoverImg = loadImage("gameOver.png");
  
  bell_Sound = loadSound("sound/bell.mp3")
  
  
}

function setup(){
  
createCanvas(500,300);
  
// Moving background
path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -(6+2*distance/150);

Game_over=createSprite(250,150);
Game_over.addAnimation("GameOver",GameoverImg);
Game_over.scale=0.6;
Game_over.visible=false;  
  
//creating boy running
mainCyclist  = createSprite(70,150,20,20);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.addAnimation("end", mainRacerImg2);
mainCyclist.scale=0.07;
mainCyclist.setCollider("circle",10,0,720); 
mainCyclist.debug=true;
  
player1G=new Group();
player2G=new Group();
player3G=new Group();
obstacle1G=new Group();
obstacle2G=new Group();
obstacle3G=new Group();
 
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,350,30);
  
  
  if(gameState===PLAY){
  
   distance = distance + Math.round(getFrameRate()/50);
    
  if(keyDown("space")){
    bell_Sound.play();
  }
  
   mainCyclist.y = World.mouseY;
   
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
  
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
   
  var select_oppPlayer = Math.round(random(1,3));
  
  if(World.frameCount % 100 ==0){
    if(select_oppPlayer ==1){
      cyclist1();
    }
    
    if(select_oppPlayer ==2){
      cyclist2();
    }
    
    if(select_oppPlayer ==3){
      cyclist3();
    }
  } 
    
  var selectObstacle = Math.round(random(4,6));
  
  if(World.frameCount % 150 ==0){
    if(selectObstacle ==4){
      createObstacle1();
    }
    
    if(selectObstacle ==5){
      createObstacle2();
    }
    
    if(selectObstacle ==6){
      createObstacle3();
    }
  } 
  
  if (player1G.isTouching(mainCyclist) ){
    //player1.changeAnimation("hit", Opponent1Img2);
    gameState=END;
    //Game_OverSound.play();
    
   
  }
    
 if (player2G.isTouching(mainCyclist) ){
   // player2.changeAnimation("smash", Opponent2Img2);
    gameState=END;
   // Game_OverSound.play();
    
    
  } 
  
 if (player3G.isTouching(mainCyclist) ){
   // player3.changeAnimation("collided", Opponent3Img2);
    gameState=END;
    //Game_OverSound.play();

  }
    
 if (obstacle1G.isTouching(mainCyclist) ){
    gameState=END;
    //Game_OverSound.play();
    
  }
    
 if (obstacle2G.isTouching(mainCyclist) ){
    gameState=END;
    //Game_OverSound.play();
    
  } 
    
 if (obstacle3G.isTouching(mainCyclist) ){
    gameState=END;
    //Game_OverSound.play();
  
 }
    
 }
  
  else if (gameState === END) { 
  
  Game_over.visible=true;
    
  player1G.setVelocityXEach(0);
  player1G.setLifetimeEach(-1);  
    
  player2G.setVelocityXEach(0);
  player2G.setLifetimeEach(-1); 
    
  player3G.setVelocityXEach(0);
  player3G.setLifetimeEach(-1); 
    
  obstacle1G.setVelocityXEach(0);
  obstacle1G.setLifetimeEach(-1);
    
  obstacle2G.setVelocityXEach(0);
  obstacle2G.setLifetimeEach(-1);
  
  obstacle3G.setVelocityXEach(0);
  obstacle3G.setLifetimeEach(-1);
    
  path.velocityX=0;
    
  mainCyclist.changeAnimation("end", mainRacerImg2);
  
  if (player1G.isTouching(mainCyclist) ){
    player1.addAnimation("hit", Opponent1Img2);
    player1.changeAnimation("hit", Opponent1Img2);
    
    //Game_OverSound.play();
    
   
  }
    
 if (player2G.isTouching(mainCyclist) ){
    player2.addAnimation("smash", Opponent2Img2);
    player2.changeAnimation("smash", Opponent2Img2);
    
   // Game_OverSound.play();
    
    
  } 
  
 if (player3G.isTouching(mainCyclist) ){
    player3.addAnimation("collided", Opponent3Img2);
    player3.changeAnimation("collided", Opponent3Img2);
    
    //Game_OverSound.play();

  }
  
    
  textSize(15);
  fill(255);
  text("Press Up Arrow to Restart! ", 170,190);
  }
  
 if(keyDown("UP_ARROW")) {
      reset();
    }
 
  
 function reset(){
    gameState= PLAY;
   
   Game_over.visible=false;
   
   player1G.destroyEach();
   player2G.destroyEach();
   player3G.destroyEach();
   
   obstacle1G.destroyEach();
   obstacle2G.destroyEach();
   obstacle3G.destroyEach();
   
   distance=0;
   
   mainCyclist.changeAnimation("SahilRunning",mainRacerImg1);
   
   path.velocityX = -(6+2*distance/150);
  }
 
  
  function cyclist1(){
    player1 = createSprite(1100,Math.round(random(50,250)),10,10);
    player1.scale=0.06;
    player1.addAnimation("riding",Opponent1Img);
    //player1.addAnimation("hit", Opponent1Img2); 
    player1.setLifetime = 170;
    player1.velocityX=-(6+2*distance/150);
    player1.setCollider("circle",10,0,700); 
    player1.debug=true;
    player1G.add(player1);
  }
  
  function cyclist2(){
    player2 = createSprite(1100,Math.round(random(50,250)),10,10);
    player2.scale=0.06;
    player2.addAnimation("running",Opponent2Img);
    //player2.addAnimation("smash", Opponent2Img2); 
    player2.setLifetime = 170;
    player2.velocityX=-(6+2*distance/150);
    player2.setCollider("circle",10,0,700); 
    player2.debug=true;
    player2G.add(player2);
  }
  
  function cyclist3(){
    player3 = createSprite(1100,Math.round(random(50,250)),10,10);
    player3.scale=0.06;
    player3.addAnimation("coming",Opponent3Img);
    //player3.addAnimation("collided", Opponent3Img2);
    player3.setLifetime = 170;
    player3.velocityX=-(6+2*distance/150);
    player3.setCollider("circle",10,0,700); 
    player3.debug=true;
    player3G.add(player3);
  }
  
  function createObstacle1(){
    var obstacle1 = createSprite(1100,Math.round(random(50,250)),10,10);
    obstacle1.scale=0.06;
    obstacle1.addAnimation("fall",Obstacle1Img); 
    obstacle1.setLifetime = 170;
    obstacle1.velocityX=-(6+2*distance/150);
    obstacle1.setCollider("circle",10,0,100); 
    obstacle1.debug=true;
    obstacle1G.add(obstacle1);
  }
  
  function createObstacle2(){
    var obstacle2 = createSprite(1100,Math.round(random(50,250)),10,10);
    obstacle2.scale=0.06;
    obstacle2.addAnimation("coming",Obstacle2Img); 
    obstacle2.setLifetime = 170;
    obstacle2.velocityX=-(6+2*distance/150);
    obstacle2.setCollider("circle",10,0,100); 
    obstacle2.debug=true;
    obstacle2G.add(obstacle2);
  }

  function createObstacle3(){
    var obstacle3 = createSprite(1100,Math.round(random(50,250)),10,10);
    obstacle3.scale=0.06;
    obstacle3.addAnimation("road obstacle",Obstacle3Img); 
    obstacle3.setLifetime = 170;
    obstacle3.velocityX=-(6+2*distance/150);
    obstacle3.setCollider("circle",10,0,100); 
    obstacle3.debug=true;
    obstacle3G.add(obstacle3);
  }

}