import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { signUp } from '../../store/actions/authActions'

class SignUp extends Component {

  state = {
    firstName: '',
    lastName: '',
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
    this.props.signUp(this.state);
  }

  render() {
    const { auth, authError } = this.props;
    if (auth.uid) return <Redirect to='/' />

    return (

        <form onSubmit={this.onSubmit} className="form-signin" >
          <h2 className="h3 mb-3 font-weight-normal">Sign Up</h2>

        <section className="error-messages">
          { authError ? <p>Error: {authError}</p> : null}
        </section>

          <div className="form-group">
            <label htmlFor="firstName" className="sr-only">First Name</label>
            <input type="text" id="firstName" className="form-control" placeholder="First Name"
            autoComplete="off" onChange={this.onChange}/>
          </div>

          <div className="form-group">
            <label htmlFor="lastName" className="sr-only">Last Name</label>
            <input type="text" id="lastName" className="form-control" placeholder="Last Name"
            autoComplete="off" onChange={this.onChange}/>
          </div>

          <div className="form-group">
            <label htmlFor="email" className="sr-only">Email</label>
            <input type="email" id="email" className="form-control" placeholder="Email Address"
            autoComplete="off" onChange={this.onChange}/>
          </div>

          <div className="form-group">
            <label htmlFor="password" className="sr-only">Password</label>
            <input type="password" id="password" className="form-control" placeholder="Password"
            autoComplete="off" onChange={this.onChange}/>
          </div>
          <button className="btn btn-primary btn-block">Sign Up</button>
        </form>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (newUser) => dispatch(signUp(newUser))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
