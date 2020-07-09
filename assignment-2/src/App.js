import React, { Component } from 'react';
import './App.css';
import ValidationComponent from './ValidationComponent/ValidationComponent';
import CharComponent from './CharComponent/CharComponent';

class App extends Component  {

  state = {
    textLength: 0,
    characters: []
  }

  textchangedHandler = (event) => {
    const chars = [];
    event.target.value.split('').map((char) => {
      chars.push(char);
    });

    this.setState({
      textLength: event.target.value.length, 
      characters: chars
    })
  }

  removeCharacter = (id) => {
    const chars = [...this.state.characters];
    chars.splice(id, 1);
    this.setState({textLength: chars.length, characters: chars});
  }

  render () {
    let characters = null;
    if (this.state.characters.length > 0) {
      characters = (
        this.state.characters.map((char, index) => {
          return <div><CharComponent key={index} removeItem={() => this.removeCharacter(index) } char={char} /></div>
        })
      );
    }

    return (
      <div className="App">
          <p>
            <input type="text" onChange={(event) => this.textchangedHandler(event)} value={this.state.characters.join('')} />
          </p>
          <p>The length of the text: {this.state.textLength}</p>
          <p>
            <ValidationComponent textLength={this.state.textLength} />
          </p>
          {characters}
      </div>
    );
  }
}

export default App;
