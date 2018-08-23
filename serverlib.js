function getGame(games, gameId){
    for(let i =0; i < games.length; i++){
        if(games[i].id === gameId){
            return games[i];
        }
    }
    return null;
}

var seed = new Date().getTime();

function random() {
    let x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

function getRandomColor(){
    let letters = '0123456789ABCDEF';
    let color = '#';
    for(let i = 0; i < 6; i++){
        color += letters[Math.floor(random()*16)];
    }
    return color;
}

let link = 'http://localhost:3000';

exports.getGame = getGame;
exports.getRandomColor = getRandomColor;
exports.link = link;