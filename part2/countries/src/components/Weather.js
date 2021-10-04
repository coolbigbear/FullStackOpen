import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

function Weather({country}) {

    const [weather, setWeather] = useState("")
    const api_key = process.env.REACT_APP_API_WEATHER_KEY

    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/onecall?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${api_key}&units=metric`)
            .then(response => {
                console.log('promise fulfilled')
                setWeather(response.data)
            })
            .catch(function (error) {
                console.log("Error from axios", error)
                setWeather("")
            })
    }, [api_key, country.latlng])

    if (weather !== "") {
        return (
            <div>
                <h3>Weather</h3>
                <p>Currently: {weather.current.weather[0].description}</p>
                <p>Temp: {weather.current.temp}</p>
                <p>Pressure: {weather.current.pressure}</p>
                <p>Humidity: {weather.current.humidity}</p>
            </div>
        )
    } else {
        return (
            <div>
                <h3>Weather</h3>
                No weather data
            </div>
        )
    }
}

export default Weather