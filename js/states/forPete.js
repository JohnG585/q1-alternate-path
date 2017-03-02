var g44Game = g44Game || {};
g44Game.forPeteState = {
  create: function(game) {
    var peteScreen;
    peteScreen = this.add.sprite(game.world.centerX, game.world.centerY, 'peteImage');
    peteScreen.anchor.setTo(0.5, 0.5);

    this.firstText = this.game.add.text(290, 60, 'Who doesn\'t like Pete?!',
    { font: 'VT323', fontSize: '60px', fill: '#fff' });

    this.goButton(game, 'Do it for Pete!', game.world.centerX, game.world.centerY + 300, 300, 100, function() {
      this.state.start('firstScreen');
    });
  },

  goButton: function(game, string, x, y, w, h, callback) {
    var button1 = game.add.button(x, y, 'button', callback, this, 2, 1, 0);
    button1.anchor.setTo(0.5, 0.5);
    button1.width = w;
    button1.height = h;

    var txt = game.add.text(button1.x, button1.y, string);

    txt.anchor.setTo(0.5, 0.5);
  }
};
