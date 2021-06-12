import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import Voivodeships from "./components/voivodeships"



class App extends React.Component {
  
  render() {
    return <Router>
      <Switch>
        <Route exact path = "/" component = {Voivodeships}/>
        <Redirect to = "/"/>
      </Switch>
    </Router>
  }
}

export default App;
