var dog,happyDog,database,foodS,foodStock,feed,food

function preload()
{
  feed=loadImage("images/dogImg.png")
  happyDog=loadImage("images/dogImg1.png")

}

function setup() {
  createCanvas(500,500);
  dog=createSprite(250,250,60,60)
  dog.addImage(feed)
  dog.scale=0.3
  database=firebase.database();
  foodStock=database.ref("Food")
  foodStock.on("value",readStock)
  food=30;
}



function draw() {  
background("white")
textSize(20)
text("Note: Press up arrow key to feed drago milk "+foodS,60,50)
text("food remaining "+food,250,100)


if(keyWentDown(UP_ARROW)){
  writeStock(foodS)
  food=food-1
  dog.addImage(happyDog)
}

  drawSprites();
  

}
function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0
  }else{
    x=x-1
  }
  database.ref("/").update({
  Food:x
  })
}

