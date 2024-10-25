import React, { useState } from 'react';
import './Weather.css';
import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';
import humidity_icon from '../assets/humidity.png';
import axios from 'axios';

const Weather = () => {
    const [data, setData] = useState({
        celcius: 10,
        name: 'London',
        humidity: 10,
        speed: 2,
        image: cloud_icon,
    });
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const handleClick = () => {
        if (name.trim() !== '') {
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=8ac5c4d57ba6a4b3dfcf622700447b1e&units=metric`;
            axios.get(apiUrl)
                .then(res => {
                    let imageName = cloud_icon;
                    const weatherCondition = res.data.weather[0].main;

                    switch (weatherCondition) {
                        case "Clouds":
                            imageName = cloud_icon;
                            break;
                        case "Clear":
                            imageName = clear_icon;
                            break;
                        case "Rain":
                            imageName = rain_icon;
                            break;
                        case "Drizzle":
                            imageName = drizzle_icon;
                            break;
                        case "Snow":
                            imageName = snow_icon;
                            break;
                        default:
                            break;
                    }

                    setData({
                        celcius: res.data.main.temp,
                        name: res.data.name,
                        humidity: res.data.main.humidity,
                        speed: res.data.wind.speed,
                        image: imageName,
                    });

                    setError('');
                })
                .catch(err => {
                    if (err.response && err.response.status === 404) {
                        setError("Invalid City Name!!!");
                    } else {
                        setError('');
                    }
                });
        }
    };

    return (
        <div className="weather-container">
            <div className='weather'>
                <div className="search_bar">
                    <input
                        type="text"
                        placeholder='Search City!!!'
                        onChange={e => setName(e.target.value)}
                    />
                    <img src={search_icon} onClick={handleClick} alt="Search" />
                </div>
                {error && <div className="error"><p>{error}</p></div>}
                <img src={data.image} alt="Weather Icon" className='weather-icon' />
                <p className='temperature'>{Math.round(data.celcius)}°C</p>
                <p className='location'>{data.name}</p>
                <div className="weather-data">
                    <div className="col">
                        <img src={humidity_icon} alt="Humidity" />
                        <div>
                            <p>{Math.round(data.humidity)}%</p>
                            <span>Humidity</span>
                        </div>
                    </div>
                    <div className="col">
                        <img src={wind_icon} alt="Wind Speed" />
                        <div>
                            <p>{Math.round(data.speed)} Km/h</p>
                            <span>Wind Speed</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Weather;
