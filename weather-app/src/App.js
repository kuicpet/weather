import React, { Component } from 'react';
import './App.css';

import { WeatherData } from './components/WeatherData.';
import { StatusData } from './components/StatusData';

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

  // get users position
  weatherInit = () => {

    const success = (position) => {
      this.setState({status: 'fetching'});
      localStorage.setItem('location-allowed', true);
      this.getWeatherData(position.coords.latitude, position.coords.longitude);
    }

    const error = () => {
      this.setState({status: 'unable'});
      localStorage.removeItem('location-allowed');
      alert('Unable to retrive location. ');
    }

    if(navigator.geolocation) {
      this.setState({status: 'fetching'});
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      this.setState({status: 'unsupported'});
      alert('Your browser does not support location tracking, or permission is denied. ')
    }
  }

  // get weather Data
  getWeatherData = (latitude, longitude) => {
    const weatherApi = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${process.env.REACT_APP_WEATHER_KEY}`;
    
    fetch(weatherApi, { signal: this.controllerSignal })
    .then(response => response.json())
    .then((result) => {
      console.log(result);
      const { name } = result;
      const { country } = result.sys;
      const { temp, temp_min, temp_max, feels_like, humidity } = result.main;
      const { description, icon } = result.weather[0];
      const { speed, deg } = result.wind;

      this.setState({
        status: 'success',
        isLoaded: true,
        weatherData: {
          name,
          country,
          description,
          icon,
          temp: temp.toFixed(1),
          feels_like: feels_like.toFixed(1),
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

  onClick = () => {
    this.weatherInit();
  }


  returnActiveView = (status) => {
    switch(status) {
      case 'init':
        return(
          <>
          <h1>Weather</h1>
          <button 
          className="btn-main"
          onClick={this.onClick}
          >
            Get My location
          </button>
          </>
        );
      case 'success':
        return <WeatherData data={this.state.weatherData} />;
      default:
        return <StatusData status={status} />;
    }
  }

  componentDidMount() {
    if(localStorage.getItem('location-allowed')) {
      this.weatherInit();
    } else {
      return;
    }
  }

  componentWillUnmount() {
    this.abortController.abort();
  }

 
  render() {
    return (
      <div className='App'>
        <div className="container">
          {this.returnActiveView(this.state.status)}
        </div>
      </div>
    );
  }
}

export default App;
