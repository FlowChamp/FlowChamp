import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import LoginForm from './login_form';
import { pushView, popView } from '../../actions';

const Container = styled.div`
   display: flex;
   flex-direction: column;
   flex: 1;
   padding-top: 1em;
`;

const Logo = styled.img`
   width: 80%;
   margin: 1em auto;
`;

const mapStateToProps = state => {
   return {
      user: state.user,
      sidebar: state.sidebar,
   };
};

const mapDispatchToProps = dispatch => {
   return {
      popView: () => dispatch(popView()),
      pushView: view => dispatch(pushView(view)),
   };
};

class LoginView extends Component {
   componentDidUpdate() {

      /*
      const { sidebar } = this.props;
      const { viewStack } = sidebar;
      const currentView = viewStack[viewStack.length - 1];

      if (user.loggedIn) {
         if (currentView.route) {
            this.props.pushView({
               name: currentView.route,
               props: {},
               popView: true,
            });
         } else {
            this.props.popView();
         }
         }
        */
   }

   render() {
      return (
         <Container>
            <Logo src="images/icons/logo_text.svg" />
            <LoginForm />
         </Container>
      );
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
