import React from 'react';
import styled from 'styled-components';
import { constants } from '../../../../toolbox';

const { color } = constants;

const ContentContainer = styled.div`
   display: flex;
   flex-direction: column;
   border-radius: 4px;
   height: 115px;
   width: 8.5em;
   background: ${props => color[props.color] || 'dodgerblue'};
   box-shadow: 0 1px 4px rgba(0, 0, 0, 0.14);
   padding: 20px 15px;

   &:hover {
      box-shadow: 0 4px 9px rgba(0, 0, 0, 0.2);
   }
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
   padding-bottom: 5px;
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

const BlockContents = ({ data }) => {
   const { block_metadata, course_data } = data;

   //console.log(course_data);
   const { dept, course_number, title, units } = course_data;
   const multiCourse = Array.isArray(course_data);

   return (
      <ContentContainer color={block_metadata.course_type}>
         <Header>
            {multiCourse ? 'Multi Course' : `${dept} ${course_number}`}
         </Header>
         <Body>
         <CourseTitle>{multiCourse ? 'Multi' : `${title}`}</CourseTitle>
         </Body>
         <UnitCount>{multiCourse ? '4 Units' : `${units} units`}</UnitCount>
      </ContentContainer>
   );
};

export default BlockContents;
