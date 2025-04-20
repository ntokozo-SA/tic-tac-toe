window.addEventListener('DOMContentLoaded', ()=> {
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const resetButton = document.querySelector('#reset');
    const playerDisplay = document.querySelector('.display-player');
    const announce = document.querySelector('.announce');

    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameActive = true;

    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE = 'TIE';  

    /*

        Indexes within the boader
        [0] [1] [2]
        [3] [4] [5]
        [6] [7] [8]

    */
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const handleResultValidation = () => {
        let roundWon = false;
        for(let i = 0; i < winningConditions.length; i++) {
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if(a === '' || b === '' || c === '') {
                continue;
            }
            if(a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if(roundWon) {
            displayAnnouncement(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
            isGameActive = false;
            return;
        }

        if(!board.includes('')) {
            displayAnnouncement(TIE);
        }
    }

    const displayAnnouncement = (type) => {
        switch(type) {
            case PLAYERX_WON:
                announce.innerText = 'Player X won!';
                break;
            case PLAYERO_WON:
                announce.innerText = 'Player O won!';
                break;
            case TIE:
                announce.innerText = 'Tie!';
        }
        announce.classList.remove('hide');
    }

    const isValidAction = (tile) => {
        if(tile.innerText === 'X' || tile.innerText === 'O') {
            return false;
        }
        return true;
    }

    const updateBoard = (index) => {
        board[index] = currentPlayer;
    }

    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }

    const userAction = (tile, index) => {
        if(isValidAction(tile) && isGameActive) {
            tile.innerText = currentPlayer;
            tile.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            displayAnnouncement();
            changePlayer();
        }
    }

    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        announce.classList.add('hide');
        if(currentPlayer === 'O') {
            changePlayer();
        }
        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        });
    }

    tiles.forEach((tile, index) => {
        tile.addEventListener('click', () => userAction(index));
    });

    resetButton.addEventListener('click', resetBoard);
});