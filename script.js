// crear el boton de invertir alfabeticamente capaz con css o DOM manipulation
// pantalla de carga
// el boton de randomize son los dados con el texto randomize que sale en hover. en celular esta desde el principio
// transiciones entre las pantallas con animaciones y sonido capaz algo como un spray de grafiti
// comentarios si es necesario.
// Error cuando venis de jugar una partida con un humano y le das a elegir equipo de nuevo.
// Que cuando randomize no eliga el mismo equipo
// Limpiar la pantalla anterior no deberia eliminar el popup de la musica

const gameBoard = (()=>{
    const _gameBoard = [];

    // returns a copy of the gameBoard array.
    function get(){
        let board = _gameBoard.slice(0);
        return board;
    }

    function _getCells(){
        const cells = document.querySelectorAll(".cell");
        return cells;
    }

    function getEmptyCells(){
        const emptyCells = []
        for(let cell = 0; cell < 9; cell++){
            if(_gameBoard[cell] === undefined){
                emptyCells.push(cell);
            }
        }
        return emptyCells;
    }

    function _handleClick(e) {
        if(game.botsTurn()){
            if(game.soundActivated()){sounds.errorOne.play()}
            return;
        };
        const cellNumber = parseInt(e.target.getAttribute('data-cell'));
        game.playTurn(cellNumber);
    }

    function set(parentElement){
        game.resetScores();
        const container = document.createElement("section");
        container.classList.add("game-board");
        for (let cellNumber = 0; cellNumber < 9; cellNumber++){
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.setAttribute('data-cell', cellNumber);
            cell.addEventListener("click", _handleClick);
            container.appendChild(cell);
        }
        parentElement.appendChild(container);
    }

    function reset(){
        while(_gameBoard.length != 0){
            _gameBoard.pop();
        }
        const cells = _getCells();
        for(let cell of cells){
            cell.innerText = "";
        }
    }

    function _populateScreen(cellNumber){
        const cells = _getCells();
        cells[cellNumber].innerText = _gameBoard[cellNumber];
    }

    function _update(){
        for (let cellNumber = 0; cellNumber < 9; cellNumber++){
            if (_gameBoard[cellNumber] != undefined){
                _populateScreen(cellNumber);
            }
        }
    }

    function _checkIfThreeInLine(){     
        const WINNING_COMBINATIONS = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
        const cells = _getCells();
        for (let combination of WINNING_COMBINATIONS){
            let firstCellHasAMark = ["X", "O"].includes(_gameBoard[combination[0]]);
            let allCellsHaveTheSameMark = _gameBoard[combination[0]] === _gameBoard[combination[1]] && _gameBoard[combination[0]] === _gameBoard[combination[2]];
            someoneWon = firstCellHasAMark && allCellsHaveTheSameMark;
            if(someoneWon){
                for(let cell of cells){
                    const cellNumber = parseInt(cell.getAttribute("data-cell"));
                    if(combination.includes(cellNumber)){
                        cell.classList.add("winning-combination");
                        setTimeout(()=>{cell.classList.remove("winning-combination")}, 1000);
                    }
                }
                return true;
            }  
        }
        return false;
    }

    function _checkIfFull(){
        let occupiedCells = _gameBoard.filter(cell => cell === "X" || cell === "O");
        return occupiedCells.length === 9;
    }

    function checkIfGoal(){
        let full = _checkIfFull(), threeInLine = _checkIfThreeInLine();
        let goalOrFull = full || threeInLine;
        if(threeInLine){if(game.soundActivated()) sounds.goal.play()};
        if(full){if(game.soundActivated()) sounds.tie.play()};
        if(goalOrFull){setTimeout(reset, 1000)};
        return (threeInLine) ? 2 : (full) ? 1 : false;
    }

    function addMark(mark, cellNumber){
        let cellAlreadyTaken = _gameBoard[cellNumber] === "X" || _gameBoard[cellNumber] === "O";
        if(cellAlreadyTaken){
            sounds.errorOne.play();
            return false
        }
        _gameBoard[cellNumber] = mark;
        _update();
        if(game.soundActivated()) new Audio("./audio/pop.mp3").play();
        return true;
    }
    return {addMark, checkIfGoal, set, reset, get, getEmptyCells};
})();

const Player = (mark)=>{
    let name = null;
    let team = {name: null, abbreviation: null, colors: null, imagePath: null};
    let score = 0;
    return {mark, name, team, score};
}

