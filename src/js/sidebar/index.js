// src/js/sidebar/index.js

import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import NavBar from './components/nav_bar';
import MainView from './views/main/index';
import LoginView from './views/login/index';
import ChartSelectView from './views/chart_select/index';
import ChartNamerView from './views/chart_namer/index';

const Container = styled.div`
   position: fixed;
   top: 0;
   bottom: 0;
   left: 0;
   width: 100%;
   max-width: 20em;
   background: white;
   transform: translateX(${props => (props.isOpen ? 0 : '-100%')});
   display: ${props => (props.isOpen ? 'block' : 'none')};
   box-shadow: 0 1px 4px rgba(0, 0, 0, 0.14);
   animation: ${props => (props.isClosing ? 'sidebarClose' : 'sidebarOpen')}
      0.3s;

   @keyframes sidebarOpen {
      0% {
         opacity: 0;
         transform: translateX(-20%);
      }
   }

   @keyframes sidebarClose {
      100% {
         opacity: 0;
         transform: translateX(-20%);
      }
   }
`;

const ViewContainer = styled.div`
   position: absolute;
   top: 3.5em;
   bottom: 0;
   left: 0;
   right: 0;
   display: flex;
   overflow: auto;
`;

const views = {
   main: <MainView />,
   login: <LoginView />,
   chartSelect: <ChartSelectView />,
   chartNamer: <ChartNamerView />,
};

const mapStateToProps = state => {
   return { sidebar: state.sidebar };
};

class Sidebar extends Component {
   constructor(props) {
      super(props);
      this.state = {
         isOpen: false,
         isClosing: false,
         viewStack: props.sidebar.viewStack,
         changingView: false,
      };
   }

   static getDerivedStateFromProps(nextProps, prevState) {
      const { sidebar } = nextProps;
      const isClosing = prevState.isOpen && !sidebar.isOpen;
      const changingView =
         sidebar.viewStack.length !== prevState.viewStack.length;

      return {
         isOpen: sidebar.isOpen || isClosing,
         isClosing,
         changingView,
         isPrevView: false,
         enteringOldView: sidebar.viewStack.length < prevState.viewStack.length,
         enteringNewView: sidebar.viewStack.length > prevState.viewStack.length,
      };
   }

   animateClosed() {
      setTimeout(() => {
         this.setState({
            isOpen: false,
            isClosing: false,
         });
      }, 290);
   }

   // New view will now be loaded
   waitForAnimation() {
      setTimeout(() => {
         this.setState({
            changingView: false,
            enteringOldView: false,
            enteringNewView: false,
            isPrevView: this.state.enteringOldView,
            viewStack: this.props.sidebar.viewStack,
         });
      }, 140);
   }

   componentDidUpdate() {
      if (this.state.isClosing) {
         this.animateClosed();
      }
      if (this.state.changingView) {
         this.waitForAnimation();
      }
   }

   getCurrentView = () => {
      const { viewStack, enteringOldView, enteringNewView, isPrevView } = this.state;
      const currentView = viewStack[viewStack.length - 1];
      const view = views[currentView.name];
      let props = {
         ...this.props,
         ...currentView.props,
         isPrevView,
         enteringOldView,
         enteringNewView
      };
      props.onEvent = this.handleEvent;

      try {
         return React.cloneElement(view, props);
      } catch (e) {
         console.error('Error: this sidebar view is broken');
      }
   };

   render() {
      const { isOpen, isClosing } = this.state;

      return (
         <Container isOpen={isOpen} isClosing={isClosing}>
            <NavBar />
            <ViewContainer>{this.getCurrentView()}</ViewContainer>
         </Container>
      );
   }
}

export default connect(mapStateToProps)(Sidebar);
