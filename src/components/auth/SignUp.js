import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signUp } from '../../store/actions/authActions'
import { Redirect } from 'react-router-dom'

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

        <form onSubmit={this.onSubmit} >
          <h5>Sign Up</h5>

        <section className="error-messages">
          { authError ? <p>Error: {authError}</p> : null}
        </section>

          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" className="form-control" onChange={this.onChange}/>
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" className="form-control" onChange={this.onChange}/>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" className="form-control" onChange={this.onChange}/>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" className="form-control" onChange={this.onChange}/>
          </div>
          <button className="btn btn-primary">Sign Up</button>
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
