class PlayScene extends Phaser.Scene {
    constructor() {
        super('PlayScene');
        this.score = 0;
    }

    create() {
        // variabel för att hålla koll på hur många gånger vi spikat oss själva
        this.spiked = 0;

        // ladda spelets bakgrundsbild, statisk
        // setOrigin behöver användas för att den ska ritas från top left
        this.background = this.add.image(0, 0, 'background').setOrigin(0, 0);

        // skapa en tilemap från JSON filen vi preloadade
        const map = this.make.tilemap({ key: 'map' });
        // ladda in tilesetbilden till vår tilemap
        const tileset = map.addTilesetImage('jefrens_tilesheet', 'tiles');

        // initiera animationer, detta är flyttat till en egen metod
        // för att göra create metoden mindre rörig
        this.initAnims();

        // keyboard cursors
        this.cursors = this.input.keyboard.createCursorKeys();

        // Ladda lagret Platforms från tilemappen
        // och skapa dessa
        // sätt collisionen
        this.platforms = map.createLayer('Platforms', tileset);
        this.platforms.setCollisionByExclusion(-1, true);
        // platforms.setCollisionByProperty({ collides: true });
        // this.platforms.setCollisionFromCollisionGroup(
        //     true,
        //     true,
        //     this.platforms
        // );
        // platforms.setCollision(1, true, true);

        // skapa en spelare och ge den studs
        this.player = this.physics.add.sprite(50, 300, 'player');
        this.player.setBounce(0.1);
        this.player.setCollideWorldBounds(true);

        // skapa en fysik-grupp
        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 8, y: 30, stepX: 152}
        });

        this.physics.add.collider(this.stars, this.platforms);


        this.stars.children.iterate(function (child) {

            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

        });

        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.overlap(this.player, this.stars, collectStar, null, this);


        function collectStar(player, star) {
            star.disableBody(true, true);

            //this.score += 10;
            this.score += Math.round(Math.random()*50);
            this.updateText();

            if (this.stars.countActive(true) === 0) {
                //  A new batch of stars to collect
                this.stars.children.iterate(function (child) {

                    child.enableBody(true, child.x, 0, true, true);
                    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
                });
            }
        }

        console.log(this.background)
        this.cameras.main.setBounds(0, 0, this.background.displayWidth, this.background.displayHeight);
        this.cameras.main.startFollow(this.player);
        //this.cameras.main.setLerp(0.1,0.1);

        this.spikes = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        // från platforms som skapats från tilemappen
        // kan vi ladda in andra lager
        // i tilemappen finns det ett lager Spikes
        // som innehåller spikarnas position
        /*console.log(this.platforms);
        map.getObjectLayer('Spikes').objects.forEach((spike) => {
            // iterera över spikarna, skapa spelobjekt
            const spikeSprite = this.spikes
                .create(spike.x, spike.y - spike.height, 'spike')
                .setOrigin(0);
            spikeSprite.body
                .setSize(spike.width, spike.height - 20)
                .setOffset(0, 20);
        }); */
        
        // lägg till en collider mellan spelare och spik
        // om en kollision sker, kör callback metoden playerHit
        this.physics.add.collider(
            this.player,
            this.spikes,
            this.playerHit,
            null,
            this
        );

        // krocka med platforms lagret

        // skapa text på spelet, texten är tom
        // textens innehåll sätts med updateText() metoden
        this.scoreText = this.add.text(16, 16, `Score: ${this.score}`, { fontSize: '32px', fill: '#000' });
        this.scoreText.setScrollFactor(0);
        this.updateText();

        // lägg till en keyboard input för W
        this.keyObj = this.input.keyboard.addKey('P', true, true);

        // exempel för att lyssna på events
        //    this.events.on('pause', function () {
        //      console.log('Play scene paused');
        //});
        //this.events.on('resume', function () {
        //    console.log('Play scene resumed');
        //});
    }

    // play scenens update metod
    update() {
        // för pause
        if (this.keyObj.isDown) {
            // pausa nuvarande scen
            this.scene.pause();
            // starta menyscenene
            this.scene.launch('MenuScene');
        }

        // följande kod är från det tutorial ni gjort tidigare
        // Control the player with left or right keys
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-250);
            if (this.player.body.onFloor()) {
                this.player.play('walk', true);
            }
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(250);
            if (this.player.body.onFloor()) {
                this.player.play('walk', true);
            }
        } else {
            // If no keys are pressed, the player keeps still
            this.player.setVelocityX(0);
            // Only show the idle animation if the player is footed
            // If this is not included, the player would look idle while jumping
            if (this.player.body.onFloor()) {
                this.player.play('idle', true);
            }
        }

        // Player can jump while walking any direction by pressing the space bar
        // or the 'UP' arrow
        if (
            (this.cursors.space.isDown || this.cursors.up.isDown) &&
            this.player.body.onFloor()
        ) {
            this.player.setVelocityY(-350);
            this.player.play('jump', true);
        }

        if (this.player.body.velocity.x > 0) {
            this.player.setFlipX(false);
        } else if (this.player.body.velocity.x < 0) {
            // otherwise, make them face the other side
            this.player.setFlipX(true);
        }
    }

    // metoden updateText för att uppdatera overlaytexten i spelet
    updateText() {
        this.scoreText.setText(
            //`Arrow keys to move.`, 
            `Score: ${this.score}`//Deaths: ${this.spiked} 
        );
    }

    // när spelaren landar på en spik, då körs följande metod
    playerHit(player, spike) {
        this.spiked++;
        player.setVelocity(0, 0);
        player.setX(50);
        player.setY(300);
        player.play('idle', true);
        this.score = Math.round(this.score/2);
        let tw = this.tweens.add({
            targets: player,
            alpha: { start: 0, to: 1 },
            tint: { start: 0xff0000, to: 0xffffff },
            duration: 100,
            ease: 'Linear',
            repeat: 5
        });
        this.updateText();
    }

    // när vi skapar scenen så körs initAnims för att ladda spelarens animationer
    initAnims() {
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNames('player', {
                prefix: 'walk_',
                start: 1,
                end: 6
            }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNames('player', {
                prefix: 'idle_',
                start: 1,
                end: 4
            }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNames('player', {
                prefix: 'jump_',
                start: 1,
                end: 3
            }),
            frameRate: 10,
        });
    }
}

export default PlayScene;
