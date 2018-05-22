import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import LoginForm from './login_form';
import { oldSidebarView, newSidebarView } from '../../actions';
import { constants } from '../../../toolbox';

const { animation } = constants;
const { oldViewEntering, oldViewExiting, slideInRight } = animation;
const duration = '0.3s';

const Container = styled.div`
   display: flex;
   flex-direction: column;
   flex: 1;
   padding-top: 1em;
   animation: ${slideInRight} ${duration};
   ${props => props.enteringNewView ? oldViewExiting : null};
   ${props => props.enteringOldView ? oldViewEntering : null};
`;

const Logo = styled.img`
   width: 80%;
   margin: 1em auto;
`;

const mapStateToProps = state => {
   return {
      auth: state.auth,
      sidebar: state.sidebar,
   };
};

const mapDispatchToProps = dispatch => {
   return {
      oldSidebarView: () => dispatch(oldSidebarView()),
      newSidebarView: view => dispatch(newSidebarView(view)),
   };
};

class LoginView extends Component {
   componentDidUpdate() {
      const { auth, sidebar } = this.props;
      const { viewStack } = sidebar;
      const currentView = viewStack[viewStack.length - 1];

      if (auth.loggedIn) {
         if (currentView.route) {
            this.props.newSidebarView({
               name: currentView.route,
               props: {},
               popStack: true,
            });
         } else {
            this.props.oldSidebarView();
         }
      }
   }

   render() {
      const { enteringNewView, enteringOldView } = this.props;

      return (
         <Container enteringNewView={enteringNewView} enteringOldView={enteringOldView}>
            <Logo src="images/icons/logo_text.svg" />
            <LoginForm />
         </Container>
      );
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
