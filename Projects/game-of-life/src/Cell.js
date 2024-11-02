import React from 'react';

const Cell = ({ isLive }) => {
    const cellStyle = {
         height: '20px', 
         width: '20px',
         border: '0.5px solid #2d2d2d', 
         boxSizing: 'border-box', 
         display: 'inline-block',
         margin: 0,
         padding: 0,
         backgroundColor: isLive ? '#66ff33' : 'black'
    };

    return (
        <div style={cellStyle}></div>
    );
};

export default Cell;