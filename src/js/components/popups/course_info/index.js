import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { popPopup } from '../actions';
import { constants } from '../../../toolbox';
import Header from './header';
import Info from './info';
import MultiCourseInfo from './multi_info';
import ColorPicker from './colors';
import CoursePicker from './course_picker';

const { color, animation } = constants;
const { fadeIn, fadeOut, menuOpen, menuClose } = animation;

const Container = styled.div`
   z-index: ${props => 100 + props.index};
   position: fixed;
   display: flex;
   justify-content: center;
   align-items: flex-end;
   top: 0;
   bottom: 0;
   left: 0;
   right: 0;
`;

const Cover = styled.div`
   z-index: 0;
   position: absolute;
   top: 0;
   bottom: 0;
   left: 0;
   right: 0;
   background: ${color.grayAlpha[5]};
   animation: ${props => (props.closing ? fadeOut : fadeIn)} 0.3s ease;
`;

const Modal = styled.div`
   position: relative;
   width: 90%;
   max-height: 50em;
   max-width: 60em;
   margin: auto;
   background: white;
   animation: ${props => (props.closing ? menuClose : menuOpen)} 0.3s ease;
`;

const mapDispatchToProps = dispatch => {
   return {
      popPopup: () => dispatch(popPopup()),
   };
};

class CourseInfoPopup extends Component {
   close = () => {
      this.props.popPopup();
   };

   render() {
      const { index, closing, data } = this.props;
      const { course_data } = data;
      const multiCourse = Array.isArray(course_data);
      const hasCourseData = course_data !== undefined;

      return (
         <Container index={index}>
            <Cover closing={closing} onClick={this.close} />
            <Modal closing={closing}>
               <Header {...this.props} />
               <ColorPicker {...this.props} />
               {multiCourse ? (
                  <MultiCourseInfo {...this.props} />
               ) : hasCourseData ? (
                  <Info {...this.props} />
               ) : (
                  <CoursePicker {...this.props} />
               )}
            </Modal>
         </Container>
      );
   }
}

export default connect(null, mapDispatchToProps)(CourseInfoPopup);
