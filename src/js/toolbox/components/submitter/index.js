import React from 'react';
import styled from 'styled-components';
import constants from '../../constants';
import LoadingIndicator from 'react-loading-indicator';

const { color } = constants;

const Container = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
   cursor: pointer;
   margin: 8px 0;

   h3 {
      font-weight: normal;
   }
`;

const Input = styled.input.attrs({
   type: 'submit',
})`
   font-size: 1.2rem;
   padding: 12px 16px;
   color: white;
   border: none;
   background: ${color.blue[3]};
   border-radius: 8px;
   font-weight: 300;
   cursor: pointer;
   outline: none;
   transition: all 0.15s ease;

   &:focus {
      filter: brightness(1.1);
   }

   &:active {
      background: ${color.blue[4]};
   }
`;

const LoadingContainer = styled.div`
   transition: all 0.15s ease;
   opacity: ${props => (props.hidden ? 0 : 1)}
   user-select: none;
   display: flex;
   padding: 8px 0;
   justify-content: ${props => props.alignment || 'flex-start'}
`;

const Submitter = ({ label, submitted, onSubmit }) => {
   return (
      <Container style={{ cursor: 'default' }}>
         <Input type="submit" value={label} />
         <LoadingContainer hidden={!submitted}>
            <LoadingIndicator segmentLength={8} segmentWidth={3} />
         </LoadingContainer>
      </Container>
   );
};

export default Submitter;
