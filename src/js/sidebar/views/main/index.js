import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { newSidebarView } from '../../actions';
import ChartSelector from './chart_selector';

const Container = styled.div`
   display: flex;
   flex-direction: column;
   flex: 1;
   padding-top: 1em;
`;

const Logo = styled.img`
   width: 40%;
   margin: 1em auto;
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
      return (
         <Container>
            <Logo src="images/icons/logo_fancy.svg" />
            <ChartSelector />
         </Container>
      );
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
