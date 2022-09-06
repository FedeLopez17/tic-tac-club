const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const gameBoard = (()=>{
    const _gameBoard = [];

    // returns a copy of the gameBoard array.
    function get(){
        const board = _gameBoard.slice(0);
        return board;
    }

    function _getCells(){
        const cells = $$(".cell");
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
            cell.setAttribute("data-mark", "");
        }
    }

    function _populateScreen(cellNumber){
        const cells = _getCells();
        cells[cellNumber].setAttribute("data-mark", _gameBoard[cellNumber]);
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
        for (const combination of WINNING_COMBINATIONS){
            const firstCellHasAMark = ["X", "O"].includes(_gameBoard[combination[0]]);
            if (!firstCellHasAMark) continue;
            const allCellsHaveTheSameMark = _gameBoard[combination[0]] === _gameBoard[combination[1]] && _gameBoard[combination[0]] === _gameBoard[combination[2]];
            const someoneWon = firstCellHasAMark && allCellsHaveTheSameMark;
            if(someoneWon){
                for(const cell of cells){
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
        const occupiedCells = _gameBoard.filter(cell => cell === "X" || cell === "O");
        return occupiedCells.length === 9;
    }

    function checkIfOver(){
        const full = _checkIfFull(), threeInLine = _checkIfThreeInLine();
        const goalOrFull = full || threeInLine;
        if(goalOrFull){setTimeout(reset, 1000)};
        if(threeInLine){
            if(game.soundActivated()){
                sounds.goal.currentTime = 0;
                sounds.goal.play();
            }
            return 2;
        }
        else if(full){
            if(game.soundActivated()){
                sounds.tie.currentTime = 0;
                sounds.tie.play();
            };
            ui.toggleTieAnimation();
            return 1;
        }
        else{
            return 0;
        }
    }

    function addMark(mark, cellNumber){
        const cellAlreadyTaken = _gameBoard[cellNumber] === "X" || _gameBoard[cellNumber] === "O";
        if(cellAlreadyTaken){
            if(game.soundActivated()) sounds.errorOne.play();
            return false
        }
        _gameBoard[cellNumber] = mark;
        _update();
        if(game.soundActivated()) new Audio("./audio/pop.mp3").play();
        return true;
    }
    return {addMark, checkIfOver, set, reset, get, getEmptyCells};
})();

const Player = (mark)=>{
    let name = null;
    let team = {name: null, abbreviation: null, colors: null, alteredColors: [], imagePath: null};
    let score = 0;
    return {mark, name, team, score};
}

const game = (()=>{
    let _difficulty = "HARD", _sound = false, over = false, timeOut = false;
    let _opponent = null, _currentPlayer = null;
    let currentTimeMinutes = 0, currentTimeSeconds = 0, currentTime;
    const MAX_TIME = 90;
    const _playerOne = Player("X");
    const _playerTwo = Player("O");

    function toggleSound(){
        _sound = !_sound;
    }

    function soundActivated(){
        return _sound;
    }

    function updateTeam(container, team, abbreviation, imagePath, colors){
        const playerOne = container.getAttribute("class") === "left";
        if(playerOne){
            _resetTeam(1);
            _playerOne.team.name = team;
            _playerOne.team.abbreviation = abbreviation;
            _playerOne.team.imagePath = imagePath;
            _playerOne.team.colors = colors;
            ui.updateTeamColorsCssVariables(1);
        }
        else{
            _resetTeam(2);
            _playerTwo.team.name = team;
            _playerTwo.team.abbreviation = abbreviation;
            _playerTwo.team.imagePath = imagePath;
            _playerTwo.team.colors = colors;
            ui.updateTeamColorsCssVariables(2);
        }      
    }

    function _resetTeam(player){
        const playerTeam = (player === 1) ? _playerOne.team : _playerTwo.team;
        playerTeam.name = null;
        playerTeam.abbreviation = null;
        playerTeam.imagePath = null;
        playerTeam.colors = null;
        playerTeam.alteredColors = [];
    }

    function resetTeams(){
        _playerOne.team.name = null;
        _playerOne.team.abbreviation = null;
        _playerOne.team.imagePath = null;
        _playerOne.team.colors = null;
        _playerOne.team.alteredColors = [];
        _playerTwo.team.name = null;
        _playerTwo.team.abbreviation = null;
        _playerTwo.team.imagePath = null;
        _playerTwo.team.colors = null;
        _playerTwo.team.alteredColors = [];
    }

    function startTime(){
        if(game.soundActivated()) {
            sounds.refereeWhistle.play();
            sounds.stadiumAtmosphere.play();
        };
        over = false;
        function _updateMinutes(){
            currentTimeMinutes++;
        }
        function _updateSeconds(){
            if(currentTimeSeconds === 60){currentTimeSeconds = 0};
            if(currentTimeMinutes === MAX_TIME) {
                over = true;
                if(game.soundActivated()) {sounds.refereeWhistle.play()};
                clearInterval(keepTimeMinutes);
                clearInterval(keepTimeSeconds);
                currentTime = `${MAX_TIME}:00`;
                ui.updateTime(currentTime);
                resetTime();
                gameBoard.reset();
                const result = (_playerOne.score === _playerTwo.score) ? 0 : (_playerOne.score > _playerTwo.score) ? 1 : 2;
                ui.displayResult(result); 
                return;
            };
            currentTime = (currentTimeMinutes < 10) ? `0${currentTimeMinutes}:`: `${currentTimeMinutes}:`;
            currentTime += (currentTimeSeconds < 10) ? `0${currentTimeSeconds}`: currentTimeSeconds;
            ui.updateTime(currentTime);
            currentTimeSeconds++;
        }
        const keepTimeMinutes = setInterval(_updateMinutes, 660);
        const keepTimeSeconds = setInterval(_updateSeconds, 11);
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
            setTimeout(()=>{ui.updateCurrentPlayer(1)}, 5700);
            return;
        }
        _currentPlayer = _playerTwo;
        setTimeout(()=>{ui.updateCurrentPlayer(2)}, 5700);
        if(_opponent === "AI"){setTimeout(()=>{botPlayTurn()},6100)};
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

    function getPlayer(player){
        return (player === 1) ? _playerOne : _playerTwo;
    }

    function _switchTurns(){
        if(over) return;
        const root = $(":root");
        if(_currentPlayer === _playerOne){
            _currentPlayer = _playerTwo;
            ui.updateCurrentPlayer(2);
            ui.updateCurrentPlayerColors(2);
            if(_opponent === "AI"){
                //This is just to make it look like the bot is thinking
                const botThinkingTime = helperFunctions.randomIntFromRangeInclusive(400, 800);
                setTimeout(()=>{botPlayTurn()}, botThinkingTime);
            }
            return;
        }
        _currentPlayer = _playerOne;
        ui.updateCurrentPlayer(1);
        ui.updateCurrentPlayerColors(1);
    }

    function _botPlayTurnEasy(){
        const emptyCells = gameBoard.getEmptyCells();
        const randomlyChosenCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        playTurn(randomlyChosenCell);
    }

    function _botPlayTurnNormal(){
        const randomDifficulty = Math.floor(Math.random() * 2);
        (randomDifficulty === 0) ? _botPlayTurnEasy() : _botPlayTurnUnbeatable();
    }

    function _botPlayTurnHard(){
        const randomDifficulty = Math.floor(Math.random() * 4);
        ([0, 1, 2].includes(randomDifficulty)) ? _botPlayTurnUnbeatable() : _botPlayTurnEasy();
    }

    function _botPlayTurnUnbeatable(){
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
        if(over) return;
        if(timeOut){
            setTimeout(botPlayTurn, 1000);
            return;
        }
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
        if(timeOut){return;}
        const successfulTurn = gameBoard.addMark(_currentPlayer.mark, cellNumber);
        if(successfulTurn){
            const gameOver = gameBoard.checkIfOver();
            if(gameOver) {
                timeOut = true;
                setTimeout(()=>{timeOut = false}, 1000);
                if(gameOver === 2){
                    _addGoal(_currentPlayer);
                    setTimeout(_switchTurns, 1000);
                    return;
                }
            }
            _switchTurns();
        }
    }

    return {playTurn, toggleSound, updateTeam, updateName, getPlayer, setFirstTurn, startTime, 
            resetScores, resetTeams, soundActivated, setOpponent, setDifficulty, getDifficulty, botsTurn};
})();