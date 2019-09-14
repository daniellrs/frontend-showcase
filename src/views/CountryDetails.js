import React, { Component } from 'react'
import HWApiFetch from 'hw-api-fetch'
import { Row, Col } from 'react-grid-system'
import Loader from 'react-loader-spinner'
import SD from 'simplerdux'
import history from '../utils/history'
import { formatNumber } from '../utils/utils'

export class Countrycountry extends Component {
  state = {
    country: undefined,
    borderCountries: undefined,
    notFound: false
  }

  componentDidMount() {
    this.getcountry()
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.country !== prevState.country) this.getBorderCountries()
    if(this.props.match.params && this.props.match.params.countryName !== prevProps.match.params.countryName) this.getcountry()
  }
  
  componentWillUnmount() {
    clearTimeout(this.timeoutcountry)
    clearTimeout(this.timeoutBorderCountries)
  }

  /**
   * Get the specific details of a country
   * The details can be passed through react-router history
   * or can be fetched in the country API
   * 
   * In case of error, try again in two seconds
   */
  getcountry = async () => {
    try {
      const {countryName} = this.props.match.params
      let {country} = this.props.location.state || {}
      this.setState({notFound: false})

      if(country) {
        this.setState({country})
        return
      }
      
      const response = await HWApiFetch.get(`name/${countryName}?fullText=true`)
      if(response.status && response.status !== 200) {
        this.setState({notFound: true})
        return
      }
      this.setState({country: response[0]})
    } catch (error) {
      this.timeoutcountry = setTimeout(this.getcountry, 2000)
    }
  }

  /**
   * Get the border countries of a country

   * In case of error, try again in two seconds
   */
  getBorderCountries = async () => {
    try {
      const {borders} = this.state.country
      
      const codes = borders.join(';')
      const response = await HWApiFetch.get(`alpha?codes=${codes}`)
      if(response.status && response.status !== 200) return
      this.setState({borderCountries: response})
    } catch (error) {
      this.timeoutBorderCountries = setTimeout(this.getBorderCountries, 2000)
    }
  }

  openCountry = (country) => {
    history.push(`/${country.name.toLowerCase()}`, {details: country})
  }

  goBack = () => history.push('/')

  render() {
    const {country, borderCountries, notFound} = this.state
    const {theme} = SD.getState()
    
    return (
      <div className='country-details-container'>
          <Row style={{margin: 0}}>
            <Col className='back-button-col' lg={12} md={12} sm={12} xs={12}>
              <button onClick={this.goBack} className={`back-button ${theme}`}>
                <i className="fas fa-long-arrow-alt-left"></i>
                &nbsp;
                Back
              </button>
            </Col>
            {country &&
              <>
                <Col lg={6} md={6} sm={12} xs={12}>
                  <img className='country-flag' width='100%' src={country.flag} alt={country.name} />
                </Col>
                
                <Col lg={6} md={6} sm={12} xs={12}>
                  <Row style={{margin: 0}} className={`country-details ${theme}`}>
                    <Col lg={12} md={12} sm={12} xs={12}>
                      <h2>{country.name}</h2>
                    </Col>
                    <Col lg={6} md={6} sm={12} xs={12}>
                      <p>Native name: <span>{country.nativeName || 'None'}</span></p>
                      <p>Population: <span>{formatNumber(country.population) || 'None'}</span></p>
                      <p>Region: <span>{country.region || 'None'}</span></p>
                      <p>Sub Region: <span>{country.subregion || 'None'}</span></p>
                      <p>Capital: <span>{country.capital || 'None'}</span></p>
                    </Col>
                    <Col lg={6} md={6} sm={12} xs={12}>
                      <p>Top Level Domain: <span>{country.topLevelDomain[0] || 'None'}</span></p>
                      <p>Currencies: <span>{country.currencies.map(c => c.name).join(', ') || 'None'}</span></p>
                      <p>Languages: <span>{country.languages.map(c => c.name).join(', ') || 'None'}</span></p>
                    </Col>
                    <Col lg={12} md={12} sm={12} xs={12}>
                      <p className='border-countries'>Border Countries: &nbsp;
                        <span>
                          {borderCountries && borderCountries.map(c =>
                            <button key={c.name} onClick={() => this.openCountry(c)}>{c.name}</button>
                          )}
                          {(!borderCountries || borderCountries.length === 0) &&
                            'None'
                          }
                        </span>
                      </p>
                    </Col>
                  </Row>
                </Col>
              </>
            }
            
            {notFound &&
              <h4 className={`no-results-message ${theme}`}>Country not found</h4>
            }

            {!country && !notFound &&
              <div className={`loader ${theme}`}>
                <Loader type='TailSpin' />
              </div>
            }
          </Row>
      </div>
    )
  }
}

export default Countrycountry