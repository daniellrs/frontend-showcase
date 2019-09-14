import React, { Component } from 'react'
import SD from 'simplerdux'

export class RegionSelect extends Component {
  state = {
    open: false,
    region: undefined,
  }
  regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']

  componentWillUnmount() {
    document.removeEventListener('click', this.closeRegions)
  }

  openRegions = () => {
    document.addEventListener('click', this.closeRegions)
    this.setState({open: true})
  }

  closeRegions = () => {
    document.removeEventListener('click', this.closeRegions)
    this.setState({open: false})
  }

  setRegion = region => {
    this.props.getCountriesByRegion(region)
    this.setState({region})
  }

  render() {
    const {open, region} = this.state
    const {theme} = SD.getState()
    
    return (
      <div onClick={this.openRegions} className={`region-select-container ${theme}`}>
        {region || 'Filter by region'}
        <i className="fas fa-chevron-down"></i>

        {open &&
          <div className={`region-select-itens-container ${theme}`}>
            {region &&
              <span onClick={() => this.setRegion()}>All</span>
            }
            {this.regions.map(region => 
              <span key={region} onClick={() => this.setRegion(region)}>{region}</span>
            )}
          </div>
        }
      </div>
    )
  }
}

export default RegionSelect
