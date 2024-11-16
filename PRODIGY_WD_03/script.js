const cells = document.querySelectorAll('.cell');
const turnInfo = document.querySelector('.turn-info');
let currentPlayer = 'X';

cells.forEach(cell => {
    cell.addEventListener('click', handleClick);
});

function handleClick(event) {
    const cell = event.target;
    if (cell.textContent !== '') {
        return;
    }

    cell.textContent = currentPlayer;
    if (checkWin()) {
        turnInfo.textContent = `${currentPlayer} wins!`;
        disableCells();
    } else if (isBoardFull()) {
        turnInfo.textContent = "It's a tie!";
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        turnInfo.textContent = `${currentPlayer}'s Turn`;
    }
}

function checkWin() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].textContent === currentPlayer;
        });
    });
}

function isBoardFull() {
    return [...cells].every(cell => cell.textContent !== '');
}

function disableCells() {
    cells.forEach(cell => {
        cell.removeEventListener('click', handleClick);
    });
}