const game = (()=>{
    let _difficulty = "EASY", _sound = false, over = false, ongoingCelebration = false;
    let _opponent = null, _currentPlayer = null;
    let currentTimeMinutes = 0, currentTimeSeconds = 0, currentTime;
    const MAX_TIME = 10;
    const _playerOne = Player("X");
    const _playerTwo = Player("O");

    function toggleSound(){
        _sound = !_sound;
        console.log(_sound);
    }

    function soundActivated(){
        return _sound;
    }

    function _updateTeamColorsCssVariables(player){
        const root = document.querySelector(":root");
        const isPlayerOne = player == 1;
        if(isPlayerOne){
            for(let colorNumber in _playerOne.team.colors){
                root.style.setProperty(`--playerOneColor${colorNumber}`, _playerOne.team.colors[colorNumber]);
            }
        }
        else{
            for(let colorNumber in _playerTwo.team.colors){
                root.style.setProperty(`--playerTwoColor${colorNumber}`, _playerTwo.team.colors[colorNumber]);
            }
        }
    }

    function updateTeam(container, team, abbreviation, imagePath, colors){
        console.log("NEW TEAM UPDATED:");//
        let playerOne = container.getAttribute("class") === "left";
        if(playerOne){
            _playerOne.team.name = team;
            _playerOne.team.abbreviation = abbreviation;
            _playerOne.team.imagePath = imagePath;
            _playerOne.team.colors = colors;
            _updateTeamColorsCssVariables(1);
            console.log(_playerOne.team);//
        }
        else{
            _playerTwo.team.name = team;
            _playerTwo.team.abbreviation = abbreviation;
            _playerTwo.team.imagePath = imagePath;
            _playerTwo.team.colors = colors;
            _updateTeamColorsCssVariables(2);
            console.log(_playerTwo.team);//
        }      
    }

    function resetTeams(){
        _playerOne.team.name = null;
        _playerOne.team.abbreviation = null;
        _playerOne.team.imagePath = null;
        _playerOne.team.colors = null;
        _playerTwo.team.name = null;
        _playerTwo.team.abbreviation = null;
        _playerTwo.team.imagePath = null;
        _playerTwo.team.colors = null;
    }

    function startTime(){
        over = false;
        function _updateMinutes(){
            currentTimeMinutes++;
        }
        function _updateSeconds(){
            if(currentTimeSeconds === 60){currentTimeSeconds = 0};
            if(currentTimeMinutes === MAX_TIME) {
                over = true;
                clearInterval(keepTimeMinutes);
                clearInterval(keepTimeSeconds);
                currentTime = `${MAX_TIME}:00`;
                ui.updateTime(currentTime);
                resetTime();
                gameBoard.reset();
                const result = (_playerOne.score === _playerTwo.score) ? "IT'S A TIE!" : (_playerOne.score > _playerTwo.score) ? `${_playerOne.name.toUpperCase()} WON!` : `${_playerTwo.name.toUpperCase()} WON!`;
                ui.displayResult(result); 
                return;
            };
            currentTime = (currentTimeMinutes < 10) ? `0${currentTimeMinutes}:`: `${currentTimeMinutes}:`;
            currentTime += (currentTimeSeconds < 10) ? `0${currentTimeSeconds}`: currentTimeSeconds;
            ui.updateTime(currentTime);
            currentTimeSeconds++;
        }
        const keepTimeMinutes = setInterval(_updateMinutes, 1000);
        const keepTimeSeconds = setInterval(_updateSeconds, 16.5);
    }

    function resetTime(){
        currentTimeMinutes = 0;
        currentTimeSeconds = 0;
        currentTime =  0;
    }

    function setOpponent(opponent){
        _opponent = opponent;
    }

    function setDifficulty(difficulty){
        _difficulty = difficulty;
    }

    function getDifficulty(){
        return _difficulty;
    }

    function setFirstTurn(playerName){
        if(playerName === _playerOne.name){
            _currentPlayer = _playerOne;
            setTimeout(()=>{ui.updateCurrentPlayer(1)}, 4500); 
            return;
        }
        _currentPlayer = _playerTwo;
        setTimeout(()=>{ui.updateCurrentPlayer(2)}, 4500); 
        if(_opponent === "AI"){setTimeout(()=>{botPlayTurn()}, 5000)};
    }

    function updateName(container, name){
        let playerOne = container.getAttribute("class") === "left";
        (playerOne) ? _playerOne.name = name : _playerTwo.name = name;
    }

    function _addGoal(player){
        (player === _playerOne) ? _playerOne.score += 1 : _playerTwo.score += 1;
        ui.updateScore();
    }

    function resetScores(){
        _playerOne.score = 0;
        _playerTwo.score = 0;
    }

    function getPLayerOne(){
        return _playerOne;
    }

    function getPLayerTwo(){
        return _playerTwo;
    }

    function _switchTurns(){
        if(_currentPlayer === _playerOne){
            _currentPlayer = _playerTwo;
            ui.updateCurrentPlayer(2);
            if(_opponent === "AI"){
                //This is just to make it look like the bot is thinking
                const botThinkingTime = usefulFunctions.randomIntFromRangeInclusive(400, 800);
                setTimeout(()=>{botPlayTurn()}, botThinkingTime);
            }
            return;
        }
        _currentPlayer = _playerOne;
        ui.updateCurrentPlayer(1);
    }

    function _botPlayTurnEasy(){
        console.log("BOT PLAYS TURN EASY:");
        const emptyCells = gameBoard.getEmptyCells();
        const randomlyChosenCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        playTurn(randomlyChosenCell);
    }

    function _botPlayTurnNormal(){
        console.log("BOT PLAYS TURN NORMAL");
        let randomDifficulty = Math.floor(Math.random() * 2);
        (randomDifficulty === 0) ? _botPlayTurnEasy() : _botPlayTurnUnbeatable();
    }

    function _botPlayTurnHard(){
        console.log("BOT PLAYS TURN HARD:");
        let randomDifficulty = Math.floor(Math.random() * 4);
        ([0, 1, 2].includes(randomDifficulty)) ? _botPlayTurnUnbeatable() : _botPlayTurnEasy();
    }

    function _botPlayTurnUnbeatable(){
        console.log("BOT PLAYS TURN UNBEATABLE:");
        const board = gameBoard.get();
        for (let cell = 0; cell < 9; cell++){
            if(board[cell] === undefined){
                board[cell] = "";
            }
        }
        let bestScore = -Infinity;
        let bestMove;
        for (let cell = 0; cell < board.length; cell++){
            if(board[cell] === ""){
                board[cell] = _playerTwo.mark;
                let score = minimax(board, 0, false);
                board[cell] = "";
                if(score > bestScore){
                    bestScore = score;
                    bestMove = cell;
                }
            }
        }
        playTurn(bestMove);

        function minimax(board, depth, isMaximizing){
            let result = checkIfGoal();
            if(result) {
                const scores = {tie: 0, "player one wins": -10, "player two wins": 10};
                return scores[result] - depth;
            }

            depth++;

            if(isMaximizing){
                let bestScore = -Infinity;
                for(let cell = 0; cell < board.length; cell++){
                    if(board[cell] === ""){
                        board[cell] = _playerTwo.mark;
                        let score = minimax(board, depth, false);
                        board[cell] = "";
                        bestScore = Math.max(score, bestScore);
                    }
                }
                return bestScore;
            }
            else{
                let bestScore = Infinity;
                for(let cell = 0; cell < board.length; cell++){
                    if(board[cell] === ""){
                        board[cell] = _playerOne.mark;
                        let score = minimax(board, depth, true);
                        board[cell] = "";
                        bestScore = Math.min(score, bestScore);
                    }
                }
                return bestScore;
            }

            function checkIfGoal(){
                const threeInLine = _checkIfThreeInLine();
                if(threeInLine) return threeInLine;
                const full = _checkIfFull();
                if(full) return full;

                function _checkIfThreeInLine(){     
                    const WINNING_COMBINATIONS = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
                    for (let combination of WINNING_COMBINATIONS){
                        let firstCellHasAMark = ["X", "O"].includes(board[combination[0]]);
                        let allCellsHaveTheSameMark = board[combination[0]] === board[combination[1]] && board[combination[0]] === board[combination[2]];
                        someoneWon = firstCellHasAMark && allCellsHaveTheSameMark;
                        if(someoneWon){
                            return (board[combination[0]] === _playerOne.mark) ? "player one wins" : "player two wins";
                        };  
                    }
                    return false;
                }
            
                function _checkIfFull(){
                    let occupiedCells = board.filter(cell => cell === "X" || cell === "O");
                    if(occupiedCells.length === 9){
                        return "tie";
                    }
                    return false;
                }
            }
        }

    }

    function botPlayTurn(){
        console.log("BOT PLAYS TURN");
        if(over) return;
        if(ongoingCelebration){
            console.log("ONGOING CELEBRATION");
            setTimeout(botPlayTurn, 1000);
            return;
        }
        console.log(_difficulty);
        switch (_difficulty){
            case "EASY":
                _botPlayTurnEasy();
                break;
            case "NORMAL":
                _botPlayTurnNormal();
                break;
            case "HARD":
                _botPlayTurnHard();
                break;
            case "UNBEATABLE":
                _botPlayTurnUnbeatable();
        }
    }

    function botsTurn(){
        return (_currentPlayer === _playerTwo && _opponent === "AI");
    }

    function playTurn(cellNumber){
        console.log("play");
        if(ongoingCelebration){
            console.log("ONGOING CELEBRATION");
            return;
        }
        let successfulTurn = gameBoard.addMark(_currentPlayer.mark, cellNumber);
        let goal = gameBoard.checkIfGoal();
        if(goal) {
            if(goal === 1){
                console.log("It's a tie!");
            }
            else{
                console.log(`Goal! ${_currentPlayer.name} scored!`);
                _addGoal(_currentPlayer);
            }
            ongoingCelebration = true;
            setTimeout(()=>{ongoingCelebration = false}, 1000);
        }
        if(successfulTurn){
            _switchTurns();
        }
    }
    return {playTurn, toggleSound, updateTeam, updateName, getPLayerOne, getPLayerTwo, setFirstTurn, startTime, 
            resetScores, resetTeams, soundActivated, setOpponent, setDifficulty, getDifficulty, botsTurn};
})();

