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
   animation: slideIn 0.35s ease;
   cursor: pointer;

   &:hover {
      background: ${color.gray[1]};
   }

   @keyframes slideIn {
      0% {
         transform: translateX(10%);
         opacity: 0;
      }
   }
`

const Label = styled.h3`
   font-family: "SF Pro Display";
   font-weight: normal;
   margin: 0;
`;

const Button = ({ label, icon, onEvent }) => {
   return (
      <Container>
         <Label>{label}</Label>
         {icon}
      </Container>
   )
}

export default Button;
