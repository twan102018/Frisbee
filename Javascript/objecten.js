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
    constructor(x, y, dx, dy, width, height, imageSrc) {
        this.X = x;
        this.Y = y;
        this.dx = dx;
        this.dy = dy;
        this.width = width;
        this.height = height;
        this.image = new Image();
        this.image.src = imageSrc;
        this.rotation = 0; // Add this line
    }

    update() {
        this.X += this.dx;
        this.Y += this.dy;
        this.rotation += 0.1; // Increment rotation
    }

    draw() {
        ctx.save();
        ctx.translate(this.X + this.width / 2, this.Y + this.height / 2);
        ctx.rotate(this.rotation);
        ctx.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);
        ctx.restore();
    }

    reset() {
        this.X = game.canvasWidth + Math.random() * game.canvasWidth;
        this.Y = Math.random() * (game.canvasHeight - 50);
        this.rotation = 0; // Reset rotation
    }
}