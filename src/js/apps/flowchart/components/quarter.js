import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Droppable } from 'react-beautiful-dnd';
import { pushPopup } from '../../../components/popups/actions';
import { Icon, CourseBlock, constants } from '../../../toolbox/';

const { color } = constants;
const seasons = ['Fall', 'Winter', 'Spring', 'Summer'];

const Container = styled.div`
   border-right: 1px solid ${color.grayAlpha[2]};
   width: 11em;
`;

const TitleContainer = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
   padding: 0 8px;
   pointer-events: none;
`;

const Season = styled.h4`
   margin: 0;
   font-weight: normal;
   user-select: none;
`;

const Units = styled.h4`
   margin: 0;
   font-weight: 300;
   user-select: none;
`;

const AddButton = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   width: 10em;
   height: 5em;
   margin: 12px 8px 0;
   border-radius: 3px;
   user-select: none;
   transition: all 0.1s ease-in-out;
   cursor: pointer;

   &:hover {
      height: 10em;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);

      svg {
         color: ${color.gray[6]};
      }
   }

   svg {
      color: ${color.gray[4]};
      height: 30px;
      width: 30px;
      transition: color 0.1s ease-in-out;
   }
`;

const mapStateToProps = state => {
   return {
      flowchart: state.flowchart,
   };
};

const mapDispatchToProps = dispatch => {
   return {
      pushPopup: popup => dispatch(pushPopup(popup)),
   };
};

class Quarter extends Component {
   constructor(props) {
      super(props);
      this.state = {
         year: props.index,
         season: props.season,
         totalUnits: 0,
      };
   }

   static getDerivedStateFromProps(nextProps, prevState) {
      let totalUnits = 0;
      const { flowchart } = nextProps;
      const { chartData } = flowchart;
      const quarter = chartData[prevState.year].quarters[prevState.season];
      for (let block of quarter) {
         totalUnits +=
            block.course_data && !Array.isArray(block.course_data)
               ? block.course_data.units
               : 4;
      }

      return {
         totalUnits,
      };
   }

   addCourse = () => {
      const { quarterId } = this.props;

      this.props.pushPopup({
         name: 'CourseAdder',
         props: {
            quarterId,
         },
      });
   };

   render() {
      const { season, index, quarterId, flowchart } = this.props;
      const { chartData } = flowchart;
      const { totalUnits } = this.state;

      if (!chartData) return null;
      const blocks = chartData[index].quarters[season];

      return (
         <Container>
            <TitleContainer>
               <Season>{seasons[season]}</Season>
               <Units>
                  {totalUnits} {totalUnits === 1 ? 'Unit' : 'Units'}
               </Units>
            </TitleContainer>
            <Droppable droppableId={quarterId}>
               {(provided, { isDraggingOver }) => (
                  <div ref={provided.innerRef} style={{ height: '100%' }}>
                     {blocks.map((block, index) => {
                        const { block_metadata } = block;
                        const { _id } = block_metadata;

                        return (
                           <CourseBlock
                              key={_id}
                              isDraggingOver={isDraggingOver}
                              blockId={_id}
                              index={index}
                              quarterId={quarterId}
                              data={block}
                           />
                        );
                     })}
                     {provided.placeholder}
                     <div
                        ref={el => {
                           this.listEnd = el;
                        }}
                     />
                     <AddButton onClick={this.addCourse}>
                        <Icon name="plus" />
                     </AddButton>
                  </div>
               )}
            </Droppable>
         </Container>
      );
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quarter);
