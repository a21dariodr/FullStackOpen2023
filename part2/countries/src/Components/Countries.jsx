/* eslint-disable react/prop-types */

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
        showCountryHandler(countries[0])
    }
        
}

export default Countries
