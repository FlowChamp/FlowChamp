import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';
import { updateCourse } from '../../../../user/actions';
import { constants } from '../../../../toolbox';
import DepartmentSelector from './department';
import CourseSelector from './course_list';
import CoursePreview from './preview';

const { animation, color } = constants;
const { fadeIn } = animation;

const Container = styled.div`
   height: 60vh;
`;

const PickerContainer = styled.div`
   position: relative;
   display: flex;
   border-top: 1px solid ${color.grayAlpha[2]};
   border-bottom: 1px solid ${color.grayAlpha[2]};
   overflow: auto;
   -webkit-overflow-scrolling: touch;
   height: 85%;
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
   height: 15%;
   display: flex;
   justify-content: flex-end;
   align-items: center;
   padding: 0 8px;
`;

const ActionButton = styled.button`
   height: 2.5rem;
   font-size: 16px;
   -webkit-appearance: none;
   border: none;
   background: ${color.blue[4]};
   border-radius: 4px;
   color: white;
   margin: 0 8px;
   font-weight: 300;
   outline: none;
   transition: background 0.1s ease;

   &:hover {
      background: ${color.blue[5]};
   }

   ${props => props.disabled && css`
      filter: grayscale(1);
      background: ${color.blue[2]};
      pointer-events: none;
   `}
`;

const mapStateToProps = state => {
   return {
      user: state.user,
      flowchart: state.flowchart,
   };
};

const mapDispatchToProps = dispatch => {
   return {
      updateCourse: payload => dispatch(updateCourse(payload)),
   };
};

class CoursePicker extends Component {
   state = {
      department: null,
      course: null,
   };

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

   updateCourse = (id, value) => {
      const { user, flowchart, year, quarter, blockIndex } = this.props;
      const { config } = user;
      let data = flowchart.chartData[year].quarters[quarter][blockIndex];

      const newCourse = data;
      newCourse.block_metadata.activeId = !!value ? id : null;

      this.props.updateCourse({
         config,
         course: newCourse,
         year,
         quarter,
         index: blockIndex,
      });
   };

   render() {
      const { year, quarter, blockIndex, flowchart } = this.props;
      const data = flowchart.chartData[year].quarters[quarter][blockIndex];
      const { block_metadata } = data;
      const { department, course } = this.state;

      return (
         <Container>
            <PickerContainer>
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
                           course_type={block_metadata.course_type}
                        />
                     </Pane>
                  )}
            </PickerContainer>

            <ActionBar>
               <ActionButton disabled={!course}>
                  Choose Course
               </ActionButton>
            </ActionBar>
         </Container>
      );
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursePicker);
