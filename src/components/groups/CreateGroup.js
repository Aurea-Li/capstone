import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { createGroup } from '../../store/actions/groupActions'
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
    const { auth, groupError } = this.props;
    if (!auth.uid) return <Redirect to='/frontpage' />

    return (
      <form onSubmit={this.onSubmit} >
        <h5>Create Group</h5>

      <section className="error-messages">
        { groupError ? <p>Error: {groupError}</p> : null}
      </section>

        <div className="form-group">
          <label htmlFor="name">Group Name</label>
          <input type="text" id="name" className="form-control" onChange={this.onChange}/>
        </div>

        <button className="btn btn-primary">Create Group</button>
      </form>
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
