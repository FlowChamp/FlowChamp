import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { popPopup } from '../actions';
import { CoursePicker, constants } from '../../../toolbox';
import { addCourse } from '../../../user/actions';
import Header from './header';
import ColorPicker from './colors';

const { color, breakpoint, animation } = constants;
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
   cursor: pointer;
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

   ${breakpoint.mobile} {
      height: 100%;
      width: 100%;
      max-height: none;
      max-width: none;
   }
`;

const mapStateToProps = state => {
   return {
      user: state.user
   }
}

const mapDispatchToProps = dispatch => {
   return {
      addCourse: payload => dispatch(addCourse(payload)),
      popPopup: () => dispatch(popPopup()),
   };
};

class CourseAdderPopup extends Component {
   state = {
      course_type: 'Blank',
   };

   handleEvent = action => {
      switch (action.type) {
         case 'choose-course':
            this.chooseCourse(action.course);
            break;
         case 'change-course-type':
            this.changeCourseType(action.course_type);
            break;
         default:
            console.log('emtpy action: ', action);
            break;
      }
   };

   chooseCourse(course_data) {
      const { user, quarterId } = this.props;
      const { course_type } = this.state;
      this.setState({ fetching: true });

      this.props.addCourse({
         config: user.config,
         course_data,
         quarterId,
         course_type,
      }).then(course => {
         this.setState({ fetching: false });
         this.props.popPopup();
      });
   }

   changeCourseType(course_type) {
      this.setState({ course_type });
   }

   close = () => {
      this.props.popPopup();
   };

   render() {
      const { index, closing } = this.props;
      const { course_type, fetching } = this.state;

      return (
         <Container index={index}>
            <Cover closing={closing} onClick={this.close} />
            <Modal closing={closing}>
               <Header {...this.props} course_type={course_type} />
               <ColorPicker
                  course_type={course_type}
                  onEvent={this.handleEvent}
               />
               <CoursePicker
                  course_type={course_type}
                  onEvent={this.handleEvent}
                  fetching={fetching}
               />
            </Modal>
         </Container>
      );
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseAdderPopup);
