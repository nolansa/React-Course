import React from 'react';
import classes from './Spinner.css';

const spinner = () => (
    <div style={{ width: '100%', height: '100%', position: 'absolute', top: '0', left: '0', backgroundColor: 'rgb(255,255,255,0.8)' }}>
        <div className={classes.Loader}>Loading...</div>
    </div>
);

export default spinner;