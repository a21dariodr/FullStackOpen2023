/* eslint-disable react/prop-types */
import CountryInfo from "./CountryInfo"

const Countries = ({ countries, showCountryHandler }) => {
    console.log(countries)

    if (countries.length > 10) {
        return (<p>Too many matches, refine your search</p>)
    } else if (countries.length <= 10 && countries.length > 1) {
        return (
            <>
                {countries.map( country => 
                    <p key={country.name.common}>
                        {country.name.common} <button onClick={() => showCountryHandler(country)}>Show</button>
                    </p> )
                }
            </>
        )
    } else if (countries.length === 1) {
        return <CountryInfo country={countries[0]} />
    }
        
}

export default Countries
