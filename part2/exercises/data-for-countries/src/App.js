import axios from 'axios';
import React, { useEffect, useState } from 'react';

const CountryItem = ({ index, country, clickShowCountry}) => {
  return (
    <div>
      {country.name.common} <button onClick={() => clickShowCountry(index)}>show</button>
    </div>
  )
}

const Country = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>capital {country.capital.join(', ')}</div>
      <div>population {country.population}</div>

      <h2>languages</h2>
      <div>
        <ul>
          {Object.entries(country.languages).map(entry => <li key={entry[0]}>{entry[1]}</li>)}
        </ul>
      </div>
      <img src={country.flags.png} alt='flag' />
    </div>
  )
}


const SearchResult = ({ countries, clickShowCountry }) => {
  if (countries.length === 0) {
    return (<></>)
  }

  if (countries.length >= 10) {
    return (<div>Too many matches, specify another filter</div>)
  }

  if (countries.length === 1) {
    const country = countries[0]
    return <Country country={country} />
  }

  return (
    <div>
      {
        countries.map((country, index) =>
          <CountryItem
            key={country.cca2}
            index={index}
            country={country}
            clickShowCountry={clickShowCountry}
          />
        )
      }
    </div>
  )
}

function App() {

  const [searchText, setSearchText] = useState('')
  const [countries, setCountries] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [showIndex, setShowIndex] = useState(-1)

  useEffect(
    () => {
      axios.get("https://restcountries.com/v3.1/all")
        .then((response) => {
          const data = response.data
          setCountries(data)
        })
    },
    []
  )

  const onInputSearchText = (event) => {
    const text = event.target.value
    setSearchText(text)
    setShowIndex(-1)
    
    if (text === '') {
      setSearchResults([])
    } else {
      const lowerCase = text.toLocaleLowerCase()
      const results = [...countries].filter((country) => country.name.common.toLocaleLowerCase().includes(lowerCase))
      setSearchResults(results)
    }
  }

  const clickShowCountry = (index) => {
    setShowIndex(index)
  }

  return (
    <div>
      <div>
        find countries <input value={searchText} onChange={onInputSearchText} />
      </div>

      { showIndex > -1 ? <Country country={searchResults[showIndex]} /> : <SearchResult countries={searchResults} clickShowCountry={clickShowCountry} />}
      
    </div>
  );
}

export default App;
