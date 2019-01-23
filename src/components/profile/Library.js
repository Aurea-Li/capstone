import React, { Component } from 'react'
import Item from './Item'
import Results from './Results'
import axios from 'axios'

class Library extends Component {

  state = {
    title: '',
    results: []
  }

  addBook = (book) => {
    this.props.addBook(book);
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
    if (title.length !== 0){

      const KEY= 'AIzaSyCJefqG9zaTxQ-yg-ubB685XySM7ZOl8kc';
      const URL = `https://www.googleapis.com/books/v1/volumes?q=${title}&key=${KEY}`;

      axios.get(URL)
      .then(response => {

        if (response.data && response.data.items &&  response.data.items.length >= 5){
          this.setState({
            results: response.data.items.slice(0, 5)
          })

        }
        else if (response.data && response.data.items){
          this.setState({
            results: response.data.items
          })
        }
        else {
          this.setState({
            results: []
          });
        }
      })
    } else {
      this.setState({
        results: []
      });
    }
  }

  render () {

    const { books, removeBook, returnBook } = this.props;

    books && books.sort((a, b) => a.title.localeCompare(b.title));


    let bookList;

    if (books !== undefined && books.length === 0){
      bookList = <p className="empty-inventory">No Books in Library.</p>
    } else {

      bookList = books && books.map((book, i) => {
        return (<Item key={i} item={book}
          removeItem={removeBook}
          returnBook={() => returnBook(book)} />)
        });
    }


    return (
      <section className="library">
        <h2>Library</h2>


          <form>
          <input type="search" autoComplete="off" className="form-control" id="title"
            onChange={this.onChange} value={this.state.title} placeholder="Add Book Title..."/>
          </form>

          <Results results={this.state.results} addItem={(book) => this.addBook(book)} />

        <section className="book-list">
          { bookList }
        </section>
      </section>
    )
  }
}

export default Library
