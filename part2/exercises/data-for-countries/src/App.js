import axios from 'axios';
import React, { useEffect, useState } from 'react';

const CountryItem = ({ index, country, clickShowCountry }) => {
  return (
    <div>
      {country.name.common} <button onClick={() => clickShowCountry(index)}>show</button>
    </div>
  )
}

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

      <h2>Weather in {country.capital[0]}</h2>
      <Weather country={country} />
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

      {showIndex > -1 ? <Country country={searchResults[showIndex]} /> : <SearchResult countries={searchResults} clickShowCountry={clickShowCountry} />}

    </div>
  );
}

export default App;
