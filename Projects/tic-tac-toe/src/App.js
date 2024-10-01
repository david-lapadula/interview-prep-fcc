import React, { useState } from 'react';
import * as constants from './constants';
import styles from './App.module.css';

import ChooseType from './components/ChooseType/ChooseType';
import ChooseLetter from './components/ChooseLetter/ChooseLetter';

function App() {
  const [gameState, setGameState] = useState(constants.GAME_STATE.CHOOSE_TYPE);
  const [gameType, setGameType] = useState(null);

  const handleClick = (gameType) => {
    setGameState(constants.GAME_STATE.CHOOSE_LETTER);
    setGameType(gameType)
  };


  return (
    <div className={styles.container}>
      <div className={styles.gameContainer}>

        {
          gameState === constants.GAME_STATE.CHOOSE_TYPE && (
            <ChooseType
              onSinglePlayerSelect={() => handleClick(constants.GAME_TYPE.SINGLE_PLAYER)}
              onMultiPlayerSelect={() => handleClick(constants.GAME_TYPE.MULTI_PLAYER)}
            />
          )
        }

        {
          gameState === constants.GAME_STATE.CHOOSE_LETTER && (
            <ChooseLetter 
              gameType={gameType}
              onBackToChooseType={() => setGameState(constants.GAME_STATE.CHOOSE_TYPE)}
            />
          )
        }

      </div>
    </div>
  );
}

export default App;
