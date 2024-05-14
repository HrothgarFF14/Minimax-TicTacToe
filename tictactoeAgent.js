// Tic Tac Toe
class Agent {
    /**
     * Constructor for the Agent Class
     */
    constructor() {}

    /**
     * Evaluates all possible oves and returns the best score
     * @param {Object} board The current game board
     * @param {boolean} isMaximizing A flag indicating whether the currecnt player is maximizing or minimizing
     * @param {number} bestScore The initial best score
     * @param {function} compare Comparison function to use (Math.max for maximizing and Math.min for minimizing)
     * @returns {number} The best score
     */
    evaluateMove(board, isMaximizing, bestScore, compare) {
        for (var i = 0; i < board.cells.length; i++) {
            var cell = i + 1;
            if (board.cellFree(cell)) {
                var newBoard = board.clone();
                newBoard.move(cell);
                var score = this.minimax(newBoard, !isMaximizing);
                bestScore = compare(bestScore, score);
            }
        }
        return bestScore;
    }

    /**
     * Implements the Minimax algorithm to determine the best move for the current player
     * @param {Object} board The current state of the board
     * @param {boolean} isMaximizing Flag inidcating whether the current player is maximizing or minimizing
     * @returns {number} The score of the best move
     */
    minimax(board, isMaximizing) {
        // Base cases - check if the game is over or a draw
        var gameOver = board.gameOver();
        if (gameOver === 1) return 1;
        if (gameOver === 2) return -1;
        if (gameOver === 3) return 0;

        // Recursive case - evaluate all possible moves and choose the best score
        if (isMaximizing) {
            return this.evaluateMove(board, isMaximizing, -Infinity, Math.max);
        } else {
            return this.evaluateMove(board, isMaximizing, Infinity, Math.min);
        }
    }

    /**
     * Selects the best move for the current player
     * @param {Object} board
     * @returns {number} The best move
     */
    selectMove(board) {
        // Define the initial best score and move
        var bestScore = board.playerOne ? -Infinity : Infinity;
        var bestMove = null;

        for (var i = 0; i < board.cells.length; i++) {
            var cell = i + 1;
            if (board.cellFree(cell)) {
                var newBoard = board.clone();
                newBoard.move(cell);
                var score = this.minimax(newBoard, !board.playerOne);

                if (
                    (board.playerOne && score > bestScore) ||
                    (!board.playerOne && score < bestScore)
                ) {
                    bestScore = score;
                    bestMove = cell;
                }
            }
        }

        return bestMove;
    }
}
