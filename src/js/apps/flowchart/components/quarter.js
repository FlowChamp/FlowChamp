import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Droppable } from 'react-beautiful-dnd';
import Block from './block';
import { constants } from '../../../toolbox/';

const { color } = constants;

const mapStateToProps = state => {
   return {
      flowchart: state.flowchart,
   };
};

const Container = styled.div`
   border-right: 1px solid ${color.grayAlpha[2]};
`;

class Quarter extends Component {
   render() {
      const { season, index, quarterId, flowchart } = this.props;
      const { chartData } = flowchart;

      if (!chartData) return null;
      const blocks = chartData[index].quarters[season];

      return (
         <Droppable droppableId={quarterId}>
            {(provided, { isDraggingOver }) => (
               <Container>
                  <div ref={provided.innerRef} style={{ height: '100%' }}>
                     {blocks.map((block, index) => {
                        const { block_metadata } = block;
                        const { _id } = block_metadata;

                        return (
                           <Block
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
                  </div>
               </Container>
            )}
         </Droppable>
      );
   }
}

export default connect(mapStateToProps)(Quarter);
