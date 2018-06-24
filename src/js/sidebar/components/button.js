import React from 'react';
import styled from 'styled-components';
import { constants } from '../../toolbox';
import { ChevronRight } from 'react-feather';

const { color } = constants;

const Container = styled.div`
   display: flex;
   align-items: center;
   height: 4em;
   margin-left: 1em;
   padding-right: 0.5em;
   border-bottom: 1px solid ${color.gray[3]};
   box-sizing: border-box;
   margin-top: 1px;
   cursor: pointer;
   animation: fadein 0.25s ease;
   justify-content: space-between;

   &:hover {
      background: ${color.gray[1]};
   }

   @keyframes fadein {
      0% {
         opacity: 0;
      }
   }
`;

const icons = {
   ChevronRight: <ChevronRight />,
};

const Label = styled.h3`
   font-weight: normal;
   margin: 0;
`;

const Button = ({ label, icon, onClick }) => {
   const getIcon = (name) => {
      return React.cloneElement(icons[name], { color: color.gray[6] });
   };

   return (
      <Container onClick={onClick}>
         <Label>{label}</Label>
         {getIcon(icon || 'ArrowRight')}
      </Container>
   );
};

export default Button;
