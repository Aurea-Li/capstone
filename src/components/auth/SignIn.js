import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signIn } from '../../store/actions/authActions'
import { Redirect } from 'react-router-dom'
import './SignIn.css'

class SignIn extends Component {

  state = {
    email: '',
    password: ''
  }

  onChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.signIn(this.state);
  }

  render () {
    const { auth, authError } = this.props;
    if (auth.uid) return <Redirect to='/' />

    return (
      <div className="sign-in">
      <form onSubmit={this.onSubmit} className="form-signin" >
        <h2 className="h3 mb-3 font-weight-normal">Sign In</h2>

        <section className="error-messages">
          { authError ? <p>Error: {authError}</p> : null}
        </section>

        <div className="form-group">
          <label htmlFor="email" className="sr-only">Email</label>
          <input type="email" id="email" className="form-control" placeholder="Email Address" autoComplete="off"
            onChange={this.onChange}/>
        </div>

        <div className="form-group">
          <label htmlFor="password" className="sr-only">Password</label>
          <input type="password" id="password" className="form-control" placeholder="Password"
          autoComplete="off" onChange={this.onChange}/>
        </div>


        <button className="btn btn-lg btn-primary btn-block">Login</button>

      </form>
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
