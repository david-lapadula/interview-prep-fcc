import React from 'react';
import styles from './ChooseType.module.css';

const ChooseType = ({ onSinglePlayerSelect, onMultiPlayerSelect}) => {
    return (
        <div className={styles.gameTypeContainer}>
            <h1> How do you want to play?</h1>
            <button 
                className={styles.gameTypeButton}
                onClick={onSinglePlayerSelect}
            >
                One Player
            </button>
            <button 
                className={styles.gameTypeButton}
                onClick={onMultiPlayerSelect}
            >
                Two Player
            </button>
        </div>
    );
};

export default ChooseType;