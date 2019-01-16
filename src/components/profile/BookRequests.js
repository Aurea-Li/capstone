import React, { Component } from 'react'
import axios from 'axios'
import Item from './Item'
import Results from './Results'

class BookRequests extends Component {

  state = {
    title: '',
    results: []
  }

  addRequest = (request) => {
    this.props.addRequest(request);
    this.setState({
      title: '',
      results: []
    });
  }

  onChange = (e) => {

    const title = e.target.value;

    this.setState({
      [e.target.id]: e.target.value
    });
    if (title){

      const KEY= 'AIzaSyCJefqG9zaTxQ-yg-ubB685XySM7ZOl8kc';
      const URL = `https://www.googleapis.com/books/v1/volumes?q=${title}&filter=ebooks&key=${KEY}`;

      axios.get(URL)
      .then(response => {

        this.setState({
          results: response.data.items.slice(0, 5)
        })
      })
    } else {
      this.setState({
        results: []
      });
    }
  }

  render () {

    const { requests, removeRequest } = this.props;

    let requestList;

    if (requests !== undefined && requests.length === 0){
      requestList = <p className="empty-inventory">No Requests Made.</p>;
    } else {
      requestList = requests && requests.map((request, i) => {
        return (<Item key={i} item={request} removeItem={removeRequest} />)
      });
    }


    return (
      <section className="book-requests">
        <h2>Book Requests</h2>


          <form onSubmit={this.onSubmit}>
          <input type="search" autoComplete="off" className="form-control" id="title"
            onChange={this.onChange} value={this.state.title} placeholder="Add Request Title..."/>
          </form>

          <Results results={this.state.results} addItem={(request) => this.addRequest(request)} />

        <section className="request-list">
          { requestList }
        </section>
      </section>
    )
  }
}

export default BookRequests
