import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { popPopup } from '../actions';
import { deleteCourse } from '../../../user/actions';
import { CoursePicker, constants } from '../../../toolbox';
import Header from '../components/header';
import ColorPicker from '../components/colors';
import Info from './info';
import MultiCourseInfo from './multi_info';

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

const ActionBar = styled.div`
   height: 4em;
   display: flex;
   justify-content: flex-end;
   align-items: center;
   padding: 0 8px;
   background: ${color.grayAlpha[1]};
   border-top: 1px solid ${color.gray[3]};
`;

const ActionButton = styled.button`
   height: 2.5rem;
   font-size: 16px;
   -webkit-appearance: none;
   border: none;
   background: ${props =>
      props.color ? color[props.color][4] : color.blue[4]};
   border-radius: 4px;
   color: white;
   margin: 0 8px;
   font-weight: 300;
   outline: none;
   transition: background 0.1s ease;
   cursor: pointer;

   &:hover {
      background: ${props =>
         props.color ? color[props.color][5] : color.blue[5]};
   }
`;

const mapStateToProps = state => {
   return {
      user: state.user,
   };
};

const mapDispatchToProps = dispatch => {
   return {
      popPopup: () => dispatch(popPopup()),
      deleteCourse: payload => dispatch(deleteCourse(payload)),
   };
};

class CourseInfoPopup extends Component {
   handleEvent = action => {
      switch (action.type) {
         case 'delete-course':
            this.deleteCourse();
            break;
         default:
            console.log('Empty action');
            break;
      }
   };

   close = () => {
      this.props.popPopup();
   };

   deleteCourse = () => {
      const { user, data, year, quarter, blockIndex } = this.props;
      const { block_metadata } = data;
      const { config } = user;

      this.props.deleteCourse({
         config,
         year,
         quarter,
         blockIndex,
         id: block_metadata._id,
      });
   };

   render() {
      const { index, closing, data } = this.props;
      const { course_data, block_metadata } = data;
      const { course_type, _id } = block_metadata;
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
                  <CoursePicker
                     {...this.props}
                     canDelete
                     course_type={course_type}
                     onEvent={this.handleEvent}
                  />
               )}
               {hasCourseData && (
                  <ActionBar>
                     <ActionButton color="red" onClick={this.deleteCourse}>
                        Delete Block
                     </ActionButton>
                  </ActionBar>
               )}
            </Modal>
         </Container>
      );
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseInfoPopup);
