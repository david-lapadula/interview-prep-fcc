import React, { useState, useEffect } from 'react';
import styles from './GameBoard.module.css';
import Square from '../Square/Square';
import * as constants from '../../constants';

const GameBoard = ({
    isMultiPayer,
    setGameState,
    gameState,
    currentPlayer,
    setCurrentPlayer,
    playerOneLetter,
    playerTwoLetter,
    setPlayerOneScore,
    setPlayerTwoScore,
    setPlayerOneLetter,
    setPlayerTwoLetter,
    setGameOverMessage,
    onNewGame,
    setOnNewGame
}) => {
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
    const [winningSquares, setWinningSquares] = useState(Array(9).fill(null));

    useEffect(() => {
        if (currentPlayer === constants.ROLE.COMPUTER) {
            handleComputerChoice();
        }
    }, [currentPlayer]);

    useEffect(() => {
        let currentPlayerChoices = getCurrentPlayerChoices(),
            currentPlayerOneChoices = currentPlayerChoices[playerOneLetter],
            currentPlayerTwoChoices = currentPlayerChoices[playerTwoLetter];

        let gameOver = squares.every(value => value !== null);

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

            if (player1Match < 3 && player2Match < 3 && gameOver) {
                let drawArray = Array(9).fill(constants.LETTERS.Z);
                setWinningSquares(drawArray);
                setGameState(constants.GAME_STATE.OVER);
                setGameOverMessage(`DRAW!`);
                break;
            } else if (player1Match === 3) {
                let winningArray = winningSquares.map((value, index) => combination.includes(index) ? constants.LETTERS.Z : value);
                setWinningSquares(winningArray);
                setGameState(constants.GAME_STATE.OVER);
                setPlayerOneScore(score => score + 1);
                setGameOverMessage(`${constants.ROLE.PLAYER_ONE} wins!`);
                break;
            } else if (player2Match === 3) {
                let winningArray = winningSquares.map((value, index) => combination.includes(index) ? constants.LETTERS.Z : value);
                setWinningSquares(winningArray);
                setGameState(constants.GAME_STATE.OVER);
                setPlayerTwoScore(score => score + 1);
                let player = isMultiPayer ? constants.ROLE.PLAYER_TWO : constants.ROLE.COMPUTER;
                setGameOverMessage(`${player} wins!`);
                break;
            }
        }

    }, [squares]);


    useEffect(() => {
        if (onNewGame) {
            newGame();
        }
    }, [onNewGame]);

    const newGame = () => {
        setSquares(Array(9).fill(null));
        setWinningSquares(Array(9).fill(null));

        if (playerOneLetter === constants.LETTERS.X) {
            setPlayerOneLetter(constants.LETTERS.X);
            setPlayerTwoLetter(constants.LETTERS.O);

            setCurrentPlayer(constants.ROLE.PLAYER_ONE);
        } else {
            setPlayerOneLetter(constants.LETTERS.O);
            setPlayerTwoLetter(constants.LETTERS.X);

            let currentPlayer = isMultiPayer ? constants.ROLE.PLAYER_TWO : constants.ROLE.COMPUTER;
            setCurrentPlayer(currentPlayer);
        }

        setGameState(constants.GAME_STATE.ACTIVE);
        setOnNewGame(false);
    };

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


        // First check if either player is 1 away from winning, check all choices for computer first
        for (let combination of winningCombinationIndices) {
            let player2Match = 0;

            combination.forEach(index => {
                if (currentPlayerTwoChoices.includes(index)) {
                    player2Match++;
                }
            });

            if (player2Match === 2) {
                nextIndex = combination.find(index => !currentPlayerTwoChoices.includes(index) && isNullOrUndefined(squares[index]));
            }

            if (!isNullOrUndefined(nextIndex)) {
                break;
            }
        }

        if (isNullOrUndefined(nextIndex)) {
            for (let combination of winningCombinationIndices) {
                let player1Match = 0;

                combination.forEach(index => {
                    if (currentPlayerOneChoices.includes(index)) {
                        player1Match++;
                    }
                });

                if (player1Match === 2) {
                    nextIndex = combination.find(index => !currentPlayerOneChoices.includes(index) && isNullOrUndefined(squares[index]));
                }

                if (!isNullOrUndefined(nextIndex)) {
                    break;
                }
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
                gameOver={winningSquares[index] === constants.LETTERS.Z}
                onClick={() => handleSelectLetter(index)}
                disableButton={gameState === constants.GAME_STATE.OVER}
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