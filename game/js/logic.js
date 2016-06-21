function updateBreath(game) {
    if (game.scene.penguin.y < TOP_DIST - PINGU_SIZE / 4) {
        game.breath = Math.min(MAX_BREATH, game.breath + BREATH_REPLENISH_RATE);
    } else {
        game.breath = Math.max(0, game.breath - BREATH_DECREASE_RATE);
    }

    for (var i = 0; i < MAX_BREATH; i++) {
        if (game.breath < i + 1 && game.breath > i) {
            game.scene.hud.breathBubbles[i].alpha = game.breath - Math.floor(game.breath);
        } else if (game.breath < i + 1) {
            game.scene.hud.breathBubbles[i].alpha = 0;
        } else {
            game.scene.hud.breathBubbles[i].alpha = 1;
        }
    }
}

function gameUpdate(game) {
    game.score += 1 / FPS;

    game.scene.hud.score.text = "Score: " + Math.floor(game.score);
    if (game.player.yVelocity > -1 * MAX_DROP_SPEED) {
        game.player.yVelocity -= YVELOCITY_DECREASE;
    }

    game.player.yPos = game.player.yPos + -1 * MAX_DROP_SPEED * game.player.yVelocity;
    if (game.player.yPos > game.stage.canvas.height - PINGU_SIZE) {
        game.player.yPos = game.stage.canvas.height - PINGU_SIZE;
    }

    game.scene.penguin.y = game.player.yPos;
    game.scene.penguin.x = game.stage.canvas.width / 4 - PINGU_SIZE;

    for (var i = 0; i < game.scene.obstacles.length; i++) {
        if (collision(game.scene.penguin, game.scene.obstacles[i])) {
            game.scene.obstacles[i].alpha = 0.2;
        } else {
            game.scene.obstacles[i].alpha = 1;
        }
    }

    game.scene.obstacles.map(function (obstacle) {
        obstacle.x -= 1;
        if (obstacle.x < -1 * MAX_OBSTACLE_SIZE) {
            obstacle.y = TOP_DIST / 2 + Math.floor(Math.random() * (game.stage.canvas.height - TOP_DIST));
            obstacle.x = game.stage.canvas.width + Math.random() * MAX_OBSTACLE_SIZE;
            obstacle.rotation = Math.random() * 2 * OBSTACLE_ROTATION - OBSTACLE_ROTATION;
            obstacle.scaleY = 0.5 + (Math.random() / 2);
            obstacle.scaleX = obstacle.scaleY;
            obstacle.scaleY *= STAGE_YSCALE;
            obstacle.scaleX *= STAGE_XSCALE;
        }
    })

    updateBreath(game);
}