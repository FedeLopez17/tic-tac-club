const gameBoard = (()=>{
    const _gameBoard = [];
    const _cells = document.querySelectorAll(".cell");
    
    function _display(cellNumber){
        _cells[cellNumber].innerText = _gameBoard[cellNumber];
    }

    function _updateGameBoard(){
        for (let cellNumber = 0; cellNumber < 9; cellNumber++){
            if (_gameBoard[cellNumber] != undefined){
                _display(cellNumber);
            }
        }
    }

    function addMark(mark, cellNumber){
        let cellAlreadyTaken = _gameBoard[cellNumber] === "X" | _gameBoard[cellNumber] === "O";
        if(cellAlreadyTaken) return;
        _gameBoard[cellNumber] = mark;
        _updateGameBoard();
    }

    // temporarily return private methods and properties for test purposes.
    return {addMark, updateGameBoard: _updateGameBoard, cells: _cells, gameboard: _gameBoard};
})();

const Player = (mark)=>{
    return {mark};
}

const game = (()=>{
    const _cells = document.querySelectorAll(".cell");
    const _playerOne = Player("X");
    const _playerTwo = Player("O");
    let _currentPlayer = _playerOne;

    function _switchPlayers(){
        _currentPlayer = (_currentPlayer === _playerOne) ? _playerTwo : _playerOne;
    }
    
    for (let _cellNumber = 0; _cellNumber < 9; _cellNumber++){
        _cells[_cellNumber].addEventListener("click", ()=>{
            gameBoard.addMark(_currentPlayer.mark, _cellNumber);
            _switchPlayers();
        })
    }
})();




