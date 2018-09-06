import React from 'react'

class ShelfChanger extends React.Component {

  render() {
    const { shelf } = this.props;
    
    return (
      <div className="book-shelf-changer">
        <select value={shelf}>
          <option value="move" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    );
  }
}

export default ShelfChanger;