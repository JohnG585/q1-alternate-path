var g44Game = g44Game || {};

g44Game.GameState = {

   init: function() {

       this.game.physics.arcade.gravity.y = 1000;


       this.cursors = this.game.input.keyboard.createCursorKeys();

       this.game.world.setBounds(0, 0, 1100, 700)

       this.RUNNING_SPEED = 180;
       this.JUMPING_SPEED = 560;
       this.BOUNCING_SPEED = 150;

   },

   preload: function () {

       this.load.spritesheet('fire', 'assets/images/fire_spritesheet.png', 20, 21, 5, 1, 1);
       this.load.spritesheet('player', 'assets/images/craig_walk.png', 52, 57, 5, 1, 1);

       //load json
       this.load.text('level', 'assets/data/level.json');

   },

   create: function () {

       this.background = this.game.add.sprite(0, 0, 'background');
        //originally I had created seperate elements, but along the way learned of "groups"

         var groundData = [
           {'x':0, 'y':627},
           {'x':350, 'y':627},
           {'x':500, 'y':627},
           {'x':850, 'y':627},
               ];

       //parsing json
       this.levelData = JSON.parse(this.game.cache.getText('level'));

       this.grounds = this.add.group();
       this.grounds.enableBody = true;

       groundData.forEach(function(element) {
           this.grounds.create(element.x, element.y, 'ground')
       }, this);

       this.grounds.setAll('body.immovable', true);
       this.grounds.setAll('body.allowGravity', false);

       this.platforms = this.add.group();
       this.platforms.enableBody = true;

       this.levelData.platformData.forEach(function(element) {
           this.platforms.create(element.x, element.y, 'platform')
       }, this);

       this.platforms.setAll('body.immovable', true);
       this.platforms.setAll('body.allowGravity', false);

       //fires

       this.fires = this.add.group();
       this.fires.enableBody = true;

       var fire;
       this.levelData.fireData.forEach(function(element) {
           fire=this.fires.create(element.x, element.y, 'fire');
           fire.animations.add('fire', [0, 1], 4, true);
           fire.play('fire');
       }, this);

       this.fires.setAll('body.allowGravity', false);

       //beer

       this.beers = this.add.group();
       this.beers.enableBody=true;
       this.game.physics.arcade.enable(this.beers);

       this.levelData.beerCase.forEach(function(element) {
           this.beers.create(element.x, element.y, 'beer');
       }, this);
       this.beers.setAll('body.allowGravity', false);

       //goal

       this.goal = this.add.sprite(this.levelData.goal.x, this.levelData.goal.y, 'goal')
       this.game.physics.arcade.enable(this.goal);
       this.goal.body.allowGravity = false;

       this.player = this.add.sprite(this.levelData.playerStart.x, this.levelData.playerStart.y, 'player', 2);
       this.player.anchor.setTo(0.5);
       this.player.animations.add('walking', [0, 1,], 6, true);
       this.game.physics.arcade.enable(this.player);
       this.player.body.collideWorldBounds = true;

       this.game.camera.follow(this.player);

       this.barrels = this.add.group();
       this.barrels.enableBody = true;
       this.createBarrel();
       this.barrelCreate = this.game.time.events.loop(Phaser.Timer.SECOND * this.levelData.barrelRelease, this.createBarrel, this)

       // this.collectBeersLabel = this.add.text(6, 30, "0")
   },

   update: function () {

       this.score = 0;
       this.scoreText = this.game.add.text(500, 50, 'score:', { fontSize: '32px', fill: '#000' });

       this.game.physics.arcade.collide(this.player, this.grounds);
       this.game.physics.arcade.collide(this.player, this.platforms);

       this.game.physics.arcade.collide(this.barrels, this.grounds);
       this.game.physics.arcade.collide(this.barrels, this.platforms);
       this.game.physics.arcade.collide(this.player, this.barrels, hitBarrel, null, this);

       this.game.physics.arcade.overlap(this.player, this.fires, this.killsPlayer, null, this);
       this.game.physics.arcade.overlap(this.player, this.goal, this.wins, null, this);
       this.game.physics.arcade.overlap(this.player, this.beers, collectBeers, null, this);

       this.player.body.velocity.x = 0;

       if(this.cursors.left.isDown) {
           this.player.body.velocity.x = -this.RUNNING_SPEED;
           this.player.play('walking');
           this.player.scale.setTo(-1,1);
       }
       else if(this.cursors.right.isDown) {
           this.player.body.velocity.x = this.RUNNING_SPEED;
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
       var barrel;
       this.barrels.forEach(function(element) {


           if(element.x > 280 && element.x <290 && element.y > 160) {
               element.kill();
           }

       },this)

   function collectBeers (player, beers){
   beers.kill();

  this.score += 10;
  this.scoreText.text += this.score;

   }
      function hitBarrel(player, barrels) {
    if(barrels.body.touching.up) {
      barrels.kill();
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
       var death = $("<div class='text-centered'>'OH NOES! <br> CRAIG DIED!'</div>");
       $('body').append(death);
       Materialize.toast(death, 5000)
       this.game.state.start('Game');
   },
   wins: function() {
       this.game.state.start('Game');
        alert("You Won!");
   },
   createBarrel: function() {
       var barrel = this.barrels.getFirstExists(false);

       if(!barrel) {
           barrel = this.barrels.create(0,0, 'barrel');
       }

       barrel.body.collideWorldBounds = true;
       barrel.body.bounce.set(1,0);

       barrel.reset(this.levelData.goal.x, this.levelData.goal.y);
       barrel.body.velocity.x = this.levelData.barrelSpeed;
       barrel.body.bounce.set(1);
   },
};
