/* eslint-disable react/prop-types */
const Countries = ({ countries }) => {
    console.log(countries)

    if (countries.length > 10) return (<p>Too many matches, refine your search</p>)
    else if (countries.length <= 10 && countries.length > 1) {
        return (<>{countries.map( country => <p key={country.name.common}>{country.name.common}</p> )}</>)
    } else if (countries.length === 1) {
        return (
            <>
                <h2>{countries[0].name.common}</h2>
                <span>capital {countries[0].capital}</span> <br/>
                <span>area {countries[0].area}</span>

                <p><strong>Languages</strong></p>
                <ul>
                    {Object.values(countries[0].languages).map( language => <li key={language}>{language}</li>)}
                </ul>

                <img src={countries[0].flags.png} width={200} alt="flag" />
                
            </>
        )
    }
        
}

export default Countries