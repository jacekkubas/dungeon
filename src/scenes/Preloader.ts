import Phaser from 'phaser';

export default class Preloader extends Phaser.Scene {
  constructor() {
    super('preloader');
  }

  preload() {
    this.load.image('tiles', 'tiles/dungeon_tiles.png');
    this.load.tilemapTiledJSON('dungeon', 'tiles/dungeon.json');

    this.load.atlas('faune', 'character/fauna.png', 'character/fauna.json')
    this.load.atlas('lizard', 'enemies/lizard.png', 'enemies/lizard.json')
  }

  create() {
    this.scene.start('game');
  }
}