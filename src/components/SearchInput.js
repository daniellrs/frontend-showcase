import React, { Component } from 'react'
import SD from 'simplerdux'

export class SearchInput extends Component {
  render() {
    const {inputProps} = this.props
    const {theme} = SD.getState()
    return (
      <div className={`search-input-container ${theme}`}>
        <i className="fas fa-search"></i>
        <input {...inputProps} placeholder='Search for a country...' />
      </div>
    )
  }
}

export default SearchInput
