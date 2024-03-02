document.addEventListener('DOMContentLoaded', function () {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const resultDiv = document.getElementById('result');
    const resetBtn = document.getElementById('resetBtn');
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                return gameBoard[a];
            }
        }

        return gameBoard.includes('') ? null : 'T';
    }

    function handleClick(event) {
        const index = event.target.dataset.index;
        if (gameBoard[index] === '' && gameActive) {
            gameBoard[index] = currentPlayer;
            event.target.textContent = currentPlayer;

            const winner = checkWinner();
            if (winner) {
                if (winner === 'T') {
                    resultDiv.textContent = 'It\'s a tie!';
                } else {
                    resultDiv.textContent = `${winner} wins!`;
                }
                gameActive = false;
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    }

    function resetGame() {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        currentPlayer = 'X';
        resultDiv.textContent = '';
        cells.forEach(cell => {
            cell.textContent = '';
        });
    }

    cells.forEach(cell => {
        cell.addEventListener('click', handleClick);
    });

    resetBtn.addEventListener('click', resetGame);
});
