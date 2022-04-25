import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Country from './componets/country/Country';
import SearchResult from './componets/SearchResult';

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

      {showIndex > -1 ? <Country country={searchResults[showIndex]} /> : <SearchResult countries={searchResults} clickShowCountry={clickShowCountry} />}

    </div>
  );
}

export default App;
