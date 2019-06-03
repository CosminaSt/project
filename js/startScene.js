let startScene = new Phaser.Scene('Start');

startScene.preload = function() {

	startScene.load.image('background', 'assets/cave.jpg');

};
startScene.create = function() {
	startScene.add.sprite(0,0, 'background').setOrigin(0);
	startScene.startText = startScene.add.text(80, 400, 'Start Game', fontStyle);
	startScene.startText.setInteractive();
	startScene.startText.on('pointerdown', (pointer, localX, localY) => {
		console.log('changing scene');
		startScene.scene.start('Main');
	});

 startScene.input.keyboard.on('keyup_UP',  (event) => {

		console.log('changing scene');
		startScene.scene.start('Main');

});

	startScene.directions = startScene.add.text(0, 200,
	' Use the arrow keys to move the player around.\n Try to collect as many diamonds as you can without touching the enemys.\n You can start the game by pressing the up key or clicking the start game button.', { fontSize: '20px', fill: '#fff', padding: 150, fontFamily:'Arial', align:'center'});
};
