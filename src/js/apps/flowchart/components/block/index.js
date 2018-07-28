import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import styled, { css } from 'styled-components';
import BlockContents from './contents';
import './index.css';

const OuterContainer = styled.div`
   position: relative;

   ${props =>
      props.isHidden &&
      css`
         transform: translateX(-20%);
         opacity: 0;
         pointer-events: none;
      `} @keyframes slideReveal {
      0% {
         opacity: 0;
         transform: translateX(20%);
      }
   }

   @keyframes slideLeave {
      100% {
         opacity: 0;
         transform: translateX(-20%);
      }
   }
`;

const mapStateToProps = state => {
   return {
      flowchart: state.flowchart,
   };
};

class Block extends Component {
   state = {
      shouldAnimate: true,
   };

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

   componentDidMount() {
      setTimeout(() => {
         this.setState({ shouldAnimate: false });
      }, 300);
   }

   render() {
      const { flowchart, blockId, index, data, isDraggingOver } = this.props;
      const { fetching } = flowchart;
      const { shouldAnimate } = this.state;

      return (
         <Draggable draggableId={blockId} index={index}>
            {(provided, snapshot) => (
               <OuterContainer
                  isHidden={fetching}
                  shouldAnimate={shouldAnimate}>
                  {/* eslint-disable */}
                  <div
                     className="card-title"
                     ref={ref => {
                        provided.innerRef(ref);
                        this.ref = ref;
                     }}
                     {...provided.dragHandleProps}
                     {...provided.draggableProps}
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
                     <BlockContents data={data} />
                  </div>
                  {/* Remove placeholder when not dragging over to reduce snapping */}
                  {isDraggingOver && provided.placeholder}
               </OuterContainer>
            )}
         </Draggable>
      );
   }
}

export default connect(mapStateToProps)(Block);
