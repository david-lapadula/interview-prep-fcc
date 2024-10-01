import React, { useState, useEffect } from 'react';
import styles from './ChooseLetter.module.css';
import * as constants from '../../constants';

import { FaArrowLeft, FaTimes, FaRegCircle } from 'react-icons/fa';

const ChooseLetter = ({ gameType, onBackToChooseType }) => {
    const [currentPlayer, setCurrentPlayer] = useState();
    const isMultiPayer = gameType === constants.GAME_TYPE.MULTI_PLAYER;


    useEffect(() => {
        if (isMultiPayer) {
            setCurrentPlayer(constants.ROLE.PLAYER_ONE);
        }
    }, []);

    return (
        <div className={styles.chooseLetterContainer}>
            <h1 style={{ margin: '10px', textAlign: 'center'}}>
                {isMultiPayer && (currentPlayer + ": ")} 
                 Would you like to be X or O ?
            </h1>
            
            <div className={styles.gameIconContainer}>
                <button className={styles.gameIconButton}>
                    <FaTimes className={styles.gameIcon}/>
                </button>
                <button className={styles.gameIconButton}>
                    <FaRegCircle className={styles.gameIcon}/>
                </button>
            </div>

            <button className={styles.backButton} onClick={onBackToChooseType}>
                <FaArrowLeft className={styles.icon} />
                Back
            </button>
        </div>
    );
};

export default ChooseLetter;