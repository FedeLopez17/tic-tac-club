const gameBoard = (()=>{
    const _gameBoard = [];

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
            console.log("BOTS TURN");
            return;
        };
        const cellNumber = parseInt(e.target.getAttribute('data-cell'));
        game.playTurn(cellNumber);
    }

    function set(){
        game.resetScores();
        const BODY = document.querySelector("body");
        const CONTAINER = document.createElement("section");
        CONTAINER.classList.add("game-board");
        for (let cellNumber = 0; cellNumber < 9; cellNumber++){
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.setAttribute('data-cell', cellNumber);
            cell.addEventListener("click", _handleClick);
            CONTAINER.appendChild(cell);
        }
        BODY.appendChild(CONTAINER);
    }

    function reset(){
        console.log("RESET!!")
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
                console.log("COMBINATION:");
                console.log(combination);
                for(let cell of cells){
                    const cellNumber = parseInt(cell.getAttribute("data-cell"));
                    console.log(cellNumber);
                    if(combination.includes(cellNumber)){cell.classList.add("winning-combination")};
                    setTimeout(()=>{cell.classList.remove("winning-combination")}, 1000);
                }
                return true;
            };  
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
        if(full){if(game.soundActivated()) sounds.errorOne.play()};
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
    let team = null;
    let name = null;
    let imagePath = null;
    let colors = null;
    let score = 0;
    return {mark, name, team, imagePath, colors, score};
}

const game = (()=>{
    let _sound = false;
    const _playerOne = Player("X");
    const _playerTwo = Player("O");
    let _currentPlayer = null;
    let _opponent = null;
    let _difficulty = "EASY";
    let ongoingCelebration = false;
    let over = false;

    function toggleSound(){
        _sound = !_sound;
        console.log(_sound);
    }

    function soundActivated(){
        return _sound;
    }

    function updateTeam(CONTAINER, team, imagePath, colors){
        let playerOne = CONTAINER.getAttribute("class") === "left";
        let playerTwo = CONTAINER.getAttribute("class") === "right";
        if(playerOne){
            _playerOne.team = team;
            _playerOne.imagePath = imagePath;
            _playerOne.colors = colors;
            console.log("UPDATE TEAM:");
            console.log(_playerOne);
        }
        else if(playerTwo){
            _playerTwo.team = team;
            _playerTwo.imagePath = imagePath;
            _playerTwo.colors = colors;
            console.log("UPDATE TEAM:");
            console.log(_playerTwo);
        }      
    }

    function resetTeams(){
        console.log("RESET TEAMS");
        _playerOne.team = null;
        _playerOne.imagePath = null;
        _playerOne.colors = null;
        _playerTwo.team = null;
        _playerTwo.imagePath = null;
        _playerTwo.colors = null;
    }

    let currentTimeMinutes = 0;
    let currentTimeSeconds = 0;
    let currentTime;
    const MAX_TIME = 60;


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
        console.log("DIFFICULTY:");
        console.log(_difficulty);
    }

    function getDifficulty(){
        return _difficulty;
    }

    function setFirstTurn(playerName){
        _currentPlayer = (playerName === _playerOne.name) ? _playerOne : _playerTwo;
        console.log("First turn:");
        console.log(_currentPlayer);
        if(_currentPlayer === _playerTwo && _opponent === "AI"){
            setTimeout(()=>{botPlayTurn()}, 4000);
        }
    }

    function updateName(CONTAINER, name){
        let playerOne = CONTAINER.getAttribute("class") === "left";
        (playerOne) ? _playerOne.name = name : _playerTwo.name = name;
    }

    function _addGoal(player){
        (player === _playerOne) ? _playerOne.score += 1 : _playerTwo.score += 1;
        ui.updateScore();
        ongoingGoalCelebration = true;
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
        _currentPlayer = (_currentPlayer === _playerOne) ? _playerTwo : _playerOne;
        console.log(`${_currentPlayer.name}'s turn!`)
        if(_currentPlayer === _playerTwo && _opponent === "AI"){
            //This is just to make it look like the bot is thinking
            const botThinkingTime = usefulFunctions.randomIntFromRangeInclusive(400, 800);
            setTimeout(()=>{botPlayTurn()}, botThinkingTime);
        }
    }

    function _botPlayTurnEasy(){
        console.log("BOT PLAYS TURN EASY:");
        const emptyCells = gameBoard.getEmptyCells();
        const randomlyChosenCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        playTurn(randomlyChosenCell);
    }

    function _botPlayTurnNormal(){
        console.log("BOT PLAYS TURN NORMAL");
        let randomDifficulty = Math.floor(Math.random() * 3);
        ([0, 1].includes(randomDifficulty)) ? _botPlayTurnEasy() : _botPlayTurnUnbeatable();
    }

    function _botPlayTurnHard(){
        console.log("BOT PLAYS TURN HARD:");
        let randomDifficulty = Math.floor(Math.random() * 3);
        ([0, 1].includes(randomDifficulty)) ? _botPlayTurnUnbeatable() : _botPlayTurnEasy();
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
                // console.log("goal");
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
                // console.log(`Maximizing bestscore is ${bestScore}`)
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
                // console.log(`Minimizing bestscore is ${bestScore}`)
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
                break;
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
                ongoingCelebration = true;
                setTimeout(()=>{ongoingCelebration = false}, 1000)
            }
        }
        if(successfulTurn){
            _switchTurns();
        }
    }
    return {playTurn, botPlayTurn, toggleSound, updateTeam, updateName, getPLayerOne, getPLayerTwo, setFirstTurn, startTime, 
            resetTime, resetScores, resetTeams, soundActivated, setOpponent, setDifficulty, getDifficulty, botsTurn};
})();


