import React, { useState, useEffect } from 'react';
import Cell from './Cell';
import './App.css';

function App() {

  const createRandomArray = (rows, columns) => {
    return Array
      .from({ length: rows }, () => Array(columns).fill(0))
      .map(row =>
        row.map(() => Math.round(Math.random()))
      );
  }

  const ACTIVE = 'active';
  const PAUSED = 'paused';
  const NEW = 'new';
  const [cellArray, setCellArray] = useState(createRandomArray(20, 50));
  const [gameState, setGameState] = useState(ACTIVE);
  const [generations, setGenerations] = useState(0);


  useEffect(() => {
    const interval = setInterval(() => {

      setCellArray((prevArray) => {
        let deepCopyArray = prevArray.map(row => row.slice());
        let nextGeneration = createNextGeneration(deepCopyArray);

        if (gameState === ACTIVE) {
          setGenerations((prevGen) => {
            return prevGen + 1;
          })
          return nextGeneration;
        }

        return deepCopyArray;
      });

    }, 100);

    return () => clearInterval(interval);
  }, [gameState]);


  const createNextGeneration = (currentArray) => {
    return currentArray.map((row, rowIndex) =>
      row.map((col, colIndex) => {
        let rowM1 = rowIndex - 1,
          colM1 = colIndex - 1,
          rowP1 = rowIndex + 1,
          colP1 = colIndex + 1,
          sum = 0,
          cell = currentArray[rowIndex][colIndex],
          neighbours = [
            [rowM1, colM1], [rowM1, colIndex], [rowM1, colP1], [rowIndex, colP1], [rowP1, colP1], [rowP1, colIndex], [rowP1, colM1], [rowIndex, colM1]
          ];

        for (let neighbour of neighbours) {
          let row = neighbour[0],
            col = neighbour[1];

          if (row >= 0 && col >= 0 && row < currentArray.length && col < currentArray[row].length) {
            sum += currentArray[row][col];
          }
        }

        if (cell === 1) {
          if (sum < 2) return 0;
          if (sum === 2 || sum === 3) return 1;
          if (sum > 3) return 0;
        } else {
          if (sum === 3) {
            return 1;
          }
          return 0;
        }
      })
    );
  }

  const startPauseResume = () => {
    if (gameState === ACTIVE) {
      setGameState(PAUSED);
    } else {
      setGameState(ACTIVE);
    }
  }

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
      </div>
    </div>
  );
}

export default App;
