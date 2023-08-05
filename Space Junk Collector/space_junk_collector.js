const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Define game variables
const gridSize = 20;
let spaceshipX = canvas.width / 2;
let spaceshipY = canvas.height / 2;
let score = 0;
let level = 1;
let junkCollected = 0;
let asteroids = [];
let spaceJunk = [];

// Helper function to generate random positions
function randomPosition(max) {
    return Math.floor(Math.random() * max);
}

// Helper function to check collision
function checkCollision(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2) < gridSize;
}

// Helper function to create asteroids
function createAsteroid() {
    asteroids.push({
        x: randomPosition(canvas.width),
        y: randomPosition(canvas.height),
        speedX: randomPosition(5) + 1,
        speedY: randomPosition(5) + 1,
    });
}

// Helper function to create space junk
function createSpaceJunk() {
    spaceJunk.push({
        x: randomPosition(canvas.width),
        y: randomPosition(canvas.height),
    });
}

// Game loop
function update() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw spaceship
    ctx.fillStyle = 'blue';
    ctx.fillRect(spaceshipX - gridSize / 2, spaceshipY - gridSize / 2, gridSize, gridSize);

    // Draw asteroids
    ctx.fillStyle = 'red';
    asteroids.forEach(asteroid => {
        ctx.fillRect(asteroid.x, asteroid.y, gridSize, gridSize);
        asteroid.x += asteroid.speedX;
        asteroid.y += asteroid.speedY;

        if (checkCollision(spaceshipX, spaceshipY, asteroid.x, asteroid.y)) {
            endGame();
        }
    });

    // Draw space junk
    ctx.fillStyle = 'green';
    spaceJunk.forEach(junk => {
        ctx.fillRect(junk.x, junk.y, gridSize, gridSize);

        if (checkCollision(spaceshipX, spaceshipY, junk.x, junk.y)) {
            score += 10;
            junkCollected++;
            spaceJunk = spaceJunk.filter(item => item !== junk);
        }
    });

    // Update score and level
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}   Level: ${level}`, 10, 30);

    // Generate new asteroids and space junk
    if (asteroids.length < level) {
        createAsteroid();
    }
    if (spaceJunk.length < 3) {
        createSpaceJunk();
    }

    requestAnimationFrame(update);
}

// Game over
function endGame() {
    alert(`Game Over!\nScore: ${score}\nJunk Collected: ${junkCollected}`);
    score = 0;
    level = 1;
    junkCollected = 0;
    spaceshipX = canvas.width / 2;
    spaceshipY = canvas.height / 2;
    asteroids = [];
    spaceJunk = [];
}

// Event listener for arrow key controls
window.addEventListener('keydown', (event) => {
    const key = event.key;
    switch (key) {
        case 'ArrowUp':
            spaceshipY -= gridSize;
            break;
        case 'ArrowDown':
            spaceshipY += gridSize;
            break;
        case 'ArrowLeft':
            spaceshipX -= gridSize;
            break;
        case 'ArrowRight':
            spaceshipX += gridSize;
            break;
    }
});

// Event listener for mouse controls
canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    spaceshipX = event.clientX - rect.left;
    spaceshipY = event.clientY - rect.top;
});

// Start the game
update();
