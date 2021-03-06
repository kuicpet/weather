import React from 'react';

import { DegreesToDirection, Month, Weekday, Day, Year } from '../helpers/utils';
import { Clock } from './Clock';
import clockIcon from '../images/clock(1).svg';
import dropIcon from '../images/droplet.svg';
import windIcon from '../images/wind(1).svg';

export const WeatherData = ({ data }) => {

    const { name, country, temp, description, temp_min, temp_max, icon, feels_like, speed, deg, humidity } = data;

    return (
        <>
            <header>
                <div className="time">
                    <img 
                    src={clockIcon}
                    alt='time icon'
                    />
                    <Clock />
                </div>
                <h5>{Weekday}, {Month} {Day},{Year}</h5>
            </header>
            <main>
                <div className="waether-main">
                    <img 
                    src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                    alt="weather-icon"
                    className="weather-icon"
                    />
                    <div>
                        <h2>{name}, {country}</h2>
                        <h3 className="description">{description}</h3>
                    </div>
                </div>
                <div className="temp-main">
                    <h5>Feels like {feels_like} °C</h5>
                    <h1 className="temperature">{temp}°C</h1>
                    <div className="hi-lo">
                        <h5>H {temp_max}°</h5>
                        <h5>L {temp_min}°</h5>
                    </div>
                </div>
            </main>
            <footer>
                <div className="weather-prop">
                    <span>Wind Speed</span>
                    <img 
                    src={windIcon}
                    alt=""
                    />
                    <h4>{DegreesToDirection(deg)} {speed} KPH</h4>
                </div>
                <div className="weather-prop">
                    <span>Humidity</span>
                    <img 
                    src={dropIcon}
                    alt=""
                    />
                    <h4>{humidity} %</h4>
                </div>
            </footer>
        </>
    );
};