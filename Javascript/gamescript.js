function start() {
    let nextFrameTime;
    (function gameloop(timestamp) {
        if (nextFrameTime === undefined) {
            nextFrameTime = timestamp;
        }
        const elapsed = timestamp - nextFrameTime;
        if (elapsed > interval) {
            nextFrameTime = timestamp - (elapsed % interval);
            update();
            draw();
        }
        requestAnimationFrame(gameloop);
    })();

    // Increase the number of sprites every 3 seconds
    setInterval(() => {
        if (sprites.length < game.maxSprites) {
            addSprite();
        }
    }, 3000);
}

function init() {
    document.getElementById("container").style.display = "none";
    document.getElementById("game").style.display = "block";
    // Initialize canvas
    const canvas = document.getElementById('myCanvas');
    canvas.width = game.canvasWidth;
    canvas.height = game.canvasHeight;
    ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, game.canvasWidth, game.canvasHeight);

    // Create Gumball sprite
    Gumball = new Sprite(0, 50, 0, 0, 50, 50, 'image/sprite1.png');
    
    for (let i = 0; i < game.numSprites; i++) {
        addSprite();
    }

    keyObject = new Array(255).fill(false);
    document.addEventListener('keydown', keyDownHandler, false);
    document.addEventListener('keyup', keyUpHandler, false);
    
    // Add touch event listeners
    canvas.addEventListener('touchstart', touchStartHandler, false);
    canvas.addEventListener('touchmove', touchMoveHandler, false);
    canvas.addEventListener('touchend', touchEndHandler, false);

    start();
}

function touchStartHandler(event) {
    const touch = event.touches[0];
    if (touch) {
        handleTouchMove(touch);
    }
}

function touchMoveHandler(event) {
    const touch = event.touches[0];
    if (touch) {
        handleTouchMove(touch);
    }
    event.preventDefault(); // Prevent scrollen
}

function touchEndHandler(event) {
    keyObject[38] = false;
    keyObject[40] = false;
}

function handleTouchMove(touch) {
    const canvasRect = document.getElementById('myCanvas').getBoundingClientRect();
    const touchY = touch.clientY - canvasRect.top;
    
    if (touchY < Gumball.Y) {
        keyObject[38] = true; // Up
        keyObject[40] = false; // Down
    } else if (touchY > Gumball.Y + Gumball.height) {
        keyObject[38] = false; // Up
        keyObject[40] = true; // Down
    } else {
        keyObject[38] = false; // Up
        keyObject[40] = false; // Down
    }
}


function addSprite() {
    const sprite = new Sprite(
        game.canvasWidth + Math.random() * game.canvasWidth,
        Math.random() * (game.canvasHeight - 50),
        -Math.random() * 3 - 2,
        0,
        30,
        50,
        './image/paper.png'
    );
    sprites.push(sprite);
}

function keyDownHandler(event) {
    keyObject[event.keyCode] = true;
}

function keyUpHandler(event) {
    keyObject[event.keyCode] = false;
}

function update() {
    if (keyObject[38]) { // Up arrow 
        Gumball.Y -= 5; // up
    }
    if (keyObject[40]) { // Down arrow 
        Gumball.Y += 5; // down
    }

    // boundries
    if (Gumball.Y < 0) {
        Gumball.Y = 0;
    }
    if (Gumball.Y + Gumball.height > game.canvasHeight) {
        Gumball.Y = game.canvasHeight - Gumball.height;
    }

    for (let i = sprites.length - 1; i >= 0; i--) {
        sprites[i].update();
        if (isCollision(Gumball, sprites[i])) {
            resetGame();
            location.reload();
        }
        if (sprites[i].X + sprites[i].width < 0) {
            // Respawn the sprite
            sprites[i].X = game.canvasWidth + Math.random() * game.canvasWidth;
            sprites[i].Y = Math.random() * (game.canvasHeight - 50);
        }
    }

    game.increaseScore();
}


function draw() {
    ctx.clearRect(0, 0, game.canvasWidth, game.canvasHeight);
    Gumball.draw();
    for (let i = 0; i < sprites.length; i++) {
        sprites[i].draw();
    }

    ctx.fillStyle = '#000';
    ctx.fillText("Score: " + game.getScore(), 20, 30);
}

function isCollision(first, other) {
    // padding hitboxes
    const padding = 10;

    const xMin = Math.max(first.X + padding, other.X + padding);
    const yMin = Math.max(first.Y + padding, other.Y + padding);
    const xMax = Math.min(first.X + first.width - padding, other.X + other.width - padding);
    const yMax = Math.min(first.Y + first.height - padding, other.Y + other.height - padding);

    return xMin < xMax && yMin < yMax;
}

function resetGame() {
    alert("Game Over! Your score: " + game.getScore());
    let username = prompt("Enter your username:");
    if (username != null) {
        // Submit score
        let formData = new FormData();
        formData.append('username', username);
        formData.append('score', game.getScore());
        console.log("Sending data:", username, game.getScore()); // debug
        fetch('https://88901.stu.sd-lab.nl/Frisbee/php/scores.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => console.log("Server response:", data)) // debug
        .catch(error => console.error('Error:', error));
    }
    game.blobvis = 0;
    sprites.forEach(sprite => {
        sprite.reset();
    });
}


