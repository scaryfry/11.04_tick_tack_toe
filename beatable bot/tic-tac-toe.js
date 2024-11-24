const board = document.getElementById('board');
const cells = Array.from(document.querySelectorAll('.cell'));
let currentPlayer = 'X';

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => cell.addEventListener('click', onCellClick));

function onCellClick(e) {
    const cell = e.target;
    const index = cell.dataset.index;

    if (cell.textContent === '' && currentPlayer === 'X') {
        cell.textContent = currentPlayer;
        if (checkWin(currentPlayer)) {
            setTimeout(() => {
                alert(`${currentPlayer} wins!`);
                resetBoard();
            }, 100);
            return;
        } else if (isDraw()) {
            setTimeout(() => {
                alert('It\'s a draw!');
                resetBoard();
            }, 100);
            return;
        }
        currentPlayer = 'O';
        bestMove();
    }
}

function bestMove() {
    if (Math.random() < 0.5) {
        const availSpots = cells.filter(cell => cell.textContent === '');
        const randomSpot = availSpots[Math.floor(Math.random() * availSpots.length)];
        randomSpot.textContent = 'O';
    } else {
        const bestScore = minimax(cells, 'O').index;
        cells[bestScore].textContent = 'O';
    }

    if (checkWin('O')) {
        setTimeout(() => {
            alert(`O wins!`);
            resetBoard();
        }, 100);
    } else if (isDraw()) {
        setTimeout(() => {
            alert('It\'s a draw!');
            resetBoard();
        }, 100);
    } else {
        currentPlayer = 'X';
    }
}

function checkWin(player) {
    return winPatterns.some(pattern => {
        return pattern.every(index => {
            return cells[index].textContent === player;
        });
    });
}

function isDraw() {
    return cells.every(cell => cell.textContent !== '');
}

function resetBoard() {
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
}

function minimax(newBoard, player) {
    const availSpots = newBoard.filter(cell => cell.textContent === '');

    if (checkWin('X')) {
        return { score: -10 };
    } else if (checkWin('O')) {
        return { score: 10 };
    } else if (availSpots.length === 0) {
        return { score: 0 };
    }

    const moves = [];

    availSpots.forEach((spot, index) => {
        const move = {};
        move.index = cells.indexOf(spot);
        newBoard[move.index].textContent = player;

        if (player === 'O') {
            const result = minimax(newBoard, 'X');
            move.score = result.score;
        } else {
            const result = minimax(newBoard, 'O');
            move.score = result.score;
        }

        newBoard[move.index].textContent = '';
        moves.push(move);
    });

    let bestMove;
    if (player === 'O') {
        let bestScore = -Infinity;
        moves.forEach((move, index) => {
            if (move.score > bestScore) {
                bestScore = move.score;
                bestMove = index;
            }
        });
    } else {
        let bestScore = Infinity;
        moves.forEach((move, index) => {
            if (move.score < bestScore) {
                bestScore = move.score;
                bestMove = index;
            }
        });
    }

    return moves[bestMove];
}