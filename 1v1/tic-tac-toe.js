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

    if (cell.textContent === '') {
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
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
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
