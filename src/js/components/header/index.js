import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ArrowLeft } from 'react-feather';
import styled from 'styled-components';
import {
   toggleSidebar,
   pushView,
   popView,
} from '../../components/sidebar/actions';
import { logOut } from '../../user/actions';
import { constants, Hamburger } from '../../toolbox/';

const { color, animation } = constants;
const { fadeIn } = animation;

const Logo = styled.img`
   margin: 0 16px;
   margin-top: 4px;
   width: 100px;
   pointer-events: none;
   user-select: none;
   animation: ${fadeIn} 0.3s ease;
`;

const Container = styled.div`
   z-index: 99;
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
   font-weight: 300;
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
      <Hamburger
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
      user: state.user,
      flowchart: state.flowchart,
      sidebar: state.sidebar,
   };
};

const mapDispatchToProps = dispatch => {
   return {
      toggleSidebar: value => dispatch(toggleSidebar(value)),
      pushView: view => dispatch(pushView(view)),
      popView: () => dispatch(popView()),
      logOut: config => dispatch(logOut(config)),
   };
};

class Header extends Component {
   newView = (name, props) => {
      this.props.toggleSidebar(true);
      setTimeout(() => {
         this.props.pushView({
            name,
            props: props || {},
         });
      }, 300);
   };

   handleClick = () => {
      const { sidebar } = this.props;

      this.props.toggleSidebar(!sidebar.isOpen);
   };

   logOut = () => {
      const { config } = this.props.user;

      this.props.toggleSidebar(false);
      this.props.logOut(config);
   };

   openSidebar = () => {
      this.props.onEvent({
         type: 'toggle-sidebar',
      });
   };

   render() {
      const { user, flowchart, sidebar } = this.props;
      const { loggedIn } = user;
      const { stack } = sidebar;
      const onMainView = stack.length === 1;
      const chartName =
         flowchart.fetching || user.updatingConfig
            ? 'Loading...'
            : loggedIn && user.config && user.config.active_chart
               ? user.config.active_chart
               : 'Welcome';

      return (
         <Container>
            <SectionContainer>
               <MenuContainer onClick={this.handleClick}>
                  <MenuButton isOpen={sidebar.isOpen} />
               </MenuContainer>
               <BackButtonContainer hidden={onMainView || !sidebar.isOpen}>
                  <ArrowLeft size={30} onClick={this.props.popView} />
               </BackButtonContainer>
               <Logo hidden={sidebar.isOpen} src="images/icons/logo_text.svg" />
            </SectionContainer>
            <SectionContainer justifyContent="center">
               <h3>{chartName}</h3>
            </SectionContainer>
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
