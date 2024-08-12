document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('slider');
    let rocketSpeed = 50;
    class Example extends Phaser.Scene {
        text;
        cursors;
        sprite;

        preload() {
            this.load.image('ship', './ship.png');
        }

        create() {
            this.sprite = this.physics.add.image(400, 300, 'ship');
     
            this.sprite.setVelocityX(50);
            // this.sprite.setVelocityY(50); // Set initial vertical speed if needed
        
            slider.value = 50; 
            counter.textContent = slider.value; 
        
            slider.addEventListener('input', () => {
                const value = parseInt(slider.value, 10); 
                counter.textContent = value;
                this.sprite.setVelocityX(value); 
                // this.sprite.setVelocityY(value); 
            });
        
            this.sprite.setDamping(true);
            this.sprite.setDrag(0.99);
            this.sprite.setMaxVelocity(200);
        
            this.cursors = this.input.keyboard.createCursorKeys();
        
            this.text = this.add.text(10, 10, '', { font: '16px Courier', fill: '#00ff00' });
        }
        // slider.addEventListener('input', () => {
        //     const value = parseInt(slider.value, 10);
        //     counter.textContent = value;
        //     rocketSpeed = value;
        // });
        
        //  update() {
        //     this.sprite.setVelocity(0);
        
        //     if (this.input.keyboard.isDown(Phaser.Input.Keyboard.KeyCodes.LEFT)) {
        //         this.sprite.setVelocityX(-rocketSpeed); // Use rocketSpeed for velocity
        //     } else if (this.input.keyboard.isDown(Phaser.Input.Keyboard.KeyCodes.RIGHT)) {
        //         this.sprite.setVelocityX(rocketSpeed); // Use rocketSpeed for velocity
        //     }
        
        //     if (this.input.keyboard.isDown(Phaser.Input.Keyboard.KeyCodes.UP)) {
        //         this.sprite.setVelocityY(-rocketSpeed); // Use rocketSpeed for velocity
        //     } else if (this.input.keyboard.isDown(Phaser.Input.Keyboard.KeyCodes.DOWN)) {
        //         this.sprite.setVelocityY(rocketSpeed); // Use rocketSpeed for velocity
        //     }
        // }

        update() {
            if (this.cursors.up.isDown) {
                this.physics.velocityFromRotation(this.sprite.rotation, 200, this.sprite.body.acceleration);
            } else {
                this.sprite.setAcceleration(0);
            }

            if (this.cursors.left.isDown) {
                // this.sprite.setAngularVelocity(-300);
            } else if (this.cursors.right.isDown) {
                // this.sprite.setAngularVelocity(300);
            } else {
                this.sprite.setAngularVelocity(0);
            }

            this.text.setText(`Speed: ${this.sprite.body.speed}`);

            this.physics.world.wrap(this.sprite, 32);
        }
    }

    const config = {
        type: Phaser.AUTO,
        parent: 'phaser-container',
        width: 800,

        height: 600,
        physics: {
            default: 'arcade',
            arcade: {
                debug: false,
                gravity: { y: 0 }
            }
        },
        scene: Example
    };

    const game = new Phaser.Game(config);
});