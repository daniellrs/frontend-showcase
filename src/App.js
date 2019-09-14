import React from 'react'
import { Router, Switch, Route } from 'react-router'
import history from './utils/history'
import Countries from './views/Countries'
import CountryDetails from './views/CountryDetails'
import Header from './components/Header'
import SD from 'simplerdux'

function App() {
  const {theme} = SD.getState()

  return (
    <div className={`app-container ${theme}`}>
      <Header />
      <Router history={history}>
        <Switch>
          <Route exact path='/' component={Countries}/>
          <Route path='/:countryName' component={CountryDetails}/>
        </Switch>
      </Router>
    </div>
  )
}

export default App;
