import styled from 'styled-components';
import constants from '../../constants';

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
   box-shadow: ${props =>
      inputs.includes(props.type) ? 'inset 0 -1px 0 0 #9e9e9e' : 'none'};

   &:focus {
   box-shadow: ${props =>
      inputs.includes(props.type)
         ? 'inset 0 -2px 0 0 ' + color.blue[3]
         : 'none'};
   }
`;

export default Input;
