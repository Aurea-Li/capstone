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

  renderErrorOrAlertMessage() {
    const { errorMessage } = this.props;

    let messageType;
    if (!errorMessage){
      return null;
    }
    else if (errorMessage.type === 'error'){
      messageType="error-message";
    }
    else if (errorMessage.type === 'alert'){
      messageType="alert-message";
    }

    return (
      <section className={messageType}>
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
          {this.renderErrorOrAlertMessage()}
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
