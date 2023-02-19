
import React, {Component} from 'react';

//import './App.css';

import {Switch, BrowserRouter as Router } from "react-router-dom";
import {Chat, NotFound, Register, Login} from './views'
import AppRoot from './AppRoot'
import Auth from 'Auth'

class App extends Component {
  constructor(props){
    super(props);
    Auth.init()
  }
  render(){
    return (
      <div id="main-container" className='container-fluid'>
        <Router>
          <Switch>
            <AppRoot path='/' exact component={Chat} can={Auth.auth} redirect="/login"/>
            <AppRoot path='/register' component={Register} can={Auth.guest} redirect="/"/>
            <AppRoot path='/login' component={Login} can={Auth.gest} redirect="/"/>
            <AppRoot component={NotFound}/>
          </Switch>
        </Router>
      </div>
       );
  }
}

export default App;
