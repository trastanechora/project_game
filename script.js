// inisiasi variabel di game
var myGamePiece = [];
var myResource = [];
var mySoldier = [];
var myEnemy;
var myBase;

// fungsi untuk memulai games
function startGame() {
    // myResource = new component(30, 30, "orange", 300, 70);
    myBase = new component(100, 100, "black", 700, 300, 0);

    // myGamePiece = new component(7, 7, "blue", 700, 300, 0);
    
    for (i=0; i<3; i++){
        minion = new component(7, 7, "blue", 700+i*15, 300, 0);
        myGamePiece.push(minion);
    }  
    
    //mySoldier = new component(7, 7, "red", 720, 300, 0);
    for (i=0; i<3; i++){
        soldier = new component(7, 7, "white", 700+i*15, 320, 0);
        mySoldier.push(soldier)
    }

    myEnemy = new component(10, 10, "red", 800, 500, 75);

    for (i=0; i<4; i++){
        y = Math.floor(500*Math.random())
        x = Math.floor(1100*Math.random())
        ctx = new component(30, 30, "orange", x+50, y+50, 100) // nilai awal 400
        // ctx.font = "3px Arial";
        // ctx.fillText("H", 20, 20);
        myResource.push(ctx);
        // console.log(myResource[i].x, myResource[i].y)
        console.log(myResource)
    }



    myGameArea.start();
}

// function cariTerdekat(){
//     let minimal = 0;
//     let indeks;
//     for (i=0; i<myObstacle.length; i++){
//         jarak = Math.sqrt(Math.pow(myObstacle[i].x, 2) + Math.pow(myObstacle[i].y, 2))
//         if (jarak < minimal){
//             minimal = jarak
//         }
//     }
    // console.log(indeks, Math.floor(minimal))
    // return Math.floor(minimal)
// }

// console.log(cariTerdekat())

// fungsi untuk membuat area games
var myGameArea = {
    
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1800;
        this.canvas.height = 700;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
        loop();
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}

// fungsi untuk membuat komponen dalam games
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

// fungsi untuk mengupdate variabel di games ketika games di reset
function updateGameArea() {
    myGameArea.clear();
    myBase.update();
    // myResource.update();
    // myGamePiece.update()
    // mySoldier.update()
    myEnemy.update();
    soldierUpdated = mySoldier.map((solval) => solval.update());
    minionUpdated = myGamePiece.map((minval) => minval.update());
    updated = myResource.map((value) => value.update())
}

// fungsi menjalankan pergerakan di dalam games
let detik = 0;
function loop() {
    // if (myGamePiece[0] !== null){
    //     move_minion_to_resource(0);
    // } else {}
    // if (myGamePiece[1] !== null){
    //     move_minion_to_resource(1);
    // } else {}
    // if (myGamePiece[2] !== null){
    //     move_minion_to_resource(2);
    // } else {}
    // if (myGamePiece[3] !== null){
    //     move_minion_to_resource(3);
    // } else {}
    // if (myGamePiece[4] !== null){
    //     move_minion_to_resource(4);
    // } else {}

    move_minion_to_resource(0)
    move_minion_to_resource(1)
    move_minion_to_resource(2)
    document.getElementsByClassName("result")[0].innerHTML = myBase.point
    detik = detik +1
    document.getElementsByClassName("timer")[0].innerHTML = detik/100

    // loop2()
    // command = document.getElementById('input-cmd').value
    // document.getElementById('response-cmd').innerHTML = ">>> " + command;
    // console.log(command)
    // execute_command(command);
    setTimeout(loop, 10);
}

// loop2 = () => {
//     if (myGamePiece.point <= 50) {
//         move_minion_to_resource(0);
//         myGamePiece[0].point = myResource[0].point - 50;
//     } else {
//         move_minion_to_base()
//         myBase.point = myGamePiece.point - 50
//     }
//     // move_minion_to_base()
//     setTimeout(loop2, 100);
    
// } 


