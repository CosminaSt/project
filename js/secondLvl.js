let secondScene = new Phaser.Scene('secondLvl');


secondScene.init = function() {

  //player parameters
  this.playerSpeed = 150;
  this.jumpSpeed = -600;
  secondScene.score = mainScene.score;
  secondScene.continueRight = false;
  secondScene.continueLeft = false;
  secondScene.scoreText;

};

secondScene.preload = function() {

  this.load.image('background', 'assets/cave.jpg')
  this.load.image('ground', 'assets/ground.png');
  this.load.image('platform', 'assets/platform.png');
  this.load.image('brick', 'assets/brick.png');
  this.load.image('treasure', 'assets/treasure.png');
  this.load.image('diamonds', 'assets/di.png');
  this.load.image('fire', 'assets/trap.png');

  this.load.spritesheet('char', 'assets/walk.png', {
    frameWidth: 32,
    frameHeight: 48
  });

  this.load.spritesheet('enemy', 'assets/enemy.png', {
    frameWidth: 36,
    frameHeight: 30
  });

  this.load.audio('bomb', 'assets/audio/bomb.mp3');
  this.load.audio('diamonds', 'assets/audio/diamonds.mp3');
  this.load.audio('jump', 'assets/audio/jump.mp3');
  this.load.audio('end', 'assets/audio/end.mp3');

  //parsing
  this.load.json('levelData2', 'assets/json/levelData2.json');
};

secondScene.create = function() {

  this.background = this.add.tileSprite(0, 0, config.width, config.height, 'background').setOrigin(0, 0);


  //playing the levels
  this.setupLevel();

  //setup spawner balls
  this.setupSpawner();

  //colliding
  this.physics.add.collider([this.player, this.treasure, this.balls], this.platforms);

  //overlap checks
  this.physics.add.overlap(this.player, this.treasure, this.endGame, null, this);
  this.physics.add.overlap(this.player, [this.fire, this.balls], this.restartGame, null, this);


  this.anims.create({
    key: 'walk',
    frames: this.anims.generateFrameNames('char', {start:4, end:7}),
    frameRate: 5,
    yoyo: true,
    repeat: -1
  });

  secondScene.scoreText = secondScene.add.text(16, 16, 'score:' + secondScene.score, {
    fontSize: '32px',
    fill: '#fff'
  });

  this.cursors = this.input.keyboard.createCursorKeys();

  //finding the coordonates in the game
  // this.input.on('pointerdown', function(pointer) {
  //   console.log(pointer.x, pointer.y);
  // });
};

secondScene.update = function() {

  let onGround = this.player.body.blocked.down || this.player.body.touching.down;


  if (this.cursors.left.isDown) {
    this.player.body.setVelocityX(-this.playerSpeed);

    this.player.flipX = false;

    if (!this.player.anims.isPlaying);
    this.player.anims.play('walk');
  } else if (this.cursors.right.isDown) {
    this.player.body.setVelocityX(this.playerSpeed);

    this.player.flipX = true;

    if (onGround && !this.player.anims.isPlaying);
    this.player.anims.play('walk');
  } else {
    this.player.body.setVelocityX(0);
    this.player.anims.stop('walk');

    if (onGround)
      this.player.setFrame(0);
  }

  if (onGround && (this.cursors.space.isDown || this.cursors.up.isDown)) {
    this.player.body.setVelocityY(this.jumpSpeed)

    this.player.setFrame(0);
    this.player.anims.stop('walk');
    let jumpSound = this.sound.add('jump');
    jumpSound.play();
  }
};

secondScene.setupLevel = function() {
    // load json data
    this.levelData2 = this.cache.json.get('levelData2');

    this.physics.world.bounds.width = this.levelData2.world.width;
    this.physics.world.bounds.height = this.levelData2.world.height;

    // create all the platforms
    this.platforms = this.physics.add.staticGroup();
    for (let i = 0; i < this.levelData2.platforms.length; i++) {
      let curr = this.levelData2.platforms[i];

      let newObj;
      // create object
      if (curr.bricksNum == 1) {

        newObj = this.add.sprite(curr.x, curr.y, curr.key).setOrigin(0);
      } else {

        let width = this.textures.get(curr.key).get(0).width;
        let height = this.textures.get(curr.key).get(0).height;
        newObj = this.add.tileSprite(curr.x, curr.y, curr.bricksNum * width, height, curr.key).setOrigin(0);
      }

      this.physics.add.existing(newObj, true);
      this.platforms.add(newObj);
    }

    // create all the fire
    this.fire = this.physics.add.group({
      allowGravity: false,
      immovable: true
    });
    for (let i = 0; i < this.levelData2.fire.length; i++) {
      let curr = this.levelData2.fire[i];

      let newObj = this.add.sprite(curr.x, curr.y, 'fire').setOrigin(0);
      this.fire.add(newObj);

    }

    //create all the diamonds
    this.diamonds = this.physics.add.group({
      allowGravity: false

    });
    for (let i = 0; i < this.levelData2.diamonds.length; i++) {
      let curr = this.levelData2.diamonds[i];

      let newObj = this.add.sprite(curr.x, curr.y, 'diamonds').setOrigin(0);
      // add to the group
      this.diamonds.add(newObj);


    }

    //player
    this.player = this.add.sprite(this.levelData2.player.x, this.levelData2.player.y, 'char', 0);
    this.physics.add.existing(this.player);
    this.player.body.setCollideWorldBounds(true);


    //treasure
    this.treasure = this.add.sprite(this.levelData2.treasure.x, this.levelData2.treasure.y, 'treasure');
    this.physics.add.existing(this.treasure);



    // game over
    secondScene.restartGame = function(sourceSprite, targetSprite) {
      secondScene.scene.start('End', {
        score: secondScene.score

      });
    };

    //you youWon
    secondScene.endGame = function(sourceSprite, targetSprite) {
      secondScene.scene.start('youWon', {
        score: secondScene.score
      });
    };

    //diamonds collecting
    secondScene.colectDiamonds = function(player, diamonds) {
      diamonds.destroy()
      let diamondsSound = this.sound.add('diamonds');
      diamondsSound.play();

      secondScene.score += 10;
      secondScene.scoreText.setText('Score: ' + secondScene.score);
    }
    this.physics.add.overlap(this.player, this.diamonds, this.colectDiamonds, null, this);

    //generate balls
    secondScene.setupSpawner = function() {
      this.balls = this.physics.add.group({
        bounceY: 0.1,
        bounceX: 1,
        collideWorldBounds: true
      });

      //span balls
      let spawnEvent = this.time.addEvent({
        delay: this.levelData2.spawner.interval,
        loop: true,
        callbackScope: this,
        callback: function() {
          //create balls
          let ball = this.balls.create(this.treasure.x, this.treasure.y, 'enemy')
          //set proprieties
          ball.setVelocityX(this.levelData2.spawner.speed);
          //duration
          this.time.addEvent({
            delay: this.levelData2.spawner.lifespan,
            repeat: 0,
            callbackScope: this,
            callback: function() {
              ball.destroy();
            }
          })
        }
      });
    };


};
