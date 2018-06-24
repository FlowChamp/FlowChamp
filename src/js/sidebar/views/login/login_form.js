import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Input, Toggle, Submitter } from '../../../toolbox';
import { logIn } from '../../../user/actions';

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
   return { auth: state.auth }
}

const mapDispatchToProps = dispatch => {
   return {
      logIn: credentials => dispatch(logIn(credentials)),
   }
}

class LoginForm extends Component {
   constructor(props) {
      super(props);
      const { config } = props.auth;

      this.state = {
         remember: false,
         username: config ? config.username : null,
         password: null,
      };
   }

   toggleRemember = value => {
      this.setState({ remember: value });
   };

   handleSubmit = e => {
      e.preventDefault();
      const { username, password, remember } = this.state;

      this.props.logIn({
         username,
         password,
         remember
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
      const { auth } = this.props;
      const { username } = this.state || auth.config || null;

      return (
         <Form onSubmit={this.handleSubmit}>
            <Input
               type="text"
               placeholder="Username"
               required
               autoFocus={!username}
               value={username || ''}
               onChange={this.handleUsernameChange}
            />
            <Input
               type="password"
               placeholder="Password"
               required
               autoFocus={username && username.length}
               onChange={this.handlePasswordChange}
            />
            <Toggle
               label="Remember me"
               checked={remember}
               onChange={this.toggleRemember}
            />
            <Submitter label="Log In" submitted={auth.loggingIn} />
            <ErrorText>{auth.error}</ErrorText>
         </Form>
      );
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
