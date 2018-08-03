import React from 'react';
import styled, { css } from 'styled-components';
import constants from '../../constants';
import Icon from '../icon';

const { color } = constants;

const Container = styled.div`
   display: flex;
   min-height: 48px;
   border-bottom: ${props => props.hideBorder || '1px solid ' + color.gray[3]};
   cursor: pointer;
   padding: ${props => props.padding};

   &:active {
      background: ${color.gray[2]};
   }
`;

const TextContainer = styled.div`
   flex: 1;

   ${props =>
      !props.hasSublabel &&
      css`
         display: flex;
         flex-direction: column;
         justify-content: center;
      `} h2,
   h4 {
      font-weight: normal;
      color: ${props =>
         props.theme && props.theme.length
            ? color[props.theme][4]
            : color.black};
      color: ${props => props.isPlaying && color.red[4]};
      user-select: none;
   }
   h4 {
      font-weight: 300;
   }
`;

const Label = styled.h2`
   margin: 0;
   font-size: 1.3rem;
`;

const SubLabel = styled.h4`
   margin: 0;
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
   max-width: 14rem;
`;

const OptionsContainer = styled.div`
   height: 3em;
   width: 3em;
   display: flex;
   justify-content: center;
   align-items: center;

   svg {
      height: 20px;
      width: 20px;
   }
`;

const ChevronContainer = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;

   svg {
      color: ${color.gray[4]};
      height: 20px;
      width: 20px;
   }
`;

const Button = ({
   index,
   theme,
   label,
   sublabel,
   showIndex,
   hideBorder,
   padding,
   isPlaying,
   OptionsMenu,
   onClick,
   chevron,
   onOptionsClick,
}) => {
   const handleOptionsClick = e => {
      e.stopPropagation();
      onOptionsClick();
   };

   return (
      <Container onClick={onClick} hideBorder={hideBorder} padding={padding}>
         <TextContainer
            isPlaying={isPlaying}
            theme={theme}
            hasSublabel={!!sublabel}>
            <Label>{label}</Label>
            <SubLabel>{sublabel}</SubLabel>
         </TextContainer>
         {OptionsMenu && (
            <OptionsContainer onClick={handleOptionsClick}>
               <Icon name="more-horizontal" />
            </OptionsContainer>
         )}
         {chevron && (
            <ChevronContainer>
               <Icon name="chevron-right" />
            </ChevronContainer>
         )}
      </Container>
   );
};

export default Button;
