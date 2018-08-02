import React from 'react';
import styled from 'styled-components';
import { Icon, constants } from '../../../../toolbox/';

const { color } = constants;

const ContentContainer = styled.div`
   display: flex;
   flex-direction: column;
   border-radius: 4px;
   flex: 1;
   background: ${props => color[props.color] || 'dodgerblue'};
   padding: 20px 15px;
`;

const Header = styled.h3`
   margin: 0;
   font-weight: bold;
`;

const Body = styled.div`
   display: flex;
   align-items: flex-start;
   flex: 1;
   overflow: auto;
   margin-bottom: 6px;
`;

const CourseTitle = styled.h4`
   margin: 0;
   padding: 5px 0;
   font-weight: 300;
`;

const UnitCount = styled.h4`
   margin: 0;
   font-weight: normal;
`;

const FlexRow = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
   height: 13px;

   svg {
      height: 24px;
      width: 24px;
   }
`;

const BlockContents = ({ data }) => {
   const { block_metadata, course_data } = data;

   const multiCourse = Array.isArray(course_data);
   const hasCourseData = course_data !== undefined;
   let multiCourseData = null;
   let multiCourseUnits = 4;

   if (multiCourse) {
      for (let course of course_data) {
         multiCourseUnits = course.units;
         if (course._id === block_metadata.activeId) {
            multiCourseData = course;
         }
      }
   }

   return (
      <ContentContainer color={block_metadata.course_type}>
         <Header>
            {multiCourse
               ? multiCourseData
                  ? `${multiCourseData.dept} ${multiCourseData.course_number}`
                  : 'Multi Course'
               : hasCourseData
                  ? `${course_data.dept} ${course_data.course_number}`
                  : block_metadata.course_type}
         </Header>
         <Body>
            <CourseTitle>
               {multiCourse
                  ? multiCourseData
                     ? multiCourseData.title
                     : 'Click to Specify'
                  : hasCourseData
                     ? `${course_data.title}`
                     : 'Click to Specify'}
            </CourseTitle>
         </Body>
         <FlexRow>
            <UnitCount>
               {multiCourse
                  ? multiCourseUnits
                  : hasCourseData
                     ? `${course_data.units}`
                     : 4}{' '}
               Units
            </UnitCount>
            {multiCourse && <Icon name="list" />}
         </FlexRow>
      </ContentContainer>
   );
};

export default BlockContents;
