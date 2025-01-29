export const createAnimations = (game)=> {
    game.anims.create({
        key: 'mario-walk',
        frames: game.anims.generateFrameNumbers(
            'mario',
            { start: 1, end: 3 }
        ),
        frameRate: 12,
        repeat: -1
    })

    game.anims.create({
        key: 'mario-idle',
        frames: game.anims.generateFrameNumbers(
            'mario',
            { start: 0, end: 0 }
        ),
        frameRate: 12,
        repeat: -1
    })

    game.anims.create({
        key: 'mario-jump',
        frames: [{ key: 'mario', frame: 5 }]
    })

    game.anims.create({
        key: 'mario-dead',
        frames: [{ key: 'mario', frame: 4 }]
    })
}
