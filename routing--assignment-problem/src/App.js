import React, { Component } from 'react';
import { Route, Switch, NavLink, Redirect } from 'react-router-dom';
import Nav from './containers/Nav/Nav';
import Courses from './containers/Courses/Courses';
import Users from './containers/Users/Users';
import Page404 from './Page404'

class App extends Component {
  render () {
    return (
        <div className="App">
          <Nav />
          <Switch>
            <Route path="/" exact render={null} />
            <Redirect from="/all-courses" to="/courses" />
            <Route path="/users" exact component={Users} />
            <Route path="/courses" component={Courses} />
            <Route path="/" component={Page404} />
        </Switch>
        </div>
    );
  }
}

export default App;
