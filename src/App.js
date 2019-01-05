import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import FrontPage from './components/auth/FrontPage'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import Dashboard from './components/dashboard/Dashboard'
import Profile from './components/profile/Profile'
import CreateGroup from './components/groups/CreateGroup'
import Navbar from './components/layout/Navbar'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div className="App">
        <h1>The Lending Library</h1>
        <FrontPage />
        <Navbar />
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route path= '/profile' component={Profile} />
          <Route path='/signin' component={SignIn} />
          <Route path='/signup' component={SignUp} />
          <Route path='/creategroup' component={CreateGroup} />
        </Switch>
      </div>
    </BrowserRouter>
    );
  }
}

export default App;
