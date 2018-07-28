import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Droppable } from 'react-beautiful-dnd';
import Block from './block';

const mapStateToProps = state => {
   return {
      flowchart: state.flowchart,
   };
};

class Quarter extends Component {
   render() {
      const { season, index, quarterId, flowchart } = this.props;
      const { chartData } = flowchart;

      if (!chartData) return null;
      const blocks = chartData[index].quarters[season];

      return (
         <Droppable droppableId={quarterId}>
            {(provided, { isDraggingOver }) => (
               <div ref={provided.innerRef}>
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
            )}
         </Droppable>
      );
   }
}

export default connect(mapStateToProps)(Quarter);
