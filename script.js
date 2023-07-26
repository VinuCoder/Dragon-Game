console.log("vinu")
score = 0;
cross = true;

audio = new Audio('music.mp3');
audiogo = new Audio('gameover.mp3');
setTimeout(() => {
    audio.play();
}, 1000);
// making dino and obstacle reactive when key clicked
document.onkeydown = function (e) {
    console.log("targetted key value is :", e.key);
    if (e.key === 'ArrowUp') {
        dino = document.querySelector('.dino');
        dino.classList.add('animatedDino')
        setTimeout(() => {
            dino.classList.remove('animatedDino')
        }, 700);
    };
    if (e.key === 'ArrowRight') {
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dinoX + 128 + "px";
    };
    if (e.key === 'ArrowLeft') {
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dinoX + -128 + "px";
    };
}

// Check the collision situation
setInterval(() => {
    dino = document.querySelector('.dino');
    gameover = document.querySelector('.gameover');
    obstacle = document.querySelector('.obstacle');

    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);
    // console.log(offsetX,offsetY)
    if (offsetX < 93 && offsetY < 53) {
        gameover.innerHTML = "Game Over "
        obstacle.classList.remove('obstacleAni')
        dino.style.bottom = "-40vh"
        audiogo.play();
        setTimeout(() => {
            audiogo.pause();
            audio.pause();
        }, 1000);
    }
    else if (offsetX < 145 && cross) {
        // Update score
       score += 1;
       updatescore(score);
        cross = false;
        setTimeout(() => {
            cross = true
        }, 600);

        // Increase speed of obstacle with time
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.1;
            obstacle.style.animationDuration = newDur + "s";
        }, 400);
    }
}, 10);

function updatescore(score) {
    scoreCont.innerHTML = "Your Score : " + score
}