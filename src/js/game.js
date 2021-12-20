// importera alla scener
import PlayScene from './play-scene';
import PreloadScene from './preload-scene';
import MenuScene from './menu-scene';

// spelets config
const config = {
    type: Phaser.AUTO,
    width: 1750,
    height: 640,
    pixelArt: true,
    transparent: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 400 },
            debug: false
        }
    },
    scene: [PreloadScene, PlayScene, MenuScene],
    parent: 'game'
};

// initiera spelet
new Phaser.Game(config);
