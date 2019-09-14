import React, { Component } from 'react'
import history from '../utils/history'
import { formatNumber } from '../utils/utils'
import SD from 'simplerdux'

export class CountryCard extends Component {

  openCountry = () => {
    const {country} = this.props
    history.push(`/${country.name.toLowerCase()}`, {details: country})
  }

  render() {
    const {country} = this.props
    const {theme} = SD.getState()

    return (
      <div 
        onClick={this.openCountry}
        className={`country-card ${theme}`}
      >
        <div className='img' style={{backgroundImage: `url(${country.flag})`}} />
        <div className='details'>
          <p className='title'>{country.name}</p>
          <p className='item'>Population: <span className='item'>{formatNumber(country.population) || 'None'}</span></p>
          <p className='item'>Region: <span className='item'>{country.region || 'None'}</span></p>
          <p className='item'>Capital: <span className='item'>{country.capital || 'None'}</span></p>
        </div>
      </div>
    )
  }
}

export default CountryCard
