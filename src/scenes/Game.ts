import Phaser from 'phaser'
import {createHeroAnims} from '../anims/character-anims';
import {createLizardAnims} from '../anims/enemy-anims';
import Lizard from '../enemies/Lizard'
// import {debugDraw} from '../utils/debug'

export default class GameScene extends Phaser.Scene
{
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
    private faune!: Phaser.Physics.Arcade.Sprite
    private lizard!: Phaser.Physics.Arcade.Sprite
	constructor() {
		super('game')
	}

	preload() {
       this.cursors = this.input.keyboard.createCursorKeys();
    }

    create() {
        const map = this.make.tilemap({key: 'dungeon'});
        const tileset = map.addTilesetImage('dungeon', 'tiles');

        map.createLayer('ground', tileset);
        const groundLayer = map.createLayer('ground2', tileset);
        const wallsLayer = map.createLayer('walls', tileset);

        wallsLayer.setCollisionByProperty({collides: true});
        groundLayer.setCollisionByProperty({collides: true});

        // debugDraw(wallsLayer, this);
        // debugDraw(groundLayer, this);

        this.faune = this.physics.add.sprite(128, 128, 'faune', 'walk-down-3.png');
        this.faune.body.setSize(16, 24);

        createHeroAnims(this.anims);

        this.faune.anims.play('faune-idle-down');
        this.cameras.main.startFollow(this.faune, true);

        const lizards = this.physics.add.group({
            classType: Lizard,
            createCallback: (go) => {
                const lizGo = go as Lizard;
                lizGo.body.onCollide = true;
            }
        });

        createLizardAnims(this.anims);
        const lizard1 = lizards.get(50, 50, 'lizard');
        lizard1.body.setSize(16, 20);
        lizard1.body.offset.y = 8;

        this.physics.add.collider(this.faune, wallsLayer);
        this.physics.add.collider(this.faune, groundLayer);
        this.physics.add.collider(lizards, wallsLayer);
        this.physics.add.collider(lizards, this.faune);
    }

    update(t: number, dt: number) {
        if(!this.cursors || !this.faune) return;
        
        const speed = 100;

        if (this.cursors.left?.isDown) {
            this.faune.anims.play('faune-run-side', true);
            this.faune.setVelocity(-speed, 0);
            this.faune.scaleX = -1;
            this.faune.body.offset.x = 24;
        } else if (this.cursors.right?.isDown) {
            this.faune.anims.play('faune-run-side', true);
            this.faune.setVelocity(speed, 0);
            this.faune.scaleX = 1;
            this.faune.body.offset.x = 8;
        } else if (this.cursors.up?.isDown) {
            this.faune.anims.play('faune-run-up', true);
            this.faune.setVelocity(0, -speed);
        } else if (this.cursors.down?.isDown) {
            this.faune.anims.play('faune-run-down', true);
            this.faune.setVelocity(0, speed);
        } else {
            this.faune.setVelocity(0, 0);
            const parts = this.faune.anims.currentAnim.key.split('-');
            parts[1] = 'idle';
            this.faune.anims.play(parts.join('-'));
        }
    }
}
