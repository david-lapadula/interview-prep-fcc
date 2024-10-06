import React, { useState } from 'react';
import styles from './GameBoard.module.css';
import Square from '../Square/Square';
import * as constants from '../../constants';


const GameBoard = ({ isMultiPayer, setGameState, currentPlayer, setCurrentPlayer, playerOneLetter, playerTwoLetter }) => {
    const [squares, setSquares] = useState(Array(9).fill(null));

    const handleSelectLetter = (index) => {
        const newSquares = squares.slice();
        if (newSquares[index]) return;

        newSquares[index] = currentPlayer === constants.ROLE.PLAYER_ONE ? playerOneLetter : playerTwoLetter;
        setSquares(newSquares);

        handleNextPlayer();
    };

    const handleNextPlayer = () => {
        let nextPlayer;

        if (currentPlayer === constants.ROLE.PLAYER_ONE) {
            nextPlayer = isMultiPayer ? constants.ROLE.PLAYER_TWO : constants.ROLE.COMPUTER;
        } else {
            nextPlayer = constants.ROLE.PLAYER_ONE;
        }

        setCurrentPlayer(nextPlayer);
    }

    const renderSquare = (index) => {
        return (
            <Square
                value={squares[index]}
                onClick={() => handleSelectLetter(index)}
            />
        );
    };

    return (
        <div className={styles.boardContainer}>
            <div className={styles.boardRow}>
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className={styles.boardRow}>
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className={styles.boardRow}>
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    );
};

export default GameBoard;