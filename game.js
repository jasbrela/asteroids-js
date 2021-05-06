window.onload = function () {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    // setting up sprites
    const player = new Image(), asteroid = new Image();
    asteroid.src = "images/asteroid.png";

    // player position (= start position)
    let playerX = canvas.width/2, playerY = canvas.height/2;

    // asteroid position
    let asteroidX, asteroidY;

    // Counter
    let seconds = 0;
    let timer = setInterval(Counter, 1000);

    // game
    let timeout = 200;
    let game = setInterval(GameLoop, timeout);

    // detect clicks and call MovePlayer()
    window.onkeydown = MovePlayer;

    // functions
    function GameLoop() {
        DrawPlayer(playerX, playerY);
        WriteStartMessage();
        ControlAsteroid();
        DetectCollisions(asteroidX, asteroidY);
        SetScore();
        UpdateDifficulty(); // the game gets harder throughout time passes
    }

    function MovePlayer(keycode) {
        switch (keycode.keyCode) {
            case 65:
            case 37: // LEFT
                player.src = "images/rocket-left.png";
                playerX = playerX - 10
                break;
            case 87:
            case 38: // UP
                player.src = "images/rocket-up.png";
                playerY = playerY - 10;
                break;
            case 68:
            case 39: // RIGHT
                player.src = "images/rocket-right.png";
                playerX = playerX + 10
                break;
            case 83:
            case 40: // DOWN
                player.src = "images/rocket-down.png";
                playerY = playerY + 10;
                break;
        }
    }

    function DetectCollisions(asteroidX, asteroidY) {
        if (((playerX + player.width) > asteroidX && playerX < (asteroidX + asteroid.width)) &&
            ((playerY + player.width) > asteroidY) && (playerY < (asteroidY + asteroid.height))) {
            window.clearInterval(game);
            window.clearInterval(timer);

            WriteGameOverMessage();
        }
    }

    function DrawPlayer(x, y) {
        ctx.clearRect(0, 0, 800, 400);
        ctx.drawImage(player, x, y);
    }

    function Randomizer(max) {
        return Math.floor(Math.random() * max) + 1;
    }

    function ControlAsteroid() {
        asteroidX = Randomizer(800);
        asteroidY = Randomizer(400);
        ctx.drawImage(asteroid, asteroidX, asteroidY);
    }

    function Counter() {
        seconds++;
    }

    function SetScore() {
        ctx.font = "30px Verdana";
        ctx.fillStyle = "white";
        ctx.textAlign = "right";
        ctx.fillText("Score: " + seconds, canvas.width/4.9, canvas.height/1.1);
    }

    function UpdateDifficulty() {
        timeout -= seconds * 0.05;
    }

    function WriteGameOverMessage() {
        ctx.font = "72px Verdana";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("Game Over!", canvas.width/2, canvas.height/2);
    }

    function WriteStartMessage() {
        ctx.font = "16px Verdana";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("Press 'WASD' or 'Arrow Keys' to move", canvas.width/2, canvas.height/1.1);
    }
}