import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import BlockContents from './contents';

const OuterContainer = styled.div`
   position: relative;
   margin: 8px 5px;
   box-sizing: border-box;
   transition: box-shadow 0.15s;
`;

const BlockContainer = styled.div`

`;

class Block extends Component {
   toggleCardEditor = () => {
      /* CHANGE THIS WITH A DIFFERENT MODAL */
   };

   handleClick = event => {
      this.toggleCardEditor(event);
   };

   handleKeyDown = event => {
      // Only open card on enter since spacebar is used by react-beautiful-dnd for keyboard dragging
      if (event.keyCode === 13 && event.target.tagName.toLowerCase() !== 'a') {
         event.preventDefault();
         this.toggleCardEditor();
      }
   };

   render() {
      const { blockId, index, data, isDraggingOver } = this.props;
      if (!data.course_data) return null;
      return (
         <Draggable draggableId={blockId} index={index}>
            {(provided, snapshot) => (
               <OuterContainer>
                  {/* eslint-disable */}
                  <div
                     ref={ref => {
                        provided.innerRef(ref);
                        this.ref = ref;
                     }}
                     {...provided.draggableProps}
                     {...provided.dragHandleProps}
                     onClick={event => {
                        provided.dragHandleProps.onClick(event);
                        this.handleClick(event);
                     }}
                     onKeyDown={event => {
                        provided.dragHandleProps.onKeyDown(event);
                        this.handleKeyDown(event);
                     }}
                     style={{
                        ...provided.draggableProps.style,
                     }}>
                     <BlockContainer >
                        <BlockContents data={data} />
                     </BlockContainer>
                  </div>
                  {/* Remove placeholder when not dragging over to reduce snapping */}
                  {isDraggingOver && provided.placeholder}
               </OuterContainer>
            )}
         </Draggable>
      );
   }
}

export default connect()(Block);
