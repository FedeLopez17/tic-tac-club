const sounds = (()=>{
    function displaySong(){
        ui.displaySong(_playlist[_currentSong]);
    }
    const selectionOne = new Audio("./audio/selection-one.mp3");
    const selectionTwo = new Audio("./audio/selection-two.mp3");
    const errorOne = new Audio("./audio/error-one.mp3");
    const coinToss = new Audio("./audio/coin-toss.mp3");
    const goal = new Audio("./audio/goal.mp3");
    const gameOver = new Audio("./audio/game-over.mp3");
    const tie = new Audio("./audio/tie.mp3");
    const _playlist = ["Ryan James Carr - Drums Make Me Drool", "John Runefelt - Eu Quero Ver o Oceano", "El Flaco Collective - Kid on the Move", "John Runefelt - Getting Frisky", "Margareta - Stegosaurus"];
    let _currentSong = Math.floor(Math.random() * _playlist.length);
    const music = document.createElement("audio");
    music.src = `./audio/music/${_currentSong}.mp3`;
    music.addEventListener("ended", ()=>{
        (_currentSong === _playlist.length - 1) ? _currentSong = 0 : _currentSong++;
        music.src = `./audio/music/${_currentSong}.mp3`;
        music.play();
        displaySong();
    });
    return {selectionOne, selectionTwo, errorOne, coinToss, goal, tie, gameOver, music, displaySong};
})();