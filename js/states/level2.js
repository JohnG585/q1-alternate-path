var g44Game = g44Game || {};

g44Game.Level2State = {

   init: function() {

       this.game.physics.arcade.gravity.y = 1000;

       this.cursors = this.game.input.keyboard.createCursorKeys();

       this.game.world.setBounds(0, 0, 1100, 700)

       this.RUN2_SPEED = 250;
       this.JUMPING_SPEED = 560;
       this.BOUNCING_SPEED = 150;

   },

   preload: function () {

       this.load.spritesheet('player', 'assets/images/craig_walk.png', 52, 57, 5, 1, 1);
       this.load.image('barrel2', 'assets/images/barrel.png');
       this.load.image('goal2', 'assets/images/dk.png');
       //load json
       this.load.text('level', 'assets/data/level.json');

   },

   create: function () {

       this.background = this.game.add.sprite(0, 0, 'background2');

         var groundData = [
           {'x':0, 'y':627},
           {'x':350, 'y':627},
           {'x':500, 'y':627},
           {'x':850, 'y':627},
               ];

       this.levelData = JSON.parse(this.game.cache.getText('level'));

       this.grounds = this.add.group();
       this.grounds.enableBody = true;

       groundData.forEach(function(element) {
           this.grounds.create(element.x, element.y, 'ground')
       }, this);

       this.grounds.setAll('body.immovable', true);
       this.grounds.setAll('body.allowGravity', false);

       this.platforms2 = this.add.group();
       this.platforms2.enableBody = true;

       this.levelData.platformData2.forEach(function(element) {
           this.platforms2.create(element.x, element.y, 'platform')
       }, this);

       this.platforms2.setAll('body.immovable', true);
       this.platforms2.setAll('body.allowGravity', false);

       //fires

       this.fires2 = this.add.group();
       this.fires2.enableBody = true;

       var fire2;
       this.levelData.fireData2.forEach(function(element) {
           fire2=this.fires2.create(element.x, element.y, 'fire');
           fire2.animations.add('fire', [0, 1], 4, true);
           fire2.play('fire');
       }, this);

       this.fires2.setAll('body.allowGravity', false);

       //beer

       this.beers = this.add.group();
       this.beers.enableBody=true;
       this.game.physics.arcade.enable(this.beers);

       this.levelData.beerCase2.forEach(function(element) {
           this.beers.create(element.x, element.y, 'beer');
       }, this);
       this.beers.setAll('body.allowGravity', false);

       //goal

       this.goal2 = this.add.sprite(this.levelData.goal2.x, this.levelData.goal2.y, 'goal2')
       this.game.physics.arcade.enable(this.goal2);
       this.goal2.body.allowGravity = false;

       this.player = this.add.sprite(this.levelData.playerStart.x, this.levelData.playerStart.y, 'player', 2);
       this.player.anchor.setTo(0.5);
       this.player.animations.add('walking', [0, 1,], 6, true);
       this.game.physics.arcade.enable(this.player);
       this.player.body.collideWorldBounds = true;

       this.game.camera.follow(this.player);

       this.barrels2 = this.add.group();
       this.barrels2.enableBody = true;
       this.createBarrel2();
       this.barrelCreate = this.game.time.events.loop(Phaser.Timer.SECOND * this.levelData.barrelRelease2, this.createBarrel2, this)

       // this.collectBeersLabel = this.add.text(6, 30, "0")
   },

   update: function () {

       this.score = 0;
       this.scoreText = this.game.add.text(500, 50, 'score:', { fontSize: '32px', fill: '#000' });

       this.game.physics.arcade.collide(this.player, this.grounds);
       this.game.physics.arcade.collide(this.player, this.platforms2);

       this.game.physics.arcade.collide(this.barrels2, this.grounds);
       this.game.physics.arcade.collide(this.barrels2, this.platforms2);
       this.game.physics.arcade.collide(this.player, this.barrels2, hitBarrel, null, this);

       this.game.physics.arcade.overlap(this.player, this.fires2, this.killsPlayer, null, this);
       this.game.physics.arcade.overlap(this.player, this.goal2, this.wins, null, this);
       this.game.physics.arcade.overlap(this.player, this.beers, collectBeers, null, this);

       this.player.body.velocity.x = 0;

       if(this.cursors.left.isDown) {
           this.player.body.velocity.x = -this.RUN2_SPEED;
           this.player.play('walking');
           this.player.scale.setTo(-1,1);
       }
       else if(this.cursors.right.isDown) {
           this.player.body.velocity.x = this.RUN2_SPEED;
           this.player.play('walking');
           this.player.scale.setTo(1,1);
       }
       else {
           this.player.animations.stop();
           this.player.frame = 2;
       }
       if (this.cursors.up.isDown && this.player.body.touching.down) {
           this.player.body.velocity.y = -this.JUMPING_SPEED;
       }
       var barrel2;
       this.barrels2.forEach(function(element) {


           if(element.x > 1050 && element.y > 550) {
               element.kill();
           }

       },this)

   function collectBeers (player, beers){
   beers.kill();

  this.score += 10;
  this.scoreText.text += this.score;

   }
      function hitBarrel(player, barrels2) {
    if(barrels2.body.touching.up) {
      barrels2.kill();
      // this.score += 10;
      // this.scoreText.text += score;
      player.body.velocity.y = -this.BOUNCING_SPEED;
    }
    else {
     this.killsPlayer();
    }
   }
   },
   killsPlayer: function() {
       var death2 = $("<div class='text-centered'>'OH NOES! <br> YOU KILLED LISA!'</div>");
       $('body').append(death2);
       Materialize.toast(death2, 5000)
       this.game.state.start('Level2');
   },
   wins: function() {
        Materialize.toast("LISA IS TEH BEST!", 5000);
        this.game.state.start('');
   },
   createBarrel2: function() {
       var barrel2 = this.barrels2.getFirstExists(false);

       if(!barrel2) {
           barrel2 = this.barrels2.create(0,0, 'barrel');
       }

       barrel2.body.collideWorldBounds = true;
       barrel2.body.bounce.set(1,0);

       barrel2.reset(this.levelData.goal2.x, this.levelData.goal2.y);
       barrel2.body.velocity.x = this.levelData.barrelSpeed2;
   },
};