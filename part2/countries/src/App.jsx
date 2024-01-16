/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './Components/Countries'
import CountryInfo from './Components/CountryInfo'

function App() {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState(null)
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect( () => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then( res => setCountries(res.data)) 
      .catch( error => console.log(error.message) )
  }, [])

  const searchHandler = event => {
    setSearch(event.target.value)
    setCountry(null)

    if (event.target.value) {
      const textSearch = event.target.value.toLowerCase()
      const regex = new RegExp(`.*${textSearch}.*`)
      setFilteredCountries( countries.filter( country => country.name.common.toLowerCase().match(regex) ))
    } else {
      setFilteredCountries([])
    }
  }

  const showCountryHandler = newCountry => {
    setCountry(newCountry)
  }

  return (
    <>
      <h1>Countries info</h1>
      find countries &nbsp;
      <input type='text' value={search} onChange={searchHandler} />
      <Countries countries={filteredCountries} showCountryHandler={showCountryHandler} />
      <CountryInfo country={country} />
    </>
  )
}

export default App
