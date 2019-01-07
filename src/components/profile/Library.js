import React, { Component } from 'react'

class Library extends Component {

  state = {
    title: ''
  }

  onChange = (e) => {
    console.log(e.target);
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  render () {
    return (
      <div className="container">
      <h2>Library</h2>


      <input type="search" id="title" className="form-control" value={this.state.title} onChange={this.onChange} placeholder="Add Book Title..."/>
      </div>

    )
  }


}

export default Library
