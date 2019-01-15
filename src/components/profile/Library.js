import React, { Component } from 'react'
import Item from './Item'

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

    const { books, removeBook, returnBook } = this.props;

    const bookList = books && books.map((book, i) => {
      return (<Item key={i} item={book}
              removeItem={removeBook}
              returnBook={() => returnBook(book)} />)
    });

    return (
      <section>
        <h2>Library</h2>


          <form onSubmit={this.onSubmit}>
          <input type="search" className="form-control" id="title"
            onChange={this.onChange} value={this.state.title} placeholder="Add Book Title..."/>
          </form>

        <section className="book-list">
          { bookList }
        </section>
      </section>
    )
  }
}

export default Library
