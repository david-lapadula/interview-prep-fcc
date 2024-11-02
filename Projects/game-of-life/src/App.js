import React, { useState } from 'react';
import Cell from './Cell';
import './App.css';

function App() {
  const ACTIVE = 'active';
  const PAUSED = 'paused';
  const [cellArray, setCellArray] = useState(Array.from({ length: 20 }, () => Array(50).fill(0)));
  const [gameState, setGameState] = useState(ACTIVE);
  const [generations, setGenerations] = useState(0);

  const startPauseResume = () => {
    console.log('startPauseResume');
  }

  const randomize = () => {
    console.log('randomize');
  }

  const clearBoard = () => {
    console.log('clearBoard');
  }

  const toggleCellState = (rowIndex, colIndex) => {
    console.log('toggle')
    const newCellArray = cellArray.map((row, rIndex) =>
      row.map((cell, cIndex) => {
        if (rIndex === rowIndex && cIndex === colIndex) {
          return cell === 1 ? 0 : 1;
        }
        return cell;
      })
    );
    setCellArray(newCellArray);
  };

  return (
    <div className="container">
      <h1 className='game-font game-text-color'>
        Conway's Game of Life
      </h1>
      <div className="cell-container">
        {cellArray.map((row, rowIndex) => (
          row.map((cellValue, colIndex) => (
            <Cell key={`${rowIndex}-${colIndex}`} isLive={cellValue === 1} />
          ))
        ))}
      </div>
      <div className="settings-container">
        <div className='game-setting game-font text-center'>
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
