import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { updateCourse } from '../../../user/actions';
import { constants, Toggle } from '../../../toolbox';

const { color, breakpoint } = constants;

const Container = styled.div`
   height: 40vh;
   overflow: auto;
   -webkit-overflow-scrolling: touch;

   ${breakpoint.mobile} {
      height: 75vh
   }
`;

const ToggleContainer = styled.div`
   margin: 0 24px 0 32px;
   border-bottom: 1px solid ${color.grayAlpha[2]};
   transition: background 0.15s ease;
`;

const Title = styled.h2`
   margin: 8px 16px 16px 16px;
`;

const Subtitle = styled.h3`
   margin: 16px 16px 8px 32px;
   color: ${props => (props.color ? color[props.color][5] : 'black')};
`;

const BodyText = styled.h3`
   font-weight: 300;
   margin: 0 16px 0 44px;
   padding-bottom: 8px;
   border-bottom: 1px solid ${color.grayAlpha[2]};

   &:last-child {
      border-bottom: none;
   }
`;

const Course = styled.div`
   padding: 8px 0;

   &:nth-child(2n) {
      background: ${color.grayAlpha[2]};
   }
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

class MultiCourseInfo extends Component {
   handleChange = (id, value) => {
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
         index: blockIndex
      });
   };

   render() {
      const { year, quarter, blockIndex, flowchart } = this.props;
      const data = flowchart.chartData[year].quarters[quarter][blockIndex];
      if (!data || !Array.isArray(data.course_data)) {
         return <Container />
      }
      const { course_data, block_metadata } = data;

      return (
         <Container>
            {course_data && course_data.map((course, index) => {
               return (
                  <Course key={`multi-course-info-${index}`}>
                     <Title>
                        {course.dept} {course.course_number}
                     </Title>
                     <ToggleContainer>
                        <Toggle
                           label="Selected "
                           checked={course._id === block_metadata.activeId}
                           onChange={val => this.handleChange(course._id, val)}
                        />
                     </ToggleContainer>
                     <Subtitle>Description</Subtitle>
                     <BodyText>{course.description}</BodyText>
                     <Subtitle color="red">Prerequisites</Subtitle>
                     <BodyText>{course.prereqs || 'None'}</BodyText>
                     <Subtitle color="blue">Notes</Subtitle>
                     <BodyText>{block_metadata.notes || 'None'}</BodyText>
                  </Course>
               );
            })}
         </Container>
      );
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(MultiCourseInfo);
