var myGamePiece;
var myResource = [];
var myBase;

function startGame() {
    // myResource = new component(30, 30, "orange", 300, 70);
    myBase = new component(100, 100, "black", 700, 300, 0);
    myGamePiece = new component(7, 7, "blue", 700, 300, 0);
    // myGamePiece = new component(10, 10, "blue", 300, 70);
    // myObstacle  = new component(10, 200, "green", 300, 120);   


    for (i=0; i<4; i++){
        y = Math.floor(500*Math.random())
        x = Math.floor(1100*Math.random())
        ctx = new component(30, 30, "orange", x+50, y+50, 400)
        // ctx.font = "3px Arial";
        // ctx.fillText("H", 20, 20);
        myResource.push(ctx);
        // console.log(myResource[i].x, myResource[i].y)
        console.log(myResource)
    }



    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1800;
        this.canvas.height = 700;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
        // loop2();
        loop();
        // move_minion_to_resource()
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}

function component(width, height, color, x, y, point) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;
    this.point = point;
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);

        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);

        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

function updateGameArea() {
    myGameArea.clear();
    myBase.update();
    // myResource.update();
    myGamePiece.update();
    updated = myResource.map((value) => value.update())
}

function loop() {
    move_minion_to_resource(0)
    console.log(myGamePiece.point)
    // loop2()
    command = document.getElementById('input-cmd').value
    document.getElementById('response-cmd').innerHTML = ">>> " + command;
    // console.log(command)
    // execute_command(command);
    setTimeout(loop, 10);
}

loop2 = () => {
    if (myGamePiece.point <= 50) {
        move_minion_to_resource(0);
        myGamePiece.point = myResource[0].point - 50;
    } else {
        move_minion_to_base()
        myBase.point = myGamePiece.point - 50
    }
    // move_minion_to_base()
    setTimeout(loop2, 100);
    
} 


var speed = 1
move_minion_to_resource = (i) => {
    // console.log(myResource[i])
    if (myGamePiece.point < 50) {
        if (myGamePiece.x < myResource[i].x) {
            if (myGamePiece.x != myResource[i].x) {
                myGamePiece.x += speed;
            }
        } else {
            if (myGamePiece.x != myResource[i].x) {
                myGamePiece.x -= speed;
            }
        }

        if (myGamePiece.y < myResource[i].y) {
            if (myGamePiece.y != myResource[i].y) {
                myGamePiece.y += speed;
            }
        } else {
            if (myGamePiece.y != myResource[i].y) {
                myGamePiece.y -= speed;
            }
        }
        
        if (myGamePiece.y == myResource[i].y && myGamePiece.x == myResource[i].x) {
            if (myGamePiece.point < 50){
                myResource[i].point -= 0.1;
                myGamePiece.point +=0.1;
            } else {
                move_minion_to_base()
            }
        }
    } else {
        move_minion_to_base()
    }
}

move_minion_to_base = () => {
    if (myGamePiece.x < myBase.x) {
        if (myGamePiece.x != myBase.x) {
            myGamePiece.x += speed;
        }
    } else {
        if (myGamePiece.x != myBase.x) {
            myGamePiece.x -= speed;
        }
    }

    if (myGamePiece.y < myBase.y) {
        if (myGamePiece.y != myBase.y) {
            myGamePiece.y += speed;
        }
    } else {
        if (myGamePiece.y != myBase.y) {
            myGamePiece.y -= speed;
        }
    }

    if (myGamePiece.x == myBase.x && myGamePiece.y == myBase.y) {
        if (myGamePiece.point >= 0) {
            myBase.point += 50;
            myGamePiece.point -=50;
        } 
    }  
}

var key = {
    right: false,
    left: false,
    up: false,
    down: false
}

// var speed = 5
function move() {
    if (key.right === true) {
        if (myGamePiece.x >= 1290) {
            myGamePiece.x = 1290;
        } else {
            myGamePiece.x += speed;
        }
    } else if (key.left === true) {
        if (myGamePiece.x <= 0) {
            myGamePiece.x = 0;
        } else {
            myGamePiece.x -= speed;
        }
    }
    if (key.up === true) {
        if (myGamePiece.y <= 3) {
            myGamePiece.y = 3;
        } else {
            myGamePiece.y -= speed;
        }
    } else if (key.down === true) {
        if (myGamePiece.y >= 690) {
            myGamePiece.y = 690;
        } else {
            myGamePiece.y += speed;
        }
    }
}

function gravitation() {
    if (myGamePiece.y >= 690) {
        myGamePiece.y = 690;
    } else {
        if (key.up === false) {
            myGamePiece.speedY = 5;
        } else {
            myGamePiece.speedY = 0;
        }
    }
}

function onTestChange(event) {
    var key = event.keyCode;
    // console.log(event)

    // If the user has pressed enter
    if (key == 13) {
        x = document.getElementById('input-cmd').value
        // console.log("test " + x + ", debugging!")
        execute_command(x);
        document.getElementById("input-cmd").value = "";
        return true;
    }
}

// setInterval( function(){myGamePiece.y -= 20; }, 3000);

// command = document.getElementById('input-cmd').value
// document.getElementById('response-cmd').innerHTML = command

execute_command = (command) => {
    if (command == "move_minion_to_resource(0)") {
        move_minion_to_resource(0);
        // console.log("executed")
    }
    // console.log("executed")
}