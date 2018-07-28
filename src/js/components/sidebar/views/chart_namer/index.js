import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { pushView, emptyViews } from '../../actions';
import { addChart } from '../../../../user/actions';
import Header from '../../components/header';
import { constants, Input, Submitter } from '../../../../toolbox/';

const { animation } = constants;
const { fadeIn } = animation;

const Container = styled.div`
   flex: 1;
   overflow: auto;
`;

const Form = styled.form`
   display: flex;
   flex-direction: column;
   padding: 0 30px;
   margin-top: 8px;
`;

const ErrorText = styled.h3`
   font-weight: normal;
   color: red;
   animation: ${fadeIn} 0.15s ease;
`;

const mapStateToProps = state => {
   return {
      user: state.user,
   };
};

const mapDispatchToProps = dispatch => {
   return {
      pushView: view => dispatch(pushView(view)),
      addChart: data => dispatch(addChart(data)),
      emptyViews: () => dispatch(emptyViews()),
   };
};

class ChartNamerView extends Component {
   constructor(props) {
      super(props);
      this.state = {
         chartName: null,
         active_chart: props.user.config.active_chart,
         addedChart: false,
      };
   }

   static getDerivedStateFromProps(nextProps, prevState) {
      const { active_chart } = nextProps.user.config;

      if (nextProps.user.config.active_chart !== prevState.active_chart) {
         return {
            active_chart,
            addedChart: true,
         };
      }
      return null;
   }

   handleSubmit = e => {
      e.preventDefault();
      const { config } = this.props.user;
      const { chartName } = this.state;

      this.props.addChart({
         config,
         name: chartName,
         major: this.props.major,
      });
   };

   handleChange = e => {
      this.setState({ chartName: e.target.value });
   };

   componentDidMount() {
      const { config } = this.props.user;
      const { active_chart } = config;

      this.setState({ active_chart });
   }

   componentDidUpdate() {
      if (this.state.addedChart) {
         this.props.emptyViews();
         this.setState({ addedChart: false });
      }
   }

   render() {
      const { user } = this.props;

      return (
         <Container>
            <Header label="Give It a Name" />
            <Form onSubmit={this.handleSubmit}>
               <Input
                  type="text"
                  required
                  placeholder="Chart name"
                  onChange={this.handleChange}
               />
               <Submitter label="Save chart" submitted={user.updatingConfig} />
               <ErrorText>{user.error}</ErrorText>
            </Form>
         </Container>
      );
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChartNamerView);
