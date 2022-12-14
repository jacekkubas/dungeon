import Phaser from 'phaser'

import Preloader from './scenes/Preloader';
import GameScene from './scenes/Game'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: 400,
	height: 250,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 },
			debug: true
		}
	},
	scene: [Preloader, GameScene],
	scale: {
		zoom: 2
	}
}

export default new Phaser.Game(config)
