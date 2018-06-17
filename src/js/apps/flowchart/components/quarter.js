import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Droppable } from 'react-beautiful-dnd';
import Block from './block/block';

class Quarter extends Component {
   render() {
      const { quarterId, blocks } = this.props;
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

export default connect()(Quarter);
