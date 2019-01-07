import React, { Component } from 'react'
import Book from '../dashboard/Book'

class Library extends Component {

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
    this.props.addBook(this.state);

    this.setState({
      title: ''
    })
  }

  render () {

    const { books } = this.props;

    const bookList = books && books.map((book, i) => {
      return (<Book key={i} book={book} />)
    });

    return (
      <section className="container">
        <h2>Library</h2>


          <form onSubmit={this.onSubmit}>
          <input type="search" className="form-control" id="title"
            onChange={this.onChange} value={this.state.title} placeholder="Add Book Title..."/>
          </form>

        <section className="container book-list">
          { bookList }
        </section>
      </section>
    )
  }
}

export default Library
