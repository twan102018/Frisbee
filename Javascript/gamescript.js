let ctx, canvasWidth, canvasHeight;
const fps = 60;
const interval = 1000 / fps;
canvasHeight = 800;
canvasWidth = 600;
let score = 0;
let numSprites = 10;
const maxSprites = 40;


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
        if (sprites.length < maxSprites) {
            addSprite();
        }
    }, 3000);
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
    Gumball = new Sprite(0,50, 0, 0, 50, 50, 'image/sprite1.png');
    
    for (let i = 0; i < numSprites; i++) {
        addSprite();
    }

    keyObject = new Array(255).fill(false);
    document.addEventListener('keydown', keyDownHandler, false);
    document.addEventListener('keyup', keyUpHandler, false);

    start();
}

function addSprite() {
    const sprite = new Sprite(
        canvasWidth + Math.random() * canvasWidth,
        Math.random() * (canvasHeight - 50),
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
    if (keyObject[38]) { // Up arrow key
        Gumball.Y -= 5; // Move up
    }
    if (keyObject[40]) { // Down arrow key
        Gumball.Y += 5; // Move down
    }

    // Ensure Gumball stays within the canvas bounds
    if (Gumball.Y < 0) {
        Gumball.Y = 0;
    }
    if (Gumball.Y + Gumball.height > canvasHeight) {
        Gumball.Y = canvasHeight - Gumball.height;
    }

    for (let i = sprites.length - 1; i >= 0; i--) {
        sprites[i].update();
        if (isCollision(Gumball, sprites[i])) {
            resetGame();
        }
        if (sprites[i].X + sprites[i].width < 0) {
            sprites.splice(i, 1); // Remove sprite if it is out of bounds
        }
    }

    score++;
}

function draw() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    Gumball.draw();
    for (let i = 0; i < sprites.length; i++) {
        sprites[i].draw();
    }

    ctx.fillStyle = '#000';
    ctx.fillText("Score: " + score, 20, 30);
}

function isCollision(first, other) {
    // Add padding to hitboxes
    const padding = 10;

    const xMin = Math.max(first.X + padding, other.X + padding);
    const yMin = Math.max(first.Y + padding, other.Y + padding);
    const xMax = Math.min(first.X + first.width - padding, other.X + other.width - padding);
    const yMax = Math.min(first.Y + first.height - padding, other.Y + other.height - padding);

    return xMin < xMax && yMin < yMax;
}

function resetGame() {
    alert("Game Over! Your score: " + score);
    let username = prompt("Enter your username:");
    if (username != null) {
        // Submit score to server
        let formData = new FormData();
        formData.append('username', username);
        formData.append('score', score);
        console.log("Sending data:", username, score); // Debugging line
        fetch('https://88901.stu.sd-lab.nl/Frisbee/php/scores.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => console.log("Server response:", data)) // Debugging line
        .catch(error => console.error('Error:', error));
    }
    score = 0;
    Gumball.X = 80;
    Gumball.Y = 100;
    sprites.forEach(sprite => {
        sprite.reset();
    });
}


