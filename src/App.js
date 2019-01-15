import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import Dashboard from './components/dashboard/Dashboard'
import Profile from './components/profile/Profile'
import CreateGroup from './components/groups/CreateGroup'
import JoinGroup from './components/groups/JoinGroup'
import FrontPage from './components/auth/FrontPage'
import './App.css'

class App extends Component {

  renderErrorMessage() {
    const { errorMessage } = this.props;

    if (!errorMessage){
      return null;
    }

    return (

      <section className="error-message container">
        <b>{errorMessage.message}</b>
      </section>
    );
  }

  render() {

    return (
      <BrowserRouter>
      <div className="App">

        <section className="header">
          <h1>The Lending Library</h1>
          {this.renderErrorMessage()}
        </section>

        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route path= '/profile' component={Profile} />
          <Route path='/signin' component={SignIn} />
          <Route path='/signup' component={SignUp} />
          <Route path='/frontpage' component={FrontPage} />
          <Route path='/creategroup' component={CreateGroup} />
          <Route path='/joingroup' component={JoinGroup} />
        </Switch>

      </div>
    </BrowserRouter>
    );
  }
}


const mapStateToProps = (state) => ({
  errorMessage: state.errorMessage
})

export default connect(mapStateToProps)(App)
