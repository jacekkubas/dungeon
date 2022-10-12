import Phaser from 'phaser';

export const debugDraw = (layer: Phaser.Tilemaps.TilemapLayer, scene: Phaser.Scene) => {
  const debugGraphics = scene.add.graphics().setAlpha(0.3);

    layer.renderDebug(debugGraphics, {
      tileColor: null,
      collidingTileColor: new Phaser.Display.Color(243,243,48, 255),
      faceColor: new Phaser.Display.Color(40, 40, 40, 255)
  });
}
