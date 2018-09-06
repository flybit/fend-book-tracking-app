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
            {books.map(b => <li key={b.id}><Book imageUrl={b.imageLinks.thumbnail} title={b.title} authors={b.authors.join(', ')} id={b.id} shelf={b.shelf} onShelfChange={onShelfChange}/> </li>)}
          </ol>
        </div>
      </div>
    );
  }
}

export default Shelf;