const ui = (()=>{
    const _BODY = document.querySelector("body");

    function _addNameInput(){
        const NAME_INPUT = document.createElement("input");
        usefulFunctions.setAttributes(NAME_INPUT, ["id", "type","placeholder"], ["player-two-name", "text", "What's your name?"]);
        const opponentSelector = document.querySelector(".initial-settings .right > select");
        opponentSelector.nextElementSibling.before(NAME_INPUT);
    }
    
    function _makeInvalidMessage(message){
        const INVALID_MESSAGE = document.createElement("p");
        INVALID_MESSAGE.classList.add("invalid-message");
        INVALID_MESSAGE.innerText = message;
        return INVALID_MESSAGE;
    }

    function _addBotsName(){
        const NAME_INPUT = document.createElement("input");
        const BOT_NAMES = ["Botaldo", "Botaldinho", "Botssi", "Botzema", "Botandowski", "Botistuta", "Botti", "Bottenbauer"];
        let botsName = BOT_NAMES[Math.floor(Math.random() * BOT_NAMES.length)];
        usefulFunctions.setAttributes(NAME_INPUT, ["id", "type","value"], ["bot-name", "text", botsName]);
        NAME_INPUT.disabled = true;
        const opponentSelector = document.querySelector(".initial-settings .right > select");
        opponentSelector.nextElementSibling.before(NAME_INPUT);
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
        const OPPONENT_CONTAINER = document.querySelector(".initial-settings .right");
        const PREVIOUS_INPUT = document.querySelector(".initial-settings .right > input");
        OPPONENT_CONTAINER.removeChild(PREVIOUS_INPUT);
        let isHumanPlayer = (e.target.value === "PLAYER TWO");
        if (isHumanPlayer) {
            _addNameInput();
            _removeDifficultyToggle();
        }
        else{
            _addBotsName();
            _addDifficultyToggle();
        }
        game.updateTeam(OPPONENT_CONTAINER, null, null, null);
        _displaySelectTeamScreen(OPPONENT_CONTAINER);
    }

    function _removePreviousSelector(CONTAINER){
        let previousSelector = document.querySelector(`.initial-settings .${CONTAINER.getAttribute("class")} > [class*="selector"]`);
        if (previousSelector) {CONTAINER.removeChild(previousSelector)};
    }

    function _removePreviousTeamChosenScreen(CONTAINER){
        let previousTeamChosenScreen = document.querySelector(`.initial-settings .${CONTAINER.getAttribute("class")} > [class*="chosen"]`);
        if (previousTeamChosenScreen) {CONTAINER.removeChild(previousTeamChosenScreen)};
    }

    function _toggleSound(e){
        if(!game.soundActivated()) sounds.selectionTwo.play();
        game.toggleSound();
        e.target.classList.toggle("fa-volume-xmark");
        e.target.classList.toggle("fa-volume-high");
    }

    function _addVolumeToggle(parentElement){
        const VOLUME_TOGGLE = document.createElement("i");
        VOLUME_TOGGLE.classList.add("volume-toggle", "fa-solid", "fa-volume-xmark", "fa-2x");
        VOLUME_TOGGLE.addEventListener("click", _toggleSound);
        parentElement.appendChild(VOLUME_TOGGLE);
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
        const MUSIC_TOGGLE = document.createElement("i");
        MUSIC_TOGGLE.classList.add("music-toggle", "fa-solid", "fa-music", "fa-2x");
        MUSIC_TOGGLE.addEventListener("click", _toggleMusic);
        parentElement.appendChild(MUSIC_TOGGLE);
    }

    function displaySong(song){
        const songTitleContainer = document.createElement("section");
        songTitleContainer.classList.add("song-title-container");
        const songTitle = document.createElement("p");
        songTitle.classList.add("song-title");
        songTitle.innerText = song;
        songTitle.style.animation = "fade-in-and-out 8s forwards";
        songTitleContainer.appendChild(songTitle);
        _BODY.appendChild(songTitleContainer);
        setTimeout(()=>{_BODY.removeChild(songTitleContainer)}, 8000);
    }

    function _addReturnButton(CONTAINER){
        const RETURN_BUTTON = document.createElement("i");
        RETURN_BUTTON.classList.add("return-button", "fa-solid", "fa-caret-left");
        RETURN_BUTTON.addEventListener("click", ()=>{_goBack(CONTAINER)});
        RETURN_BUTTON.addEventListener("click", ()=>{if(game.soundActivated()) sounds.selectionTwo.play()});
        CONTAINER.appendChild(RETURN_BUTTON);
    }

    function _goBack(CONTAINER){
        _removeLastRandom(CONTAINER);
        console.log("GO BACK")
        let isContinentSelector = document.querySelector(`.initial-settings .${CONTAINER.getAttribute("class")} > .continent-selector`);
        let isNationalTeamsSelector = document.querySelector(`.initial-settings .${CONTAINER.getAttribute("class")} > .national-teams-selector`);
        let isNationalTeamChosen = document.querySelector(`.initial-settings .${CONTAINER.getAttribute("class")} > .national-team-chosen`);
        let isLeaguesSelector = document.querySelector(`.initial-settings .${CONTAINER.getAttribute("class")} > .leagues-selector`);
        let isClubsSelector = document.querySelector(`.initial-settings .${CONTAINER.getAttribute("class")} > .clubs-selector`);
        let isClubChosen = document.querySelector(`.initial-settings .${CONTAINER.getAttribute("class")} > .club-chosen`);
        if(isContinentSelector){
            _displayCategorySelector(CONTAINER);
            const RETURN_BUTTON = document.querySelector(`.initial-settings .${CONTAINER.getAttribute("class")} > .return-button`);
            CONTAINER.removeChild(RETURN_BUTTON);
        }
        if(isNationalTeamsSelector){
            _displayContinentSelector(CONTAINER, "national-teams");
        }
        if(isNationalTeamChosen){
            const continent = isNationalTeamChosen.getAttribute("data-continent");
            _displayNationalTeamsSelector(CONTAINER, continent)
        }
        if(isLeaguesSelector){
            _displayContinentSelector(CONTAINER, "clubs")
        }
        if(isClubsSelector){
            const continent = isClubsSelector.getAttribute("data-continent");
            console.log(isClubsSelector);
            console.log("CONTINENTEEEEEE: " + continent);
            _displayLeaguesSelector(CONTAINER, continent)
        }
        if(isClubChosen){
            const continent = isClubChosen.getAttribute("data-continent");
            const league = isClubChosen.getAttribute("data-league");
            _displayClubsSelector(CONTAINER, continent, league);
        }
    }

    function _addLabel(){
        const LABEL_CONTAINER = document.createElement("div");
        LABEL_CONTAINER.classList.add("label-container");
        const LABEL = document.createElement("p");
        LABEL.classList.add("label");
        LABEL_CONTAINER.appendChild(LABEL);
        return LABEL_CONTAINER;
    }

    function _updateLabel(label, text){
        label.innerText = text;
    }

    function _removePreviousLabel(CONTAINER){
        console.log("REMOVE PREVIOUS LABEL");
        const labelContainer = document.querySelector(`.initial-settings .${CONTAINER.getAttribute("class")} > .label-container`);
        console.log(labelContainer);
        console.log(CONTAINER);
        console.log(CONTAINER.getAttribute("class"))
        if(labelContainer){
            CONTAINER.removeChild(labelContainer);
        }
    }

    function _addRandomButton(CONTAINER){
        console.log("MAKE RANDOM BUTTON");
        const RANDOM_BUTTON = document.createElement("i");
        RANDOM_BUTTON.classList.add("fa-solid", "fa-dice", "fa-2x");
        RANDOM_BUTTON.classList.add("random-button");
        RANDOM_BUTTON.addEventListener("click", ()=>_randomize(CONTAINER));
        RANDOM_BUTTON.addEventListener("click", ()=>{if(game.soundActivated()) sounds.selectionOne.play()});
        CONTAINER.appendChild(RANDOM_BUTTON);
    }

    let lastRandoms = {"left": null, "right": null};

    function _updateLastRandom(CONTAINER, lastRandom){
        console.log("CONTAINER");
        console.log(CONTAINER.getAttribute("class"));
        lastRandoms[CONTAINER.getAttribute("class")] = lastRandom;
        console.log(lastRandoms[CONTAINER.getAttribute("class")]);
    }

    function _removeLastRandom(CONTAINER){
        lastRandoms[CONTAINER.getAttribute("class")] = null;
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

    function _chooseRandomNationalTeam(CONTAINER, continent){
        if(!continent){continent = _chooseRandomContinent()};
        console.log(continent);
        const countries = DATA.getCountries(continent);
        const country = countries[Math.floor(Math.random() * countries.length)];
        console.log(country);
        const colors = DATA.getCountryColors(continent, country);
        const kebabCaseContinent = usefulFunctions.toKebabCase(continent);
        const kebabCaseCountry = usefulFunctions.toKebabCase(country);
        const imagePath = `./images/countries/${kebabCaseContinent}/${kebabCaseCountry}.svg`
        _displayNationalTeamChosen(CONTAINER, country, imagePath, continent, colors);
    }

    function _chooseRandomClub(CONTAINER, continent, league){
        if(!continent){continent = _chooseRandomContinent()};
        console.log("RANDOMIZE");
        console.log(continent);
        if(!league){league = _chooseRandomLeague(continent)}
        console.log(league)
        const clubs = DATA.getClubs(continent, league);
        const club = clubs[Math.floor(Math.random() * clubs.length)];
        console.log(clubs);
        console.log(club);
        const colors = DATA.getClubColors(continent, league, club);
        const kebabCaseContinent = usefulFunctions.toKebabCase(continent);
        const kebabCaseLeague = usefulFunctions.toKebabCase(league);
        const kebabCaseClub = usefulFunctions.toKebabCase(club);
        const imagePath = `./images/clubs/${kebabCaseContinent}/${kebabCaseLeague}/${kebabCaseClub}.svg`;
        _displayClubChosen(CONTAINER, club, imagePath, continent, league, colors);
    }

    function _chooseRandomNationalTeamOrClub(CONTAINER){
        let category = ["clubs", "national-teams"][Math.floor(Math.random() * 2)];
        let isClubs = (category === "clubs") ? true : false;
        let lastRandom = ()=>{_chooseRandomNationalTeamOrClub(CONTAINER)};
        _updateLastRandom(CONTAINER, lastRandom);
        (isClubs) ? _chooseRandomClub(CONTAINER) : _chooseRandomNationalTeam(CONTAINER);
    }

    function _randomize(CONTAINER){
        let isCategorySelector = document.querySelector(`.initial-settings .${CONTAINER.getAttribute("class")} > .category-selector`);
        let isContinentSelector = document.querySelector(`.initial-settings .${CONTAINER.getAttribute("class")} > .continent-selector`);
        let isNationalTeamsSelector = document.querySelector(`.initial-settings .${CONTAINER.getAttribute("class")} > .national-teams-selector`);
        let isNationalTeamChosen = document.querySelector(`.initial-settings .${CONTAINER.getAttribute("class")} > .national-team-chosen`);
        let isLeaguesSelector = document.querySelector(`.initial-settings .${CONTAINER.getAttribute("class")} > .leagues-selector`);
        let isClubsSelector = document.querySelector(`.initial-settings .${CONTAINER.getAttribute("class")} > .clubs-selector`);
        let isClubChosen = document.querySelector(`.initial-settings .${CONTAINER.getAttribute("class")} > .club-chosen`);

        if(isCategorySelector){
            _chooseRandomNationalTeamOrClub(CONTAINER);
        }
        if(isContinentSelector){
            const category = isContinentSelector.getAttribute("data-category");
            console.log(category)
            const isNationalTeams = category === "national-teams";
            const isClubs = !isNationalTeams;
            if(isClubs){
                let lastRandom = ()=>{_chooseRandomClub(CONTAINER)};
                _updateLastRandom(CONTAINER, lastRandom);
                _chooseRandomClub(CONTAINER);
            }
            if(isNationalTeams){
                let lastRandom = ()=>{_chooseRandomNationalTeam(CONTAINER)};
                _updateLastRandom(CONTAINER, lastRandom);
                _chooseRandomNationalTeam(CONTAINER);
            }
        }
        if(isNationalTeamsSelector){
            const continent = isNationalTeamsSelector.getAttribute("data-continent");
            let lastRandom = ()=>{_chooseRandomNationalTeam(CONTAINER, continent)};
            _updateLastRandom(CONTAINER, lastRandom);
            _chooseRandomNationalTeam(CONTAINER, continent);
        }
        if(isNationalTeamChosen){
            if(!lastRandoms[CONTAINER.getAttribute("class")]){
                const continent = isNationalTeamChosen.getAttribute("data-continent");
                let lastRandom = ()=>{_chooseRandomNationalTeam(CONTAINER, continent)};
                _updateLastRandom(CONTAINER, lastRandom);
            }
            lastRandoms[CONTAINER.getAttribute("class")]();
        }
        if(isLeaguesSelector){
            const continent = isLeaguesSelector.getAttribute("data-continent");
            let lastRandom = ()=>{_chooseRandomClub(CONTAINER, continent)};
            _updateLastRandom(CONTAINER, lastRandom);
            _chooseRandomClub(CONTAINER, continent);
        }
        if(isClubsSelector){
            const continent = isClubsSelector.getAttribute("data-continent");
            const league = isClubsSelector.getAttribute("data-league");
            let lastRandom = ()=>{_chooseRandomClub(CONTAINER, continent, league)};
            _updateLastRandom(CONTAINER, lastRandom);
            _chooseRandomClub(CONTAINER, continent, league);
        }
        if(isClubChosen){
            if(!lastRandoms[CONTAINER.getAttribute("class")]){
                const continent = isClubChosen.getAttribute("data-continent");
                const league = isClubChosen.getAttribute("data-league");
                let lastRandom = ()=>{_chooseRandomClub(CONTAINER, continent, league)};
                _updateLastRandom(CONTAINER, lastRandom);
            }
            lastRandoms[CONTAINER.getAttribute("class")]();
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
        if(playerOne.team === null){
            const invalidMessage = document.querySelector(".initial-settings .left > .invalid-team");
            if(!invalidMessage){
                const selector = document.querySelector(".initial-settings .left > [class*='select']");
                const INVALID_MESSAGE = _makeInvalidMessage("Please select a team");
                INVALID_MESSAGE.classList.add("invalid-team");
                selector.before(INVALID_MESSAGE);
            }
        }
        else{
            const invalidMessage = document.querySelector(".initial-settings .left > .invalid-team");
            if(invalidMessage){
                left.removeChild(invalidMessage);
            }
        }

        if(playerTwo.team === null){
            const invalidMessage = document.querySelector(".initial-settings .right > .invalid-team");
            if(!invalidMessage){
                const selector = document.querySelector(".initial-settings .right > [class*='select']");
                const INVALID_MESSAGE = _makeInvalidMessage("Please select a team");
                INVALID_MESSAGE.classList.add("invalid-team");
                selector.before(INVALID_MESSAGE);
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
                const INVALID_MESSAGE = _makeInvalidMessage("Required field!");
                INVALID_MESSAGE.classList.add("invalid-name");
                nameInput.nextElementSibling.before(INVALID_MESSAGE);
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
                    const INVALID_MESSAGE = _makeInvalidMessage("Required field!");
                    INVALID_MESSAGE.classList.add("invalid-name");
                    opponentInput.nextElementSibling.before(INVALID_MESSAGE);  
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
        const TITLE = document.createElement("h1");
        TITLE.innerText = "Tic Tac Club";
        TITLE.classList.add("title");
        _addVolumeToggle(_BODY);
        _addMusicToggle(_BODY);
        const PLAY_BUTTON = document.createElement("button");
        PLAY_BUTTON.setAttribute("type", "button");
        PLAY_BUTTON.innerText = "PLAY";
        PLAY_BUTTON.addEventListener("click", _displayInitialSetup);
        PLAY_BUTTON.addEventListener("click", ()=> {if(game.soundActivated()) sounds.selectionOne.play()});
        usefulFunctions.appendChildren(_BODY, [TITLE, PLAY_BUTTON]);
    }

    function _displayInitialSetup(nameOne, nameTwo){
        usefulFunctions.clearPreviousScreen();
        const CONTAINER = document.createElement("div");
        const VERSUS_V = document.createElement("div");
        VERSUS_V.innerText = "V";
        VERSUS_V.classList.add("versus", "v");
        const VERSUS_S = document.createElement("div");
        VERSUS_S.innerText = "S";
        VERSUS_S.classList.add("versus", "s");
        CONTAINER.classList.add("initial-settings");
        const TOP = document.createElement("section");
        TOP.classList.add("top");
        const LEFT = document.createElement("section");
        LEFT.classList.add("left");
        const PLAYER_ONE_LABEL_CONTAINER = document.createElement("section");
        const PLAYER_ONE_LABEL = document.createElement("p");
        PLAYER_ONE_LABEL.innerText = "PLAYER ONE";
        PLAYER_ONE_LABEL_CONTAINER.appendChild(PLAYER_ONE_LABEL);
        const NAME_INPUT = document.createElement("input");
        if(nameOne && typeof nameOne === "string"){NAME_INPUT.value = nameOne};
        usefulFunctions.setAttributes(NAME_INPUT, ["id", "type","placeholder"], ["player-one-name", "text", "What's your name?"]);
        usefulFunctions.appendChildren(LEFT, [VERSUS_V, PLAYER_ONE_LABEL, NAME_INPUT]);
        const RIGHT = document.createElement("section");
        RIGHT.classList.add("right");
        const OPPONENT_SELECTOR = document.createElement("select");
        OPPONENT_SELECTOR.setAttribute("id", "opponent-selector");
        const AI = document.createElement("option");
        AI.setAttribute("value", "AI");
        AI.innerText = "AI";
        const PLAYER_TWO = document.createElement("option");
        PLAYER_TWO.setAttribute("value", "PLAYER TWO");
        PLAYER_TWO.innerText = "PLAYER TWO";
        usefulFunctions.appendChildren(OPPONENT_SELECTOR, [AI, PLAYER_TWO]);
        OPPONENT_SELECTOR.addEventListener("change", _changeOpponent);
        const OPPONENT_NAME_INPUT = document.createElement("input");
        OPPONENT_NAME_INPUT.disabled = true;
        const BOT_NAMES = ["Botaldo", "Botaldinho", "Botssi", "Botzema", "Botandowski", "Botistuta", "Botti", "Bottenbauer"];
        let botsName = BOT_NAMES[Math.floor(Math.random() * BOT_NAMES.length)];
        usefulFunctions.setAttributes(OPPONENT_NAME_INPUT, ["id", "type","value"], ["bot-name", "text", botsName]);
        if(nameTwo && typeof nameTwo === "string"){
            if(!BOT_NAMES.includes(nameTwo)){
                OPPONENT_SELECTOR.value = "PLAYER TWO";
                OPPONENT_NAME_INPUT.disabled = false;
            }
            OPPONENT_NAME_INPUT.value = nameTwo
        }
        const difficultyToggle = document.createElement("button");
        usefulFunctions.setAttributes(difficultyToggle, ["type", "class",], ["button", "difficulty-toggle"]);
        difficultyToggle.innerText = game.getDifficulty();
        difficultyToggle.addEventListener("click", _toggleDifficulty);
        usefulFunctions.appendChildren(RIGHT, [VERSUS_S, OPPONENT_SELECTOR, OPPONENT_NAME_INPUT, difficultyToggle]);
        const BOTTOM = document.createElement("section");
        BOTTOM.classList.add("bottom");
        const BUTTON = document.createElement("button");
        BUTTON.innerText = "START GAME";
        BUTTON.addEventListener("click", _validate)
        BOTTOM.appendChild(BUTTON);
        usefulFunctions.appendChildren(TOP, [LEFT, RIGHT]);
        usefulFunctions.appendChildren(CONTAINER, [TOP, BOTTOM]);
        _BODY.appendChild(CONTAINER);
        _displaySelectTeamScreen(LEFT);
        _displaySelectTeamScreen(RIGHT);
    }

    function _displaySelectTeamScreen(CONTAINER){
        let selecTeamScreen = document.querySelector(`.initial-settings .${CONTAINER.getAttribute("class")} > .select-team`);
        if(selecTeamScreen) return;
        _removePreviousLabel(CONTAINER);
        _removePreviousSelector(CONTAINER);
        _removePreviousTeamChosenScreen(CONTAINER);
        let randomButton = document.querySelector(`.initial-settings .${CONTAINER.getAttribute("class")} > .random-button`);
        if(randomButton){CONTAINER.removeChild(randomButton)};
        let returnButton = document.querySelector(`.initial-settings .${CONTAINER.getAttribute("class")} > .return-button`);
        if(returnButton){CONTAINER.removeChild(returnButton)};
        const SELECT_TEAM_SCREEN = document.createElement("div");
        SELECT_TEAM_SCREEN.classList.add("select-team");
        const SELECT_TEAM_BUTTON = document.createElement("button");
        SELECT_TEAM_BUTTON.setAttribute("type", "button");
        SELECT_TEAM_BUTTON.innerText = "SELECT TEAM";
        SELECT_TEAM_BUTTON.addEventListener("click", ()=>{_displayCategorySelector(CONTAINER)});
        SELECT_TEAM_BUTTON.addEventListener("click", ()=>{if(game.soundActivated()) sounds.selectionTwo.play()})
        SELECT_TEAM_SCREEN.appendChild(SELECT_TEAM_BUTTON);
        CONTAINER.appendChild(SELECT_TEAM_SCREEN);
    }

    function _displayCategorySelector(CONTAINER){
        _removePreviousSelector(CONTAINER);
        let selecTeamScreen = document.querySelector(`.initial-settings .${CONTAINER.getAttribute("class")} > .select-team`);
        if(selecTeamScreen){CONTAINER.removeChild(selecTeamScreen)};
        let noRandomButton = !document.querySelector(`.initial-settings .${CONTAINER.getAttribute("class")} > .random-button`);
        if(noRandomButton){_addRandomButton(CONTAINER)}
        const CATEGORY_SELECTOR = document.createElement("div");
        CATEGORY_SELECTOR.classList.add("category-selector");
        const NATIONAL_TEAMS = document.createElement("section");
        NATIONAL_TEAMS.classList.add("national-teams");
        const NATIONAL_TEAMS_TITLE = document.createElement("p");
        NATIONAL_TEAMS_TITLE.classList.add("category-title", "national-teams-title");
        NATIONAL_TEAMS_TITLE.innerText = "NATIONAL TEAMS";
        NATIONAL_TEAMS.appendChild(NATIONAL_TEAMS_TITLE);
        NATIONAL_TEAMS.addEventListener("click", (event)=>{_displayContinentSelector(CONTAINER, event)});
        NATIONAL_TEAMS.addEventListener("click", ()=>{if(game.soundActivated()) sounds.selectionTwo.play()});
        const CLUBS = document.createElement("section");
        CLUBS.classList.add("clubs");
        const CLUBS_TITLE = document.createElement("p");
        CLUBS_TITLE.classList.add("category-title", "clubs-title");
        CLUBS_TITLE.innerText = "CLUBS";
        CLUBS.appendChild(CLUBS_TITLE);
        CLUBS.addEventListener("click", (event) =>{_displayContinentSelector(CONTAINER, event)});
        CLUBS.addEventListener("click", ()=>{if(game.soundActivated()) sounds.selectionTwo.play()});
        usefulFunctions.appendChildren(CATEGORY_SELECTOR, [NATIONAL_TEAMS, CLUBS]);
        CONTAINER.appendChild(CATEGORY_SELECTOR);
    }

    function _displayContinentSelector(CONTAINER, event){
        console.log("continent-selector");
        _removePreviousSelector(CONTAINER);
        _removePreviousLabel(CONTAINER);
        let thereIsNoReturnButton = !document.querySelector(`.initial-settings .${CONTAINER.getAttribute("class")} > .return-button`);
        if(thereIsNoReturnButton){_addReturnButton(CONTAINER)};
        const isNationalTeams = (typeof event === "string") ? (event === "national-teams") : (event.target.getAttribute("class").includes("national-teams"));
        const isClubs = !isNationalTeams;
        console.log("national teams: " + isNationalTeams);
        console.log("clubs: " + isClubs);
        const CONTINENT_SELECTOR = document.createElement("div");
        CONTINENT_SELECTOR.classList.add("continent-selector");
        CONTINENT_SELECTOR.setAttribute("data-category", (isNationalTeams) ? "national-teams" : "clubs");
        const CONTINENTS = DATA.getContinents();
        for (let continent of CONTINENTS){
            const CONTINENT = document.createElement("section");
            CONTINENT.classList.add("continent");
            CONTINENT_TITLE = document.createElement("p");
            CONTINENT_TITLE.innerText = continent;
            CONTINENT.appendChild(CONTINENT_TITLE);
            const BACKGROUND_IMAGE_PATH = `./images/continents/${usefulFunctions.toKebabCase(continent)}.svg`;
            CONTINENT.setAttribute("style", `background-image: url(${BACKGROUND_IMAGE_PATH})`);
            CONTINENT.setAttribute("data-continent", continent);
            if (isNationalTeams){
                CONTINENT.addEventListener("click", (event) => {_displayNationalTeamsSelector(CONTAINER, event)});
            }
            if (isClubs){
                CONTINENT.addEventListener("click", (event) => {_displayLeaguesSelector(CONTAINER, event)});
            }
            CONTINENT.addEventListener("click", ()=>{if(game.soundActivated()) sounds.selectionTwo.play()});
            CONTINENT_SELECTOR.appendChild(CONTINENT);
        }
        CONTAINER.appendChild(CONTINENT_SELECTOR);
    }

    function _displayNationalTeamsSelector(CONTAINER, event){
        _removePreviousSelector(CONTAINER);
        _removePreviousTeamChosenScreen(CONTAINER);
        _removePreviousLabel(CONTAINER);
        const continent = (typeof event === "string") ? event : event.target.getAttribute("data-continent");
        const LABEL_CONTAINER = _addLabel();
        const LABEL = LABEL_CONTAINER.firstChild;
        console.log("LABEL CONTAINER NATIONAL TEAMS:")
        console.log(LABEL_CONTAINER);
        const continentAsDemonym = (continent === "Europe") ? continent + "an" : continent + "n";
        const initialMessage = `${continentAsDemonym.toUpperCase()} NATIONAL TEAMS`;
        _updateLabel(LABEL, initialMessage);
        const NATIONAL_TEAMS_SELECTOR = document.createElement("div");
        NATIONAL_TEAMS_SELECTOR.classList.add("national-teams-selector");
        NATIONAL_TEAMS_SELECTOR.setAttribute("data-continent", continent);
        NATIONAL_TEAMS_SELECTOR.addEventListener("mouseleave", ()=>{_updateLabel(LABEL, initialMessage)})
        for (let country of DATA.getCountries(continent)){
            console.log(country);
            console.log(continent);
            const colors = DATA.getCountryColors(continent, country);
            const COUNTRY = document.createElement("section");
            COUNTRY.classList.add("national-team");
            COUNTRY.setAttribute("data-country", country);
            const countryBadge = document.createElement("img");
            const kebabCaseContinent = usefulFunctions.toKebabCase(continent);
            const kebabCaseCountry = usefulFunctions.toKebabCase(country);
            const imagePath = `./images/countries/${kebabCaseContinent}/${kebabCaseCountry}.svg`
            usefulFunctions.setAttributes(countryBadge, ["src", "alt"], [imagePath, country]);
            COUNTRY.addEventListener("click", ()=>{_displayNationalTeamChosen(CONTAINER, country, imagePath, continent, colors)});
            COUNTRY.addEventListener("mouseenter", ()=>{_updateLabel(LABEL, country.toUpperCase())});
            COUNTRY.addEventListener("click", ()=>{if(game.soundActivated()) sounds.selectionOne.play()});
            COUNTRY.appendChild(countryBadge);
            NATIONAL_TEAMS_SELECTOR.appendChild(COUNTRY);
        }
        usefulFunctions.appendChildren(CONTAINER, [LABEL_CONTAINER, NATIONAL_TEAMS_SELECTOR])
    }

    function _displayNationalTeamChosen(CONTAINER, country, imagePath, continent, colors){
        _removePreviousSelector(CONTAINER);
        _removePreviousLabel(CONTAINER);
        _removePreviousTeamChosenScreen(CONTAINER);
        game.updateTeam(CONTAINER, country, imagePath, colors);
        let thereIsNoReturnButton = !document.querySelector(`.initial-settings .${CONTAINER.getAttribute("class")} > .return-button`);
        if(thereIsNoReturnButton){_addReturnButton(CONTAINER)};
        const LABEL_CONTAINER = _addLabel();
        const LABEL = LABEL_CONTAINER.firstChild;
        _updateLabel(LABEL, country.toUpperCase());
        const NATIONAL_TEAM_CHOSEN = document.createElement("div");
        NATIONAL_TEAM_CHOSEN.classList.add("national-team-chosen");
        NATIONAL_TEAM_CHOSEN.setAttribute("data-continent", continent);
        const NATIONAL_TEAM_CHOSEN_BADGE = document.createElement("img");
        usefulFunctions.setAttributes(NATIONAL_TEAM_CHOSEN_BADGE, ["src", "alt"], [imagePath, country]);
        NATIONAL_TEAM_CHOSEN.appendChild(NATIONAL_TEAM_CHOSEN_BADGE);
        usefulFunctions.appendChildren(CONTAINER, [LABEL_CONTAINER, NATIONAL_TEAM_CHOSEN])
    }

    function _displayLeaguesSelector(CONTAINER, event){
        _removePreviousSelector(CONTAINER);
        console.log(CONTAINER);
        const continent = (typeof event === "string") ? event : event.target.getAttribute("data-continent");
        _removePreviousLabel(CONTAINER);
        const LABEL_CONTAINER = _addLabel();
        const LABEL = LABEL_CONTAINER.firstChild;
        console.log("LABEL CONTAINER CLUBS:")
        console.log(LABEL_CONTAINER);
        const continentAsDemonym = (continent === "Europe") ? continent + "an" : continent + "n";
        const initialMessage = `${continentAsDemonym.toUpperCase()} LEAGUES`;
        _updateLabel(LABEL, initialMessage);
        const LEAGUES_SELECTOR = document.createElement("div");
        LEAGUES_SELECTOR.classList.add("leagues-selector");
        LEAGUES_SELECTOR.setAttribute("data-continent", continent);
        LEAGUES_SELECTOR.addEventListener("mouseleave", ()=>{_updateLabel(LABEL, initialMessage)});
        for (let league of DATA.getLeagues(continent)){
            console.log(league);
            const LEAGUE = document.createElement("section");
            LEAGUE.classList.add("league");
            LEAGUE.setAttribute("data-league", league);
            const leagueLogo = document.createElement("img");
            leagueLogo.setAttribute("data-league", league);
            const kebabCaseContinent = usefulFunctions.toKebabCase(continent);
            const kebabCaseLeague = usefulFunctions.toKebabCase(league);
            const imagePath = `./images/leagues/${kebabCaseContinent}/${kebabCaseLeague}.svg`
            usefulFunctions.setAttributes(leagueLogo, ["src", "alt"], [imagePath, league]);
            LEAGUE.appendChild(leagueLogo);
            LEAGUE.addEventListener("click", (event)=>{_displayClubsSelector(CONTAINER, continent, event)});
            LEAGUE.addEventListener("mouseenter", ()=>{_updateLabel(LABEL, league.toUpperCase())});
            LEAGUE.addEventListener("click", ()=>{if(game.soundActivated()) sounds.selectionTwo.play()});
            LEAGUES_SELECTOR.appendChild(LEAGUE);
        }
        usefulFunctions.appendChildren(CONTAINER, [LABEL_CONTAINER, LEAGUES_SELECTOR]);
    }

    // crear el boton de invertir alfabeticamente capaz con css o DOM manipulation
    // pantalla de carga
    // el boton de randomize son los dados con el texto randomize que sale en hover. en celular esta desde el principio
    // transiciones entre las pantallas con animaciones y sonido capaz algo como un spray de grafiti
    // modo PVE
    // sistema que no permita hacer trampa, o sea, dejar que el tiempo corra
    // hacer las tres dificultades en la ui.

    function _displayClubsSelector(CONTAINER, continent, event){
        _removePreviousSelector(CONTAINER);
        _removePreviousTeamChosenScreen(CONTAINER);
        _removePreviousLabel(CONTAINER);
        const league = (typeof event === "string") ? event : event.target.getAttribute("data-league");
        const LABEL_CONTAINER = _addLabel();
        const LABEL = LABEL_CONTAINER.firstChild;
        console.log("LABEL CONTAINER CLUBS:")
        console.log(LABEL_CONTAINER);
        const initialMessage = league.toUpperCase();
        _updateLabel(LABEL, initialMessage);
        console.log("LEAGUE: " + league);
        console.log("CONTINENT: " + continent);
        console.log(event);
        const CLUBS_SELECTOR = document.createElement("div");
        CLUBS_SELECTOR.classList.add("clubs-selector");
        usefulFunctions.setAttributes(CLUBS_SELECTOR, ["data-continent", "data-league"], [continent, league])
        CLUBS_SELECTOR.addEventListener("mouseleave", ()=>{_updateLabel(LABEL, initialMessage)});
        console.log(DATA.getClubs(continent, league));
        for (let club of DATA.getClubs(continent, league)){
            console.log(club);
            const colors = DATA.getClubColors(continent, league, club);
            const CLUB = document.createElement("section");
            CLUB.classList.add("club");
            CLUB.setAttribute("data-club", club);
            const clubBadge = document.createElement("img");
            const kebabCaseContinent = usefulFunctions.toKebabCase(continent);
            const kebabCaseLeague = usefulFunctions.toKebabCase(league);
            const kebabCaseClub = usefulFunctions.toKebabCase(club);
            const imagePath = `./images/clubs/${kebabCaseContinent}/${kebabCaseLeague}/${kebabCaseClub}.svg`
            usefulFunctions.setAttributes(clubBadge, ["src", "alt"], [imagePath, club]);
            CLUB.addEventListener("click", ()=>{ _displayClubChosen(CONTAINER, club, imagePath, continent, league, colors)});
            CLUB.addEventListener("mouseenter", ()=>{_updateLabel(LABEL, club.toUpperCase())});
            CLUB.addEventListener("click", ()=>{if(game.soundActivated()) sounds.selectionOne.play()})
            CLUB.appendChild(clubBadge);
            CLUBS_SELECTOR.appendChild(CLUB);
        }
        usefulFunctions.appendChildren(CONTAINER, [LABEL_CONTAINER, CLUBS_SELECTOR])
    }

    function _displayClubChosen(CONTAINER, club, imagePath, continent, league, colors){
        _removePreviousSelector(CONTAINER);
        _removePreviousLabel(CONTAINER);
        _removePreviousTeamChosenScreen(CONTAINER);
        game.updateTeam(CONTAINER, club, imagePath, colors);
        let thereIsNoReturnButton = !document.querySelector(`.initial-settings .${CONTAINER.getAttribute("class")} > .return-button`);
        if(thereIsNoReturnButton){_addReturnButton(CONTAINER)};
        const LABEL_CONTAINER = _addLabel();
        const LABEL = LABEL_CONTAINER.firstChild;
        _updateLabel(LABEL, club.toUpperCase());
        const CLUB_CHOSEN = document.createElement("div");
        CLUB_CHOSEN.classList.add("club-chosen");
        usefulFunctions.setAttributes(CLUB_CHOSEN, ["data-continent", "data-league"], [continent, league]);
        const CLUB_CHOSEN_BADGE = document.createElement("img");
        usefulFunctions.setAttributes(CLUB_CHOSEN_BADGE, ["src", "alt"], [imagePath, club]);
        CLUB_CHOSEN.appendChild(CLUB_CHOSEN_BADGE);
        usefulFunctions.appendChildren(CONTAINER, [LABEL_CONTAINER, CLUB_CHOSEN]);
    }

    function _flipCoin(){
        usefulFunctions.clearPreviousScreen();
        const COIN_FLIP_SCREEN = document.createElement("div");
        COIN_FLIP_SCREEN.classList.add("coin-flip-screen");
        const INSTRUCTIONS = document.createElement("p");
        INSTRUCTIONS.classList.add("coin-flip-instructions");
        INSTRUCTIONS.innerText = "FLIP THE COIN TO SEE WHO STARTS";
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
        const COIN_MESSAGES_CONTAINER = document.createElement("section");
        COIN_MESSAGES_CONTAINER.classList.add("coin-messages-container");
        usefulFunctions.appendChildren(COIN_MESSAGES_CONTAINER, [playerOneCoinSideMessage, playerTwoCoinSideMessage]);
        const COIN_CONTAINER = document.createElement("div");
        COIN_CONTAINER.classList.add("coin-container");
        const COIN = document.createElement("section");
        COIN.setAttribute("id", "coin");
        COIN.addEventListener("click", ()=>{
            const coinAlreadyFlipped = COIN.getAttribute("data-state") == "already-flipped";
            if(coinAlreadyFlipped){return};
            if(game.soundActivated()) sounds.coinToss.play();
            const result = ["head", "tail"][Math.floor(Math.random() * 2)];
            COIN.style.animation = (result === "head") ? "flip-head 1.3s forwards" : "flip-tail 1.3s forwards";
            COIN.setAttribute("data-state", "already-flipped");
            const winner = (result === playerOneCoinSide) ? playerOne.name : playerTwo.name;
            game.setFirstTurn(winner);
            setTimeout(()=>{
                const WINNER_MESSAGE_CONTAINER = document.createElement("section");
                WINNER_MESSAGE_CONTAINER.classList.add("first-turn-message-container");
                const WINNER_MESSAGE = document.createElement("p");
                WINNER_MESSAGE.classList.add("first-turn-message");
                WINNER_MESSAGE.innerText = `${winner.toUpperCase()} STARTS!`;
                WINNER_MESSAGE_CONTAINER.appendChild(WINNER_MESSAGE);
                COIN_FLIP_SCREEN.removeChild(COIN_CONTAINER);
                COIN_FLIP_SCREEN.lastChild.before(WINNER_MESSAGE_CONTAINER);
            }, 1800);
            setTimeout(()=>{
                usefulFunctions.clearPreviousScreen();
                gameBoard.set();
                _displayScoreBoard(_BODY);
            }, 3500);
        })
        COIN_CONTAINER.appendChild(COIN);
        COIN_HEAD = document.createElement("section");
        COIN_HEAD.classList.add("head");
        const HEAD_IMAGE = document.createElement("img");
        usefulFunctions.setAttributes(HEAD_IMAGE, ["src", "alt"], ["./images/coin/head.png", "Coin's head"]);
        COIN_HEAD.appendChild(HEAD_IMAGE);
        COIN_TAIL = document.createElement("section");
        COIN_TAIL.classList.add("tail");
        const TAIL_IMAGE = document.createElement("img");
        usefulFunctions.setAttributes(TAIL_IMAGE, ["src", "alt"], ["./images/coin/tail.png", "Coin's tail"]);
        COIN_TAIL.appendChild(TAIL_IMAGE);
        usefulFunctions.appendChildren(COIN, [COIN_HEAD, COIN_TAIL]);
        usefulFunctions.appendChildren(COIN_FLIP_SCREEN, [INSTRUCTIONS, COIN_CONTAINER, COIN_MESSAGES_CONTAINER]);
        _BODY.appendChild(COIN_FLIP_SCREEN);
    }

    function _displayScoreBoard(parentElement){
        const SCOREBOARD = document.createElement("div");
        SCOREBOARD.classList.add("scoreboard");
        const SCORE_CONTAINER = document.createElement("section");
        SCORE_CONTAINER.classList.add("score-container")
        LOCAL_SCORE = document.createElement("p");
        LOCAL_SCORE.classList.add("local-score");
        LOCAL_SCORE.innerText = "0";
        VISITOR_SCORE = document.createElement("p");
        VISITOR_SCORE.classList.add("visitor-score");
        VISITOR_SCORE.innerText = "0";
        usefulFunctions.appendChildren(SCORE_CONTAINER, [LOCAL_SCORE, VISITOR_SCORE]);
        const TIME_CONTAINER = document.createElement("section");
        TIME_CONTAINER.classList.add("time-container");
        const TIME = document.createElement("p");
        TIME.classList.add("time");
        TIME_CONTAINER.appendChild(TIME);
        usefulFunctions.appendChildren(SCOREBOARD, [SCORE_CONTAINER, TIME_CONTAINER])
        parentElement.appendChild(SCOREBOARD);
        game.startTime();
    }

    function updateScore(){
        const localScore = document.querySelector(".local-score");
        const visitorScore = document.querySelector(".visitor-score");
        localScore.innerText = game.getPLayerOne().score;
        visitorScore.innerText = game.getPLayerTwo().score;
    }

    function updateTime(currentTime){
        let time = document.querySelector(".time");
        time.innerText = currentTime;
    }

    function displayResult(result){
        if(game.soundActivated()) sounds.gameOver.play();
        usefulFunctions.clearPreviousScreen();
        const resultContainer = document.createElement("section");
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
        _BODY.appendChild(resultContainer);
    }

    return {_displayFirstScreen, _displayInitialSetup, _displayCategorySelector, _flipCoin, _displayScoreBoard, updateScore, updateTime, displayResult, displaySong}
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
        const BODY = document.querySelector("body");
        const PREVIOUS_SCREEN = document.querySelectorAll("body > :not(script):not(.volume-toggle):not(.music-toggle)");
        for (let element of PREVIOUS_SCREEN){
            BODY.removeChild(element);
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
            Algeria: {colors: ["green", "white", "red"]},
            Angola: {colors: ["red", "black", "yellow"]},
            Benin: {color: ["green", "yellow", "red"]}
        },
        Asia: {
            Afghanistan: {colors: ["black", "red", "green"]},
            Bahrain: {colors: ["white", "red", "red"]}
        },
        Europe: {
            Albania: {colors: ["red", "red", "black"]},
            Andorra: {colors: ["blue", "yellow", "red"]},
            Armenia: {colors: ["red", "blue", "yellow"]},
            // ...
            England: {colors: ["white", "red", "blue"]}
        }
    }
      
    const _LEAGUES = {
        Europe: {
            "Bundesliga": {"Bayern": {colors:["red", "white", "blue"]}, "Borussia Dortmund": {colors: ["yellow", "yellow", "black"]}},
            "English Premier League": {"Arsenal": {colors: ["red", "red", "white"]} ,"Aston Villa FC": {colors: ["purple", "purple", "skyblue"]}, "Brentford": {colors:["red", "red", "white"]},"Brighton & Hove Albion":{colors:["blue", "blue", "white"]}, "Burnley FC":{colors:["purple", "purple", "skyblue"]}, "Chelsea":{colors:["blue", "blue", "white"]}, "Crystal Palace":{colors:["blue", "blue", "red"]}},
            // "Eredivise": "",
            // "Greek Super League": "",
            "La Liga": {"Real Madrid": {colors:["white", "white", "black"]}, "Barcelona": {colors: ["red", "blue", "golden"]}},
            // "Ligue 1": "",
            // "Primeria Liga": "",
            // "Russian Premier League": "",
            // "Serie A": "",
            // "Turkish Super League": "",
            // "Ukranian Premier League": ""
        },
        Africa: {
            "Egyptian Premier League": {"Al Ahly": {colors:["red", "white", "black"]}, "Pyramids FC": {colors: ["blue", "skyblue", "white"]}}
        },
        Asia: {
            "J1 League": {"Cerezo Osaka": {colors:["pink", "pink", "purple"]}, "FC Tokyo": {colors: ["blue", "blue", "red"]}},
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
    function getLeagues(continent){
        return Object.keys(_LEAGUES[continent]);
    }
    function getClubs(continent, league){
        return Object.keys(_LEAGUES[continent][league]);
    }
    function getClubColors(continent, league, club){
    	return _LEAGUES[continent][league][club]["colors"];
    }
    return {getContinents, getCountries, getCountryColors, getLeagues, getClubs, getClubColors, _CONTINENTS, _LEAGUES};
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
    return {selectionOne, selectionTwo, errorOne, coinToss, goal, gameOver, music, displaySong};
})();