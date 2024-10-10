import React, { useState, useEffect, useRef } from 'react';
import styles from './GameBoard.module.css';
import Square from '../Square/Square';
import * as constants from '../../constants';

const GameBoard = ({ isMultiPayer, setGameState, currentPlayer, setCurrentPlayer, playerOneLetter, playerTwoLetter }) => {
    const winningCombinationIndices = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [6, 4, 2]
    ];

    const cornerIndices = [0, 2, 6, 8];
    const middleIndex = 4;
    const outerIndices = [3, 1, 5, 7];

    const [squares, setSquares] = useState(Array(9).fill(null));

    useEffect(() => {
        if (currentPlayer === constants.ROLE.COMPUTER) {
            handleComputerChoice();
        }
    }, [currentPlayer]);

    useEffect(() => {
        let currentPlayerChoices = getCurrentPlayerChoices(),
        currentPlayerOneChoices = currentPlayerChoices[playerOneLetter],
        currentPlayerTwoChoices = currentPlayerChoices[playerTwoLetter];

        for (let combination of winningCombinationIndices) {
            let player1Match = 0;
            let player2Match = 0;

            combination.forEach(index => {
                if (currentPlayerOneChoices.includes(index)) {
                    player1Match++;
                }
    
                if (currentPlayerTwoChoices.includes(index)) {
                    player2Match++;
                }
            });


            console.log(combination)
            console.log(player1Match)
            console.log(player2Match)
        }
    }, [squares]);

    const getCurrentPlayerChoices = () => {
        let playerChoices = {
            [constants.LETTERS.X]: [],
            [constants.LETTERS.O]: [],
        }

        for (let i = 0; i < squares.length; i++) {
            if (squares[i] === constants.LETTERS.X) {
                playerChoices[constants.LETTERS.X].push(i);
            }

            if (squares[i] === constants.LETTERS.O) {
                playerChoices[constants.LETTERS.O].push(i);
            }
        }

        return playerChoices;
    }

    const isNullOrUndefined = (value) => {
        return value === null || value === undefined;
    }

    const handleComputerChoice = () => {
        let nextIndex = null,
            currentPlayerChoices = getCurrentPlayerChoices(),
            currentPlayerOneChoices = currentPlayerChoices[playerOneLetter],
            currentPlayerTwoChoices = currentPlayerChoices[playerTwoLetter];


        // First check if either player is 1 away from winning, check computer first
        for (let combination of winningCombinationIndices) {
            let player1Match = 0;
            let player2Match = 0;

            combination.forEach(index => {
                if (currentPlayerOneChoices.includes(index)) {
                    player1Match++;
                }

                if (currentPlayerTwoChoices.includes(index)) {
                    player2Match++;
                }
            });

            if (player2Match === 2) {
                nextIndex = combination.find(index => !currentPlayerTwoChoices.includes(index) && isNullOrUndefined(squares[index]));
            } else if (player1Match === 2) {
                nextIndex = combination.find(index => !currentPlayerOneChoices.includes(index) && isNullOrUndefined(squares[index]));
            }

            if (!isNullOrUndefined(nextIndex)) {
                break;
            }
        }

        // Next check if any corners are available
        if (isNullOrUndefined(nextIndex)) {
            cornerIndices.forEach(index => {
                if (isNullOrUndefined(squares[index]) && isNullOrUndefined(nextIndex)) {
                    nextIndex = index;
                }
            })
        }


        // Then check the middle index
        if (isNullOrUndefined(nextIndex) && isNullOrUndefined(squares[middleIndex])) {
            nextIndex = middleIndex;
        }

        // Finally find the next remaining available square
        if (isNullOrUndefined(nextIndex)) {
            outerIndices.forEach(index => {
                if (isNullOrUndefined(squares[index]) && isNullOrUndefined(nextIndex)) {
                    nextIndex = index;
                }
            })
        }

        const selectTimeout = setTimeout(() => {
            handleSelectLetter(nextIndex);
        }, 500);

        return () => clearTimeout(selectTimeout);
    };

    const handleSelectLetter = (index) => {
        const newSquares = squares.slice();
        if (newSquares[index]) return;

        let isCurrentPlayerOne = currentPlayer === constants.ROLE.PLAYER_ONE;

        newSquares[index] = isCurrentPlayerOne ? playerOneLetter : playerTwoLetter;
        setSquares(newSquares);

        let nextPlayer;

        if (isCurrentPlayerOne) {
            nextPlayer = isMultiPayer ? constants.ROLE.PLAYER_TWO : constants.ROLE.COMPUTER;
        } else {
            nextPlayer = constants.ROLE.PLAYER_ONE;
        }

        setCurrentPlayer(nextPlayer);
    };


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