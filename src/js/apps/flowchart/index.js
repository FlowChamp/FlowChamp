import React, { Component } from 'react';
import styled from 'styled-components';
import YearContainer from './containers/year_container';

const FlowchartContainer = styled.div`
   display: flex;
   flex: 1;
`;

export default class Flowchart extends Component {
   handleEvent = options => {
      switch(options.type) {
         default:
            this.props.onEvent(options);
            break;
      }
   }

   render() {
      return (
         <FlowchartContainer>
            <YearContainer onEvent={this.handleEvent} />
         </FlowchartContainer>
      );
   }
}
