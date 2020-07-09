import React from 'react';
import UserOutput from './UserOutput';
import './UserStyles.css';

const userInput = (props) => {
    return (
    <div>
        <input className="InputBox" type="text" onChange={props.changed} value={props.username} />
        <button className="Button" onClick={props.click} >Reset</button>
    </div>
    )
}

export default userInput;
