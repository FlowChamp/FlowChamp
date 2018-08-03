import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';
import { updateCourse } from '../../../user/actions';
import { popPopup } from '../../../components/popups/actions';
import { Loader } from '../..';
import constants from '../../constants';
import DepartmentSelector from './department';
import CourseSelector from './course_list';
import CoursePreview from './preview';

const { animation, color, breakpoint } = constants;
const { fadeIn } = animation;

const Container = styled.div`
   height: 46vh;
   display: flex;
   flex-direction: column;

   ${breakpoint.mobile} {
      height: 75vh;
   }
`;

const PickerContainer = styled.div`
   position: relative;
   display: flex;
   border-top: 1px solid ${color.grayAlpha[2]};
   border-bottom: 1px solid ${color.grayAlpha[2]};
   overflow: auto;
   -webkit-overflow-scrolling: touch;
   flex: 1;
`;

const Pane = styled.div`
   height: 100%;
   overflow-y: auto;
   width: 16rem;
   border-right: 1px solid ${color.grayAlpha[2]};
   box-sizing: border-box;
   flex: 0 0 auto;
   animation: ${fadeIn} 0.15s ease;
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
   cursor: ${props => !props.disabled && 'pointer'};

   &:hover {
      background: ${props =>
         !props.disabled &&
         (props.color ? color[props.color][5] : color.blue[5])};
   }

   ${props =>
      props.disabled &&
      css`
         filter: grayscale(1);
         background: ${color.blue[2]};
      `};
`;

const mapStateToProps = state => {
   return {
      user: state.user,
      flowchart: state.flowchart,
   };
};

class CoursePicker extends Component {
   constructor(props) {
      super(props);
      this.state = {
         course_type: props.course_type,
         department: null,
         course: null,
         fetching: false,
      };
   }

   static getDerivedStateFromProps(nextProps) {
      return {
         course_type: nextProps.course_type,
         fetching: nextProps.fetching,
      };
   }

   handleEvent = action => {
      switch (action.type) {
         case 'set-field':
            this.setField(action);
            break;
         default:
            console.log('empty action');
            break;
      }
   };

   setField(action) {
      this.setState({ ...this.state, ...action.value }, () =>
         console.log(this.state),
      );
   }

   chooseCourse = () => {
      const { course } = this.state;
      this.props.onEvent({
         type: 'choose-course',
         course,
      });
   };

   deleteCourse = () => {
      this.props.onEvent({
         type: 'delete-course'
      });
   }

   componentDidUpdate(prevProps, prevState) {
      if (
         prevState.department !== this.state.department ||
         prevState.course !== this.state.course
      ) {
         // if path changed,
         // scroll to right edge
         document.getElementById('pickerContainer').scroll({
            top: 0,
            left: document.getElementById('pickerContainer').scrollWidth,
            behavior: 'smooth',
         });
      }
   }

   render() {
      const { department, course, course_type } = this.state;

      return (
         <Container>
            <PickerContainer id="pickerContainer">
               <Pane>
                  <DepartmentSelector
                     {...this.state}
                     onEvent={this.handleEvent}
                  />
               </Pane>
               {department && (
                  <Pane>
                     <CourseSelector
                        {...this.state}
                        onEvent={this.handleEvent}
                     />
                  </Pane>
               )}
               {department &&
                  course && (
                     <Pane>
                        <CoursePreview
                           {...this.state}
                           course_type={course_type}
                        />
                     </Pane>
                  )}
            </PickerContainer>

            <ActionBar>
               {this.props.canDelete && (
                  <ActionButton color="red" onClick={this.deleteCourse}>
                     Delete Block
                  </ActionButton>
               )}
               {this.props.fetching && <Loader />}
               <ActionButton disabled={!course} onClick={this.chooseCourse}>
                  Select Course
               </ActionButton>
            </ActionBar>
         </Container>
      );
   }
}

export default CoursePicker;
