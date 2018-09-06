import React from 'react';
import { Route, Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Shelf from './Shelf';
import Book from './Book';
import sortBy from 'sort-by';
import escRegExp from 'escape-string-regexp';
import './App.css';


class BooksApp extends React.Component {
  state = {
    searchQuery: '',
    searchResults: [],
    books: []
  }

  async _getAll() {
    this.setState({books: await BooksAPI.getAll()});
  }

  async componentDidMount() {
    await this._getAll();
  }

  changeShelf = async (bookId, newShelf) => {
    await BooksAPI.update({id: bookId}, newShelf);
    await this._getAll();
  }

  getShelfOfBook(bookId) {
    const books = this.state.books;
    const idx = books.findIndex(b => b.id === bookId);
    return idx === -1 ? 'none' : books[idx].shelf;
  }

  handleSearchQueryChange = async (val) => {
    const sanitizedQuery = escRegExp(val);
    this.setState({searchQuery: sanitizedQuery});
    if (!sanitizedQuery) {
      this.setState({searchResults: []});
      return;
    }
    const results = await BooksAPI.search(sanitizedQuery);
    this.setState({searchResults: (results.error && []) || results.sort(sortBy('title'))});
  }

  render() {
    const { searchQuery, searchResults } = this.state;
    const currentlyReading = this.state.books.filter(b => b.shelf === 'currentlyReading').sort(sortBy('title'));
    const wantToRead = this.state.books.filter(b => b.shelf === 'wantToRead').sort(sortBy('title'));
    const read = this.state.books.filter(b => b.shelf === 'read').sort(sortBy('title'));
    
    return (
      <div className="app">
      
        <Route path="/search" render={() => (
      
          <div className="search-books">
            <div className="search-books-bar">
              <Link to="/" className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" value={searchQuery} onChange={e => this.handleSearchQueryChange(e.target.value)}/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {searchResults.map(b => (<li key={b.id}><Book imageUrl={b.imageLinks && b.imageLinks.thumbnail} title={b.title} authors={b.authors} id={b.id} shelf={this.getShelfOfBook(b.id)} onShelfChange={this.changeShelf}/></li>))}
              </ol>
            </div>
          </div>
      
        )}/>

        <Route exact path="/" render={() => (
          
          <div className="list-books">
          
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
          
            <div className="list-books-content">
              <div>
                <Shelf name="Currently Reading" books={currentlyReading} onShelfChange={this.changeShelf}/>
                <Shelf name="Want to Read" books={wantToRead} onShelfChange={this.changeShelf}/>
                <Shelf name="Read" books={read} onShelfChange={this.changeShelf}/>
              </div>
            </div>

            <div className="open-search">
              <Link to="/search">Search and add books</Link>
            </div>

          </div>

        )}/>
      </div>
    )
  }
}

export default BooksApp
