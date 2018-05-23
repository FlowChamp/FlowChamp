import React, { Component } from 'react';
import { connect } from 'react-redux';
import HamburgerMenu from 'react-hamburger-menu';
import { ArrowLeft } from 'react-feather';
import styled from 'styled-components';
import { toggleSidebar, newSidebarView, oldSidebarView } from '../sidebar/actions';
import { logOut } from '../user/actions';
import { constants } from '../toolbox';

const { color } = constants;

const Logo = styled.img`
   margin: 0 16px;
   margin-top: 4px;
   width: 100px;
   display: ${props => (props.hidden ? 'none' : 'block')};
   pointer-events: none;
   user-select: none;
`;

const Container = styled.div`
   position: fixed;
   top: 0;
   left: 0;
   right: 0;
   display: flex;
   flex: 1;
   align-items: center;
   height: 3.5em;
   background: ${color.gray[0]};
   border-bottom: 1px solid ${color.gray[3]};
   box-sizing: border-box;
   padding-right: 1em;
`;

const TextButton = styled.h3`
   font-family: 'SF Pro Display';
   font-weight: normal;
   cursor: pointer;
`;

const SectionContainer = styled.div`
   display: flex;
   justify-content: ${props => props.justifyContent || 'flex-start'}
   align-items: center;
   flex: 1;
   height: 100%;
`;

const MenuContainer = styled.div`
   height: 100%;
   width: 3em;
   display: flex;
   justify-content: center;
   align-items: center;
   border-right: 1px solid ${color.gray[3]};
   cursor: pointer;
`;

const BackButtonContainer = styled.div`
   height: 100%;
   width: 3.5em;
   display: flex;
   justify-content: center;
   align-items: center;
   opacity: ${props => (props.hidden ? 0 : 1)};
   pointer-events: ${props => (props.hidden ? 'none' : 'all')};
   transition: all 0.15s ease;
   margin-left: ${props => (props.hidden ? '-3.5em' : '0')};
   z-index: ${props => (props.hidden ? '-1' : null)};

   svg {
      stroke-width: 1.5;

      &:hover {
         color: ${color.gray[5]};
      }
   }
`;

const MenuButton = ({ isOpen, menuClicked }) => {
   return (
      <HamburgerMenu
         height={15}
         width={24}
         borderRadius={8}
         strokeWidth={3}
         color={color.gray[8]}
         isOpen={isOpen}
         menuClicked={menuClicked}
      />
   );
};

const mapStateToProps = state => {
   return {
      auth: state.auth,
      sidebar: state.sidebar,
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

class Header extends Component {
   newView = (name, props) => {
      this.props.toggleSidebar(true);
      this.props.newSidebarView({
         name,
         props: props || {},
      });
   };

   handleClick = () => {
      const { sidebar } = this.props;

      this.props.toggleSidebar(!sidebar.isOpen);
   };

   logOut = () => {
      const { config } = this.props.auth;

      this.props.toggleSidebar(false);
      this.props.logOut(config);
   };

   openSidebar = () => {
      this.props.onEvent({
         type: 'toggle-sidebar',
      });
   };

   render() {
      const { auth, sidebar } = this.props;
      const { loggedIn } = auth;
      const { viewStack } = sidebar;
      const onMainView = viewStack.length === 1;

      return (
         <Container>
            <SectionContainer>
               <MenuContainer onClick={this.handleClick}>
                  <MenuButton isOpen={sidebar.isOpen} />
               </MenuContainer>
               <BackButtonContainer hidden={onMainView || !sidebar.isOpen}>
                  <ArrowLeft size={30} onClick={this.props.oldSidebarView} />
               </BackButtonContainer>
               <Logo hidden={sidebar.isOpen} src="images/icons/logo_text.svg" />
            </SectionContainer>
            <SectionContainer justifyContent="center" />
            <SectionContainer justifyContent="flex-end">
               {loggedIn ? (
                  <TextButton onClick={this.logOut}>Log Out</TextButton>
               ) : (
                  <TextButton onClick={() => this.newView('login')}>
                     Log In
                  </TextButton>
               )}
            </SectionContainer>
         </Container>
      );
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
