import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Board from './components/board';
import { LoadingCover } from '../../toolbox';

const FlowchartContainer = styled.div`
   position: relative;
   overflow: auto;
   height: 100%;
`;

class Flowchart extends Component {
   constructor(props) {
      super(props);
      this.state = {
         data: [],
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
      const { sidebar } = this.props;

      return (
         <FlowchartContainer>
            <LoadingCover shift={sidebar.isOpen} isOpen={fetching} />
            <Board hide={fetching} data={data} />
         </FlowchartContainer>
      );
   }
}

const mapStateToProps = state => ({
   auth: state.auth,
   flowchart: state.flowchart,
   sidebar: state.sidebar,
});

export default connect(mapStateToProps)(Flowchart);
