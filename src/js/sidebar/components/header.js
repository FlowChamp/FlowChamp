import React from 'react';
import styled from 'styled-components';
//import { constants } from '../../toolbox';

const Container = styled.div`
   display: flex;
   align-items: center;
   height: 4em;
`;

const Label = styled.h2`
   font-size: 2em
   font-weight: 500;
   font-family: 'SF Pro Display';
   margin: 0 0.5em;
`;

const Header = ({ label }) => {
   return (
      <Container>
         <Label>{label}</Label>
      </Container>
   );
};

export default Header;
