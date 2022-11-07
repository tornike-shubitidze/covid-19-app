import React from 'react'

const countriesList = ({ countryList, onCountryChange }) => {
    return (
        <select name="countries" id="countries" onChange={e => onCountryChange(e.target.value)}>
            <option defaultValue='Global'>Global</option>
            {countryList.map((country, i) => { return <option defaultValue={country.name} key={i} >{country.name}</option> })}
        </select>

    );
}

export default countriesList;