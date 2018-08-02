import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { popPopup } from '../actions';
import { Icon, constants } from '../../../toolbox';

const { color } = constants;

const Container = styled.div`
   position: relative;
   min-height: 6em;
   display: flex;
   background: ${props => color[props.courseType]};
`;

const TitleContainer = styled.div`
   flex: 1;
`;

const Title = styled.h1`
   margin: 24px 0 16px 24px;
   font-weight: bold;
`;

const Subtitle = styled.h3`
   margin: 0 16px 8px 24px;
   font-weight: 300;
   color: rgba(0, 0, 0, 0.8);
`;

const Units = styled.h3`
   margin: 0 16px 16px 0;
   font-weight: 200;
`;

const CourseType = styled.h3`
   margin: 0 16px 0 0;
   font-weight: 200;
`;

const ActionContainer = styled.div`
   flex: 1;
   max-width: 10em;
   text-align: right;

   svg {
      height: 32px;
      width: 32px;
      margin: 4px;
      padding: 8px;
      cursor: pointer;
      border-radius: 50%;
      transition: background 0.15s ease;

      &:hover {
         background: ${color.grayAlpha[2]};
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
      popPopup: () => dispatch(popPopup()),
   };
};

class Header extends Component {
   close = () => {
      this.props.popPopup();
   };

   render() {
      const { year, quarter, blockIndex, flowchart } = this.props;
      const data = flowchart.chartData[year].quarters[quarter][blockIndex];
      const { block_metadata, course_data } = data;
      const { course_type, elective_title } = block_metadata;
      const multiCourse = Array.isArray(course_data);
      const hasCourseData = course_data !== undefined;

      return (
         <Container courseType={course_type}>
            <TitleContainer>
               <Title>
                  {multiCourse
                     ? 'Multiple Courses Available'
                     : hasCourseData
                        ? `${course_data.dept} ${course_data.course_number}`
                        : elective_title || block_metadata.course_type}
               </Title>
               <Subtitle>
                  {multiCourse
                     ? `Select a predetermined course from the following list:`
                     : hasCourseData
                        ? `${course_data.title}`
                        : `Select a ${
                             block_metadata.course_type
                          } course below:`}
               </Subtitle>
            </TitleContainer>
            <ActionContainer>
               <Icon name="x" onClick={this.props.popPopup} />
               <CourseType>{block_metadata.course_type}</CourseType>
               <Units>
                  {multiCourse
                     ? '4'
                     : hasCourseData
                        ? `${course_data.units} `
                        : '4 '}
                  Units
               </Units>
            </ActionContainer>
         </Container>
      );
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
