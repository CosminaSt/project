let youWonScene = new Phaser.Scene('youWon');
console.log('incarca');
youWonScene.init = function(sceneConfig)  {
		score = sceneConfig.score;
}

// Runs second and is used to set all the images used in the game
youWonScene.preload = function(sceneConfig) {

	youWonScene.load.image('background', 'assets/cave.jpg');

};

youWonScene.create = function()  {
	youWonScene.add.sprite(0,0, 'background').setOrigin(0);
	youWonScene.gameOver = youWonScene.add.text(80, 300, 'Congratz! You managed to collect the treasure', fontStyle);
	youWonScene.gameOver.x = youWonScene.centerX(youWonScene.gameOver);

	youWonScene.finalScore = youWonScene.add.text(0, 200,
												'Score: ' + score, fontStyle);
	youWonScene.finalScore.x = youWonScene.centerX(youWonScene.finalScore);
	youWonScene.startNewGame = youWonScene.add.text(0, 400, 'Start Game', fontStyle);
	youWonScene.startNewGame.x = youWonScene.centerX(youWonScene.startNewGame);
	youWonScene.startNewGame.setInteractive();
	youWonScene.startNewGame.on('pointerdown', function(pointer, localX, localY)  {
		youWonScene.scene.start('Main');
	});

	youWonScene.input.keyboard.on('keyup_UP',  function(event)  {
		console.log('changing scene');
		youWonScene.scene.start('Main');
	});
};

youWonScene.centerX = function(text) {
		return (config.width/2 - text.width/2);

}
