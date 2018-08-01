import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { moveBlock } from '../actions';
import { updateCourse } from '../../../user/actions';
import { DragDropContext } from 'react-beautiful-dnd';
import Year from './year';
import { constants } from '../../../toolbox';

const { animation } = constants;
const { fadeIn } = animation;

const seasons = ['Fall', 'Winter', 'Spring', 'Summer'];

const YearContainer = styled.div`
   display: ${props => (props.hide ? 'none' : 'flex')};
   animation: ${fadeIn} 0.5s ease;
`;

const mapStateToProps = state => ({
   user: state.user,
});

const mapDispatchToProps = dispatch => ({
   moveBlock: coords => dispatch(moveBlock(coords)),
   updateCourse: payload => dispatch(updateCourse(payload)),
});

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
      const { data, user } = this.props;
      const { config } = user;

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
         const [sourceYear, sourceQuarter] = source.droppableId.split('-');
         const [destYear, destQuarter] = destination.droppableId.split('-');

         let course = data[sourceYear].quarters[sourceQuarter][source.index];

         course.block_metadata.time = [
            parseInt(destYear, 10) + 1,
            seasons[destQuarter],
         ];

         this.props.updateCourse({
            config,
            course,
            year: sourceYear,
            quarter: sourceQuarter,
            index: source.index,
         });

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

export default connect(mapStateToProps, mapDispatchToProps)(Board);
