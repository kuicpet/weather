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

  abortController = new AbortController();
  controllerSignal = this.abortController.signal;

  // weather initialization
  
  // get weather Data
  getWeatherdata = () => {
    const weatherApi = `http://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=${process.env.REACT_APP_WEATHER_KEY}`;
    
    fetch(weatherApi, { signal: this.controllerSignal })
    .then(res => res.json())
    .then((result) => {
      console.log(result);
      const { name } = result;
      const { country } = result.sys;
      const { temp, temp_min, temp_max, feels_lkie, humidity } = result.main;
      const { description, icon } = result.weather[0];
      const { speed, deg } = result.wind;

      this.setState({
        isLoaded: true,
        weatherData: {
          name,
          country,
          description,
          icon,
          temp: temp.toFixed(1),
          feels_lkie: feels_lkie.toFixed(1),
          temp_min: temp_min.toFixed(1),
          temp_max: temp_max.toFixed(1),
          speed,
          deg,
          humidity
        }
      });
    },
    (error) => {
      this.setState({
        isLoaded: true,
        error
      });
    });
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
