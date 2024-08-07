document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('slider');
    const counter = document.getElementById('counter');
    let rocketSpeed = 50;
  
    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      backgroundColor: '#000',
      parent: 'phaser-container',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          debug: false
        }
      },
      scene: {
        preload: preload,
        create: create,
        update: update
      }
    };
  
    const game = new Phaser.Game(config);
    let rocket;
  
    function preload() {
      this.load.image('rocket', 'https://examples.phaser.io/assets/sprites/space-baddie.png');
    }
  
    function create() {
      rocket = this.physics.add.sprite(400, 300, 'rocket');
      rocket.setCollideWorldBounds(true);
  
      slider.addEventListener('input', () => {
        const value = slider.value;
        counter.textContent = value;
        rocketSpeed = value;
      });
    }
  
    function update() {
      rocket.setVelocity(0);
  
      if (this.input.keyboard.isDown(Phaser.Input.Keyboard.KeyCodes.LEFT)) {
        rocket.setVelocityX(-rocketSpeed);
      } else if (this.input.keyboard.isDown(Phaser.Input.Keyboard.KeyCodes.RIGHT)) {
        rocket.setVelocityX(rocketSpeed);
      }
  
      if (this.input.keyboard.isDown(Phaser.Input.Keyboard.KeyCodes.UP)) {
        rocket.setVelocityY(-rocketSpeed);
      } else if (this.input.keyboard.isDown(Phaser.Input.Keyboard.KeyCodes.DOWN)) {
        rocket.setVelocityY(rocketSpeed);
      }
    }
  });
  