import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { fetchStockCharts } from '../../../apps/flowchart/actions';
import { newSidebarView } from '../../actions';
import Button from '../../components/button';
import Header from '../../components/header';
import { Loader, constants } from '../../../toolbox';

const { animation } = constants;
const {
   oldViewEntering,
   oldViewExiting,
   slideInRight,
   slideInLeft,
} = animation;
const duration = '0.3s';

const Container = styled.div`
   display: flex;
   flex-direction: column;
   flex: 1;
   animation: ${props => (props.isPrevView ? slideInLeft : slideInRight)}
      ${duration};
   ${props => (props.enteringNewView ? oldViewExiting : null)};
   ${props => (props.enteringOldView ? oldViewEntering : null)};
`;

const mapStateToProps = state => {
   return {
      auth: state.auth,
      flowchart: state.flowchart,
   };
};

const mapDispatchToProps = dispatch => {
   return {
      fetchStockCharts: () => dispatch(fetchStockCharts()),
      newSidebarView: view => dispatch(newSidebarView(view)),
   };
};

class ChartSelectView extends Component {
   selectChart = major => {
      this.props.newSidebarView({
         name: 'chartNamer',
         props: {
            major,
         },
      });
   };

   getChartButtons = () => {
      const { flowchart } = this.props;
      const { stockCharts } = flowchart;

      if (!stockCharts) {
         return <Loader alignment="center"/>
      }
      return stockCharts.map((chart, index) => {
         const major = Object.keys(chart)[0];
         const key = chart[Object.keys(chart)[0]];
         const label = major.split('_').join(' ');

         return (
            <Button
               key={key}
               label={label}
               icon="ChevronRight"
               onClick={() => this.selectChart(major)}
            />
         );
      });
   };

   handleClick = options => {};

   componentDidMount() {
      this.props.fetchStockCharts();
   }

   render() {
      const { isPrevView, enteringNewView, enteringOldView } = this.props;

      return (
         <Container
            isPrevView={isPrevView}
            enteringNewView={enteringNewView}
            enteringOldView={enteringOldView}>
            <Header label="New Flowchart"/>
            {this.getChartButtons()}
         </Container>
      );
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChartSelectView);
