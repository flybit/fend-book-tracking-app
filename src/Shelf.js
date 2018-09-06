import React from 'react'
import Book from './Book'

class Shelf extends React.Component {

  render() {
    const { name, books, onShelfChange } = this.props;
    
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{name}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map(b => <li><Book title={b.title} author={b.author} shelf={b.shelf} url={b.url}/> </li>)}
          </ol>
        </div>
      </div>
    );
  }
}

export default Shelf;