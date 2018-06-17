import React, { Component } from 'react';
import { connect } from 'react-redux';

class CardAdder extends Component {
   handleSubmit = event => {
      const { listId, dispatch } = this.props;
/*
      const cardId = shortid.generate();
      dispatch({
         type: 'ADD_CARD',
         payload: { cardText: 'stuff', cardId, listId },
         });
        */
   };

   render() {
      return (
         <button onClick={this.handleSubmit}>
            +
         </button>
      );
   }
}

export default connect()(CardAdder);
