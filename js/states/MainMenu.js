var g44Game = g44Game || {};
g44Game.MenuState = {
  create: function(game) {

    var intromusic;
    this.intromusic = this.game.add.audio('intro', 0.4);
    this.intromusic.play();

    var titleScreen;
    titleScreen = this.add.sprite(game.world.centerX + 150, game.world.centerY, 'titleScreen');
    titleScreen.anchor.setTo(0.5, 0.5);
    this.createButton(game, 'Play Game', game.world.centerX - 350, game.world.centerY + 150, 300, 100, function() {
      this.state.start('firstScreen');
      this.intromusic.stop();
    });
    this.createButton(game, 'How To Play', game.world.centerX - 350, game.world.centerY + 275, 300, 100, function() {
      this.state.start('About');
      this.intromusic.stop();
    });
  },

  createButton: function(game, string, x, y, w, h, callback) {
    var button1 = game.add.button(x, y, 'button', callback, this, 2, 1, 0);
    button1.anchor.setTo(0.5, 0.5);
    button1.width = w;
    button1.height = h;

    var txt = game.add.text(button1.x, button1.y, string);

    txt.anchor.setTo(0.5, 0.5);
  }
};
