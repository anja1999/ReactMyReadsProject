import React, {Component} from 'react';

class BookMenu extends Component{
  
handleChange = (e) => {
    const shelfToMove = e.target.value;
    if(shelfToMove !== this.props.currentShelf){
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

export default BookMenu 