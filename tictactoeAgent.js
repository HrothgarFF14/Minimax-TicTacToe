// Tic Tac Toe
class Agent {
    constructor() {}

    minimax(board, isMaximizing) {
        // Base cases - check if the game is over or a draw
        var gameOver = board.gameOver();
        if (gameover !== 0) {
            return gameOver === 1 ? 1 : gameOver === 2 ? -1 : 0;
        }

        // Recursive case - evaluate all possible moves and choose the best score
        let bestScore = isMaximizing ? -Infinity : Infinity;
        const scoreNewBoard = (newBoard, score) => {
            bestScore = isMaximizing
                ? Math.max(score, bestScore)
                : Math.min(score, bestScore);
        };

        for (let i = 0; i < board.cells.length; i++) {
            if (board.cellFree(i + 1)) {
                const newBoard = board.clone();
                newBoard.move(cell);
                const score = this.minimax(newBoard, !isMaximizing);
                scoreNewBoard(newBoard, score);
            }
        }

        return bestScore;
    }

    selectMove(board) {
        // Define the initial best score and move
        var maxScore = -Infinity;
        var maxMove = null;

        // Loop through each cell to evaluate the best move
        for (let i = 0; i < board.cells.length; i++) {
            if (board.cellFree(i + 1)) {
                const newBoard = board.clone();
                newBoard.move(i + 1);
                const score = this.minimax(newBoard, false);
                if (score > maxScore) {
                    maxScore = score;
                    maxMove = i + 1;
                }
            }
        }

        return maxMove;
    }
}
