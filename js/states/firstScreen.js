var g44Game = g44Game || {};
g44Game.firstScreenState = {
    create: function(game) {

      var intromusic;

      this.intromusic = this.game.add.audio('intro');
      this.intromusic.volume = 0.4;

      this.intromusic.play();

      this.firstText = this.game.add.text(100, 150, 'Pete the Instructor Has Gone Missing!',
      { font: 'VT323', fontSize: '60px', fill: '#fff', align: 'center' });
      this.firstText = this.game.add.text(100, 300, 'Help Craig, Lisa, and Teddi find him',
      { font: 'VT323', fontSize: '60px', fill: '#fff' });
      this.firstText = this.game.add.text(300, 450, 'before it\'s too late!',
      { font: 'VT323', fontSize: '60px', fill: '#fff' });
      this.goButton(game, 'Go Save Pete!', game.world.centerX - 200, game.world.centerY + 300, 300, 100, function() {
        this.state.start('Game');
        this.intromusic.stop();
      });
      this.goButton(game, "I Don't Care About Pete!", game.world.centerX + 200, game.world.centerY + 300, 320, 100, function() {
        this.state.start('forPete');
        this.intromusic.stop();
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
