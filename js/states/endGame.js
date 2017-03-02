var g44Game = g44Game || {};
g44Game.gameEndState = {
  create: function(game) {
    var musicEnd;
    this.musicEnd = this.game.add.audio('end');
    this.musicEnd.volume = 0.8;

    this.musicEnd.play();
    this.endText = this.game.add.text(150, 150, 'The team has found Pete!',
        { font: 'VT323', fontSize: '60px', fill: '#000' });
    this.endText = this.game.add.text(150, 150, 'He says he wishes he was in',
        { font: 'VT323', fontSize: '60px', fill: '#000' });
    this.endText = this.game.add.text(150, 150, 'a better game.',
        { font: 'VT323', fontSize: '60px', fill: '#000' });

    var endScreen;
    endScreen = this.add.sprite(game.world.centerX, game.world.centerY, 'castle');
    endScreen.anchor.setTo(0.5, 0.5);
    this.createButton(game, "Main Menu", game.world.centerX, game.world.centerY + 250, 300, 100, function() {
      this.state.start('MainMenu');
      this.musicEnd.stop();
    });
  },
  update: function(game) {

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
