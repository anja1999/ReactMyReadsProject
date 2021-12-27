import React, {Component} from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

class BookShelf extends Component {  
  
  moveBook=(book, shelf)=>{
    this.props.moveBook(book, shelf);
  }
  
render (){
    const {shelf, books, shelfs} = this.props
    const shelfBooks = books.filter((b)=>(b.shelf === shelf.id))
    return (
      	<div className="bookshelf">
           <h2 className="bookshelf-title">{shelf.name}</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                   { shelfBooks.map((book)=>(
                        <Book key={book.id} book={book} shelfs={shelfs} moveBook={this.moveBook}/>
                        ))}
                 </ol>
              </div>
        </div>
    )	
  }
}

BookShelf.propTypes ={
	shelfs : PropTypes.array.isRequired,
  	books:PropTypes.array.isRequired,
	moveBook : PropTypes.func.isRequired,
	shelf : PropTypes.object.isRequired
}
export default BookShelf;