import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { newSidebarView, emptySidebar } from '../../actions';
import { addChart } from '../../../user/actions';
import { Input, Submitter } from '../../../toolbox';
//import Button from '../../components/button';

const Container = styled.div`
   display: flex;
   flex-direction: column;
   flex: 1;
   padding-top: 1em;
`;

const Form = styled.form`
   display: flex;
   flex-direction: column;
   padding: 0 30px;
`;

const mapStateToProps = state => {
   return {
      auth: state.auth,
   };
};

const mapDispatchToProps = dispatch => {
   return {
      newSidebarView: view => dispatch(newSidebarView(view)),
      addChart: data => dispatch(addChart(data)),
      emptySidebar: () => dispatch(emptySidebar()),
   };
};

class ChartNamerView extends Component {
   constructor(props) {
      super(props);
      this.state = {
         chartName: null,
         active_chart: props.auth.config.active_chart,
         addedChart: false,
      }
   }

   static getDerivedStateFromProps(nextProps, prevState) {
      const { active_chart } = nextProps.auth.config;

      if (nextProps.auth.config.active_chart !== prevState.active_chart) {
         return {
            active_chart,
            addedChart: true
         }
      }
      return null;
   }

   handleSubmit = e => {
      e.preventDefault();
      const { config } = this.props.auth;
      const { chartName } = this.state;

      this.props.addChart({
         config,
         name: chartName,
         major: this.props.major
      });
   };

   handleChange = e => {
      this.setState({ chartName: e.target.value });
   }

   componentDidMount() {
      const { config } = this.props.auth;
      const { active_chart } = config;

      this.setState({ active_chart });
   }

   componentDidUpdate() {
      if (this.state.addedChart) {
         this.props.emptySidebar();
      }
   }

   render() {
      const { auth } = this.props;

      return (
         <Container>
            <Form onSubmit={this.handleSubmit}>
               <Input type="text" placeholder="Chart name" onChange={this.handleChange} />
               <Submitter label="Save chart" submitted={auth.addingChart} />
            </Form>
         </Container>
      );
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChartNamerView);
