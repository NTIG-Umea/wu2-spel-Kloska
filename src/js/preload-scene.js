class PreloadScene extends Phaser.Scene {
    constructor() {
        super('PreloadScene');
    }

    preload() {
        // säg åt phaser att lägga till /assets i alla paths
        this.load.setBaseURL('/assets');
        this.load.image('background', '/images/background.png');
        this.load.image('spike', '/images/spike.png');
        this.load.image('star', 'images/star.png');
        this.load.atlas(
            'player',
            '/images/tomte.png',
            '/images/tomte.json'
        );
        this.load.atlas(
            'foe',
            '/images/jefrens_foe.png',
            '/images/jefrens_foe.json'
        );
        this.load.image('tiles', '/tilesets/jefrens_tilesheet.png');
        // här laddar vi in en tilemap med spelets "karta"
        this.load.tilemapTiledJSON('map', '/tilemaps/level1.json');
    }

    create() {
        this.scene.start('PlayScene');
    }
}

export default PreloadScene;