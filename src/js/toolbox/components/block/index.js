import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import styled, { css } from 'styled-components';
import { pushPopup } from '../../../components/popups/actions';
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
      `}

   @keyframes slideReveal {
      0% {
         opacity: 0;
         transform: translateX(20%);
      }
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
   }
}

class Block extends Component {
   state = {
      shouldAnimate: true,
   };

   handleClick = (quarterId, index) => {
      this.props.pushPopup({
         name: 'CourseInfo',
         props: {
            data: this.props.data,
            year: quarterId.split('-')[0],
            quarter: quarterId.split('-')[1],
            blockIndex: index
         }
      });
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
      const { flowchart, blockId, quarterId, index, data, isDraggingOver } = this.props;
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
                     onClick={() => this.handleClick(quarterId, index)}
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

export default connect(mapStateToProps, mapDispatchToProps)(Block);
