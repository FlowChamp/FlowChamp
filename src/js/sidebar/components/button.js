import React from 'react';
import styled from 'styled-components';
import { constants } from '../../toolbox';

const { color } = constants;

const Container = styled.div`
   display: flex;
   align-items: center;
   height: 3em;
   padding-left: 1em;
   border-bottom: 1px solid ${color.gray[1]};
   cursor: pointer;
   animation: fadein 0.25s ease;

   &:hover {
      background: ${color.gray[1]};
   }

   @keyframes fadein {
      0% {
         opacity: 0;
      }
   }
`;

const Label = styled.h3`
   font-family: 'SF Pro Display';
   font-weight: normal;
   margin: 0;
`;

const Button = ({ label, icon, onClick }) => {
   return (
      <Container onClick={onClick}>
         <Label>{label}</Label>
         {icon}
      </Container>
   );
};

export default Button;
