var g44Game = g44Game || {};

g44Game.game = new Phaser.Game(800, 600, Phaser.AUTO);

g44Game.game.state.add('Boot', g44Game.BootState);
g44Game.game.state.add('Preload', g44Game.PreloadState);
g44Game.game.state.add('MainMenu', g44Game.MenuState);
g44Game.game.state.add('Game', g44Game.GameState);
g44Game.game.state.add('Level2', g44Game.Level2State);
g44Game.game.state.add('About', g44Game.AboutState);

g44Game.game.state.start('Boot');
