import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { fetchStockCharts } from '../../../../apps/flowchart/actions';
import { pushView } from '../../actions';
import Button from '../../components/button';
import Header from '../../components/header';
import { Loader } from '../../../../toolbox';

const Container = styled.div`
   flex: 1;
   overflow: auto;
`;

const mapStateToProps = state => {
   return {
      user: state.user,
      flowchart: state.flowchart,
   };
};

const mapDispatchToProps = dispatch => {
   return {
      fetchStockCharts: () => dispatch(fetchStockCharts()),
      pushView: view => dispatch(pushView(view)),
   };
};

class ChartSelectView extends Component {
   selectChart = major => {
      this.props.pushView({
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
         return <Loader alignment="center" />;
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
      const { flowchart } = this.props;
      const { stockCharts } = flowchart;

      if (stockCharts.length === 0) {
         this.props.fetchStockCharts();
      }
   }

   render() {
      return (
         <Container>
            <Header label="New Flowchart" />
            {this.getChartButtons()}
         </Container>
      );
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChartSelectView);
