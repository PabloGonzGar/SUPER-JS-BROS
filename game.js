
import { createAnimations } from './animations.js'
import { checkControls } from './controls.js';
import { initAudio } from './audios.js';
import { playAudio } from './audios.js';
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
    
    this.load.spritesheet(
        'goomba',
        'assets/entities/overworld/goomba.png',
        { frameWidth: 16, frameHeight: 16 }
    )


    // -- sound
    initAudio(this)

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


    this.enemy = this.physics.add.sprite(120, config.height - 30, 'goomba')
        .setOrigin(0, 1)
        .setGravityY(300)
        .setVelocityX(-50)
    
    this.enemy.anims.play('goomba-walk')



    this.physics.world.setBounds(0, 0, 2000, config.height)

    this.physics.add.collider(this.mario, this.floor)
    this.physics.add.collider(this.mario, this.enemy,  onHitEnemy , null , this)
    this.physics.add.collider(this.floor , this.enemy)

    this.cameras.main.setBounds(0, 0, 2000, config.height)
    this.cameras.main.startFollow(this.mario)

    this.keys = this.input.keyboard.createCursorKeys()
}//2.


function onHitEnemy(mario, enemy) {
    if(mario.body.touching.down && enemy.body.touching.up) {
        enemy.anims.play('goomba-dead', true)

        playAudio('goomba-stomp', this)

        enemy.setVelocityX(0)
        mario.setVelocityY(-200)

        setTimeout(()=>{
            enemy.destroy()
        }, 300)
    }else{
        enemy.setVelocityX(0)
        killMario(this)
    }
}


function update() {//3. continuamente
    
    const { mario} = this

    checkControls(this)


    if (mario.isDead) return

    if (mario.y >= config.height) {
        killMario(this)     
    }

}

function killMario(game) { 
    const { mario , scene} = game

    if(mario.isDead) return

    mario.isDead = true
    mario.anims.play('mario-dead')
    mario.setVelocityX(0)
    mario.setCollideWorldBounds(false)

    playAudio('gameover', game , {volume: 0.1})

    mario.body.checkCollision.down = false

    setTimeout(() => {
        mario.setVelocityY(-350)
    }, 100)

    setTimeout(() => {
        scene.restart()
    }, 2000)
}
