import React from 'react'
import ShelfChanger from './ShelfChanger'

class Book extends React.Component {

  render() {
    const { imageUrl, title, authors, id, shelf, onShelfChange } = this.props;
    
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 130, height: 190, background: `url("${imageUrl}") center center no-repeat`, backgroundSize: 'contain' }}></div>
          <ShelfChanger bookId={id} shelf={shelf} onShelfChange={onShelfChange}/>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors}</div>
      </div>
    );
  }
}

export default Book;