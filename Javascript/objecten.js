let ctx, cty, canvasWidth, canvasHeight;
const fps = 60;
const interval = 1000 / fps;

let game = {
    ctx: undefined,
    cty: undefined,
    canvasWidth: 600,
    canvasHeight: 800,
    fps: 60,
    interval: undefined,
    blobvis: 0,
    numSprites: 20,
    maxSprites: 120,
    
    // Other game properties and methods...

    getScore: function() {
        return this.blobvis;
    },
    
    setScore: function(value) {
        // Prevent setting a score lower than 0
        this.blobvis = Math.max(0, value);
    },
    
    increaseScore: function() {
        this.blobvis++;
    }
};

const sprites = [];

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
