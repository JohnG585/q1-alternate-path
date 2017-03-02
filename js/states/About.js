var g44Game = g44Game || {};
g44Game.AboutState = {
    create: function(game) {
        var aboutScreen;
        aboutScreen = this.add.sprite(game.world.centerX, game.world.centerY, 'aboutScreen');
        aboutScreen.anchor.setTo(0.5, 0.5);
        this.aboutText = this.game.add.text(10, 10, 'The rules are easy:',
        { fontSize: '40px', fill: '#000' });
        this.aboutText = this.game.add.text(50, 80, '- Avoid the fires!',
        { fontSize: '20px', fill: '#000' });
        this.aboutText = this.game.add.text(50, 130, '- The beers, such as real life, are valuable. Collect as many as you can',
        { fontSize: '20px', fill: '#000' });
        this.aboutText = this.game.add.text(50, 180, '- The barrels can kill you, but you can also kill them! Jump on them for points!',
        { fontSize: '20px', fill: '#000' });
        this.aboutText = this.game.add.text(50, 230, '- To jump, press the \'UP\' arrow on your keyboard',
        { fontSize: '20px', fill: '#000' });
        this.aboutText = this.game.add.text(50, 280, '- To move around the level, press the \'LEFT\' or \'RIGHT\' arrow keys on your keyboard',
        { fontSize: '20px', fill: '#000' });
        this.aboutText = this.game.add.text(50, 330, '- To beat the level, you must get to the \'goal\' (whatever is trying to kill you) on that level',
        { fontSize: '20px', fill: '#000' });
        this.aboutText = this.game.add.text(50, 380, '- Talk to Craig, John\'s instructor, and make sure John\'s getting at least a passing grade. The game won\'t end' ,
        { fontSize: '20px', fill: '#000' });
        this.aboutText = this.game.add.text(65, 400, 'otherwise.',
        { fontSize: '20px', fill: '#000' });
        this.createButton(game, "Back to Menu", game.world.centerX, game.world.centerY +200, 300, 100, function() {
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
