import React from 'react';
import styled from 'styled-components';
import LoadingIndicator from 'react-loading-indicator';

const Container = styled.div`
   transition: all 0.15s ease;
   opacity: ${props => (props.hidden ? 0 : 1)}
   user-select: none;
   display: flex;
   padding: 8px 0;
   justify-content: ${props => props.alignment || 'flex-start'}
`;

const Loader = ({ size, alignment }) => {
   const len = size === 'small' ? 4 : 8;
   const width = size === 'small' ? 2 : 3;

   return (
      <Container alignment={alignment}>
         <LoadingIndicator segmentLength={len} segmentWidth={width} />
      </Container>
   );
};

export default Loader;
