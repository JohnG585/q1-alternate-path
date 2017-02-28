var g44Game = g44Game || {};
g44Game.BootState = {
    init: function() {
        this.game.stage.backgroundColor = "000";
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
    },
    preload: function() {
        this.load.image('loading', 'assets/images/loading.png')
    },
    create: function() {
        this.state.start('Preload');
    }
}
