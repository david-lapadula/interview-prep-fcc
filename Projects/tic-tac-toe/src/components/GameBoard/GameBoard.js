import React, { useState } from 'react';
import styles from './GameBoard.module.css';
import Square from '../Square/Square';


const GameBoard = () => {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);

    const handleClick = (index) => {
        const newSquares = squares.slice();
        if (newSquares[index]) return; // Ignore click if square is already filled

        newSquares[index] = isXNext ? 'X' : 'O';
        setSquares(newSquares);
        setIsXNext(!isXNext);
    };

    const renderSquare = (index) => {
        return (
            <Square
                value={squares[index]}
                onClick={() => handleClick(index)}
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