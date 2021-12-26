import React, {Component} from 'react';
import PropTypes from 'prop-types';

class BookMenu extends Component{
  
handleChange = (e) => {
    const shelfToMove = e.target.value;
    if(shelfToMove !== this.props.currentShelf && shelfToMove !== 'none'){
      this.props.onMoveShelf(shelfToMove);
    }    
  }
render(){
   const {currentShelf, shelfs} = this.props;
    return (
    	<div className="book-shelf-changer">
          <select onChange={this.handleChange} value={currentShelf}>
              <option value="move" disabled>Move to...</option>
      			{ shelfs.map((s)=>(<option key={s.id} value={s.id} >{s.name}</option>))}
          </select>
        </div>
    	)
	}
}


BookMenu.PropTypes={
  onMoveShelf : PropTypes.func.isRequired,
  currentShelf: PropTypes.object.isRequired,
  shelfs : PropTypes.array.isRequired,
}
export default BookMenu 