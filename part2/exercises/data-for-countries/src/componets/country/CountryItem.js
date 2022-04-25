import React from "react"

const CountryItem = ({ index, country, clickShowCountry }) => {
  return (
    <div>
      {country.name.common} <button onClick={() => clickShowCountry(index)}>show</button>
    </div>
  )
}

export default CountryItem