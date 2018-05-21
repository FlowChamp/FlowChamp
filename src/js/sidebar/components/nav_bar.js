import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Menu, ArrowLeft, UserPlus, UserMinus } from 'react-feather';
import { toggleSidebar, newSidebarView, oldSidebarView } from '../actions';
import { logOut } from '../../auth/actions';
import { constants } from '../../toolbox';

const { color } = constants;

const Container = styled.div`
   position: relative;
   display: flex;
   height: 3.5em;
   width: 100%;
   background: ${color.gray[0]};
   border-bottom: 1px solid ${color.gray[3]};
`;

const ButtonContainer = styled.div`
   display: flex;
   flex: 1;
   justify-content: ${props => props.justify || 'flex-start'};
   align-items: center;
   padding: 0 1em;

   svg {
      cursor: pointer;
   }
`;

const IconContainer = styled.div`
   height: 100%;
   display: flex;
   align-items: center;
   opacity: ${props => props.hide ? 0 : 1};
   pointer-events: ${props => props.hide ? 'none' : 'default'};
   transition: all 0.15s ease;
`;

const mapStateToProps = state => {
   return {
      sidebar: state.sidebar,
      auth: state.auth
   };
};

const mapDispatchToProps = dispatch => {
   return {
      toggleSidebar: value => dispatch(toggleSidebar(value)),
      newSidebarView: view => dispatch(newSidebarView(view)),
      oldSidebarView: () => dispatch(oldSidebarView()),
      logOut: config => dispatch(logOut(config)),
   };
};

class NavBar extends Component {
   newView = (name, props) => {
      this.props.newSidebarView({
         name,
         props: props || {},
      });
   };

   logOut = () => {
      const { config } = this.props.auth;

      this.props.logOut(config);
   };

   render() {
      const { auth, sidebar } = this.props;
      const { loggedIn } = auth;
      const { viewStack } = sidebar;
      const onMainView = viewStack.length === 1;

      return (
         <Container>
            <ButtonContainer>
               <Menu size={30} onClick={() => this.props.toggleSidebar(false)} />
               <IconContainer hide={onMainView}>
                  <ArrowLeft size={30} onClick={this.props.oldSidebarView} />
               </IconContainer>
            </ButtonContainer>
            <ButtonContainer justify="flex-end">
               <IconContainer hide={!onMainView}>
                  {loggedIn ? (
                     <UserMinus size={30} onClick={this.logOut} />
                  ) : (
                     <UserPlus size={30} onClick={() => this.newView('login')} />
                  )}
               </IconContainer>
            </ButtonContainer>
         </Container>
      );
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
