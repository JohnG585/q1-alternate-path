var g44Game = g44Game || {};
g44Game.PreloadState = {
    preload: function() {
        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loading');
        this.preloadBar.anchor.setTo(0.5);
        this.preloadBar.scale.setTo(1);

        this.load.setPreloadSprite(this.preloadBar);

        this.load.image('background', 'assets/images/background.png');
        this.load.image('platform', 'assets/images/platform.png');
        this.load.image('ground', 'assets/images/ground.png');
        this.load.image('goal', 'assets/images/gorilla3.png');
        this.load.image('barrel', 'assets/images/barrel.png');
        this.load.image('beer', 'assets/images/beermug.png');
        this.load.image('background2', 'assets/images/black_background.png');
        this.load.audio('coin', ['assets/images/coin.mp3', 'assets/images/coin.ogg']);
        this.load.image('titleScreen', 'assets/images/walnut_title.png');
        this.load.image('button', 'assets/images/orange.png');
        this.load.image('craigOT', 'assets/images/craig_death.png');
        this.load.image('lisaOT', 'assets/images/lisa_death.png');
        this.load.audio('castlevania', ['assets/images/castelvania.mp3', 'assets/images/castlevania.ogg']);

       this.load.spritesheet('player2', 'assets/images/lisa_walk.png', 48, 52, 4, 1, 1);
       this.load.spritesheet('fire', 'assets/images/fire_spritesheet.png', 20, 21, 5, 1, 1);
       this.load.spritesheet('player', 'assets/images/craig_walk.png', 52, 57, 5, 1, 1);

    },
    create: function() {
        this.state.start('MainMenu');
    }
}
