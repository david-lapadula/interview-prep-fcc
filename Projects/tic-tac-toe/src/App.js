import React, { useState } from 'react';
import * as constants from './constants';
import styles from './App.module.css';

import ChooseType from './components/ChooseType/ChooseType';
import ChooseLetter from './components/ChooseLetter/ChooseLetter';
import GameBoard from './components/GameBoard/GameBoard';

function App() {
  const [gameState, setGameState] = useState(constants.GAME_STATE.CHOOSE_TYPE);
  const [gameType, setGameType] = useState(null);
  const [playerOneLetter, setPlayerOneLetter] = useState(null);
  const [playerTwoLetter, setPlayerTwoLetter] = useState(null);
  const [playerOneScore, setPlayerOneScore] = useState(0);
  const [playerTwoScore, setPlayeTwoScore] = useState(0);

  const handleChooseType = (gameType) => {
    setGameState(constants.GAME_STATE.CHOOSE_LETTER);
    setGameType(gameType)
  };

  const reset = () => {

  };

  const isMultiPayer = gameType === constants.GAME_TYPE.MULTI_PLAYER;


  return (
    <div className={styles.container}>
      <div className={styles.statusDiv}>
        hello
      </div>

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
              gameType={gameType}
              setGameState={setGameState}
              setPlayerOneLetter={setPlayerOneLetter}
              setPlayerTwoLetter={setPlayerTwoLetter}
            />
          )
        }

        {
          gameState === constants.GAME_STATE.ACTIVE && (
            <GameBoard
              gameType={gameType}
              setGameState={setGameState}
            />
          )
        }

      </div>

      <div className={styles.statusDiv}>
        hello
      </div>
    </div>
  );
}

export default App;
