import React from "react"
import Weather from "../Weather"

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

  export default Country