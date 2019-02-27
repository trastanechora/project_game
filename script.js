var myGamePiece;
var myGamePiece;
var myObstacle = [];
// var myObstacle
//var myBoundaries;
var musuhAttack;

function startGame() {
    myGamePiece = new component(100, 100, "red", 500, 350, 2000);
    let minimal = 10000
    let indeks = 0
    for (i=0; i<10; i++){
        y = Math.floor(500*Math.random())
        x = Math.floor(1100*Math.random())
        myObstacle.push(new component(30, 30, `blue`, x+75, y+75, 200));
        // console.log(myObstacle[i].x, myObstacle[i].y)
        // jarak = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
        // console.log(jarak, i)
        // if (jarak < minimal){
        //     minimal = jarak;
        // }
    }
    musuhAttack = new component(40, 40, `black`, x+75, y+75, 1000);
    }
    // console.log(minimal, i)
    myGameArea.start();
}
// myObstacle.map((value)=>console.log(value.x))


function cariTerdekat(){
    let minimal = 0;
    let indeks;
    for (i=0; i<myObstacle.length; i++){
        jarak = Math.sqrt(Math.pow(myObstacle[i].x, 2) + Math.pow(myObstacle[i].y, 2))
        if (jarak < minimal){
            minimal = jarak
        }
    }
    // console.log(indeks, Math.floor(minimal))
    return Math.floor(minimal)
}

console.log(cariTerdekat())

var myGameArea = {
    
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1300;
        this.canvas.height = 700 ;
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
}

function updateGameArea() {
    myGameArea.clear();
    // myObstacle[0].update();
    // myObstacle[1].update();
    updated = myObstacle.map((value) => value.update())
    //musuhAttack.update()
    myGamePiece.x += myGamePiece.speedX;
    //console.log(myGamePiece.x)
    myGamePiece.y += myGamePiece.speedY;    
    myGamePiece.update();
}


function loop() {
    setTimeout(loop, 1000 / 60);
}
function musuh(){
    y = Math.floor(500*Math.random())
    x = Math.floor(1100*Math.random())
    musuhAttack = new component(40, 40, `black`, x+75, y+75, 1000);
}



//Command:
// help : list petunjuk permainan
// getResource : mendapatkan Resource terdekat, setelah diambil akan hilang
// backHome : auto abis mendapatkan Resource terdekat
// buySoldier(n) : membeli Soldier (jika uang ada)
// buyPekerja(n) : membeli Pekerja (jika uang ada)
// buyHome(n) : membeli rumah
// upgradeHome : meningkatkan ketahanan Home(ganti warna aja)
// Attack : menyerang musuh, money bakal berkurang

// kalo command gak ada, invalid command

// tambahan:
// Money : menampilkan jumlah uang yang dimiliki


// var keSana = function(){
//     perintah keSana
// }

// var keSini = function(callback){
//     setTimeout(function(){
//         callback(fungsi keSana);
//     }), waktuDelay;
// }

// keSini(keSana)