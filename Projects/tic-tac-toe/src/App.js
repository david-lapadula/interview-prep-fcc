import React, { useState } from 'react';
import * as constants from './constants';
import styles from './App.module.css';

import ChooseType from './components/ChooseType/ChooseType';
import ChooseLetter from './components/ChooseLetter/ChooseLetter';
import GameBoard from './components/GameBoard/GameBoard';

function App() {
  const [gameState, setGameState] = useState(constants.GAME_STATE.CHOOSE_TYPE);
  const [gameType, setGameType] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [playerOneLetter, setPlayerOneLetter] = useState(null);
  const [playerTwoLetter, setPlayerTwoLetter] = useState(null);
  const [playerOneScore, setPlayerOneScore] = useState(0);
  const [playerTwoScore, setPlayerTwoScore] = useState(0);
  const [gameOverMessage, setGameOverMessage] = useState('');
  const [onNewGame, setOnNewGame] = useState(false);

  const handleChooseType = (gameType) => {
    setGameState(constants.GAME_STATE.CHOOSE_LETTER);
    setGameType(gameType)
  };

  const reset = () => {
    setGameState(constants.GAME_STATE.CHOOSE_TYPE);
    setGameType(null);
    setCurrentPlayer(null);
    setPlayerOneLetter(null);
    setPlayerTwoLetter(null);
    setPlayerOneScore(0);
    setPlayerTwoScore(0);
  };

  const newGame = () => {
    setOnNewGame(true);
  }

  const isMultiPayer = gameType === constants.GAME_TYPE.MULTI_PLAYER;

  return (
    <div className={styles.container}>

      {
        [constants.GAME_STATE.ACTIVE, constants.GAME_STATE.OVER].includes(gameState) ?
          (
            <div className={styles.statusDiv}>
              <div style={{ padding: '5px 10px 5px 5px' }}>Player 1: {playerOneScore}</div>

              <div style={{ borderLeft: '1px solid white', marginLeft: '10px', padding: '5px 5px 5px 20px' }}>
                {isMultiPayer ? constants.ROLE.PLAYER_TWO : constants.ROLE.COMPUTER}: {playerTwoScore}
              </div>

              <div style={{ marginLeft: 'auto' }}>
                <button className={styles.resetButton} onClick={() => reset()}>Reset All</button>
              </div>
            </div>
          ) : (
            <div className={styles.statusDiv}></div>
          )
      }


      <div className={styles.gameContainer}>
        {
          gameState === constants.GAME_STATE.CHOOSE_TYPE && (
            <ChooseType
              onSinglePlayerSelect={() => handleChooseType(constants.GAME_TYPE.SINGLE_PLAYER)}
              onMultiPlayerSelect={() => handleChooseType(constants.GAME_TYPE.MULTI_PLAYER)}
            />
          )
        }

        {
          gameState === constants.GAME_STATE.CHOOSE_LETTER && (
            <ChooseLetter
              isMultiPayer={isMultiPayer}
              setGameState={setGameState}
              setPlayerOneLetter={setPlayerOneLetter}
              setPlayerTwoLetter={setPlayerTwoLetter}
              setCurrentPlayer={setCurrentPlayer}
            />
          )
        }

        {
          [constants.GAME_STATE.ACTIVE, constants.GAME_STATE.OVER].includes(gameState) && (
            <GameBoard
              isMultiPayer={isMultiPayer}
              gameState={gameState}
              setGameState={setGameState}
              currentPlayer={currentPlayer}
              setCurrentPlayer={setCurrentPlayer}
              playerOneLetter={playerOneLetter}
              playerTwoLetter={playerTwoLetter}
              setPlayerOneScore={setPlayerOneScore}
              setPlayerTwoScore={setPlayerTwoScore}
              setPlayerOneLetter={setPlayerOneLetter}
              setPlayerTwoLetter={setPlayerTwoLetter}
              setGameOverMessage={setGameOverMessage}
              onNewGame={onNewGame}
              setOnNewGame={setOnNewGame}
            />
          )
        }

      </div>

      {
        gameState === constants.GAME_STATE.ACTIVE ?
          (
            <div className={styles.statusDiv}>
              <div style={{ margin: 'auto' }}>
                {currentPlayer}'s turn
              </div>
            </div>
          ) : (
            <div></div>
          )
      }

      {
        gameState === constants.GAME_STATE.OVER ?
          (
            <div className={styles.statusDiv}>
              <div style={{ marginRight: 'auto' }}>
                {gameOverMessage}
              </div>
              <button className={styles.newGameButton} onClick={() => newGame()}>New Game</button>
            </div>
          ) : (
            <div></div>
          )
      }

    </div>
  );
}

export default App;
