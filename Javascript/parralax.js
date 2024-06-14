document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('myBackgroundCanvas');
    const cty = canvas.getContext('2d');

    const images = [
        { id: 'TheTreeBehind2', speed: 0.5, y: 0, width: window.innerWidth, height: 600 },
        { id: 'TheTreeBehind1', speed: 1, y: 20, width: window.innerWidth, height: 600 },
        { id: 'HugeTree', speed: 1.5, y: 0, width: window.innerWidth, height: 600 },
        { id: 'Grass', speed: 2, y: 160, width: window.innerWidth, height: 100 },
        { id: 'Ground', speed: 2.5, y: 160, width: window.innerWidth, height: 100 }
    ];    

    class Layer {
        constructor(image, movSpeed, y_Position, width, height) {
            this.image = image;
            this.speedModifier = movSpeed;
            this.y = y_Position;
            this.width = width;
            this.height = height;
            this.x = 0;
            this.x2 = this.width;
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

    const layers = images.map(({ id, speed, y, width, height }) => 
        new Layer(document.getElementById(id), speed, y, width, height)
    );

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function animate() {
        cty.clearRect(0, 0, canvas.width, canvas.height);
        layers.forEach(layer => {
            layer.update();
            layer.draw();
        });
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();
});
