import React from 'react'
import Country from './Country'
import Weather from './Weather'

function Data({ countries, handleCountryButton }) {
    if (countries.length > 10) {
        return (
            <div>Too many matches, need to be more specific</div>
        )
    } else if (countries.length <= 10 && countries.length > 1) {
        console.log("Rendering list of countries")
        return (
            countries.map((country, index) =>
                <div key={index}>{country.name.common}
                    <button key={index} onClick={() => handleCountryButton(country.name.common)}>Show</button>
                </div>
            )
        )
    } else if (countries.length === 1) {
        console.log("Rendering single country")
        console.log(countries)
        let country = countries[0]
        return (
            <div>
                <Country country={country} />
                <Weather country={country} />
            </div>
        )
    } else {
        return <div>No country found</div>
    }
}

export default Data;