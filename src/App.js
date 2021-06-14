import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import VoivodeshipsCities from "./components/voivodeships"



class App extends React.Component {
  
  render() {
    return <Router>
      <Switch>
        <Route exact path = "/" component = {VoivodeshipsCities}/>
        <Redirect to = "/"/>
      </Switch>
    </Router>
  }
}

export default App;