const ui = (()=>{
    const _body = document.querySelector("body");

    function _addNameInput(){
        const nameInput = document.createElement("input");
        usefulFunctions.setAttributes(nameInput, ["id", "type","placeholder"], ["player-two-name", "text", "What's your name?"]);
        const opponentSelector = document.querySelector(".initial-settings .right > select");
        opponentSelector.nextElementSibling.before(nameInput);
    }
    
    function _makeInvalidMessage(message){
        const invalidMessage = document.createElement("p");
        invalidMessage.classList.add("invalid-message");
        invalidMessage.innerText = message;
        return invalidMessage;
    }

    function _addBotsName(){
        const nameInput = document.createElement("input");
        const BOT_NAMES = ["Botaldo", "Botaldinho", "Botssi", "Botzema", "Botandowski", "Botistuta", "Botti", "Bottenbauer"];
        const botName = BOT_NAMES[Math.floor(Math.random() * BOT_NAMES.length)];
        usefulFunctions.setAttributes(nameInput, ["id", "type","value"], ["bot-name", "text", botName]);
        nameInput.disabled = true;
        const opponentSelector = document.querySelector(".initial-settings .right > select");
        opponentSelector.nextElementSibling.before(nameInput);
    }

    function _addDifficultyToggle(){
        const difficultyToggle = document.createElement("button");
        usefulFunctions.setAttributes(difficultyToggle, ["type", "class",], ["button", "difficulty-toggle"]);
        difficultyToggle.innerText = game.getDifficulty();
        difficultyToggle.addEventListener("click", _toggleDifficulty);
        const previousInput = document.querySelector(".initial-settings .right > input");
        previousInput.nextElementSibling.before(difficultyToggle);
    }

    function _removeDifficultyToggle(){
        console.log("REMOVE DIFFICULTY TOGGLE");
        const difficultyToggle = document.querySelector("button.difficulty-toggle");
        difficultyToggle.parentElement.removeChild(difficultyToggle);
    }

    function _toggleDifficulty(){
        if(game.soundActivated()) sounds.selectionOne.play();
        const difficultyToggle = document.querySelector("button.difficulty-toggle");
        const currentDifficulty = difficultyToggle.innerText;
        game.setDifficulty((currentDifficulty === "EASY") ?  "NORMAL" : (currentDifficulty === "NORMAL") ? "HARD" : (currentDifficulty === "HARD") ? "UNBEATABLE" : "EASY");
        difficultyToggle.innerText = game.getDifficulty();
    }

    function _changeOpponent(e){
        const opponentContainer = document.querySelector(".initial-settings .right");
        const previousInput = document.querySelector(".initial-settings .right > input");
        opponentContainer.removeChild(previousInput);
        let isHumanPlayer = (e.target.value === "PLAYER TWO");
        if (isHumanPlayer) {
            _addNameInput();
            _removeDifficultyToggle();
        }
        else{
            _addBotsName();
            _addDifficultyToggle();
        }
        game.updateTeam(opponentContainer, null, null, null, null);
        _displaySelectTeamScreen(opponentContainer);
    }

    function _removePreviousSelector(container){
        let previousSelector = document.querySelector(`.initial-settings .${container.getAttribute("class")} > [class*="selector"]`);
        if (previousSelector) {container.removeChild(previousSelector)};
    }

    function _removePreviousTeamChosenScreen(container){
        let previousTeamChosenScreen = document.querySelector(`.initial-settings .${container.getAttribute("class")} > [class*="chosen"]`);
        if (previousTeamChosenScreen) {container.removeChild(previousTeamChosenScreen)};
    }

    function _toggleSound(e){
        if(!game.soundActivated()) sounds.selectionTwo.play();
        game.toggleSound();
        e.target.classList.toggle("fa-volume-xmark");
        e.target.classList.toggle("fa-volume-high");
    }

    function _addVolumeToggle(parentElement){
        const volumeToggle = document.createElement("i");
        volumeToggle.classList.add("volume-toggle", "fa-solid", "fa-volume-xmark");
        volumeToggle.addEventListener("click", _toggleSound);
        parentElement.appendChild(volumeToggle);
    }

    function _toggleMusic(e){
        if(game.soundActivated()) sounds.selectionTwo.play();
        if(sounds.music.paused){
            e.target.classList.toggle("music-on");
            sounds.music.play();
            sounds.displaySong();
            return;
        }
        e.target.classList.toggle("music-on");
        sounds.music.pause();
    }

    function _addMusicToggle(parentElement){
        const musicToggle = document.createElement("i");
        musicToggle.classList.add("music-toggle", "fa-solid", "fa-music");
        musicToggle.addEventListener("click", _toggleMusic);
        parentElement.appendChild(musicToggle);
    }

    function displaySong(song){
        const songTitleContainer = document.createElement("section");
        songTitleContainer.classList.add("song-title-container");
        const songTitle = document.createElement("p");
        songTitle.classList.add("song-title");
        songTitle.innerText = song;
        songTitle.style.animation = "fade-in-and-out 8s forwards";
        songTitleContainer.appendChild(songTitle);
        _body.appendChild(songTitleContainer);
        setTimeout(()=>{_body.removeChild(songTitleContainer)}, 8000);
    }

    function _addReturnButton(container){
        const returnButton = document.createElement("i");
        returnButton.classList.add("return-button", "fa-solid", "fa-caret-left");
        returnButton.addEventListener("click", ()=>{_goBack(container)});
        returnButton.addEventListener("click", ()=>{if(game.soundActivated()) sounds.selectionTwo.play()});
        container.appendChild(returnButton);
    }

    function _goBack(container){
        _removeLastRandom(container);
        console.log("GO BACK")
        let isContinentSelector = document.querySelector(`.initial-settings .${container.getAttribute("class")} > .continent-selector`);
        let isNationalTeamsSelector = document.querySelector(`.initial-settings .${container.getAttribute("class")} > .national-teams-selector`);
        let isNationalTeamChosen = document.querySelector(`.initial-settings .${container.getAttribute("class")} > .national-team-chosen`);
        let isLeaguesSelector = document.querySelector(`.initial-settings .${container.getAttribute("class")} > .leagues-selector`);
        let isClubsSelector = document.querySelector(`.initial-settings .${container.getAttribute("class")} > .clubs-selector`);
        let isClubChosen = document.querySelector(`.initial-settings .${container.getAttribute("class")} > .club-chosen`);
        if(isContinentSelector){
            _displayCategorySelector(container);
            const returnButton = document.querySelector(`.initial-settings .${container.getAttribute("class")} > .return-button`);
            container.removeChild(returnButton);
        }
        if(isNationalTeamsSelector){
            _displayContinentSelector(container, "national-teams");
        }
        if(isNationalTeamChosen){
            const continent = isNationalTeamChosen.getAttribute("data-continent");
            _displayNationalTeamsSelector(container, continent)
        }
        if(isLeaguesSelector){
            _displayContinentSelector(container, "clubs")
        }
        if(isClubsSelector){
            const continent = isClubsSelector.getAttribute("data-continent");
            _displayLeaguesSelector(container, continent)
        }
        if(isClubChosen){
            const continent = isClubChosen.getAttribute("data-continent");
            const league = isClubChosen.getAttribute("data-league");
            _displayClubsSelector(container, continent, league);
        }
    }

    function _addLabel(){
        const labelContainer = document.createElement("div");
        labelContainer.classList.add("label-container");
        const label = document.createElement("p");
        label.classList.add("label");
        labelContainer.appendChild(label);
        return labelContainer;
    }

    function _updateLabel(label, text){
        label.innerText = text;
    }

    function _removePreviousLabel(container){
        console.log("REMOVE PREVIOUS LABEL");
        const labelContainer = document.querySelector(`.initial-settings .${container.getAttribute("class")} > .label-container`);
        if(labelContainer){
            container.removeChild(labelContainer);
        }
    }

    function _addRandomButton(container){
        console.log("MAKE RANDOM BUTTON");
        const randomButton = document.createElement("i");
        randomButton.classList.add("fa-solid", "fa-dice", "fa-2x");
        randomButton.classList.add("random-button");
        randomButton.addEventListener("click", ()=>_randomize(container));
        randomButton.addEventListener("click", ()=>{if(game.soundActivated()) sounds.selectionOne.play()});
        container.appendChild(randomButton);
    }

    let lastRandoms = {"left": null, "right": null};

    function _updateLastRandom(container, lastRandom){
        console.log("CONTAINER");
        console.log(container.getAttribute("class"));
        lastRandoms[container.getAttribute("class")] = lastRandom;
        console.log(lastRandoms[container.getAttribute("class")]);
    }

    function _removeLastRandom(container){
        lastRandoms[container.getAttribute("class")] = null;
    }

    function _chooseRandomContinent(){
        const continents = DATA.getContinents();
        const continent = continents[Math.floor(Math.random() * continents.length)];
        return continent;
    }

    function _chooseRandomLeague(continent){
        const leagues = DATA.getLeagues(continent);
        const league = leagues[Math.floor(Math.random() * leagues.length)];
        return league;
    }

    function _chooseRandomNationalTeam(container, continent){
        const player = (container.getAttribute("class") === "left") ? "one" : "two";
        const currentTeams = {"one": game.getPLayerOne().team.name, "two": game.getPLayerTwo().team.name};
        console.log("RANDOM NATIONAL TEAM");
        if(!continent){continent = _chooseRandomContinent()};
        console.log(continent);
        const countries = DATA.getCountries(continent);
        let country;
        do{
            country = countries[Math.floor(Math.random() * countries.length)];
            console.log(country);
        } while(country === currentTeams[player]);
        const countryInfo = DATA.getCountryInfo(continent, country);
        const kebabCaseContinent = usefulFunctions.toKebabCase(continent);
        const kebabCaseCountry = usefulFunctions.toKebabCase(country);
        const imagePath = `./images/countries/${kebabCaseContinent}/${kebabCaseCountry}.svg`
        _displayNationalTeamChosen(container, country, countryInfo.abbreviation, imagePath, continent, countryInfo.colors);
    }

    function _chooseRandomClub(container, continent, league){
        const player = (container.getAttribute("class") === "left") ? "one" : "two";
        const currentTeams = {"one": game.getPLayerOne().team.name, "two": game.getPLayerTwo().team.name};
        console.log("RANDOM CLUB");
        if(!continent){continent = _chooseRandomContinent()};
        console.log("RANDOMIZE");
        console.log(continent);
        if(!league){league = _chooseRandomLeague(continent)}
        console.log(league)
        const clubs = DATA.getClubs(continent, league);
        let club;
        do{
            club = clubs[Math.floor(Math.random() * clubs.length)];
            console.log(club);
        } while(club === currentTeams[player]);
        const clubInfo = DATA.getClubInfo(continent, league, club);
        const kebabCaseContinent = usefulFunctions.toKebabCase(continent);
        const kebabCaseLeague = usefulFunctions.toKebabCase(league);
        const kebabCaseClub = usefulFunctions.toKebabCase(club);
        const imagePath = `./images/clubs/${kebabCaseContinent}/${kebabCaseLeague}/${kebabCaseClub}.svg`;
        _displayClubChosen(container, club, clubInfo.abbreviation, imagePath, continent, league, clubInfo.colors);
    }

    function _chooseRandomNationalTeamOrClub(container){
        let category = ["clubs", "national-teams"][Math.floor(Math.random() * 2)];
        let isClubs = (category === "clubs") ? true : false;
        let lastRandom = ()=>{_chooseRandomNationalTeamOrClub(container)};
        _updateLastRandom(container, lastRandom);
        (isClubs) ? _chooseRandomClub(container) : _chooseRandomNationalTeam(container);
    }

    function _randomize(container){
        let isCategorySelector = document.querySelector(`.initial-settings .${container.getAttribute("class")} > .category-selector`);
        let isContinentSelector = document.querySelector(`.initial-settings .${container.getAttribute("class")} > .continent-selector`);
        let isNationalTeamsSelector = document.querySelector(`.initial-settings .${container.getAttribute("class")} > .national-teams-selector`);
        let isNationalTeamChosen = document.querySelector(`.initial-settings .${container.getAttribute("class")} > .national-team-chosen`);
        let isLeaguesSelector = document.querySelector(`.initial-settings .${container.getAttribute("class")} > .leagues-selector`);
        let isClubsSelector = document.querySelector(`.initial-settings .${container.getAttribute("class")} > .clubs-selector`);
        let isClubChosen = document.querySelector(`.initial-settings .${container.getAttribute("class")} > .club-chosen`);

        if(isCategorySelector){
            _chooseRandomNationalTeamOrClub(container);
        }
        if(isContinentSelector){
            const category = isContinentSelector.getAttribute("data-category");
            console.log(category)
            const isNationalTeams = category === "national-teams";
            const isClubs = !isNationalTeams;
            if(isClubs){
                let lastRandom = ()=>{_chooseRandomClub(container)};
                _updateLastRandom(container, lastRandom);
                _chooseRandomClub(container);
            }
            if(isNationalTeams){
                let lastRandom = ()=>{_chooseRandomNationalTeam(container)};
                _updateLastRandom(container, lastRandom);
                _chooseRandomNationalTeam(container);
            }
        }
        if(isNationalTeamsSelector){
            const continent = isNationalTeamsSelector.getAttribute("data-continent");
            let lastRandom = ()=>{_chooseRandomNationalTeam(container, continent)};
            _updateLastRandom(container, lastRandom);
            _chooseRandomNationalTeam(container, continent);
        }
        if(isNationalTeamChosen){
            if(!lastRandoms[container.getAttribute("class")]){
                const continent = isNationalTeamChosen.getAttribute("data-continent");
                let lastRandom = ()=>{_chooseRandomNationalTeam(container, continent)};
                _updateLastRandom(container, lastRandom);
            }
            lastRandoms[container.getAttribute("class")]();
        }
        if(isLeaguesSelector){
            const continent = isLeaguesSelector.getAttribute("data-continent");
            let lastRandom = ()=>{_chooseRandomClub(container, continent)};
            _updateLastRandom(container, lastRandom);
            _chooseRandomClub(container, continent);
        }
        if(isClubsSelector){
            const continent = isClubsSelector.getAttribute("data-continent");
            const league = isClubsSelector.getAttribute("data-league");
            let lastRandom = ()=>{_chooseRandomClub(container, continent, league)};
            _updateLastRandom(container, lastRandom);
            _chooseRandomClub(container, continent, league);
        }
        if(isClubChosen){
            if(!lastRandoms[container.getAttribute("class")]){
                const continent = isClubChosen.getAttribute("data-continent");
                const league = isClubChosen.getAttribute("data-league");
                let lastRandom = ()=>{_chooseRandomClub(container, continent, league)};
                _updateLastRandom(container, lastRandom);
            }
            lastRandoms[container.getAttribute("class")]();
        }
    }

    function _validate(){
        const left = document.querySelector(".initial-settings .left");
        const right = document.querySelector(".initial-settings .right");
        const nameInput = document.querySelector(".initial-settings .left > input");
        const name = nameInput.value;
        const opponentType = document.querySelector(".initial-settings .right > select").value;
        const opponentInput = document.querySelector(".right input");
        const opponentName = opponentInput.value;
        const playerOne = game.getPLayerOne();
        const playerTwo = game.getPLayerTwo();
        if(playerOne.team.name === null){
            const invalidMessage = document.querySelector(".initial-settings .left > .invalid-team");
            if(!invalidMessage){
                const selector = document.querySelector(".initial-settings .left > [class*='select']");
                const message = _makeInvalidMessage("Please select a team");
                message.classList.add("invalid-team");
                selector.before(message);
            }
        }
        else{
            const invalidMessage = document.querySelector(".initial-settings .left > .invalid-team");
            if(invalidMessage){
                left.removeChild(invalidMessage);
            }
        }

        if(playerTwo.team.name === null){
            const invalidMessage = document.querySelector(".initial-settings .right > .invalid-team");
            if(!invalidMessage){
                const selector = document.querySelector(".initial-settings .right > [class*='select']");
                const message = _makeInvalidMessage("Please select a team");
                message.classList.add("invalid-team");
                selector.before(message);
            }
        }
        else{
            const invalidMessage = document.querySelector(".initial-settings .right > .invalid-team");
            if(invalidMessage){
                right.removeChild(invalidMessage);
            }
        }

        if(!name || name[0]===" "){
            const invalidMessage = document.querySelector(".initial-settings .left > .invalid-name");
            if(!invalidMessage){
                nameInput.classList.toggle("invalid");
                const message = _makeInvalidMessage("Required field!");
                message.classList.add("invalid-name");
                nameInput.nextElementSibling.before(message);
            }
        }
        else{
            if(nameInput.classList.contains("invalid")){nameInput.classList.toggle("invalid")};
            const invalidMessage = document.querySelector(".initial-settings .left > .invalid-name");
            if(invalidMessage){left.removeChild(invalidMessage)};
        }
        if(opponentType === "PLAYER TWO"){
            if(!opponentName || opponentName[0]===" "){
                const invalidMessage = document.querySelector(".initial-settings .right > .invalid-name");
                if(!invalidMessage){
                    opponentInput.classList.toggle("invalid");
                    const message = _makeInvalidMessage("Required field!");
                    message.classList.add("invalid-name");
                    opponentInput.nextElementSibling.before(message);  
                }
            }
            else{
                if(opponentInput.classList.contains("invalid")){opponentInput.classList.toggle("invalid")};
                const invalidMessage = document.querySelector(".initial-settings .right > .invalid-name");
                if(invalidMessage){right.removeChild(invalidMessage)};
            }
        }
        else{
            const invalidMessage = document.querySelector(".initial-settings .right > .invalid-name");
            if(invalidMessage){right.removeChild(invalidMessage)};
        }
        const valid = !document.querySelector(".invalid-message");
        if(valid){
            if(game.soundActivated()) sounds.selectionTwo.play();
            game.updateName(left, name);
            game.updateName(right, opponentName);
            game.setOpponent(opponentType);
            console.log("OPPONENT TYPE:")
            console.log(opponentType);
            _flipCoin();
            return;
        }
        if(game.soundActivated()) sounds.errorOne.play();
    }

    function _displayFirstScreen(){
        let firstScreenContainer = document.createElement("section");
        firstScreenContainer.classList.add("first-screen");
        const title = document.createElement("h1");
        title.innerText = "Tic Tac Club";
        title.classList.add("title");
        _addVolumeToggle(_body);
        _addMusicToggle(_body);
        const playButton = document.createElement("button");
        playButton.setAttribute("type", "button");
        playButton.innerText = "PLAY";
        playButton.addEventListener("click", _displayInitialSetup);
        playButton.addEventListener("click", ()=> {if(game.soundActivated()) sounds.selectionOne.play()});
        usefulFunctions.appendChildren(firstScreenContainer, [title, playButton]);
        _body.appendChild(firstScreenContainer);
    }

    function _displayInitialSetup(nameOne, nameTwo){
        usefulFunctions.clearPreviousScreen();
        const container = document.createElement("div");
        container.classList.add("initial-settings");
        const versusV = document.createElement("div");
        versusV.innerText = "V";
        versusV.classList.add("versus", "v");
        const versusS = document.createElement("div");
        versusS.innerText = "S";
        versusS.classList.add("versus", "s");
        const top = document.createElement("section");
        top.classList.add("top");
        const left = document.createElement("section");
        left.classList.add("left");
        const playerOneLabelContainer = document.createElement("section");
        const playerOneLabel = document.createElement("p");
        playerOneLabel.innerText = "PLAYER ONE";
        playerOneLabelContainer.appendChild(playerOneLabel);
        const nameInput = document.createElement("input");
        if(nameOne && typeof nameOne === "string"){nameInput.value = nameOne};
        usefulFunctions.setAttributes(nameInput, ["id", "type","placeholder"], ["player-one-name", "text", "What's your name?"]);
        usefulFunctions.appendChildren(left, [versusV, playerOneLabel, nameInput]);
        const right = document.createElement("section");
        right.classList.add("right");
        const opponentSelector = document.createElement("select");
        opponentSelector.setAttribute("id", "opponent-selector");
        const AI = document.createElement("option");
        AI.setAttribute("value", "AI");
        AI.innerText = "AI";
        const playerTwo = document.createElement("option");
        playerTwo.setAttribute("value", "PLAYER TWO");
        playerTwo.innerText = "PLAYER TWO";
        usefulFunctions.appendChildren(opponentSelector, [AI, playerTwo]);
        opponentSelector.addEventListener("change", _changeOpponent);
        const opponentNameInput = document.createElement("input");
        opponentNameInput.disabled = true;
        const BOT_NAMES = ["Botaldo", "Botaldinho", "Botssi", "Botzema", "Botandowski", "Botistuta", "Botti", "Bottenbauer"];
        let botsName = BOT_NAMES[Math.floor(Math.random() * BOT_NAMES.length)];
        usefulFunctions.setAttributes(opponentNameInput, ["id", "type","value"], ["bot-name", "text", botsName]);
        const difficultyToggle = document.createElement("button");
        usefulFunctions.setAttributes(difficultyToggle, ["type", "class",], ["button", "difficulty-toggle"]);
        difficultyToggle.innerText = game.getDifficulty();
        difficultyToggle.addEventListener("click", _toggleDifficulty);
        usefulFunctions.appendChildren(right, [versusS, opponentSelector, opponentNameInput, difficultyToggle]);
        if(nameTwo && typeof nameTwo === "string"){
            if(!BOT_NAMES.includes(nameTwo)){
                opponentSelector.value = "PLAYER TWO";
                opponentNameInput.disabled = false;
                right.removeChild(difficultyToggle);
            }
            opponentNameInput.value = nameTwo;
        }
        const bottom = document.createElement("section");
        bottom.classList.add("bottom");
        const button = document.createElement("button");
        button.innerText = "START GAME";
        button.addEventListener("click", _validate)
        bottom.appendChild(button);
        usefulFunctions.appendChildren(top, [left, right]);
        usefulFunctions.appendChildren(container, [top, bottom]);
        _body.appendChild(container);
        _displaySelectTeamScreen(left);
        _displaySelectTeamScreen(right);
    }

    function _displaySelectTeamScreen(container){
        let alreadyASelecTeamScreen = document.querySelector(`.initial-settings .${container.getAttribute("class")} > .select-team`);
        if(alreadyASelecTeamScreen) return;
        _removePreviousLabel(container);
        _removePreviousSelector(container);
        _removePreviousTeamChosenScreen(container);
        let randomButton = document.querySelector(`.initial-settings .${container.getAttribute("class")} > .random-button`);
        if(randomButton){container.removeChild(randomButton)};
        let returnButton = document.querySelector(`.initial-settings .${container.getAttribute("class")} > .return-button`);
        if(returnButton){container.removeChild(returnButton)};
        const selectTeamScreen = document.createElement("div");
        selectTeamScreen.classList.add("select-team");
        const selectTeamButton = document.createElement("button");
        selectTeamButton.setAttribute("type", "button");
        selectTeamButton.innerText = "SELECT TEAM";
        selectTeamButton.addEventListener("click", ()=>{_displayCategorySelector(container)});
        selectTeamButton.addEventListener("click", ()=>{if(game.soundActivated()) sounds.selectionTwo.play()})
        selectTeamScreen.appendChild(selectTeamButton);
        container.appendChild(selectTeamScreen);
    }

    function _displayCategorySelector(container){
        _removePreviousSelector(container);
        let selecTeamScreen = document.querySelector(`.initial-settings .${container.getAttribute("class")} > .select-team`);
        if(selecTeamScreen){container.removeChild(selecTeamScreen)};
        let noRandomButton = !document.querySelector(`.initial-settings .${container.getAttribute("class")} > .random-button`);
        if(noRandomButton){_addRandomButton(container)}
        const categorySelector = document.createElement("div");
        categorySelector.classList.add("category-selector");
        const nationalTeams = document.createElement("section");
        nationalTeams.classList.add("national-teams");
        const nationalTeamsTitle = document.createElement("p");
        nationalTeamsTitle.classList.add("category-title", "national-teams-title");
        nationalTeamsTitle.innerText = "NATIONAL TEAMS";
        nationalTeams.appendChild(nationalTeamsTitle);
        nationalTeams.addEventListener("click", (event)=>{_displayContinentSelector(container, event)});
        nationalTeams.addEventListener("click", ()=>{if(game.soundActivated()) sounds.selectionTwo.play()});
        const clubs = document.createElement("section");
        clubs.classList.add("clubs");
        const clubsTitle = document.createElement("p");
        clubsTitle.classList.add("category-title", "clubs-title");
        clubsTitle.innerText = "CLUBS";
        clubs.appendChild(clubsTitle);
        clubs.addEventListener("click", (event) =>{_displayContinentSelector(container, event)});
        clubs.addEventListener("click", ()=>{if(game.soundActivated()) sounds.selectionTwo.play()});
        usefulFunctions.appendChildren(categorySelector, [nationalTeams, clubs]);
        container.appendChild(categorySelector);
    }

    function _displayContinentSelector(container, event){
        console.log("continent-selector");
        _removePreviousSelector(container);
        _removePreviousLabel(container);
        let thereIsNoReturnButton = !document.querySelector(`.initial-settings .${container.getAttribute("class")} > .return-button`);
        if(thereIsNoReturnButton){_addReturnButton(container)};
        const isNationalTeams = (typeof event === "string") ? (event === "national-teams") : (event.target.getAttribute("class").includes("national-teams"));
        const isClubs = !isNationalTeams;
        const continentSelector = document.createElement("div");
        continentSelector.classList.add("continent-selector");
        continentSelector.setAttribute("data-category", (isNationalTeams) ? "national-teams" : "clubs");
        const CONTINENTS = DATA.getContinents();
        for (let currentContinent of CONTINENTS){
            const continent = document.createElement("section");
            continent.classList.add("continent");
            continentTitle = document.createElement("p");
            continentTitle.innerText = currentContinent;
            continent.appendChild(continentTitle);
            const BACKGROUND_IMAGE_PATH = `./images/continents/${usefulFunctions.toKebabCase(currentContinent)}.svg`;
            continent.setAttribute("style", `background-image: url(${BACKGROUND_IMAGE_PATH})`);
            continent.setAttribute("data-continent", currentContinent);
            if (isNationalTeams){
                continent.addEventListener("click", (event) => {_displayNationalTeamsSelector(container, event)});
            }
            if (isClubs){
                continent.addEventListener("click", (event) => {_displayLeaguesSelector(container, event)});
            }
            continent.addEventListener("click", ()=>{if(game.soundActivated()) sounds.selectionTwo.play()});
            continentSelector.appendChild(continent);
        }
        container.appendChild(continentSelector);
    }

    function _displayNationalTeamsSelector(container, event){
        _removePreviousSelector(container);
        _removePreviousTeamChosenScreen(container);
        _removePreviousLabel(container);
        const continent = (typeof event === "string") ? event : event.target.getAttribute("data-continent");
        const labelContainer = _addLabel();
        const label = labelContainer.firstChild;
        console.log("LABEL CONTAINER NATIONAL TEAMS:")
        console.log(labelContainer);
        const continentAsDemonym = (continent === "Europe") ? continent + "an" : continent + "n";
        const initialMessage = `${continentAsDemonym.toUpperCase()} NATIONAL TEAMS`;
        _updateLabel(label, initialMessage);
        const nationalTeamsSelector = document.createElement("div");
        nationalTeamsSelector.classList.add("national-teams-selector");
        nationalTeamsSelector.setAttribute("data-continent", continent);
        nationalTeamsSelector.addEventListener("mouseleave", ()=>{_updateLabel(label, initialMessage)})
        for (let currentCountry of DATA.getCountries(continent)){
            console.log(currentCountry);
            console.log(continent);
            const countryInfo = DATA.getCountryInfo(continent, currentCountry);
            const country = document.createElement("section");
            country.classList.add("national-team");
            country.setAttribute("data-country", currentCountry);
            const countryBadge = document.createElement("img");
            const kebabCaseContinent = usefulFunctions.toKebabCase(continent);
            const kebabCaseCountry = usefulFunctions.toKebabCase(currentCountry);
            const imagePath = `./images/countries/${kebabCaseContinent}/${kebabCaseCountry}.svg`
            usefulFunctions.setAttributes(countryBadge, ["src", "alt"], [imagePath, currentCountry]);
            country.addEventListener("click", ()=>{_displayNationalTeamChosen(container, currentCountry, countryInfo.abbreviation, imagePath, continent, countryInfo.colors)});
            country.addEventListener("mouseenter", ()=>{_updateLabel(label, currentCountry.toUpperCase())});
            country.addEventListener("click", ()=>{if(game.soundActivated()) sounds.selectionOne.play()});
            country.appendChild(countryBadge);
            nationalTeamsSelector.appendChild(country);
        }
        usefulFunctions.appendChildren(container, [labelContainer, nationalTeamsSelector])
    }

    function _displayNationalTeamChosen(container, country, abbreviation, imagePath, continent, colors){
        _removePreviousSelector(container);
        _removePreviousLabel(container);
        _removePreviousTeamChosenScreen(container);
        game.updateTeam(container, country, abbreviation, imagePath, colors);
        let thereIsNoReturnButton = !document.querySelector(`.initial-settings .${container.getAttribute("class")} > .return-button`);
        if(thereIsNoReturnButton){_addReturnButton(container)};
        const labelContainer = _addLabel();
        const label = labelContainer.firstChild;
        _updateLabel(label, country.toUpperCase());
        const nationalTeamChosen = document.createElement("div");
        nationalTeamChosen.classList.add("national-team-chosen");
        nationalTeamChosen.setAttribute("data-continent", continent);
        const nationalTeamChosenBadge = document.createElement("img");
        usefulFunctions.setAttributes(nationalTeamChosenBadge, ["src", "alt"], [imagePath, country]);
        nationalTeamChosen.appendChild(nationalTeamChosenBadge);
        usefulFunctions.appendChildren(container, [labelContainer, nationalTeamChosen])
    }

    function _displayLeaguesSelector(container, event){
        _removePreviousSelector(container);
        console.log(container);
        const continent = (typeof event === "string") ? event : event.target.getAttribute("data-continent");
        _removePreviousLabel(container);
        const labelContainer = _addLabel();
        const label = labelContainer.firstChild;
        console.log("LABEL CONTAINER CLUBS:")
        console.log(labelContainer);
        const continentAsDemonym = (continent === "Europe") ? continent + "an" : continent + "n";
        const initialMessage = `${continentAsDemonym.toUpperCase()} LEAGUES`;
        _updateLabel(label, initialMessage);
        const leaguesSelector = document.createElement("div");
        leaguesSelector.classList.add("leagues-selector");
        leaguesSelector.setAttribute("data-continent", continent);
        leaguesSelector.addEventListener("mouseleave", ()=>{_updateLabel(label, initialMessage)});
        for (let currentLeague of DATA.getLeagues(continent)){
            const league = document.createElement("section");
            league.classList.add("league");
            league.setAttribute("data-league", currentLeague);
            const leagueLogo = document.createElement("img");
            leagueLogo.setAttribute("data-league", currentLeague);
            const kebabCaseContinent = usefulFunctions.toKebabCase(continent);
            const kebabCaseLeague = usefulFunctions.toKebabCase(currentLeague);
            const imagePath = `./images/leagues/${kebabCaseContinent}/${kebabCaseLeague}.svg`
            usefulFunctions.setAttributes(leagueLogo, ["src", "alt"], [imagePath, currentLeague]);
            league.appendChild(leagueLogo);
            league.addEventListener("click", (event)=>{_displayClubsSelector(container, continent, event)});
            league.addEventListener("mouseenter", ()=>{_updateLabel(label, currentLeague.toUpperCase())});
            league.addEventListener("click", ()=>{if(game.soundActivated()) sounds.selectionTwo.play()});
            leaguesSelector.appendChild(league);
        }
        usefulFunctions.appendChildren(container, [labelContainer, leaguesSelector]);
    }

    function _displayClubsSelector(container, continent, event){
        _removePreviousSelector(container);
        _removePreviousTeamChosenScreen(container);
        _removePreviousLabel(container);
        const league = (typeof event === "string") ? event : event.target.getAttribute("data-league");
        const labelContainer = _addLabel();
        const label = labelContainer.firstChild;
        const initialMessage = league.toUpperCase();
        _updateLabel(label, initialMessage);
        const clubsSelector = document.createElement("div");
        clubsSelector.classList.add("clubs-selector");
        usefulFunctions.setAttributes(clubsSelector, ["data-continent", "data-league"], [continent, league])
        clubsSelector.addEventListener("mouseleave", ()=>{_updateLabel(label, initialMessage)});
        for (let currentClub of DATA.getClubs(continent, league)){
            console.log(currentClub);
            const clubInfo = DATA.getClubInfo(continent, league, currentClub);
            const club = document.createElement("section");
            club.classList.add("club");
            club.setAttribute("data-club", currentClub);
            const clubBadge = document.createElement("img");
            const kebabCaseContinent = usefulFunctions.toKebabCase(continent);
            const kebabCaseLeague = usefulFunctions.toKebabCase(league);
            const kebabCaseClub = usefulFunctions.toKebabCase(currentClub);
            const imagePath = `./images/clubs/${kebabCaseContinent}/${kebabCaseLeague}/${kebabCaseClub}.svg`
            usefulFunctions.setAttributes(clubBadge, ["src", "alt"], [imagePath, currentClub]);
            club.addEventListener("click", ()=>{ _displayClubChosen(container, currentClub, clubInfo.abbreviation, imagePath, continent, league, clubInfo.colors)});
            club.addEventListener("mouseenter", ()=>{_updateLabel(label, currentClub.toUpperCase())});
            club.addEventListener("click", ()=>{if(game.soundActivated()) sounds.selectionOne.play()})
            club.appendChild(clubBadge);
            clubsSelector.appendChild(club);
        }
        usefulFunctions.appendChildren(container, [labelContainer, clubsSelector])
    }

    function _displayClubChosen(container, club, abbreviation, imagePath, continent, league, colors){
        _removePreviousSelector(container);
        _removePreviousLabel(container);
        _removePreviousTeamChosenScreen(container);
        game.updateTeam(container, club, abbreviation, imagePath, colors);
        let thereIsNoReturnButton = !document.querySelector(`.initial-settings .${container.getAttribute("class")} > .return-button`);
        if(thereIsNoReturnButton){_addReturnButton(container)};
        const labelContainer = _addLabel();
        const label = labelContainer.firstChild;
        _updateLabel(label, club.toUpperCase());
        const clubChosen = document.createElement("div");
        clubChosen.classList.add("club-chosen");
        usefulFunctions.setAttributes(clubChosen, ["data-continent", "data-league"], [continent, league]);
        const clubChosenBadge = document.createElement("img");
        usefulFunctions.setAttributes(clubChosenBadge, ["src", "alt"], [imagePath, club]);
        clubChosen.appendChild(clubChosenBadge);
        usefulFunctions.appendChildren(container, [labelContainer, clubChosen]);
    }

    function _flipCoin(){
        usefulFunctions.clearPreviousScreen();
        const coinFlipScreen = document.createElement("div");
        coinFlipScreen.classList.add("coin-flip-screen");
        const instructions = document.createElement("p");
        instructions.classList.add("coin-flip-instructions");
        instructions.innerText = "FLIP THE COIN TO SEE WHO STARTS";
        const playerOne = game.getPLayerOne();
        const playerTwo = game.getPLayerTwo();
        const playerOneCoinSide = ["head", "tail"][Math.floor(Math.random() * 2)];
        const playerTwoCoinSide = (playerOneCoinSide === "head") ? "tail" : "head";
        const playerOneCoinSideMessage = document.createElement("p");
        playerOneCoinSideMessage.classList.add(`coin-side-message-${playerOneCoinSide}`);
        playerOneCoinSideMessage.innerText = `${playerOne.name}: `;
        const playerTwoCoinSideMessage = document.createElement("p");
        playerTwoCoinSideMessage.classList.add(`coin-side-message-${playerTwoCoinSide}`);
        playerTwoCoinSideMessage.innerText = `${playerTwo.name}: `;
        const coinMessagesContainer = document.createElement("section");
        coinMessagesContainer.classList.add("coin-messages-container");
        usefulFunctions.appendChildren(coinMessagesContainer, [playerOneCoinSideMessage, playerTwoCoinSideMessage]);
        const coinContainer = document.createElement("div");
        coinContainer.classList.add("coin-container");
        const coin = document.createElement("section");
        coin.setAttribute("id", "coin");
        coin.addEventListener("click", ()=>{
            const coinAlreadyFlipped = coin.getAttribute("data-state") == "already-flipped";
            if(coinAlreadyFlipped){return};
            if(game.soundActivated()) sounds.coinToss.play();
            const result = ["head", "tail"][Math.floor(Math.random() * 2)];
            coin.style.animation = (result === "head") ? "flip-head 1.3s forwards" : "flip-tail 1.3s forwards";
            coin.addEventListener("animationend", ()=>{
                const flipWinner = (result === playerOneCoinSide) ? playerOneCoinSideMessage : playerTwoCoinSideMessage;
                flipWinner.classList.add("flip-winner");
                coin.setAttribute("data-state", "already-flipped");
            });
            const winner = (result === playerOneCoinSide) ? playerOne.name : playerTwo.name;
            game.setFirstTurn(winner);
            setTimeout(()=>{
                const winnerMessageContainer = document.createElement("section");
                winnerMessageContainer.classList.add("first-turn-message-container");
                const winnerMessage = document.createElement("p");
                winnerMessage.classList.add("first-turn-message");
                winnerMessage.innerText = `${winner.toUpperCase()} STARTS!`;
                winnerMessageContainer.appendChild(winnerMessage);
                usefulFunctions.clearPreviousScreen();
                _body.appendChild(winnerMessageContainer);
            }, 2500);
            setTimeout(_displayGameBoardScreen, 4000);
        })
        coinContainer.appendChild(coin);
        coinHead = document.createElement("section");
        coinHead.classList.add("head");
        const headImage = document.createElement("img");
        usefulFunctions.setAttributes(headImage, ["src", "alt"], ["./images/coin/head.png", "Coin's head"]);
        coinHead.appendChild(headImage);
        coinTail = document.createElement("section");
        coinTail.classList.add("tail");
        const tailImage = document.createElement("img");
        usefulFunctions.setAttributes(tailImage, ["src", "alt"], ["./images/coin/tail.png", "Coin's tail"]);
        coinTail.appendChild(tailImage);
        usefulFunctions.appendChildren(coin, [coinHead, coinTail]);
        usefulFunctions.appendChildren(coinFlipScreen, [instructions, coinContainer, coinMessagesContainer]);
        _body.appendChild(coinFlipScreen);
    }

    function _displayGameBoardScreen(){
        const gameScreen = document.createElement("section");
        gameScreen.classList.add("game-screen");
        const playerOneSide = document.createElement("section");
        playerOneSide.classList.add("player-one-side");
        const localTeamBadge = document.createElement("img");
        localTeamBadge.classList.add("local-team-badge");
        const localTeam = game.getPLayerOne().team;
        usefulFunctions.setAttributes(localTeamBadge, ["src", "alt"], [localTeam.imagePath, localTeam.name]);
        playerOneSide.appendChild(localTeamBadge);
        const playerTwoSide = document.createElement("section");
        playerTwoSide.classList.add("player-two-side");
        const visitorTeamBadge = document.createElement("img");
        visitorTeamBadge.classList.add("visitor-team-badge");
        const visitorTeam = game.getPLayerTwo().team;
        usefulFunctions.setAttributes(visitorTeamBadge, ["src", "alt"], [visitorTeam.imagePath, visitorTeam.name]);
        playerTwoSide.appendChild(visitorTeamBadge);
        usefulFunctions.appendChildren(gameScreen, [playerOneSide, playerTwoSide]);
        usefulFunctions.clearPreviousScreen();
        _displayScoreBoard(gameScreen);
        gameBoard.set(gameScreen);
        _body.appendChild(gameScreen);
    }

    function _displayScoreBoard(parentElement){
        const scoreboard = document.createElement("div");
        scoreboard.classList.add("scoreboard");
        const scoreContainer = document.createElement("section");
        scoreContainer.classList.add("score-container");
        const local = document.createElement("section");
        local.classList.add("local");
        const localAbbreviation = document.createElement("p");
        localAbbreviation.classList.add("local-abbreviation");
        localAbbreviation.innerText = game.getPLayerOne().team.abbreviation;
        const localScore = document.createElement("p");
        localScore.classList.add("local-score");
        localScore.innerText = "0";
        usefulFunctions.appendChildren(local, [localAbbreviation, localScore]);
        const visitor = document.createElement("section");
        visitor.classList.add("visitor");
        const visitorAbbreviation = document.createElement("p");
        visitorAbbreviation.classList.add("visitor-abbreviation");
        visitorAbbreviation.innerText = game.getPLayerTwo().team.abbreviation;
        const visitorScore = document.createElement("p");
        visitorScore.classList.add("visitor-score");
        visitorScore.innerText = "0";
        usefulFunctions.appendChildren(visitor, [visitorScore, visitorAbbreviation]);
        usefulFunctions.appendChildren(scoreContainer, [local, visitor]);
        const timeContainer = document.createElement("section");
        timeContainer.classList.add("time-container");
        const time = document.createElement("p");
        time.classList.add("time");
        timeContainer.appendChild(time);
        usefulFunctions.appendChildren(scoreboard, [timeContainer, scoreContainer])
        parentElement.appendChild(scoreboard);
        game.startTime();
    }

    function updateScore(){
        const localScore = document.querySelector(".scoreboard .local-score");
        const visitorScore = document.querySelector(".scoreboard .visitor-score");
        localScore.innerText = game.getPLayerOne().score;
        visitorScore.innerText = game.getPLayerTwo().score;
    }

    function updateTime(currentTime){
        let time = document.querySelector(".scoreboard .time");
        time.innerText = currentTime;
    }

    function updateCurrentPlayer(player){
        const isPlayerOne = (player === 1);
        const localTeamBadge = document.querySelector(".game-screen .local-team-badge");
        const visitorTeamBadge = document.querySelector(".game-screen .visitor-team-badge");
        if(isPlayerOne){
            localTeamBadge.classList.toggle("current-player");
            if(visitorTeamBadge.classList.contains("current-player")){visitorTeamBadge.classList.toggle("current-player")};
            return;
        }
        visitorTeamBadge.classList.toggle("current-player");
        if(localTeamBadge.classList.contains("current-player")){localTeamBadge.classList.toggle("current-player")};
    }

    function displayResult(result){
        if(game.soundActivated()) sounds.gameOver.play();
        usefulFunctions.clearPreviousScreen();
        const resultContainer = document.createElement("section");
        resultContainer.classList.add("game-result-container");
        const message = document.createElement("p");
        message.innerText = result;
        const selectTeam = document.createElement("i");
        selectTeam.classList.add("fa-solid", "fa-shirt");
        selectTeam.addEventListener("click", ()=> {
            if(game.soundActivated()) sounds.selectionOne.play();
            const nameOne = game.getPLayerOne().name;
            const nameTwo = game.getPLayerTwo().name;
            game.resetTeams();
            _displayInitialSetup(nameOne, nameTwo);
        });
        const playAgain = document.createElement("i");
        playAgain.classList.add("fa-solid", "fa-arrow-rotate-left");
        playAgain.addEventListener("click", ()=>{
            if(game.soundActivated()) sounds.selectionOne.play();
            _flipCoin();
        });
        usefulFunctions.appendChildren(resultContainer, [message, selectTeam, playAgain]);
        _body.appendChild(resultContainer);
    }

    return {_displayFirstScreen, updateScore, updateTime, updateCurrentPlayer, displayResult, displaySong}
})()

