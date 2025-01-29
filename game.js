
import { createAnimations } from './animations.js'
/**global Phaser */
const config = {
    type: Phaser.AUTO,
    width: 256,
    height: 244,
    backgroundColor: '#049cd8',
    parent: 'game',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload, //se ejecuta para precargar recursos
        create, //se ejecuta cuando el juego empieza
        update //se ejecuta en cada frame
    }
}

new Phaser.Game(config);
// this -> game -> juego que estamos construyendo

function preload() {
    this.load.image(
        'cloud1',
        'assets/scenery/overworld/cloud1.png'
    )
    this.load.spritesheet(
        'mario',
        'assets/entities/mario.png',
        { frameWidth: 18, frameHeight: 16 }
    )

    this.load.image(
        'floorbricks',
        'assets/scenery/overworld/floorbricks.png'
    )

    this.load.audio('gameover', 'assets/sound/music/gameover.mp3')

} //1.



function create() {

    //image(x, y, id-del-asset)
    this.add.image(100, 50, 'cloud1')
        .setOrigin(0, 0)
        .setScale(0.15)

    // this.mario = this.add.sprite(50, 210, 'mario')
    //     .setOrigin(0, 1)


    createAnimations(this)

    this.floor = this.physics.add.staticGroup()


    this.floor.create(0, config.height - 16, 'floorbricks')
        .setOrigin(0, 0.5)
        .refreshBody()

    this.floor.create(150, config.height - 16, 'floorbricks')
        .setOrigin(0, 0.5)
        .refreshBody()

    this.mario = this.physics.add.sprite(50, 190, 'mario')
        .setOrigin(0, 1)
        .setCollideWorldBounds(true)
        .setGravityY(500)


    this.physics.world.setBounds(0,0,2000,config.height)
    this.physics.add.collider(this.mario, this.floor)

    this.cameras.main.setBounds(0, 0, 2000, config.height)
    this.cameras.main.startFollow(this.mario)

    this.keys = this.input.keyboard.createCursorKeys()
}//2.


function update() {//3. continuamente
    //console.log('update');


    if(this.mario.isDead){
        return
    }

    if (this.keys.left.isDown) {
        this.mario.flipX = true
        this.mario.x -= 1.5
        this.mario.anims.play('mario-walk', true)
    } else
        if (this.keys.right.isDown) {
            this.mario.flipX = false
            this.mario.x += 1.5
            this.mario.anims.play('mario-walk', true)
        } else {
            this.mario.anims.play('mario-idle', true)
        }

    if (this.keys.up.isDown && this.mario.body.touching.down) {
        this.mario.setVelocityY(-300)
        this.mario.anims.play('mario-jump')
    }


    if(this.mario.y >= config.height){
        this.mario.isDead = true
        this.mario.anims.play('mario-dead')
        this.mario.setCollideWorldBounds(false)

        this.sound.add('gameover', {volume: 0.2}).play()

        setTimeout(()=>{
            this.mario.setVelocityY(-350)
        },50)

        setTimeout(()=>{
            this.scene.restart()
        },7000)
    }

}
