import React, {Component} from 'react'
import './App.css'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class Search extends Component {
  state={
    booksResult:[]
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
    console.log(searchQuery);
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
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
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

export default Search

