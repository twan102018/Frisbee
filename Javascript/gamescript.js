let ctx, canvasWidth, canvasHeight;
const fps = 60;
const interval = 1000 / fps;
canvasHeight = 800;
canvasWidth = 600;
score = 0;

function start() {
    let volgende;
    (function gameloop(timestamp) {
        if (volgende === undefined) {
            volgende = timestamp;
        }
        const verschil = timestamp - volgende;
        if (verschil > interval) {
            volgende = timestamp - (verschil % interval);
            update();
            draw();
        }
        requestAnimationFrame(gameloop);
    })();
}

function init() {
    document.getElementById("container").style.display = "none";
    document.getElementById("game").style.display = "block";
    // Initialize canvas
    const canvas = document.getElementById('myCanvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    // Create Gumball sprite
    Gumball = new Sprite(10, 600, 0, 0, 100, 200, 'image/sprite1.png');
    
    for (let i = 0; i < numSprites; i++) {
        const sprite = new Sprite(
            canvasWidth + Math.random() * canvasWidth,
            Math.random() * (canvasHeight - 50),
            -Math.random() * 3 - 2,
            0,
            50,
            50,
            './image/paper.png'
        );
        sprites.push(sprite);
    }

    keyObject = new Array(255).fill(false);
    document.addEventListener('keydown', keyDownHandler, false);
    document.addEventListener('keyup', keyUpHandler, false);

    start();
}

function keyDownHandler(event) {
    keyObject[event.keyCode] = true;
}

function keyUpHandler(event) {
    keyObject[event.keyCode] = false;
}

function update() {
    if (keyObject[38] && Gumball.Y + Gumball.height >= canvasHeight) { // Up arrow key
        Gumball.speedY = -15; // Jump
    }

    Gumball.speedY += 1; // Gravity
    Gumball.Y += Gumball.speedY;

    if (Gumball.Y + Gumball.height > canvasHeight) {
        Gumball.Y = canvasHeight - Gumball.height;
        Gumball.speedY = 0;
    }

    for (let i = 0; i < numSprites; i++) {
        sprites[i].update();
        if (isCollision(Gumball, sprites[i])) {
            alert("Game Over! Your score: " + score);
            document.location.reload();
        }
    }

    score++;
}

function draw() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    Gumball.draw();
    for (let i = 0; i < numSprites; i++) {
        sprites[i].draw();
    }

    ctx.fillStyle = '#000';
    ctx.fillText("score: " + score, 20, 30);
}

function isCollision(first, other) {
    const xMin = Math.max(first.X, other.X);
    const yMin = Math.max(first.Y, other.Y);
    const xMax = Math.min(first.X + first.width, other.X + other.width);
    const yMax = Math.min(first.Y + first.height, other.Y + other.height);

    return xMin < xMax && yMin < yMax;
}
