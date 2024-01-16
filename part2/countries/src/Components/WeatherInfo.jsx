/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { useEffect, useState } from "react"
import getCityWeather from "../Services/weatherService"

const WeatherInfo = ({ country }) => {
    const [cityWeather, setCityWeather] = useState(null)

    useEffect(() => {
        getCityWeather(country.capital)
            .then( res => {
                console.log('Weather: ', res.data)
                setCityWeather(res.data)
            })
    }, [])

    if (!cityWeather) return null

    return (
        <>
            <h3>Weather in {country.capital}</h3>

            <p>Temperature {cityWeather.main.temp} ºCelsius</p>

            <img src={`https://openweathermap.org/img/wn/${cityWeather.weather[0].icon}@2x.png`} alt="Weather icon"/>

            <p>Wind {cityWeather.wind.speed} m/s</p>
        </>
    )
}

export default WeatherInfo