var speed = 1
move_minion_to_resource = (i) => {
    // console.log(myResource[i])
    if (myGamePiece[i].point < 50) {
        if (myGamePiece[i].x < myResource[i].x) {
            if (myGamePiece[i].x != myResource[i].x) {
                myGamePiece[i].x += speed;
            }
        } else {
            if (myGamePiece[i].x != myResource[i].x) {
                myGamePiece[i].x -= speed;
            }
        }

        if (myGamePiece[i].y < myResource[i].y) {
            if (myGamePiece[i].y != myResource[i].y) {
                myGamePiece[i].y += speed;
            }
        } else {
            if (myGamePiece[i].y != myResource[i].y) {
                myGamePiece[i].y -= speed;
            }
        }
        
        if (myGamePiece[i].y == myResource[i].y && myGamePiece[i].x == myResource[i].x) {
            if (myGamePiece[i].point < 50){
                myResource[i].point -= 0.1;
                myGamePiece[i].point +=0.1;

                //by Kar
                if (myResource[i].point < 0){
                    myResource.splice(i,1);
                    y = Math.floor(500*Math.random())
                    x = Math.floor(1100*Math.random())
                    ctx = new component(30, 30, "orange", x+50, y+50, 100) // nilai awal 400
                    myResource.push(ctx);
                    // i = i+1
                    // myResource[i] = myResource[i+1]
                    // move_minion_to_base()
                }
            } else {
                move_minion_to_base(i)
            }
        }
    } else {
        move_minion_to_base(i)
    }
}

move_minion_to_base = (i) => {
    if (myGamePiece[i].x < myBase.x) {
        if (myGamePiece[i].x != myBase.x) {
            myGamePiece[i].x += speed;
        }
    } else {
        if (myGamePiece[i].x != myBase.x) {
            myGamePiece[i].x -= speed;
        }
    }

    if (myGamePiece[i].y < myBase.y) {
        if (myGamePiece[i].y != myBase.y) {
            myGamePiece[i].y += speed;
        }
    } else {
        if (myGamePiece[i].y != myBase.y) {
            myGamePiece[i].y -= speed;
        }
    }

    if (myGamePiece[i].x == myBase.x && myGamePiece[i].y == myBase.y) {
        if (myGamePiece[i].point >= 0) {
            myBase.point += 50;
            myGamePiece[i].point -=50;
        } 
    }  
}

move_enemy_to_base = () => {
    // setTimeout(function(){
    if (myEnemy.x < myBase.x) {
        if (myEnemy.x != myBase.x) {
            myEnemy.x += speed;
        }
    } else {
        if (myEnemy.x != myBase.x) {
            myEnemy.x -= speed;
        }
    }

    if (myEnemy.y < myBase.y) {
        if (myEnemy.y != myBase.y) {
            myEnemy.y += speed;
        }
    } else {
        if (myEnemy.y != myBase.y) {
            myEnemy.y -= speed;
        }
    }

    if (myEnemy.x == myBase.x && myEnemy.y == myBase.y) {
        if (myEnemy.point >= 0) {
            myBase.point -= 0.01;
        } 
    }  
    // }),80000;
}

move_enemy_to_base();

var key = {
    right: false,
    left: false,
    up: false,
    down: false
}

// var speed = 5
function move() {
    if (key.right === true) {
        if (myGamePiece[i].x >= 1290) {
            myGamePiece[i].x = 1290;
        } else {
            myGamePiece[i].x += speed;
        }
    } else if (key.left === true) {
        if (myGamePiece[i].x <= 0) {
            myGamePiece[i].x = 0;
        } else {
            myGamePiece[i].x -= speed;
        }
    }
    if (key.up === true) {
        if (myGamePiece[i].y <= 3) {
            myGamePiece[i].y = 3;
        } else {
            myGamePiece[i].y -= speed;
        }
    } else if (key.down === true) {
        if (myGamePiece[i].y >= 690) {
            myGamePiece[i].y = 690;
        } else {
            myGamePiece[i].y += speed;
        }
    }
}

function gravitation() {
    if (myGamePiece[i].y >= 690) {
        myGamePiece[i].y = 690;
    } else {
        if (key.up === false) {
            myGamePiece[i].speedY = 5;
        } else {
            myGamePiece[i].speedY = 0;
        }
    }
}

function onTestChange(event) {
    var key = event.keyCode;
    // console.log(event)

    // If the user has pressed enter
    if (key == 13) {
        // x = document.getElementById('input-cmd').value
        // console.log("test " + x + ", debugging!")
        // execute_command(x);
        // document.getElementById("input-cmd").value = "";
        // return true;
        console.log("ok")
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
// add game piece
    // if (command == "add_game_piece") {
    //     while (myGamePiece.length<6){
    //         minion = new component(7, 7, "blue", 700, 300, 0);
    //         myGamePiece.push(minion);
    //     }
    // }

// add soldier
    // if (command == "add_soldier"){
    //     while (mySoldier.length<6){
    //         soldier = new component(7, 7, "red", 700, 300, 0);
    //         mySoldier.push(soldier);
    //     }
    // }
}
