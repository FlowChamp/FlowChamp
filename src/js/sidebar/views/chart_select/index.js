import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { fetchStockCharts } from '../../../apps/flowchart/actions';
import { newSidebarView } from '../../actions';
import Button from '../../components/button';

const Container = styled.div`
   display: flex;
   flex-direction: column;
   flex: 1;
   padding-top: 1em;
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
         return;
      }
      return stockCharts.map((chart, index) => {
         const major = Object.keys(chart)[0];
         const key = chart[Object.keys(chart)[0]];
         const label = major.split('_').join(' ');

         return (
            <Button
               key={key}
               label={label}
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
      return <Container>{this.getChartButtons()}</Container>;
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChartSelectView);
