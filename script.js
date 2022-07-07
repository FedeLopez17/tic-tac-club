const gameBoard = (()=>{
    const _gameBoard = [];
    
    function _getCells(){
        const cells = document.querySelectorAll(".cell");
        return cells;
    }

    function _handleClick(e) {
        const cellNumber = parseInt(e.target.getAttribute('data-cell'));
        game.play(cellNumber);
    }

    function set(){
        let alreadySet = document.querySelector("section");
        if (alreadySet) return;
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

    function _gameOver(){
        const cells = _getCells();
        for (let cell of cells){
            cell.removeEventListener("click", _handleClick);
        }
    }

    function _populate(cellNumber){
        const cells = _getCells();
        cells[cellNumber].innerText = _gameBoard[cellNumber];
    }

    function _update(){
        for (let cellNumber = 0; cellNumber < 9; cellNumber++){
            if (_gameBoard[cellNumber] != undefined){
                _populate(cellNumber);
            }
        }
    }

    function _checkIfThreeInLine(){     
        const THREE_IN_LINE = {rows: [[0, 1, 2], [3, 4, 5], [6, 7, 8]], columns: [[0, 3, 6], [1, 4, 7], [2, 5, 8]], diagonals: [[0, 4, 8], [2, 4, 6]]};
        for (let direction in THREE_IN_LINE){
            for (let set of THREE_IN_LINE[direction]){
                let firstCellHasAMark = _gameBoard[set[0]] === "X" || _gameBoard[set[0]] === "O";
                let allCellsHaveTheSameMark = _gameBoard[set[0]] === _gameBoard[set[1]] && _gameBoard[set[0]] === _gameBoard[set[2]];
                someoneWon = firstCellHasAMark && allCellsHaveTheSameMark;
                if (someoneWon) return true;
            }
        }
        return false;
    }

    function _checkIfFull(){
        let occupiedCells = _gameBoard.filter(cell => cell === "X" || cell === "O");
        return occupiedCells.length === 9;
    }

    function checkIfGameOver(){
        let full = _checkIfFull(), threeInLine = _checkIfThreeInLine();
        let gameOver = full || threeInLine;
        if(gameOver) _gameOver();
        return (threeInLine) ? 2 : (full) ? 1 : false;
    }

    function addMark(mark, cellNumber){
        let cellAlreadyTaken = _gameBoard[cellNumber] === "X" || _gameBoard[cellNumber] === "O";
        if(cellAlreadyTaken) return false;
        _gameBoard[cellNumber] = mark;
        _update();
        return true;
    }
    return {addMark, checkIfGameOver, set};
})();

const Player = (mark, name)=>{

    return {mark, name};
}

const game = (()=>{
    const _cells = document.querySelectorAll(".cell");
    const _playerOne = Player("X", "Fulanito");
    const _playerTwo = Player("O", "Menganito");
    let _currentPlayer = _playerOne;

    function _switchTurns(){
        _currentPlayer = (_currentPlayer === _playerOne) ? _playerTwo : _playerOne;
        console.log(`${_currentPlayer.name}'s turn!`)
    }

    function play(cellNumber){
        let successfulTurn = gameBoard.addMark(_currentPlayer.mark, cellNumber);
        let gameOver = gameBoard.checkIfGameOver();
        if(gameOver) {
            (gameOver === 1) ? alert("Game over! It's a tie!") : alert(`Game Over! ${_currentPlayer.name} won!`);
        }
        else if(successfulTurn){
            _switchTurns();
        }
    }
    return {play};
})();




