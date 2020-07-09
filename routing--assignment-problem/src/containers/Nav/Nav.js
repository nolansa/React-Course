import React from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.css';

const nav = (props) => {
    return (
        <div className="Nav">
            <ul>
                <li><NavLink to="/users" activeClassName="active">Users</NavLink></li>
                <li><NavLink to="/courses" activeClassName="active">Courses</NavLink></li>
            </ul>
        </div>
    )
}

export default nav;