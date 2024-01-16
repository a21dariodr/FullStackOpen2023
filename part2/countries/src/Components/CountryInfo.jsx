import WeatherInfo from "./WeatherInfo"

/* eslint-disable react/prop-types */
const CountryInfo = ({ country }) => {
    if (!country) return null

    return (
        <>
            <h2>{country.name.common}</h2>
            <span>Capital {country.capital}</span> <br/>
            <span>Area {country.area}</span>

            <p><strong>Languages</strong></p>
            <ul>
                {Object.values(country.languages).map( language => <li key={language}>{language}</li>)}
            </ul>

            <img src={country.flags.png} width={200} alt="flag" />

            <WeatherInfo country={country} />
        </>
    )
}

export default CountryInfo
