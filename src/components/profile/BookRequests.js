import React, { Component } from 'react'
import Item from './Item'

class BookRequests extends Component {

  state = {
    title: ''
  }

  onChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.addRequest(this.state);

    this.setState({
      title: ''
    })
  }

  render () {

    const { requests, removeRequest } = this.props;

    const requestList = requests && requests.map((request, i) => {
      return (<Item key={i} item={request} removeItem={removeRequest} />)
    });

    return (
      <section>
        <h2>Book Requests</h2>


          <form onSubmit={this.onSubmit}>
          <input type="search" className="form-control" id="title"
            onChange={this.onChange} value={this.state.title} placeholder="Add Request Title..."/>
          </form>

        <section className="request-list">
          { requestList }
        </section>
      </section>
    )
  }
}

export default BookRequests
