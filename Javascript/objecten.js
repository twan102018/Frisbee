const sprites = [];
const numSprites = 5;

class Sprite {
    constructor(posX, posY, speedX, speedY, width, height, url) {
        this.X = posX;
        this.Y = posY;
        this.speedX = speedX;
        this.speedY = speedY;
        this.width = width;
        this.height = height;
        this.url = url;
        this.image = new Image();
        this.alive = true;

        if (url) {
            this.image.src = url;
        }
    }

    update() {
        this.X += this.speedX;
        this.Y += this.speedY;

        if (this.X + this.width < 0) {
            this.reset();
        }
    }

    reset() {
        this.X = canvasWidth;
        this.Y = Math.random() * (canvasHeight - this.height);
        this.speedX = -Math.random() * 3 - 2; // Random speed to the left
    }

    draw() {
        ctx.drawImage(this.image, this.X, this.Y, this.width, this.height);
    }
}