const usefulFunctions = {
    setAttributes: (element, attributes, values)=>{
        for (let iterator in attributes){
            element.setAttribute(attributes[iterator], values[iterator])
        }
    },
    appendChildren: (parent, children)=>{
        for (let child of children){
            parent.appendChild(child);
        }
    },
    clearPreviousScreen: ()=>{
        const body = document.querySelector("body");
        const previousScreen = document.querySelectorAll("body > :not(script):not(.volume-toggle):not(.music-toggle):not(.song-title-container)");
        for (let element of previousScreen){
            body.removeChild(element);
        }
    },
    removeAllChildren: (parentNode)=>{
        while (parentNode.firstChild){
            parentNode.removeChild(parentNode.firstChild)
        }
    },
    toKebabCase: (string)=>{
        return string.toLowerCase().replace(/\s/g, "-");
    }, 
    randomIntFromRangeInclusive: (min, max)=>{
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
}

DATA = (()=>{
    const _CONTINENTS = { 	
        Africa: {
            Algeria: {colors: ["green", "white", "red"], abbreviation: "ALG"},
            Angola: {colors: ["red", "black", "yellow"], abbreviation: "ANG"},
            Benin: {colors: ["green", "yellow", "red"], abbreviation: "BEN"}
        },
        Asia: {
            Afghanistan: {colors: ["black", "red", "green"], abbreviation: "AFG"},
            Bahrain: {colors: ["white", "red", "red"], abbreviation: "BAR"}
        },
        Europe: {
            Albania: {colors: ["red", "red", "black"], abbreviation: "ALB"},
            Andorra: {colors: ["blue", "yellow", "red"], abbreviation: "AND"},
            Armenia: {colors: ["red", "blue", "yellow"], abbreviation: "ARM"},
            // ...
            England: {colors: ["white", "red", "blue"], abbreviation: "ENG"}
        }
    }
      
    const _LEAGUES = {
        Europe: {
            "Bundesliga": {"Bayern": {colors:["red", "white", "blue"], abbreviation: "FCB"}, "Borussia Dortmund": {colors: ["yellow", "yellow", "black"], abbreviation: "BVB"}},
            "English Premier League": {"Arsenal": {colors: ["red", "red", "white"], abbreviation: "ARS"} ,"Aston Villa FC": {colors: ["purple", "purple", "skyblue"], abbreviation: "AVL"}, "Brentford": {colors:["red", "red", "white"], abbreviation: "BFD"},"Brighton & Hove Albion":{colors:["blue", "blue", "white"], abbreviation: "BRI"}, "Burnley FC":{colors:["purple", "purple", "skyblue"], abbreviation: "BLY"}, "Chelsea":{colors:["blue", "blue", "white"], abbreviation: "CHE"}, "Crystal Palace":{colors:["blue", "blue", "red"], abbreviation: "CPL"}},
            // "Eredivise": "",
            // "Greek Super League": "",
            "La Liga": {"Real Madrid": {colors:["white", "white", "black"], abbreviation: "RMD"}, "Barcelona": {colors: ["red", "blue", "golden"], abbreviation: "FCB"}},
            // "Ligue 1": "",
            // "Primeria Liga": "",
            // "Russian Premier League": "",
            // "Serie A": "",
            // "Turkish Super League": "",
            // "Ukranian Premier League": ""
        },
        Africa: {
            "Egyptian Premier League": {"Al Ahly": {colors:["red", "white", "black"], abbreviation: "AHL"}, "Pyramids FC": {colors: ["blue", "skyblue", "white"], abbreviation: "PYR"}}
        },
        Asia: {
            "J1 League": {"Cerezo Osaka": {colors:["pink", "pink", "purple"], abbreviation: "CZO"}, "FC Tokyo": {colors: ["blue", "blue", "red"], abbreviation: "TKY"}},
        }
    }
      
    function getContinents(){
        return Object.keys(_CONTINENTS);
    }
       function getCountries(continent){
            console.log(continent);
            return Object.keys(_CONTINENTS[continent])
    }
    function getCountryColors(continent, country){
    	return _CONTINENTS[continent][country]["colors"];
    }
    function getCountryInfo(continent, country){
        const abbreviation = _CONTINENTS[continent][country]["abbreviation"];
        const colors = _CONTINENTS[continent][country]["colors"];
        return {abbreviation, colors};
    }
    function getLeagues(continent){
        return Object.keys(_LEAGUES[continent]);
    }
    function getClubs(continent, league){
        return Object.keys(_LEAGUES[continent][league]);
    }
    function getClubColors(continent, league, club){
    	return _LEAGUES[continent][league][club]["colors"];
    }
    function getClubInfo(continent, league, club){
        const abbreviation = _LEAGUES[continent][league][club]["abbreviation"];
        const colors = _LEAGUES[continent][league][club]["colors"];
        return {abbreviation, colors};
    }
    return {getContinents, getCountries, getCountryColors, getCountryInfo, getLeagues, getClubs, getClubColors, _CONTINENTS, _LEAGUES, getClubInfo};
})();

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