import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Input, Toggle, Submitter } from '../../../../toolbox';
import { popView } from '../../actions';
import { logIn } from '../../../../user/actions';

const Form = styled.form`
   display: flex;
   flex-direction: column;
   padding: 0 30px;
`;

const ErrorText = styled.h3`
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
   return { user: state.user }
}

const mapDispatchToProps = dispatch => {
   return {
      logIn: credentials => dispatch(logIn(credentials)),
      popView: () => dispatch(popView()),
   }
}

class LoginForm extends Component {
   constructor(props) {
      super(props);
      const { config } = props.user;

      this.state = {
         remember: false,
         username: config ? config.username : null,
         password: null,
         error: null,
      };
   }

   toggleRemember = value => {
      this.setState({ remember: value });
   };

   handleSubmit = e => {
      e.preventDefault();
      const { username, password, remember } = this.state;

      this.setState({ error: null });
      this.props.logIn({
         username,
         password,
         remember
      }).then(() => {
         this.props.popView();
      }).catch(error => {
         this.setState({ error });
      });
   };

   handleUsernameChange = e => {
      this.setState({ username: e.target.value });
   };

   handlePasswordChange = e => {
      this.setState({ password: e.target.value });
   };

   render() {
      const { remember } = this.state;
      const { user } = this.props;
      const { username } = this.state || user.config || null;

      return (
         <Form onSubmit={this.handleSubmit}>
            <Input
               type="text"
               placeholder="Username"
               required
               value={username || ''}
               onChange={this.handleUsernameChange}
            />
            <Input
               type="password"
               placeholder="Password"
               required
               onChange={this.handlePasswordChange}
            />
            <Toggle
               label="Remember me"
               checked={remember}
               onChange={this.toggleRemember}
            />
            <Submitter label="Log In" submitted={user.loggingIn} />
            <ErrorText>{this.state.error && this.state.error}</ErrorText>
         </Form>
      );
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
