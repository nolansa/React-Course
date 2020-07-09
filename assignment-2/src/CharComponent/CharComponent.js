import React from 'react';
import './CharComponent.css';

const CharComponent = (props) => {
    return <div className="InlineBox" onClick={props.removeItem}>{props.char}</div>
}

export default CharComponent;