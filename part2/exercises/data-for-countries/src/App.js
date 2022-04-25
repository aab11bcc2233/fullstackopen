import axios from 'axios';
import React, { useEffect, useState } from 'react';


const SearchResult = ({ countries }) => {
  if (countries.length === 0) {
    return (<></>)
  }

  if (countries.length >= 10) {
    return (<div>Too many matches, specify another filter</div>)
  }

  if (countries.length === 1) {
    const country = countries[0]
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

  return (
    <div>
      {countries.map((country) => <div key={country.cca2}>{country.name.common}</div>)}
    </div>
  )
}

function App() {

  const [searchText, setSearchText] = useState('')
  const [countries, setCountries] = useState([])
  const [searchResults, setSearchResults] = useState([])

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

    if (text === '') {
      setSearchResults([])
    } else {
      const lowerCase = text.toLocaleLowerCase()
      const results = [...countries].filter((country) => country.name.common.toLocaleLowerCase().includes(lowerCase))
      setSearchResults(results)
    }
  }


  return (
    <div>
      <div>
        find countries <input value={searchText} onChange={onInputSearchText} />
      </div>

      <SearchResult countries={searchResults} />
    </div>
  );
}

export default App;
