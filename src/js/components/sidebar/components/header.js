import React from 'react';
import styled from 'styled-components';
import { constants } from '../../../toolbox/';

const { color } = constants;

const Container = styled.div`
   display: flex;
   align-items: center;
   height: 4em;
`;

const Label = styled.h2`
   font-weight: normal;
   font-size: 1.25rem;
   flex: 1;
   padding: 1em;
   border-bottom: 1px solid ${color.gray[3]};
   box-sizing: border-box;
   color: ${color.gray[6]}
   letter-spacing: 1px;
   text-transform: uppercase;
`;

const Header = ({ label }) => {
   return (
      <Container>
         <Label>{label}</Label>
      </Container>
   );
};

export default Header;
