import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { newSidebarView, emptySidebar } from '../../actions';
import { addChart } from '../../../user/actions';
import Header from '../../components/header';
import { Input, Submitter, constants } from '../../../toolbox';
//import Button from '../../components/button';

const { animation } = constants;
const {
   oldViewEntering,
   oldViewExiting,
   slideInRight,
   slideInLeft,
} = animation;
const duration = '0.3s';

const Container = styled.div`
   flex: 1;
   overflow: auto;
   animation: ${props => (props.isPrevView ? slideInLeft : slideInRight)}
      ${duration};
   ${props => (props.enteringNewView ? oldViewExiting : null)};
   ${props => (props.enteringOldView ? oldViewEntering : null)};
`;

const Form = styled.form`
   display: flex;
   flex-direction: column;
   padding: 0 30px;
   margin-top: 8px;
`;

const ErrorText = styled.h3`
   font-family: 'SF Pro Display';
   font-weight: normal;
   color: red;
   animation: fadeIn 0.15s ease;

   @keyframes fadeIn {
      from {
         opacity: 0;
      }
   }
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
      };
   }

   static getDerivedStateFromProps(nextProps, prevState) {
      const { active_chart } = nextProps.auth.config;

      if (nextProps.auth.config.active_chart !== prevState.active_chart) {
         return {
            active_chart,
            addedChart: true,
         };
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
         major: this.props.major,
      });
   };

   handleChange = e => {
      this.setState({ chartName: e.target.value });
   };

   componentDidMount() {
      const { config } = this.props.auth;
      const { active_chart } = config;

      this.setState({ active_chart });
   }

   componentDidUpdate() {
      if (this.state.addedChart) {
         this.props.emptySidebar();
         this.setState({ addedChart: false });
      }
   }

   render() {
      const { auth, isPrevView, enteringNewView, enteringOldView } = this.props;

      return (
         <Container
            isPrevView={isPrevView}
            enteringNewView={enteringNewView}
            enteringOldView={enteringOldView}>
            <Header label="Give It a Name" />
            <Form onSubmit={this.handleSubmit}>
               <Input
                  type="text"
                  autoFocus
                  required
                  placeholder="Chart name"
                  onChange={this.handleChange}
               />
               <Submitter label="Save chart" submitted={auth.updatingConfig} />
               <ErrorText>{auth.error}</ErrorText>
            </Form>
         </Container>
      );
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChartNamerView);
