let endScene = new Phaser.Scene('End');

const fontStyleStartDirections = { fontSize: '20px', fill: '#fff', padding: 2};

let score = 0;

endScene.init = function(sceneConfig)  {
		score = sceneConfig.score;
		let ambianceSound
}

// Runs second and is used to set all the images used in the game
endScene.preload = function(sceneConfig) {

	endScene.load.image('background', 'assets/cave.jpg');

};

endScene.create = function()  {
	endScene.add.sprite(0,0, 'background').setOrigin(0);
	endScene.gameOver = endScene.add.text(80, 300, 'Game Over', fontStyle);
	endScene.gameOver.x = endScene.centerX(endScene.gameOver);

	endScene.finalScore = endScene.add.text(0, 200,
												'Score: ' + score, fontStyle);
	endScene.finalScore.x = endScene.centerX(endScene.finalScore);
	endScene.startNewGame = endScene.add.text(0, 400, 'Start Game', fontStyle);
	endScene.startNewGame.x = endScene.centerX(endScene.startNewGame);
	endScene.startNewGame.setInteractive();
	endScene.startNewGame.on('pointerdown', function(pointer, localX, localY) {
		endScene.scene.start('Main');
	});

	endScene.input.keyboard.on('keyup_UP',  function(event)  {
		console.log('changing scene');
		endScene.scene.start('Main');
	

	});
};

endScene.centerX = function(text) {
		return (config.width/2 - text.width/2);

}
