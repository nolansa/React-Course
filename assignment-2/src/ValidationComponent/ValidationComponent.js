import React from 'react';

const ValidationComponent = (props) => {
    return props.textLength <= 4 ? 'Text too short' : 'Text long enough';
}

export default ValidationComponent;