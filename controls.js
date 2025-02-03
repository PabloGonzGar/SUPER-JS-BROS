export function checkControls({mario, keys}) {

    const isMarioTouchingFloor = mario.body.touching.down
    const isLeftKeyDown = keys.left.isDown
    const isRightKeyDown = keys.right.isDown
    const isUpKeyDown = keys.up.isDown


    if (mario.isDead) return

    if (isLeftKeyDown) {
        mario.flipX = true
        mario.x -= 1.5
        if (isMarioTouchingFloor) {
            mario.anims.play('mario-walk', true)
        }
    } else if (isRightKeyDown) {
        mario.flipX = false
        mario.x += 1.5
        if (isMarioTouchingFloor) {
            mario.anims.play('mario-walk', true)
        }
    } else if (isMarioTouchingFloor) {
        mario.anims.play('mario-idle', true)
    }

    if (isUpKeyDown && isMarioTouchingFloor) {
        mario.setVelocityY(-300)
        mario.anims.play('mario-jump')
    }
}