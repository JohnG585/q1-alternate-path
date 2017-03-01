var g44Game = g44Game || {};
g44Game.gameEndState = {
    create: function(game) {
            var musicEnd;
            this.musicEnd = this.game.add.audio('end');
            this.musicEnd.volume = 0.8;

            this.musicEnd.play();

        var endScreen;
        endScreen = this.add.sprite(game.world.centerX, game.world.centerY, 'castle');
        endScreen.anchor.setTo(0.5, 0.5);
        this.createButton(game, "Main Menu", game.world.centerX, game.world.centerY +150, 300, 100, function() {
            this.state.start('MainMenu');
            this.musicEnd.stop();
        })
    },
    update: function(game) {

    },
    createButton: function(game, string,x,y,w,h,callback) {
        var button1 = game.add.button(x,y,'button', callback, this, 2,1,0);
        button1.anchor.setTo(0.5,0.5);
        button1.width = w;
        button1.height = h;

        var txt = game.add.text(button1.x, button1.y, string);
        txt.className = "button";

        txt.anchor.setTo(0.5, 0.5);

    }
}
