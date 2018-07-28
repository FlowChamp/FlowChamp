import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Board from './components/board';

const FlowchartContainer = styled.div`
   position: relative;
   overflow: auto;
   height: 100%;
`;

class Flowchart extends Component {
   constructor(props) {
      super(props);
      this.state = {
         data: props.flowchart.chartData,
         fetching: props.flowchart.fetching
      };
   }

   static getDerivedStateFromProps(nextProps, prevState) {
      const { flowchart } = nextProps;
      return {
         fetching: flowchart.fetching,
         data: flowchart.chartData,
      };
   }

   handleEvent = options => {
      switch (options.type) {
         default:
            this.props.onEvent(options);
            break;
      }
   };

   render() {
      const { fetching, data } = this.state;

      return (
         <FlowchartContainer>
            <Board hide={fetching} data={data} />
         </FlowchartContainer>
      );
   }
}

const mapStateToProps = state => ({
   user: state.user,
   flowchart: state.flowchart,
   sidebar: state.sidebar,
});

export default connect(mapStateToProps)(Flowchart);
