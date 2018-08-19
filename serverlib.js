function getGame(games, gameId){
    for(let i =0; i < games.length; i++){
        if(games[i].id === gameId){
            return games[i];
        }
    }
    return null;
}

exports.getGame = getGame;