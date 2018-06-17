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
   state = {
      data: [],
   };

   static getDerivedStateFromProps(nextProps, prevState) {
      const { flowchart } = nextProps;
      return {
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
      const { data } = this.state;
      const { auth, sidebar } = this.props;

      return (
         <FlowchartContainer>
            <LoadingCover shift={sidebar.isOpen} isOpen={auth.changingChart} />
            <Board hide={auth.changingChart} data={data} />
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
