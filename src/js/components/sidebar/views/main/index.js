import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import ChartSelector from './chart_selector';

const Container = styled.div`
   display: flex;
   flex-direction: column;
   flex: 1;
`;

const LogoContainer = styled.div`
   padding: 24px 0 0 20px;
`;

const Logo = styled.img``;

const mapStateToProps = state => {
   return {
      user: state.user,
   };
};

class MainView extends Component {
   render() {
      return (
         <Container>
            <LogoContainer>
               <Logo src="images/icons/logo_text.svg" />
            </LogoContainer>
            <ChartSelector />
         </Container>
      );
   }
}

export default connect(mapStateToProps)(MainView);
