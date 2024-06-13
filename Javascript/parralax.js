document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('myBackgroundCanvas');
    cty = canvas.getContext('2d'); // Use the globally defined ctx

    const sandBottom = new Image();
    sandBottom.src = './image/parralax/Sandbottom2.png';
    
    const sandWave = new Image();
    sandWave.src = './image/parralax/SandWave.png';
    
    const sunset = new Image();
    sunset.src = './image/parralax/sunset.png';
    
    let movSpeed = 5;

    class Layer {
        constructor(image, movSpeed, y_Position) {
            this.x = 0;
            this.y = y_Position;
            this.width = 600;
            this.height = 800;
            this.x2 = this.width;
            this.image = image;
            this.speedModifier = movSpeed;
        }
        
        draw() {
            cty.drawImage(this.image, this.x, this.y, this.width, this.height);
            cty.drawImage(this.image, this.x2, this.y, this.width, this.height);
        }
        
        update() {
            if (this.x <= -this.width) {
                this.x = this.width + this.x2 - this.speedModifier;
            } else {
                this.x -= this.speedModifier;
            }
            if (this.x2 <= -this.width) {
                this.x2 = this.width + this.x - this.speedModifier;
            } else {
                this.x2 -= this.speedModifier;
            }
        }
    }

    const sandBottomLayer = new Layer(sandBottom, movSpeed, 0);
    const sandWaveLayer = new Layer(sandWave, 1, 0);
    const sunsetLayer = new Layer(sunset, 1.8, 0);

    function animate() {
        cty.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
        sunsetLayer.update();
        sunsetLayer.draw();
        sandWaveLayer.update();
        sandWaveLayer.draw();
        sandBottomLayer.update();
        sandBottomLayer.draw();
        
        requestAnimationFrame(animate);
    }

    animate();
});
