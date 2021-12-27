import React, {Component} from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from './Book';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';

class Search extends Component {
   constructor(props) {
    super(props);
    this.state={
    booksResult:[]
  }
    this.emitChangeDebounced = debounce(this.emitChange, 400);
  }
  
 componentWillUnmount() {
    this.emitChangeDebounced.cancel();
  }

  
  addDefaultShelf=(book)=>{
    const existingBooks = this.props.existingBooks;
    if(!book.hasOwnProperty('imageLinks')){
      book.imageLinks={smallThumbnail:''}      
    }
	if(existingBooks.some(b => b.id === book.id)){
      const existingBook = existingBooks.filter(b=>b.id===book.id);
      book.shelf = existingBook[0].shelf
    }
    else{
    	book.shelf='none'      
    }
  }
  
  handleChange=(searchQuery)=>{
    this.emitChangeDebounced(searchQuery);  
  }
  
   emitChange(searchQuery) {
      if(searchQuery !== ''){
      BooksAPI.search(searchQuery.toLowerCase(), 20)
      .then((booksResult)=>{  
        if(!booksResult.length) {
          this.setState(()=>({booksResult:[]}));        
          return;
        }
       booksResult.forEach(this.addDefaultShelf);
       this.setState(()=>({
     	booksResult      
      }));        
    })
  	}
    else{
       this.setState(()=>({booksResult:[]}));     
    }
  }

  moveBook=(book, shelf)=>{
    book.shelf = shelf
    this.props.moveBook(book, shelf);
  }
  
  render(){
  const {shelfs, moveBook, existingBooks} = this.props
  const foundBooks =  this.state.booksResult;
  this.state.booksResult.forEach(this.addDefaultShelf);  
    return(
        <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to='/'>Close</Link>
              <div className="search-books-input-wrapper">
                {}
                <input 
					type="text" 
					placeholder="Search by title or author"
					onChange={(e)=> this.handleChange(e.target.value)}/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                   { foundBooks.map((book)=>(
                        <Book key={book.id} book={book} shelfs={shelfs} moveBook={moveBook}/>
                        ))}
			  </ol>
            </div>
          </div>
    )
  }
}

Search.propTypes={
  shelfs: PropTypes.array.isRequired,
  existingBooks: PropTypes.array.isRequired,
  moveBook:PropTypes.func.isRequired
}

export default Search

