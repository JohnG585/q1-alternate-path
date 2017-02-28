var g44Game = g44Game || {};

g44Game.game = new Phaser.Game(1100, 700, Phaser.AUTO);

g44Game.game.state.add('Boot', g44Game.BootState);
g44Game.game.state.add('Preload', g44Game.PreloadState);
g44Game.game.state.add('MainMenu', g44Game.MenuState);
g44Game.game.state.add('Game', g44Game.GameState);
g44Game.game.state.add('Level2', g44Game.Level2State);
g44Game.game.state.add('About', g44Game.AboutState);
g44Game.game.state.add('craigDeath', g44Game.craigDeathState);
g44Game.game.state.add('lisaDeath', g44Game.lisaDeathState);

g44Game.game.state.start('Boot');
