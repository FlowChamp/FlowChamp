import React from 'react';
import styled from 'styled-components';
import Switch from 'react-ios-switch';
import LoadingIndicator from 'react-loading-indicator';

const constants = {
   color: {
      blue: ["#EBF4FB", "#D6E8F7", "#ADD2EF", "#5CA4E0", "#0071CE", "#005091", "#00325C"],
      gray: ["#FAFAFA", "#F5F5F5", "#EEEEEE", "#E1E1E2", "#BDBEBF", "#9E9FA0", "#757778", "#636567", "#424446", "#212426"]
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

   h3 {
      font-family: "SF Pro Display";
      font-weight: normal;
   }
`;

const Toggle = ({ label, checked, onChange }) => {
   return (
      <ButtonContainer onClick={() => onChange(!checked)}>
         <h3>{label}</h3>
         <Switch checked={checked} onColor={color.blue[3]} onChange={onChange} />
      </ButtonContainer>
   );
}

const Submit = styled.input.attrs({
   type: 'submit'
})`
   font-size: 1.2rem;
   padding: 12px 16px;
   color: ${color.blue[3]};
   border: 2px solid ${color.blue[3]};
   border-radius: 8px;
   cursor: pointer;
   outline: none;

   &:active, &:focus {
   color: white;
   background: ${color.blue[3]}
   }
`;

const LoadingContainer = styled.div`
   transition: all 0.15s ease;
   opacity: ${props => props.hide ? 0 : 1}
   user-select: none;
`;

const Submitter = ({ label, submitted, onSubmit }) => {
   return (
      <ButtonContainer style={{cursor: 'default'}}>
         <Submit type="submit" value={label}/>
         <LoadingContainer hidden={!submitted}>
            <LoadingIndicator segmentLength={8} segmentWidth={3} />
         </LoadingContainer>
      </ButtonContainer>
   );
}

export { constants, Input, Toggle, Submitter };
