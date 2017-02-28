var g44Game = g44Game || {};
g44Game.AboutState = {
    create: function(game) {
        var titleScreen;
        titleScreen = this.add.sprite(game.world.centerX, game.world.centerY, 'titleScreen');
        titleScreen.anchor.setTo(0.5, 0.5);
        this.aboutText = this.game.add.text(10, 150, 'While attending Galvanize in Boulder, John Gallagher created a game which focused on showcasing his JS/CSS/jQuery knowledge, as well as including two of the instructors who helped him learn.',
        { fontSize: '20px', fill: '#000' });
        this.createButton(game, "Back", game.world.centerX, game.world.centerY +150, 300, 100, function() {
            this.state.start('MainMenu');
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
