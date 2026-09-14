const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

class Circle {

    constructor(x, y, radius, color, dx, dy) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.dx = dx;
        this.dy = dy;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    move() {
        this.x += this.dx;
        this.y += this.dy;

        // Bounce from left and right
        if (this.x + this.radius > canvas.width ||
            this.x - this.radius < 0) {
            this.dx = -this.dx;
        }

        // Bounce from top and bottom
        if (this.y + this.radius > canvas.height ||
            this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.draw();
    }
}


let circles = [];

circles.push(new Circle(100, 100, 30, "red", 2, 2));
circles.push(new Circle(200, 150, 20, "blue", 3, 1));
circles.push(new Circle(300, 200, 40, "green", 1, 3));
circles.push(new Circle(400, 100, 25, "orange", 2, 3));


function animate() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let circle of circles) {
        circle.move();
    }

    requestAnimationFrame(animate);
}

animate();