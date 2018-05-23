import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { newSidebarView } from '../../actions';
import ChartSelector from './chart_selector';
import { constants } from '../../../toolbox';

const { animation } = constants;
const {
   oldViewEntering,
   oldViewExiting,
   slideInLeft,
} = animation;
const duration = '0.3s';

const Container = styled.div`
   display: flex;
   flex-direction: column;
   flex: 1;
   animation: ${props => (props.isPrevView ? slideInLeft : null)}
      ${duration};
   ${props => (props.enteringNewView ? oldViewExiting : null)};
   ${props => (props.enteringOldView ? oldViewEntering : null)};
`;

const mapStateToProps = state => {
   return {
      auth: state.auth,
   };
};

const mapDispatchToProps = dispatch => {
   return {
      newSidebarView: view => dispatch(newSidebarView(view)),
   };
};

class MainView extends Component {
   render() {
      const { isPrevView, enteringNewView, enteringOldView } = this.props;

      return (
         <Container
            isPrevView={isPrevView}
            enteringNewView={enteringNewView}
            enteringOldView={enteringOldView}>
            <ChartSelector />
         </Container>
      );
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
