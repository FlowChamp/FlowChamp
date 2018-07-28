import React from 'react';
import styled from 'styled-components';
import Switch from 'react-ios-switch';
import color from '../../constants';

const Container = styled.div`
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
      <Container onClick={() => onChange(!checked)}>
         <h3>{label}</h3>
         <Switch
            checked={checked}
            onColor={color.blue[3]}
            onChange={onChange}
         />
      </Container>
   );
};

export default Toggle;
