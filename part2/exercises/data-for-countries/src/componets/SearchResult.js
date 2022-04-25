import React from "react"
import Country from "./country/Country"
import CountryItem from "./country/CountryItem"

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

export default SearchResult