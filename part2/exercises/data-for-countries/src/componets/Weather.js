import React, { useState, useEffect } from "react"
import axios from "axios"

const Weather = ({ country }) => {

    const [weatherData, setWeatherData] = useState()
    const city = country.capital[0]

    useEffect(
        () => {
            console.log('request weather')
            const apiKey = process.env.REACT_APP_API_KEY_OPEN_WEATHER
            // const [lat, lng] = country.capitalInfo.latlng
            // const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}`
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
            axios.get(url)
                .then((response) => {
                    const data = response.data
                    setWeatherData(data)
                })
        },
        [city]
    )

    if (weatherData === undefined) {
        return (<></>)
    }

    return (
        <div>
            <div>
                <strong>temperature: </strong> {weatherData.main.temp - 273.15} °C {weatherData.weather[0].description}
            </div>
            <div>
                <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt='weather icon' />
            </div>
            <div>
                <strong>wind: </strong> {weatherData.wind.speed} m/s
            </div>
        </div>
    )
}

export default Weather