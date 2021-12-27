import React, {Component} from 'react';
import BookMenu from './BookMenu' ;
import PropTypes from 'prop-types';

class  Book extends Component {
  
moveToShelf = (shelf, book)=>{
  this.props.moveBook(book, shelf);
}
  
render(){
  const {book, shelfs} = this.props;  
  const authors= book.authors && book.authors.join(', ')
  return (
    <li key={book.id}>
    	<div className="book">
             <div className="book-top">
             <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
              <BookMenu 
              	currentShelf={book.shelf} 
                shelfs={shelfs}
              	onMoveShelf={(shelf)=>{this.moveToShelf(shelf, book)}}/>
              </div>
              <div className="book-title">{book.title}</div>
              <div className="book-authors">{authors}</div>
		</div>
      </li>
  );
};
}

Book.propTypes ={
	shelfs : PropTypes.array.isRequired,
	moveBook : PropTypes.func.isRequired,
	book : PropTypes.object.isRequired
}

export default Book;
