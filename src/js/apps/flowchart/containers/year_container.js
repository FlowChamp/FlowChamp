import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
   display: flex;
   flex: 1;
`;

export default class YearContainer extends Component {
   handleEvent = options => {
      switch (options.type) {
         default:
            this.props.onEvent(options);
            break;
      }
   };

   render() {
      return (
         <Container>

         </Container>
      );
   }
}
