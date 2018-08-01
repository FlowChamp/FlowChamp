import React from 'react';
import styled from 'styled-components';
import { constants } from '../../../toolbox';

const { color } = constants;

const Container = styled.div`
   padding-bottom: 16px;
`;

const Title = styled.h3`
   margin: 16px 16px 8px 16px;
   color: ${props => props.color ? color[props.color][5] : 'black'};
`;

const BodyText = styled.h3`
   font-weight: 300;
   margin: 0 16px 0 24px;
`;

const Info = ({ data }) => {
   const { course_data, block_metadata } = data;

   return (
      <Container>
         <Title>Description</Title>
         <BodyText>{course_data.description}</BodyText>
         <Title color="red">Prerequisites</Title>
         <BodyText>{course_data.prereqs || 'None'}</BodyText>
         <Title color="blue">Notes</Title>
         <BodyText>{block_metadata.notes || 'None'}</BodyText>
      </Container>
   );
}

export default Info;
