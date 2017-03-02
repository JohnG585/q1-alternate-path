var g44Game = g44Game || {};

g44Game.Level3State = {

   init: function() {

       this.game.physics.arcade.gravity.y = 1000;

       this.cursors = this.game.input.keyboard.createCursorKeys();

       this.game.world.setBounds(0, 0, 1100, 700)

       this.RUN3_SPEED = 220;
       this.JUMPING3_SPEED = 590;
       this.BOUNCING_SPEED = 150;

   },

   preload: function () {

       this.load.spritesheet('player3', 'assets/images/teddi_walking.png', 47, 55, 4, 1, 1);
       this.load.image('fireball', 'assets/images/fireball.png');
       this.load.image('goal3', 'assets/images/charizard.png');
       this.load.image('char2', 'assets/images/blue_char.png');
       //load json
       this.load.text('level', 'assets/data/level.json');

   },

   create: function () {

            var music3;
            this.music3 = this.game.add.audio('final');
            this.music3.volume = 0.4;

            this.music3.play();

       this.background = this.game.add.sprite(0, 0, 'final');

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

       this.platforms3 = this.add.group();
       this.platforms3.enableBody = true;

       this.levelData.platformData3.forEach(function(element) {
           this.platforms3.create(element.x, element.y, 'platform')
       }, this);

       this.platforms3.setAll('body.immovable', true);
       this.platforms3.setAll('body.allowGravity', false);

       //beer

       this.beers = this.add.group();
       this.beers.enableBody=true;
       this.game.physics.arcade.enable(this.beers);

       this.levelData.beerCase3.forEach(function(element) {
           this.beers.create(element.x, element.y, 'beer');
       }, this);
       this.beers.setAll('body.allowGravity', false);

       //pete
       this.pete = this.add.sprite(this.levelData.pete.x, this.levelData.pete.y, 'trapped')
       this.game.physics.arcade.enable(this.pete);
       this.pete.body.allowGravity = false;

       //goal

       this.goal3 = this.add.sprite(this.levelData.goal3.x, this.levelData.goal3.y, 'goal3')
       this.game.physics.arcade.enable(this.goal3);
       this.goal3.body.allowGravity = false;

        //second char

        this.char2 = this.add.sprite(this.levelData.char2.x, this.levelData.char2.y, 'char2')
       this.game.physics.arcade.enable(this.char2);
       this.char2.body.allowGravity = false;
       this.char2.body.immovable = true;

       //crates

       this.crates = this.add.group();
       this.crates.enableBody=true;
       this.game.physics.arcade.enable(this.crates);

       this.levelData.cratePalette.forEach(function(element) {
           this.crates.create(element.x, element.y, 'crate');
       }, this);
       this.crates.setAll('body.allowGravity', false);
       this.crates.setAll('body.immovable', true);

       this.player3 = this.add.sprite(this.levelData.playerStart.x, this.levelData.playerStart.y, 'player3', 0);
       this.player3.anchor.setTo(0.5);
       this.player3.animations.add('walking', [1, 2,], 6, true);
       this.game.physics.arcade.enable(this.player3);
       this.player3.body.collideWorldBounds = true;

       this.game.camera.follow(this.player3);

       this.fireball = this.add.group();
       this.fireball.enableBody = true;
       this.createFB();

       this.createFB2();
       this.barrelCreate = this.game.time.events.loop(Phaser.Timer.SECOND * this.levelData.fireRelease, this.createFB, this)
       this.barrelCreate2 = this.game.time.events.loop(Phaser.Timer.SECOND * this.levelData.fireRelease, this.createFB2, this)

        this.score3 = parseInt(localStorage.getItem('high-score'));
        var iamnumber = parseInt(this.score3);
        this.scoreText3 = this.game.add.text(900, 20, 'score:', { fontSize: '32px', fill: '#fff' });
   },

   update: function () {

       this.game.physics.arcade.collide(this.player3, this.grounds);
       this.game.physics.arcade.collide(this.player3, this.platforms3);

       this.game.physics.arcade.collide(this.fireball, this.grounds);
       this.game.physics.arcade.collide(this.fireball, this.platforms3);
       this.game.physics.arcade.collide(this.player3, this.fireball, hitFB, null, this);

       this.game.physics.arcade.overlap(this.player3, this.pete, this.wins, null, this);
       this.game.physics.arcade.overlap(this.player3, this.beers, collectBeers, null, this);

       this.game.physics.arcade.collide(this.fireball, this.crates);
       this.game.physics.arcade.collide(this.crates, this.platforms3);
       this.game.physics.arcade.collide(this.player3, this.crates);

       this.player3.body.velocity.x = 0;

       if(this.cursors.left.isDown) {
           this.player3.body.velocity.x = -this.RUN3_SPEED;
           this.player3.play('walking');
           this.player3.scale.setTo(-1,1);
       }
       else if(this.cursors.right.isDown) {
           this.player3.body.velocity.x = this.RUN3_SPEED;
           this.player3.play('walking');
           this.player3.scale.setTo(1,1);
       }
       else {
           this.player3.animations.stop();
           this.player3.frame = 0;
       }
       if (this.cursors.up.isDown && this.player3.body.touching.down) {
           this.player3.body.velocity.y = -this.JUMPING3_SPEED;
            jump = this.game.add.audio('jump');
            jump.volume = 0.2;

            jump.play();
       }
       var fireball;
       this.fireball.forEach(function(element) {


           if(element.x > 1050 && element.y > 550) {
               element.kill();
           }

       },this)
      this.fireball.forEach(function(element) {


          if(element.x<50 && element.y > 550) {
              element.kill();
          }

      },this)

   function collectBeers (player3, beers){
   beers.kill();

    coin = this.game.add.audio('coin');

    coin.play();

    this.score3 = this.score3 + 10;
    this.scoreText3.text = "score:" + this.score3;

   }
      function hitFB(player3, fireball) {
     this.killsPlayer();
    }
   },

   killsPlayer: function() {
       var death3 = $("<div class='text-centered'>'You got Teddi killed!'</div>");
       $('body').append(death3);
       Materialize.toast(death3, 5000)
       this.music3.stop();
       this.game.state.start('teddiDeath');
   },
   wins: function(player3, pete) {
        Materialize.toast("YOU DID IT, TEDDI!", 5000);
        this.music3.stop();
        this.game.state.start('endGame');
   },
   createFB: function() {
       var fireball = this.fireball.getFirstExists(false);

       if(!fireball) {
           fireball = this.fireball.create(0,0, 'fireball');
       }

       fireball.body.collideWorldBounds = true;
       fireball.body.bounce.set(1,0);

       fireball.reset(this.levelData.goal3.x+55, this.levelData.goal3.y+20);
       fireball.body.velocity.x = this.levelData.fireball;

   },
   createFB2: function() {
       var fireball2 = this.fireball.getFirstExists(false);

       if(!fireball2) {
           fireball2 = this.fireball.create(0,0, 'fireball');
           fireball2.anchor.setTo(.5, 1);
           fireball2.scale.x = -1;
       }

       fireball2.body.collideWorldBounds = true;
       fireball2.body.bounce.set(1,0);

       fireball2.reset(this.levelData.char2.x+20, this.levelData.char2.y+50);
       fireball2.body.velocity.x = -this.levelData.fireball;

   },
};
