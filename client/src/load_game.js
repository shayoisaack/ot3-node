var winH = window.innerHeight;
var winW = window.innerWidth;
var seed = new Date().getTime();
var game;

function loadInfo() {
    // game.seed = seed;
    // $.ajax({type: "get", async: false, url: "game_php/load_info.php", success: function(reply) {
    //         var obj = JSON.parse(reply);
    //         game.playerNo = obj.game.playerNo;
    //         game.myName = obj.game.playerName;
    //         game.myId = obj.game.playerId;
    //         game.oppId = obj.game.oppId;
    //         game.oppName = obj.game.oppName;
    //         game.oppNo = obj.game.oppNo;
    //     }});
}
function removeOne() {
    // var arr = document.getElementsByClassName("number");
    // for (let i = 0; i < arr.length; i++) {
    //     if (arr[i].innerHTML == "1") {
    //         arr[i].remove();
    //         break;
    //     }
    // }
}
function displayInfo() {
    // if (game.playerNo == 1) {
    //     $("#opp1-name").html($("#opp1-name").html() + game.myName);
    //     $("#opp2-name").html($("#opp2-name").html() + game.oppName);
    // }
    // else {
    //     $("#opp1-name").html($("#opp1-name").html() + game.oppName);
    //     $("#opp2-name").html($("#opp2-name").html() + game.myName);
    // }
    // $("#opp1-name .circle").css("background-color", game.color1);
    // $("#opp2-name .circle").css("background-color", game.color2);
    // $("#current-no").html(game.currentNo);
}
export function loadNumbers(highestNo) {
    console.log(winH);
    let circles = [];
    for (let i = 1; i <= highestNo; i++) {
        let circle = createNumber(i);
        circle = addNumber(circle, circles);
        circles.push(circle);
    }
    return circles;
}
function createNumber(i) {
    let circle = {
      id: i
    }
    return circle;
    // var num = document.createElement("div");
    // num.className = "number";
    // num.innerHTML = i;
    // num.id="num"+i;
    // num.style.position = "absolute";
    // return num;
}
function addNumber(circle, circles) {
    var x = random();
    //alert(x)
    var y = random();
    var arrXY = new Array(x, y);
    arrXY = removeFromEdge(arrXY);
    arrXY = avoidOthers(arrXY, circles);
    x = arrXY[0] * 100;
    y = arrXY[1] * 100;
    
    circle.x = x;
    circle.y = y;

    return circle;
    // obj.style.left = x + "%";
    // obj.style.top = y + "%";
    // $("#game").append(obj);
    //Log(obj.innerHTML + " added<br>")
}
function removeFromEdge(arrXY) {
    var x = arrXY[0];
    var y = arrXY[1];
    var allowedTop = (winH - 50) / winH;
    var allowedLeft = (winW - 50) / winW;
    if (x > allowedLeft) {
        x = x - (50 / winW);
    }
    if (y > allowedTop) {
        y = y - (50 / winH);
    }
    arrXY[0] = x;
    arrXY[1] = y;
    return arrXY;
}
function avoidOthers(arrXY, circles) {
    while (closeToOthers(arrXY, circles)) {
        arrXY[0] = random();
        arrXY[1] = random();
        arrXY = removeFromEdge(arrXY);
    }
    return arrXY;
}
function closeToOthers(arrXY, circles) {
    var arrX = arrXY[0];
    var arrY = arrXY[1];
    for (let i = 0; i < circles.length; i++) {
        var otherX = circles[i].x / 100 * winW;
        var otherY = circles[i].y / 100 * winH;
        var dist = Math.sqrt((arrX * winW - otherX) * (arrX * winW - otherX) + (arrY * winH - otherY) * (arrY * winH - otherY));
        if (dist <= 50) {
            return true;
        }
    }
    return false;
}
function random() {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}
export function findHighestNo(winH, winW) {
    var area = winH * winW;
    var maxNo = area / (40 * 40);
    let highestNo = Math.floor(maxNo / 2.7);
    if (highestNo % 2 == 0)
        highestNo--;
    //game.highestNo=highestNo;
    return highestNo;
}