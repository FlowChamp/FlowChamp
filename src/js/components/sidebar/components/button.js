import React from 'react';
import styled from 'styled-components';
import { constants } from '../../../toolbox';
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
   justify-content: space-between;

   &:hover {
      background: ${color.gray[1]};
   }
`;

const icons = {
   ChevronRight: <ChevronRight />,
};

const LabelContainer = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
`;

const Label = styled.h3`
   font-weight: normal;
   margin: 0;
`;

const SubLabel = styled.h4`
   font-weight: 300;
   margin: 0;
   color: ${color.gray[6]};
`;

const Button = ({ label, subLabel, icon, onClick }) => {
   const getIcon = (name) => {
      return React.cloneElement(icons[name], { color: color.gray[6] });
   };

   return (
      <Container onClick={onClick}>
         <LabelContainer>
            <Label>{label}</Label>
            <SubLabel>{subLabel}</SubLabel>
         </LabelContainer>
         {getIcon(icon || 'ArrowRight')}
      </Container>
   );
};

export default Button;
