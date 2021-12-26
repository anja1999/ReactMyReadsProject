import React, {Component} from 'react';
import * as BooksAPI from './BooksAPI'
import './App.css';
import Search from './Search';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import HomePage from './HomePage';

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
    books: []
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

  onUpdateBookShelf=(book, shelf)=>{
    BooksAPI.update(book,shelf)
    .then((updatedShelfs)=>{
      let updatedBookShelf = updatedShelfs[shelf];
      if(updatedBookShelf.includes(book.id)){
      this.getAllBooks();     
      }      
    })
  }  

  render() {
    return (
      <Router>
         <div className="app">
      		<Routes>
      			<Route 
      				path='/' 
      				element={
      					<HomePage shelfs={shelfs} books={this.state.books} moveBook={this.onUpdateBookShelf}/>
      				}/>
				<Route 
					extact path='/search' 
					element={
              			<Search shelfs={shelfs}/> 
                 }/>
      </Routes>        
      </div>
      </Router>
    )
  }
}

export default BooksApp
