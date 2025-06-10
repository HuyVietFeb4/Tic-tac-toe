function Cell(i, j) {
    const pos_i = i;
    const pos_j = j;
    let move = 0;
    // 0: not yet chosen, 1: player 1, -1: player 2
    const getPos = () => {pos_i, pos_j};
    const setMove = (moveValue) => move = moveValue;
    const getMove = () => move;

    return {getPos, setMove, getMove};
}

function gameBoard() {
    
    let board = [];
    let rows = 3;
    let cols = 3;

    // Check win method
    const checkWinOrDraw = () => { //return 1 player 1 win, -1 player 2 win, 0 for draw and 2 for continue
        for(let i = 0; i < rows; i++) {
                let rowSum = 0;
            for(let j = 0; j < cols; j++) {
                rowSum += board[i][j].getMove();
            }
            if (rowSum === 3) {
                return 1;
            }
            else if (rowSum === -3) {
                return -1;
            }
        }

        for(let i = 0; i < cols; i++) {
            let colSum = 0;
            for(let j = 0; j < rows; j++) {
                colSum += board[j][i].getMove();
            }
            if (colSum === 3) {
                return 1;
            }
            else if (colSum === -3) {
                return -1;
            }
        }

        if(board[0][0].getMove() + board[1][1].getMove() + board[2][2].getMove() === 3) {
            return 1;
        }
        else if(board[0][0].getMove() + board[1][1].getMove() + board[2][2].getMove() === -3) {
            return -1;
        }

        if(board[2][0].getMove() + board[1][1].getMove() + board[0][2].getMove() === 3) {
            return 1;
        }
        else if(board[2][0].getMove() + board[1][1].getMove() + board[0][2].getMove() === -3) {
            return -1;
        }

        for(let i = 0; i < rows; i++) {
            for(let j = 0; j < cols; j++) {
                if (board[j][i].getMove() === 0) {
                    return 2;
                }
            }
        }
        return 0;
    }
    // Assign cell value method 
    const assignValue = (i, j, moveValue) => {
        board[i][j].setMove(moveValue);
    } 
    // Reset method
    const resetMethod = () => {
        board = [];
        for(let i = 0; i < rows; i++) {
            board[i] = [];
            for(let j = 0; j < cols; j++) {
                board[i].push(Cell(i, j));
            }
        }
    }
    return {checkWinOrDraw, assignValue, resetMethod};
};


function gameController() {
    let players = [
        {
            playerName: 'Player 1\'s (X)',
            moveValue: 1
        },
        {
            playerName: 'Player 2\'s (O)',
            moveValue: -1
        } 
    ]
    let turn = players[0];
    const getTurn = () => turn;
    const changeTurn = () => {
        turn = turn === players[0] ? players[1] : players[0]; 
    }
    const resetTurn = () => {
        turn = players[0];
    }
    return {getTurn, changeTurn, resetTurn}
}

function screenController() { 
    const board = gameBoard();
    const controller = gameController();

    board.resetMethod();
    const player_move = document.querySelector('#player_move');
    

    const reset_game_btn = document.querySelector('#reset_game_btn');
    const board_game = document.querySelector('.board_game');


    const resetGame = () => {
        board.resetMethod();
        controller.resetTurn()
        player_move.textContent = controller.getTurn().playerName;
        board_game.innerHTML = '';
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                const divGrid = document.createElement('div');
                divGrid.id = 'grid_move_' + `${i}${j}`;
                divGrid.addEventListener('click', () => {
                    if (divGrid.textContent == '' && board.checkWinOrDraw() == 2) {
                        switch(controller.getTurn().moveValue) {
                            case 1: divGrid.textContent = 'X'; break;
                            case -1: divGrid.textContent = '0'; break;
                            default: divGrid.textContent = ''; break;
                        }
                        board.assignValue(i,j,controller.getTurn().moveValue);
                        controller.changeTurn();
                        player_move.textContent = controller.getTurn().playerName;
                        if(board.checkWinOrDraw() == 1) {
                            window.alert('Player 1 win');
                        }
                        else if (board.checkWinOrDraw() == -1) {
                            window.alert('Player 2 win');
                        }
                        else if (board.checkWinOrDraw() == 0) {
                            window.alert('It\'s a draw');
                        }
                    }
                    
                })
                board_game.appendChild(divGrid);
            }
        }
    }
    reset_game_btn.addEventListener('click', resetGame)
    return {resetGame}
}

game = screenController();
game.resetGame();
