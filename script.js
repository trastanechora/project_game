var playArea = document.createElement('div'),
        ship = document.createElement('div'),
        shipPos = {
            x: 0,
            y: 0
        },
        shipSpeed = 10,
        key = {
            right: false,
            left: false,
            up: false,
            down: false
        },
        shipWidth = ship.offsetWidth,
        shipHeight = ship.offsetHeight;

document.getElementById("main").appendChild(playArea);

playArea.classList.add('playArea');


document.getElementById("main").appendChild(ship);
ship.classList.add('ship');
shipPos.x = (playArea.offsetWidth / 2 + playArea.offsetLeft) - (ship.offsetWidth / 2);
shipPos.y = (playArea.offsetHeight + playArea.offsetTop) - (ship.offsetHeight * 2);
playArea.leftBoundary = playArea.offsetLeft + 10;
playArea.rightBoundary = (playArea.offsetLeft + playArea.offsetWidth - 10) - ship.offsetWidth;
playArea.topBoundary = playArea.offsetTop + 10;
playArea.bottomBoundary = (playArea.offsetTop + playArea.offsetHeight - 10) - ship.offsetHeight;

// function keyDown(e) {
//     if (e.keyCode === 39) {
//         key.right = true;
//     } else if (e.keyCode === 37) {
//         key.left = true;
//     }
//     if (e.keyCode === 38) {
//         key.up = true;
//     } else if (e.keyCode === 40) {
//         key.down = true;
//     }
// }
// if (shipPos.y <= 470) {
//     key.up = true;
// }

function keyDown(e) {
    if (e.keyCode === 39) {
        key.right = true;
    } else if (e.keyCode === 37) {
        key.left = true;
    }
    if (e.keyCode === 38) {
        key.up = true;
    } else if (shipPos.y <= 470) {
        if (e.keyCode === 40) {
            key.down = true;
        }
    }
}

function keyUp(e) {
    if (e.keyCode === 39) {
        key.right = false;
    } else if (e.keyCode === 37) {
        key.left = false;
    }
    if (e.keyCode === 38) {
        key.up = false;
    } else if (e.keyCode === 40) {
        key.down = false;
    }
}

function moveShip() {
    if (key.right === true) {
        shipPos.x += shipSpeed;
    } else if (key.left === true) {
        shipPos.x -= shipSpeed;
    }
    if (key.up === true) {
        shipPos.y -= shipSpeed;
    } else if (key.down === true) {
        shipPos.y += shipSpeed;
    }
    if (shipPos.x < playArea.leftBoundary) {
        shipPos.x = playArea.leftBoundary;
    }
    if (shipPos.x > playArea.rightBoundary) {
        shipPos.x = playArea.rightBoundary;
    }
    if (shipPos.y < playArea.topBoundary) {
        shipPos.y = playArea.topBoundary;
    }
    if (shipPos.y > playArea.bottomBoundary) {
        shipPos.y = playArea.bottomBoundary;
    }
    ship.style.left = shipPos.x + 'px';
    ship.style.top = shipPos.y + 'px';
}

gravitation = () => {
    shipPos.y += 5
}

document.addEventListener('keydown', keyDown, false);
document.addEventListener('keyup', keyUp, false);

function loop() {
    moveShip();
    console.log(shipPos.y)
    gravitation();
    setTimeout(loop, 1000 / 60);
}

loop();