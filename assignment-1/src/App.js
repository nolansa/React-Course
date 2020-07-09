import React, { Component }  from 'react';
import logo from './logo.svg';
import './App.css';
import UserOutput from './User/UserOutput';
import UserInput from './User/UserInput';

class App extends Component  {
  state = {
    username: 'notausername'
  }

  usernameChangedHandler = (event) => {
    this.setState({
      username: event.target.value
    })
  }

  buttonClickHandler = () => {
    this.setState({
      username: 'notausername'
    })
  }

  render() {
    return (
      <div className="App">
        <UserInput click={this.buttonClickHandler} changed={this.usernameChangedHandler} username={this.state.username} />
        <UserOutput input={UserInput} username={this.state.username} />
        <UserOutput input={UserInput} username={this.state.username} />
        <UserOutput input={UserInput} username={this.state.username} />
      </div>
    )
  }
}

export default App;
