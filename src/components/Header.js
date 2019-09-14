import React, { Component } from 'react'
import SD from 'simplerdux'

export class Header extends Component {

  componentDidMount() {
    const {theme} = SD.getState()
    SD.setState({theme: theme || 'light'}, true)
  }

  toggleTheme = () => {
    const {theme} = SD.getState()
    SD.setState({theme: theme === 'light' ? 'dark' : 'light'}, true)
  }

  render() {
    const {theme} = SD.getState()

    return (
      <header className={theme}>
        <h3>Where in the world?</h3>
        <h5 onClick={this.toggleTheme}>
          <i className="far fa-moon"></i>
          <i className="fas fa-moon"></i>
          &nbsp;
          Dark Mode
        </h5>
      </header>
    )
  }
}

export default Header
