import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      status: 'init',
      isLoaded: false,
      weatherData: null
    }
  }

  render() {
    return (
      <div className='App'>
        <div className="container">
          <h1>Welcome to Weather near You.</h1>
        </div>
      </div>
    )
  }
}

export default App;
