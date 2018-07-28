// src/js/sidebar/index.js

import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';
import MainView from './views/main';
import LoginView from './views/login';
import ChartSelectView from './views/chart_select';
import YearSelectView from './views/year_select';
import ChartNamerView from './views/chart_namer';
import { toggleSidebar } from '../../components/sidebar/actions';
import { constants } from '../../toolbox/';

const { color } = constants;

const Container = styled.div`
   z-index: 100;
   position: fixed;
   top: 3.5em;
   bottom: 0;
   left: 0;
   width: 100%;
   max-width: 19em;
   background: white;
   transform: translateX(-100%);
   opacity: 0;
   border-right: 1px solid ${color.gray[3]}
   box-sizing: border-box;
   transition: all 0.25s ease-in-out;
   overflow: hidden;

   ${props =>
      props.isOpen &&
      css`
         opacity: 1;
         transform: translateX(0);
      `};
`;

const Cover = styled.div`
   position: fixed;
   z-index: 98;
   top: 0;
   bottom: 0;
   left: 0;
   right: 0;
   background: rgba(200,200,200,0.8);
   z-index: -1;
   opacity: 0;
   pointer-events: none;
   transition: all 0.25s ease-in-out;

   ${props =>
      props.isOpen &&
      css`
         z-index: 98;
         opacity: 1;
         pointer-events: all;
         cursor: pointer;
      `};
`;

const ViewContainer = styled.div`
   z-index: ${props => (props.isPrevView ? 0 : 1)};
   position: absolute;
   top: 0;
   bottom: 0;
   left: 0;
   right: 0;
   background: white;
   animation: ${props => (props.goingBack ? 'slideHi' : 'slideBye')} 0.3s
      ease-in-out;
   transition: all 0.3s ease-in-out;
   -webkit-overflow-scrolling: touch;
   overflow: auto;

   ${props =>
      props.isPrevView &&
      !props.returning &&
      css`
         filter: brightness(80%);
         transform: translateX(-50%);
      `};

   @keyframes slideBye {
      0% {
         transform: translateX(100%);
      }
   }

   @keyframes slideHi {
      100% {
         transform: translateX(100%);
      }
   }
`;

const views = {
   main: <MainView />,
   login: <LoginView />,
   chartSelect: <ChartSelectView />,
   yearSelect: <YearSelectView />,
   chartNamer: <ChartNamerView />,
};

const mapStateToProps = state => {
   return { sidebar: state.sidebar };
};

const mapDispatchToProps = dispatch => {
   return {
      toggleSidebar: () => dispatch(toggleSidebar()),
   }
}

const ViewStack = connect(mapStateToProps)(({ stack, goingBack }) => {
   return stack.map(({ name, props }, index) => {
      const view = views[name];
      const isPrevView = index !== stack.length - 1;

      try {
         return (
            <ViewContainer
               key={`page-${index}`}
               isPrevView={isPrevView}
               returning={goingBack && index === stack.length - 2}
               goingBack={goingBack && index === stack.length - 1}>
               {React.cloneElement(view, props)}
            </ViewContainer>
         );
      } catch (e) {
         console.error('Error: This view is empty: ', view);
         return null;
      }
   });
});

class Sidebar extends Component {
   constructor(props) {
      super(props);
      const { sidebar } = this.props;
      const { stack } = sidebar;

      this.state = {
         stack,
         goingBack: false,
      };
   }

   static getDerivedStateFromProps(nextProps, prevState) {
      const { sidebar } = nextProps;
      const { stack } = sidebar;
      const goingBack = stack.length < prevState.stack.length;

      return {
         stack: goingBack ? prevState.stack : stack,
         goingBack,
      };
   }

   animateBack() {
      const { sidebar } = this.props;
      const { stack } = sidebar;

      setTimeout(() => {
         this.setState({
            stack,
            goingBack: false,
         });
      }, 280);
   }

   componentDidUpdate(nextProps, prevState) {
      if (this.state.goingBack) {
         this.animateBack();
      }
   }

   render() {
      const { sidebar } = this.props;
      const { isOpen } = sidebar;
      const { stack, goingBack } = this.state;

      return (
         <div>
            <Cover isOpen={isOpen} onClick={this.props.toggleSidebar}/>
            <Container isOpen={isOpen}>
               <ViewStack stack={stack} goingBack={goingBack} />
            </Container>
         </div>
      );
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
