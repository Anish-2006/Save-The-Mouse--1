var catI,cat;
var wall,wallI;
var mouse,mouseI;
var o1,o2,o3,o4,oG,o;
var score,points,cheeseG,cheese1,cheese2;
var play = 1;
var end = 0;
var start = 2;
var gameState = start;


function preload(){

  catI = loadAnimation("1.png","2.png","3.png","4.png","5.png","6.png","7.png","8.png");
  
  wallI = loadAnimation("wall.png");

mouseI = loadAnimation("m1.png","m2.png","m3.png","m4.png");
  
  o1 = loadImage("screw.png");
  o2 = loadImage("driver.png");
  o3 = loadImage("helmet.png");
  o4 = loadImage("bolt.png");
  
  cheese1 = loadImage("cheese 1.png");
  cheese2 = loadImage("cheese 2.png");
  
}

function setup() {
  
  createCanvas(700,400);
  
  cat = createSprite(70,263,1,1);
  cat.addAnimation("running",catI);
  cat.scale = 0.70;
  
  //cat.debug = true;
  cat.setCollider("rectangle",70,25,200,100);
  
  mouse = createSprite(250,300,1,1);
  mouse.addAnimation("mouserunning",mouseI);
  mouse.scale = 0.2;
  
  //mouse.debug = true;
  mouse.setCollider("rectangle",70,0,230,185);
  
  wall = createSprite(450,395,1,1);
  wall.addAnimation("waaaa",wallI);
  wall.scale = -1.2;
  
  score= 0;
  points = 0;
  
  oG = new Group();
  cheeseG = new Group();
}

function draw() {
  background(260);
  
  if(gameState === start){
    
    background("blue");
    
    wall.visible = false;
    cat.visible = false;
    mouse.visible = false;
    
    textSize(60);
    fill("grey");
    stroke("yellow");
    strokeWeight(8);
    text("SAVE THE MOUSE",85,70);
    
    textSize(35);
    fill("red");
    stroke("white");
    strokeWeight(5)
    text("Press enter to start",200,150);
    
    textSize(20);
    fill("white");
    stroke("green");
    strokeWeight(3);
    text("A cat is chasing a mouse in a construction site. Save the mouse from the cat.",10,200);
    text("There are some construction tools in the way. Make the mouse jump over",10,235);
    text("them to save it. If you touch any of the construction tool, the game ends. Also",10,270);
    text("don't forget to collect the cheese in the way. Jump to collect it. Each cheese",10,305);
    text("gives you 2 points. Your score will depend on how long you play. Difficulty of",10,340);
    text("game increases gradually.",10,375);
    
    score = 0;
    
    if(gameState === start && keyDown("enter")){
      
      gameState = play;
      
    }
    
  }
  
  if(gameState ===play){
  
  wall.visible= true;
  mouse.visible = true;
  cat.visible = true;
   
  score = score + Math.round(getFrameRate()/50); 
  
  textSize(30);
  fill("black");
  stroke("blue");
  strokeWeight(3);
  text("Score : " + score,250,25);
    
  stroke("red");
  text("Points : " + points,246,70);
    
  wall.velocityX = -(4 + score/120);
  
  mouse.collide(wall);
  cat.collide(wall);
  
  wall.depth = mouse.depth;
  wall.depth = mouse.depth + 1;
  
  wall.depth = cat.depth;
  wall.depth = cat.depth + 1;
  
  if(keyDown("space")&& mouse.y > 300 ){
    
    mouse.velocityY = -14;
    
  }
  
  //console.log(mouse.y);
  
  mouse.velocityY = mouse.velocityY + 0.6;
    
   if(mouse.isTouching(cheeseG)){
     
     points = points + 2;
     cheeseG.destroyEach();
     
   }  
    
   if(mouse.isTouching(oG)){
     
     gameState = end;
     
   }
  
   if(cat.isTouching(oG)){
    
    cat.velocityY = -13;
    
  }
  
  //console.log(mouse.y);
  
  cat.velocityY = cat.velocityY + 0.5;
  
  if(wall.x < 220){
    
    wall.x = 450;
    
  }
  drawSprites();
  
  obstacles();
  spawn_cheese();
    
  }else if(gameState ===end){
    
  background("black")
    
  score = 0;
  points = 0;
    
  textSize(30);
  fill("purple");
  stroke("cyan");
  strokeWeight(4);
  text("Press R to restart the game",160,300);
  
  textSize(80);
  fill("magenta");
  stroke("orangerr");
  strokeWeight(6);
  text("GAME ENDS ",110,150)
    
  }
  
  if(keyDown("r")&&gameState === end){
    
    gameState = start;
    mouse.y = 270;
    
  }
  
  
}

function obstacles(){
  
  if(frameCount%100 === 0){
  
  o = createSprite(700,300,100,1);
  o.velocityX = -(4 + score/120);
  
  var r;
  r = Math.round(random(1,4));
  
  switch(r){
      
    case 1 : o.addImage(o1);
             o.scale = 0.3;
             o.y = 310;
             o.setCollider("rectangle",0,0,190,40);
             break;
    case 2 : o.addImage(o2);
             o.scale = 0.19;
             o.y = 308;
             o.setCollider("rectangle",-20,0,285,40);
             break; 
    case 3 : o.addImage(o3);
             o.scale = 0.24;
             o.y = 295;
             o.setCollider("circle",-8,20,120);
             break;
    case 4 : o.addImage(o4);
             o.scale = 0.12;
             o.y = 303;
             break;
    default: break;        
  }//end of switch
    
  //o.debug = true; 
    
  mouse.depth = o.depth;
  mouse.depth = o.depth + 1;
    
  o.lifetime = 175;
  oG.add(o)
    
 }//end of if
   
}//end of function

function spawn_cheese(){
  
  if(frameCount%133 === 0){
    
    var cheese;
    
    cheese = createSprite(700,150,1,1);
    cheese.velocityX = -(4 + score/120);
    cheese.scale = 0.6
    
    var a = Math.round(random(1,2));
    
    switch(a){
        
      case 1 : cheese.addImage(cheese1);
        
               break;
      case 2 : cheese.addImage(cheese2);
               
               break;
      default: break;         
        
    }
      
    mouse.depth = cheese.depth;
    mouse.depth = cheese.depth + 1;
    
    //cheese.debug = true;

    cheese.lifetime = 180;
    cheeseG.add(cheese);
    
  }
  
  
}