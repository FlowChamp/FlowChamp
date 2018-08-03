import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import CourseInfoPopup from './course_info';
import CourseAdderPopup from './course_adder';

const popups = {
   'CourseInfo': <CourseInfoPopup />,
   'CourseAdder': <CourseAdderPopup />
};

const Container = styled.div``;

const mapStateToProps = state => {
   return {
      popupState: state.popupState,
   };
};

const PopupStack = connect(mapStateToProps)(({ popupStack, closing }) => {
   return popupStack.map(({ name, props }, index) => {
      const popup = popups[name];
      props.index = index;
      props.closing = index === popupStack.length-1 && closing;
      props.key = `popup-${index}`;

      try {
         return React.cloneElement(popup, props)
      } catch (e) {
         console.error('Error: This popup is broken: ', popup);
         return null;
      }
   });
});

class PopupContainer extends Component {
   constructor(props) {
      super(props);
      const { popupState } = props;
      const { popupStack } = popupState;

      this.state = {
         popupStack,
         closing: false,
      };
   }

   static getDerivedStateFromProps(nextProps, prevState) {
      const { popupState } = nextProps;
      const { popupStack } = popupState;
      const closing = popupStack.length < prevState.popupStack.length;

      return {
         popupStack: closing ? prevState.popupStack : popupStack,
         closing
      }
   }

   animateClose() {
      const { popupState } = this.props;
      const { popupStack } = popupState;

      setTimeout(() => {
         this.setState({
            popupStack,
            closing: false
         });
      }, 280);
   }

   componentDidUpdate(nextProps, prevState) {
      if (this.state.closing) {
         this.animateClose();
      }
   }

   render() {
      const { popupStack, closing } = this.state;

      return (
         <Container>
            <PopupStack popupStack={popupStack} closing={closing} />
         </Container>
      );
   }
}

export default connect(mapStateToProps)(PopupContainer);
