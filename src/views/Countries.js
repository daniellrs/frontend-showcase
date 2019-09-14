import React, { Component } from 'react'
import HWApiFetch from 'hw-api-fetch'
import { Row, Col } from 'react-grid-system'
import Loader from 'react-loader-spinner'
import SD from 'simplerdux'
import CountryCard from '../components/CountryCard'
import SearchInput from '../components/SearchInput'
import RegionSelect from '../components/RegionSelect'

export class Countries extends Component {
  state = {
    countriesClone: [],
    countries: undefined,
    search: '',
  }

  componentDidMount() {
    this.getAllCountries()
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.search !== prevState.search) this.handleSearch()
  }
  
  componentWillUnmount() {
    clearTimeout(this.timeoutCountries)
  }

  /**
   * Get all countries from the country API and save in the state
   * Save a clone of the countries to use for reference in the search input
   * 
   * In case of error, try again in two seconds
   */
  getAllCountries = async () => {
    try {
      const response = await HWApiFetch.get('all')
      if(response.status && response.status !== 200) return
      this.setState({countries: response, countriesClone: response})
    } catch (error) {
      this.timeoutCountries = setTimeout(this.getAllCountries, 2000)
    }
  }

  /**
   * Get all countries from a specific region
   * In case of error, try again in two seconds
   * 
   * If no region is specified, get all countries
   * @param {string} region
   */
  getCountriesByRegion = async region => {
    this.setState({search: ''})
    if(!region) {
      this.getAllCountries()
      return
    }

    try {
      const response = await HWApiFetch.get(`region/${region}`)
      if(response.status && response.status !== 200) return
      this.setState({countries: response, countriesClone: response})
    } catch (error) {
      this.timeoutCountries = setTimeout(this.getCountriesByRegion, 2000)
    }
  }

  setSearch = e => this.setState({search: e.target.value})

  /**
   * Search countries in the clone of countries list
   * and set in the state the result
   */
  handleSearch = () => {
    let {search, countriesClone} = this.state
    search = search.trim().toLowerCase()

    if(!search) {
      this.setState({countries: countriesClone})
      return
    }
    
    const countries = countriesClone.filter(country => country.name.toLowerCase().indexOf(search) >= 0)
    this.setState({countries})
  }

  render() {
    const {countries, search} = this.state
    const {theme} = SD.getState()

    return (
      <div>
        <div className='cards-search-container'>
          <SearchInput
            inputProps={{
              value: search,
              onChange: this.setSearch
            }}
          />
          <RegionSelect getCountriesByRegion={this.getCountriesByRegion} />
        </div>
        <Row className='cards-container' style={{margin: 0}}>
          
          {countries &&
            <>
              {countries.map(country =>
                <Col key={country.name} lg={3} md={4} sm={6} xs={12}>
                  <CountryCard country={country} />
                </Col>
              )}

              {countries.length === 0 &&
                <h4 className={`no-results-message ${theme}`}>No results found</h4>
              }
            </>
          }
          {!countries &&
            <div className={`loader ${theme}`}>
              <Loader type='TailSpin' />
            </div>
          }
        </Row>
      </div>
    )
  }
}

export default Countries
