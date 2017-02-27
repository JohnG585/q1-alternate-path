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
        this.load.audio('coin', ['assets/images/coin.mp3', 'assets/images/coin.ogg']);


      this.load.spritesheet('fire', 'assets/images/fire_spritesheet.png', 20, 21, 5, 1, 1);
      this.load.spritesheet('player', 'assets/images/craig_walk.png', 52, 57, 5, 1, 1);

    },
    create: function() {
        this.state.start('Game');
    }
};
