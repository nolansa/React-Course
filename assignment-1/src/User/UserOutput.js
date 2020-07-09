import React from 'react';

const userOutput = props => {

    const style = {
        width: '60%',
        margin: '16px auto',
        border: '1px solid #eee',
        'box-shadow': '0 2px 3px rgb(245, 226, 226)',
        padding: '16px',
        'text-align': 'center'
    };

    return (
        <div style={style}>
            <p>username: {props.username}</p>
            <p>username: {props.username}</p>
        </div>
    )
};

export default userOutput;