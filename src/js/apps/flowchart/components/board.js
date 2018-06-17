import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Year from './year';

const YearContainer = styled.div`
   display: ${props => props.hide ? 'none' : 'flex'};
`;

class Board extends Component {
   constructor(props) {
      super(props);
      this.state = {
         startX: null,
         startScrollX: null,
      };
   }

   handleDragEnd = ({ source, destination, type }) => {
      console.log("HERE");
      // dropped outside the list
      if (!destination) {
         return;
      }
      const { dispatch, boardId } = this.props;

      // Move card
      if (
         source.index !== destination.index ||
         source.droppableId !== destination.droppableId
      ) {
         dispatch({
            type: 'MOVE_CARD',
            payload: {
               sourceListId: source.droppableId,
               destListId: destination.droppableId,
               oldCardIndex: source.index,
               newCardIndex: destination.index,
               boardId,
            },
         });
      }
   };

   render = () => {
      const { data, auth } = this.props;
      const boardId = 'active_chart';

      return (
         <DragDropContext onDragEnd={this.handleDragEnd}>
            <Droppable
               droppableId="BoardID"
               type="COLUMN"
               direction="horizontal">
               {provided => (
                  <YearContainer
                     hide={auth.changingChart}
                     ref={provided.innerRef}>
                     {data &&
                        data.map((year, index) => (
                           <Year
                              year={year}
                              boardId={boardId}
                              index={index}
                              key={year._id}
                           />
                        ))}
                     {provided.placeholder}
                  </YearContainer>
               )}
            </Droppable>
         </DragDropContext>
      );
   };
}

const mapStateToProps = state => ({
   auth: state.auth,
});

export default connect(mapStateToProps)(Board);
