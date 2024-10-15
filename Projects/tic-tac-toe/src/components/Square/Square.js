import React from 'react';

import styles from './Square.module.css';

const Square = ({ value, onClick, gameOver, disableButton }) => {
  return (
    <button
      className={`${styles.square} ${gameOver ? styles.gameOver : styles.active}`}
      onClick={onClick}
      disabled={disableButton}
    >
      {value}
    </button>
  );
};

export default Square;
