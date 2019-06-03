let mainScene = new Phaser.Scene('Main');


mainScene.init = function() {

  //player parameters
  this.playerSpeed = 120;
  this.jumpSpeed = -600;
  mainScene.score = 0;
  mainScene.continueRight = false;
  mainScene.continueLeft = false;
  mainScene.scoreText;

};

mainScene.preload = function() {

  this.load.image('background', 'assets/cave.jpg')
  this.load.image('ground', 'assets/ground.png');
  this.load.image('platform', 'assets/platform.png');
  this.load.image('brick', 'assets/brick.png');
  this.load.image('goal', 'assets/portal.png');
  this.load.image('diamonds', 'assets/di.png');
  this.load.image('fire', 'assets/fire.png');

  this.load.spritesheet('char', 'assets/walk.png', {
    frameWidth: 48,
    frameHeight: 72,
  });

  this.load.spritesheet('enemy', 'assets/enemy.png', {
    frameWidth: 36,
    frameHeight: 30,
    margin: 1,
    spacing: 1
  });

  this.load.audio('ambiance', 'assets/audio/ambiance.mp3');
  this.load.audio('bomb', 'assets/audio/bomb.mp3');
  this.load.audio('diamonds', 'assets/audio/diamonds.mp3');
  this.load.audio('jump', 'assets/audio/jump.mp3');
  this.load.audio('end', 'assets/audio/end.mp3');

  //parsing
  this.load.json('levelData', 'assets/json/levelData.json');
};

mainScene.create = function() {

  this.background = this.add.tileSprite(0, 0, config.width, config.height, 'background').setOrigin(0, 0);

  let ambianceSound = this.sound.add('ambiance');
  ambianceSound.play();

  //playing the levels
  this.setupLevel();


  //colliding
  this.physics.add.collider([this.player, this.goal], this.platforms);

  //overlap checks
  this.physics.add.overlap(this.player, [this.fire, this.balls], this.gameOver, null, this);
  this.physics.add.overlap(this.player, this.goal, this.secondLvl, null, this);



  this.anims.create({
    key: 'walk',
    frames: this.anims.generateFrameNumbers('char', {start:4, end:7}),
    frameRate: 5,
    repeat: -1
  });
  console.log(this.anims);

  mainScene.scoreText = mainScene.add.text(16, 16, 'score: 0', {
    fontSize: '32px',
    fill: '#fff'
  });

  this.cursors = this.input.keyboard.createCursorKeys();

  // finding the coordonates in the game
  this.input.on('pointerdown', function(pointer) {
    console.log(pointer.x, pointer.y);
  });
};

mainScene.update = function() {

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

mainScene.setupLevel = function() {
    // load json data
    this.levelData = this.cache.json.get('levelData');

    this.physics.world.bounds.width = this.levelData.world.width;
    this.physics.world.bounds.height = this.levelData.world.height;

    // create all the platforms
    this.platforms = this.physics.add.staticGroup();
    for (let i = 0; i < this.levelData.platforms.length; i++) {
      let curr = this.levelData.platforms[i];

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
    for (let i = 0; i < this.levelData.fire.length; i++) {
      let curr = this.levelData.fire[i];

      let newObj = this.add.sprite(curr.x, curr.y, 'fire').setOrigin(0);
      this.fire.add(newObj);

    }

    //create all the diamonds
    this.diamonds = this.physics.add.group({
      allowGravity: false

    });
    for (let i = 0; i < this.levelData.diamonds.length; i++) {
      let curr = this.levelData.diamonds[i];

      let newObj = this.add.sprite(curr.x, curr.y, 'diamonds').setOrigin(0);
      // add to the group
      this.diamonds.add(newObj);

    }

    //player
    this.player = this.add.sprite(this.levelData.player.x, this.levelData.player.y, 'char', 0);
    this.physics.add.existing(this.player);
    this.player.body.setCollideWorldBounds(true);


    //goal
    this.goal = this.add.sprite(this.levelData.portal.x, this.levelData.portal.y, 'goal');
    this.physics.add.existing(this.goal);



    // you won!
    mainScene.gameOver = function(sourceSprite, targetSprite) {
      mainScene.scene.start('End', {
        score: mainScene.score
      });
    };

    //diamonds collecting
    mainScene.colectDiamonds = function(player, diamonds) {
      diamonds.destroy()
      let diamondsSound = this.sound.add('diamonds');
      diamondsSound.play();

      mainScene.score += 10;
      mainScene.scoreText.setText('Score: ' + mainScene.score);
    }
    this.physics.add.overlap(this.player, this.diamonds, this.colectDiamonds, null, this);

    mainScene.secondLvl = function(){
      mainScene.scene.start('secondLvl', {
        score: mainScene.score
      });
    }

  };
