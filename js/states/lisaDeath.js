var g44Game = g44Game || {};
g44Game.lisaDeathState = {
    create: function(game) {
        var music;
        music = game.add.audio('castlevania');

        music.play();

        var lisaOT;
        lisaOT = this.add.sprite(game.world.centerX, game.world.centerY, 'lisaOT');
        lisaOT.anchor.setTo(0.5, 0.5);
        this.createButton2(game, "Play Again", game.world.centerX, game.world.centerY +250, 300, 100, function() {
            this.state.start('Level2');
        })
    },
    update: function(game) {

    },
    createButton2: function(game, string,x,y,w,h,callback) {
        var button1 = game.add.button(x,y,'button', callback, this, 2,1,0);
        button1.anchor.setTo(0.5,0.5);
        button1.width = w;
        button1.height = h;

        var txt = game.add.text(button1.x, button1.y, string);
        // txt.addClass('button2');

        txt.anchor.setTo(0.5, 0.5);

    }
}
