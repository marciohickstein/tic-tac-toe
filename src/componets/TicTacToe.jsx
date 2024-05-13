import { useState } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';

const NOUGHT = "O";
const CROSS = "X";
const EMPTY_SPACE = "_";

const FINISH_MSG= "Game Over";
const EMOTICON_HAPPY  = "\\0/";
const EMOTICON_SAD    = ":(";

const emptyMatrix = [
    [EMPTY_SPACE, EMPTY_SPACE, EMPTY_SPACE],
    [EMPTY_SPACE, EMPTY_SPACE, EMPTY_SPACE],
    [EMPTY_SPACE, EMPTY_SPACE, EMPTY_SPACE],
];

const TicTacToe = (props) => {

    const [symbol, setSymbol] = useState(CROSS);

    const [winnerMessage, setWinnerMessage] = useState('');

    const [board, setBoard] = useState(Array.from(emptyMatrix));

    const [gameOver, setGameOver] = useState(false);

    
    const restartGame = (event) => {
        const len = board.length;
        const newBoard = Array.from(emptyMatrix);

        for (let row = 0; row < len; row++) {
            for (var col = 0; col < len; col++) {
                newBoard[row][col] = EMPTY_SPACE;
            }
        }

        setBoard(newBoard);
        setGameOver(false);
        setWinnerMessage('');
    }

    const changeSymbol = (event) => {
        setSymbol(event.target.value === 'symbol_X' ? CROSS : NOUGHT);
    }

    const getWinnerMessage = (msg, winner) => {
        const emoticon = winner === symbol ? EMOTICON_HAPPY : EMOTICON_SAD;

        return `${FINISH_MSG}: ${msg}! ${emoticon}`;
    };

    const checkWinner = (board, symbol) => {
        const len = board.length;

        // row check
        for (let row = 0; row < len; row++) {
            for (var col = 0; col < len; col++) {
                if (board[row][col] !== symbol) {
                    break;
                }
            }
            if (col === 3) {
                setWinnerMessage(getWinnerMessage(`Row ${row} completed by player ${symbol}`, symbol));
                setGameOver(true);
                return true;
            }
        }

        // column check
        for (let col = 0; col < len; col++) {
            for (var row = 0; row < len; row++) {
                if (board[row][col] !== symbol) {
                    break;
                }
            }
            if (row === 3) {
                setWinnerMessage(getWinnerMessage(`Column ${col} completed by player ${symbol}`, symbol));
                setGameOver(true);
                return true;
            }
        }

        // cross check 
        if ((board[0][0] === symbol && board[1][1] === symbol && board[2][2] === symbol) ||
            (board[2][0] === symbol && board[1][1] === symbol && board[0][2] === symbol)) {
            setWinnerMessage(getWinnerMessage(`Cross line completed by player ${symbol}`, symbol));
            setGameOver(true);
            return true;
        }

        return false;
    }

    const isMarked = (row, col) => {
        return (board[row][col] !== EMPTY_SPACE);
    }

    const getRandomNotUsedPositions = (board) => {
        const notUsedPositions = [];

        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board.length; j++) {
                if (board[i][j] === EMPTY_SPACE) {
                    notUsedPositions.push([i, j]);
                }
            }
        }

        if (notUsedPositions.length <= 0) {
            return null;
        }

        const randomNumber = Math.trunc(Math.random() * 10) % notUsedPositions.length;

        return notUsedPositions[randomNumber];
    }

    const setMarkInThePosition = (row, col) => {
        if (gameOver || isMarked(row, col)) {
            return;
        }

        const newBoard = Array.from(board);

        newBoard[row][col] = symbol;

        if (checkWinner(board, CROSS)) {
            return ;
        }

        setBoard(newBoard);

        const index = getRandomNotUsedPositions(newBoard);

        if (index) {
            newBoard[index[0]][index[1]] = symbol === CROSS ? NOUGHT : CROSS;
        }

        if (checkWinner(board, NOUGHT)){
            return ;
        }

        setBoard(newBoard);
    }

    const getRow = (arrayRow, row) => {
        let col = 0;
        return (
            <div className="row" key={row}>
                <div className="col-4 border rouded" onClick={() => setMarkInThePosition(row, 0)}>{arrayRow[0]}</div>
                <div className="col-4 border rouded" onClick={() => setMarkInThePosition(row, 1)}>{arrayRow[1]}</div>
                <div className="col-4 border rouded" onClick={() => setMarkInThePosition(row, 2)}>{arrayRow[2]}</div>
            </div>
        )
    }

    return (
        <div className="container text-center">
            <h1>TIC TAC TOE</h1>
            <br />
            <label htmlFor="element">Choose:</label>&nbsp;&nbsp;&nbsp;
            <select name="element" id="element" onChange={changeSymbol}>
                <option value="symbol_X">X (CROSS)</option>
                <option value="symbol_O">O (NOUGHT)</option>
            </select>
            <br /><br />
            {
                board.map((row, index) => getRow(row, index))
            }
            <br />
            <button className="btn btn-secondary" onClick={restartGame}>Restart Game</button>
            <br /><br />
            <p>{winnerMessage}</p>
        </div>
    )
}

export default TicTacToe;