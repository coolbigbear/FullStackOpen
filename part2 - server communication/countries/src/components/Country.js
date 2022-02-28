import React from "react";

function Country({ country }) {
    console.log(country)
    return (
        <div>
            <h3>{country.name.common}</h3>
            <p>UN member: { String(country.unMember) }</p>
            <p>Landlocked: { String(country.landlocked) }</p>
            <p>Population: { country.population }</p>
            <h4>Languages:</h4>
            {Object.values(country.languages).map(language =>
                <p key={ language }>{language}</p>
            )}
            <img src={country.flags.png} alt={"Flag of " + country.name.common } />
        </div>
    )
}

export default Country