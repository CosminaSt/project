window.onload = function(){
//finding the coordonates in the game
this.input.on('pointerdown', function(pointer) {
  console.log(pointer.x, pointer.y);
});

//dragable elements for level creation
newObj.setInteractive();
this.input.setDraggable(newObj);

this.input.on('drag', function(pointer, gameObject, dragX, dragY) {
  gameObject.x = dragX;
  gameObject.y = dragY;
  console.log(dragX, dragY);
});

newObj.setInteractive();
this.input.setDraggable(newObj);

//dragable elements for level creation
this.input.on('drag', function(pointer, gameObject, dragX, dragY) {
  gameObject.x = dragX;
  gameObject.y = dragY;
  console.log(dragX, dragY);
});

//camera bounds
this.cameras.main.setBounds(0, 0, this.levelData.world.width, this.levelData.world.height);
this.cameras.main.startFollow(this.player);
}
