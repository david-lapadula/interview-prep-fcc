import React, { useState } from 'react';

import './App.css';

function App() {
  const ACTIVE = 'active';
  const PAUSED = 'paused';
  const [gameState, setGameState] = useState(ACTIVE);
  const [generations, setGenerations] = useState(0);

  const startPauseResume = () => {
    console.log('here')
  }

  const randomize = () => {

  }

  const clearBoard = () => {

  }

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1
        style={{ color: '#66ff33'}}
        className='game-font'>
        Conway's Game of Life
      </h1>
      <div style={{ borderWidth: '2px', borderColor: '#2d2d2d', margin: '10px', width: '70%'}}>
          Hello
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', width: '20%', padding: '15px', backgroundColor: '#2d2d2d', borderRadius: '5px' }}>
        <div style={{ textAlign: 'center'}} className='game-setting game-font'>
            Generation: {generations}
        </div>
        <div className='game-setting game-font' onClick={startPauseResume}>Start/Pause/Resume</div>
        <div className='game-setting game-font' onClick={randomize}>Randomize</div>
        <div className='game-setting game-font' onClick={clearBoard}>Clear board</div>
      </div>
    </div>
  );
}

export default App;
