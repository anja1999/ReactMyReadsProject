import React, {Component} from 'react';
import * as BooksAPI from './BooksAPI'
import './App.css';
import BookShelf from './BookShelf';
import { Route} from 'react-router-dom';

const shelfs = [ 
  {
    id: 'currentlyReading',
    name: "Currently Reading"
  },
  {
    id: 'wantToRead',
    name: "Want to Read"
  },
  {
    id: 'read',
    name: "Read"
  },
   {
    id: 'none',
    name: "None"
  }
];

class BooksApp extends Component {
  state = {
    books: [],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }
  
  getAllBooks=()=>{
    BooksAPI.getAll()
    	.then((books)=>{
      this.setState(()=>({
     	books
      }))
    })
  }
  
  componentDidMount(){
    this.getAllBooks();
  }

  onBookMove=(book, shelf)=>{
    BooksAPI.update(book,shelf)
    .then((updatedShelfs)=>{
      let updatedBookShelf = updatedShelfs[shelf];
      if(updatedBookShelf.includes(book.id)){
      this.getAllBooks();     
      }      
    })
  }
  
  updateBookShelf=(book, newShelf)=>{
    
  }
  render() {
    const shelfsToDisplay = shelfs.filter((s) =>(s.id !== 'none'));
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
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
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
          		{shelfsToDisplay.map((shelf)=>(
          			<BookShelf  key={shelf.id} shelf={shelf} books={this.state.books} shelfs={shelfs} moveBook={this.onBookMove}/>
        		))}        
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
