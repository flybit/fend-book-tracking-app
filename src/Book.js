import React from 'react'
import ShelfChanger from './ShelfChanger'

class Book extends React.Component {

  render() {
    const { title, author, url, shelf } = this.props;
    
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${url}")` }}></div>
          <ShelfChanger shelf={shelf}/>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{author}</div>
      </div>
    );
  }
}

export default Book;