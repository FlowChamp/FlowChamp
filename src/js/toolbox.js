import React, { Component } from 'react';
import styled, { keyframes, css } from 'styled-components';
import Switch from 'react-ios-switch';
import LoadingIndicator from 'react-loading-indicator';

const duration = '0.3s';
const constants = {
   color: {
      blue: [
         '#EBF4FB',
         '#D6E8F7',
         '#ADD2EF',
         '#5CA4E0',
         '#0071CE',
         '#005091',
         '#00325C',
      ],
      gray: [
         '#FAFAFA',
         '#F5F5F5',
         '#EEEEEE',
         '#E1E1E2',
         '#BDBEBF',
         '#9E9FA0',
         '#757778',
         '#636567',
         '#424446',
         '#212426',
      ],
      'General Ed': '#6cff92',
      Support: '#fDDAB6',
      Major: '#FFFF99',
   },

   animation: {
      oldViewEntering: css`
         animation: slideOutRight ${duration} ease;

         @keyframes slideOutRight {
            100% {
               opacity: 0;
               transform: translateX(20%);
            }
         }
      `,
      oldViewExiting: css`
         animation: slideOutLeft ${duration} ease;

         @keyframes slideOutLeft {
            100% {
               opacity: 0;
               transform: translateX(-20%);
            }
         }
      `,
      slideInRight: keyframes`
         0% {
            opacity: 0;
            transform: translateX(10%);
         }
      `,
      slideInLeft: keyframes`
         0% {
            opacity: 0;
            transform: translateX(-20%);
         }
      `,
      fadeIn: keyframes`
         0% {
            opacity: 0;
         }
      `,
      fadeOut: keyframes`
         100% {
            opacity: 0;
         }
      `,
   },
};

const { color } = constants;

const inputs = ['text', 'password'];
const Input = styled.input`
   height: 3rem;
   width: 100%;
   padding: 0
   margin: 0 0 20px 0;
   font-size: 1rem;
   outline: none;
   border: none;
   transition: all 0.15s ease;
   box-shadow: ${props =>
      inputs.includes(props.type) ? 'inset 0 -1px 0 0 #9e9e9e' : 'none'};

   &:focus {
   box-shadow: ${props =>
      inputs.includes(props.type)
         ? 'inset 0 -2px 0 0 ' + constants.color.blue[3]
         : 'none'};
   }
`;

const ButtonContainer = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
   cursor: pointer;
   margin: 8px 0;

   h3 {
      font-weight: normal;
   }
`;

const Toggle = ({ label, checked, onChange }) => {
   return (
      <ButtonContainer onClick={() => onChange(!checked)}>
         <h3>{label}</h3>
         <Switch
            checked={checked}
            onColor={color.blue[3]}
            onChange={onChange}
         />
      </ButtonContainer>
   );
};

const Submit = styled.input.attrs({
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
      <ButtonContainer style={{ cursor: 'default' }}>
         <Submit type="submit" value={label} />
         <LoadingContainer hidden={!submitted}>
            <LoadingIndicator segmentLength={8} segmentWidth={3} />
         </LoadingContainer>
      </ButtonContainer>
   );
};

const Loader = ({ size, alignment }) => {
   const len = size === 'small' ? 4 : 8;
   const width = size === 'small' ? 2 : 3;

   return (
      <LoadingContainer alignment={alignment}>
         <LoadingIndicator segmentLength={len} segmentWidth={width} />
      </LoadingContainer>
   );
};

const Cover = styled.div`
   z-index: 20;
   position: fixed;
   top: 3.5em;
   bottom: 0;
   left: ${props => props.shift ? '20em' : 0};
   right: 0;
   display: ${props => (props.isOpen ? 'flex' : 'none')};
   align-items: center;
   justify-content: center;
   background: white;
   transition: all 0.25s ease;
   animation: ${props =>
         props.isClosing
            ? constants.animation.fadeOut
            : constants.animation.fadeIn}
      0.3s;
`;

class LoadingCover extends Component {
   state = {
      isClosing: false,
   };

   animateClosed() {
      this.setState({
         isClosing: true,
      });

      setTimeout(() => {
         this.setState({
            isClosing: false,
         });
      }, 290);
   }

   componentDidUpdate(prevProps, prevState) {
      const closeRequested = prevProps.isOpen && !this.props.isOpen;
      if (closeRequested) {
         this.animateClosed();
      }
   }

   render() {
      const { isOpen, shift } = this.props;
      const { isClosing } = this.state;

      return (
         <Cover
            shift={shift}
            isOpen={isOpen || isClosing}
            isClosing={isClosing}>
            <Loader />
         </Cover>
      );
   }
}

export { constants, Input, Toggle, Submitter, Loader, LoadingCover };
