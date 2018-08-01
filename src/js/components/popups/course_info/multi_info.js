import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { toggleMultiCourse } from '../../../apps/flowchart/actions';
import { constants, Toggle } from '../../../toolbox';

const { color } = constants;
console.log(color);

const Container = styled.div`
   padding-bottom: 16px;
`;

const ToggleContainer = styled.div`
   margin: 0 24px 0 32px;
   border-bottom: 1px solid ${color.grayAlpha[2]};
   transition: background 0.15s ease;
`;

const Title = styled.h2`
   margin: 16px;
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
   padding: 16px 0;

   &:nth-child(2n) {
      background: ${color.grayAlpha[1]};
   }
`;

const mapStateToProps = state => {
   return {
      flowchart: state.flowchart
   }
}

const mapDispatchToProps = dispatch => {
   return {
      toggleMultiCourse: payload => dispatch(toggleMultiCourse(payload)),
   };
};

class MultiCourseInfo extends Component {
   handleChange = (id, value) => {
      this.props.toggleMultiCourse({
         id,
         value,
         data: this.props.data,
         year: this.props.year,
         quarter: this.props.quarter,
         blockIndex: this.props.blockIndex,
      });
   };

   render() {
      const { year, quarter, blockIndex, flowchart } = this.props;
      const data = flowchart.chartData[year].quarters[quarter][blockIndex];
      const { course_data, block_metadata } = data;

      return (
         <Container>
            {course_data.map((course, index) => {
               return (
                  <Course key={`multi-course-info-${index}`}>
                     <Title>
                        {course.dept} {course.course_number}
                     </Title>
                     <ToggleContainer>
                        <Toggle
                           label="Selected "
                           checked={!!course.isActive}
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
