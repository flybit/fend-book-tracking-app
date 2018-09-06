import React from 'react';
import { Route, Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Shelf from './Shelf';
import sortBy from 'sort-by';
import './App.css';


class BooksApp extends React.Component {
  state = {
    books : []
  }

  async componentDidMount() {
    this.setState({books: await BooksAPI.getAll()});
  }

  changeShelf = async (bookId, newShelf) => {
    this.setState({books: this.state.books.map(b => {
      if (b.id === bookId) {
        b.shelf = newShelf;
      }
      return b;
    })});
    await BooksAPI.update({id: bookId}, newShelf);
  }

  render() {
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
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
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
              <Link to="/search">Search</Link>
            </div>

          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
