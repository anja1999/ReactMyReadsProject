import React, {Component} from 'react';
import BookShelf from './BookShelf';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class HomePage extends Component {
  render(){
    const{shelfs, books, moveBook} = this.props;
    const shelfsToDisplay = shelfs.filter((s) =>(s.id !== 'none'));
    return(
      <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
          		{shelfsToDisplay.map((shelf)=>(
          			<BookShelf  key={shelf.id} shelf={shelf} books={books} shelfs={shelfs} moveBook={moveBook}/>
        		))}        
              </div>
            </div>
            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
          </div>
    )
  }
}

HomePage.propTypes={
  shelfs: PropTypes.array.isRequired,
  books: PropTypes.array.isRequired,
  moveBook: PropTypes.func.isRequired
}

export default HomePage