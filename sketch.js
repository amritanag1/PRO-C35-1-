var dog, happyDog, dogImg, happyDogImg;
var database, foodS ,foodStock;

function preload()
{
  dogImg = loadImage("dogImg.png");
  happyDogImg = loadImage("dogImg1.png");
}

function setup() {
   
  canvas = createCanvas(500, 500);
  database = firebase.database();  

  dog = createSprite(350,350,10,10);
  dog.addImage(dogImg);

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  
}


function draw() {  
  background(46,139,87);

  if (keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }

  drawSprites();
  
  textSize(20);
  fill("black");
  text("NOTE: Press up arrow key to feed Drago milk",50,70);

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x <=0){
    x = 0;
  }else{
    x = x-1;
  }
  
  database.ref('/').update({
    Food: x
  })
}
