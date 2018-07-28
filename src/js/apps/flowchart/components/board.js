import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { moveBlock } from '../actions';
import { DragDropContext } from 'react-beautiful-dnd';
import Year from './year';
import { constants } from '../../../toolbox';

const { animation } = constants;
const { fadeIn } = animation;

const YearContainer = styled.div`
   display: ${props => (props.hide ? 'none' : 'flex')};
   animation: ${fadeIn} 0.5s ease;
`;

class Board extends Component {
   constructor(props) {
      super(props);
      this.state = {
         data: props.data,
         startX: null,
         startScrollX: null,
      };
   }

   static getDerivedStateFromProps(nextProps, prevState) {
      return {
         data: nextProps.data,
      };
   }

   handleDragEnd = ({ source, destination, type }) => {
      const { data } = this.props;

      // dropped outside the list
      if (!destination) {
         return null;
      }
      const { boardId } = this.props;

      // Move card
      if (
         source.index !== destination.index ||
         source.droppableId !== destination.droppableId
      ) {
         this.props.moveBlock({
            chartData: data,
            sourceQuarterId: source.droppableId,
            destQuarterId: destination.droppableId,
            oldBlockIndex: source.index,
            newBlockIndex: destination.index,
            boardId,
         });
      }
   };

   render = () => {
      const { user } = this.props;
      const { data } = this.state;
      const { config } = user;
      if (!config) return null;

      const boardId = 'active_chart';

      return (
         data && (
            <DragDropContext onDragEnd={this.handleDragEnd}>
               <YearContainer>
                  {data &&
                     data.map((year, index) => (
                        <Year
                           year={year}
                           boardId={boardId}
                           index={index}
                           key={year._id}
                        />
                     ))}
               </YearContainer>
            </DragDropContext>
         )
      );
   };
}

const mapStateToProps = state => ({
   user: state.user,
});

const mapDispatchToProps = dispatch => ({
   moveBlock: coords => dispatch(moveBlock(coords)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);
