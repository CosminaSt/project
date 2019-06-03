let config = {
  type: Phaser.AUTO,
  width: 1000,
  height: 800,
  parent: 'game_area',
  scene: [startScene, mainScene, secondScene, endScene, youWonScene],
  title: 'Jumpin Diamonds',
  pixelArt: false,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 1000
      },
      //debug: true
    }
  }
};

const fontStyle = { fontSize: '32px', fill: '#fff', padding:200, fontFamily:'Arial', align:'center'};

let game = new Phaser.Game(config);
