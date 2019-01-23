import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { createGroup } from '../../store/actions/groupActions'
import Navbar from '../layout/Navbar'
import './CreateGroup.css'
class CreateGroup extends Component {

  state = {
    name: ''
  }

  onChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.createGroup(this.state);
    this.props.history.push('/');
  }

  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to='/frontpage' />

    return (
      <div className="creategroup">
        <Navbar />
        <form onSubmit={this.onSubmit} className="form-signin">
          <h2 className="h3 mb-3 font-weight-normal">Create Group</h2>

          <div className="form-group">
            <label htmlFor="name" className="sr-only">Group Name</label>
            <input type="text" id="name" className="form-control" onChange={this.onChange} placeholder="Group Name"/>
          </div>

          <button className="btn btn-lg  btn-primary btn-block">Create Group</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createGroup: (group) => dispatch(createGroup(group))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateGroup)
