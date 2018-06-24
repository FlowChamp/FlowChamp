import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled, { injectGlobal } from 'styled-components';
import Header from './header/index';
import Sidebar from './sidebar/index';
import Flowchart from './apps/flowchart/index';
import { constants } from './toolbox';
import { fetchUserConfig } from './user/actions';

injectGlobal`
   @font-face {
      font-family: 'SF Pro Display';
      font-weight: bold;
      src: url('fonts/SF-Pro-Display-Bold.otf');
   }
   @font-face {
      font-family: 'SF Pro Display';
      font-weight: normal;
      src: url('fonts/SF-Pro-Display-Medium.otf');
   }
   @font-face {
      font-family: 'SF Pro Display';
      font-weight: 300;
      src: url('fonts/SF-Pro-Display-Light.otf');
   }
   @font-face {
      font-family: 'SF Pro Display';
      font-weight: 200;
      src: url('fonts/SF-Pro-Display-Thin.otf');
   }
   @font-face {
      font-family: 'SF Pro Display';
      font-weight: 100;
      src: url('fonts/SF-Pro-Display-Ultralight.otf');
   }

   html {
      font-family: 'SF Pro Display', 'sans-serif';
   }
`;

const { animation } = constants;

const AppContainer = styled.div`
   position: fixed;
   top: 0;
   bottom: 0;
   left: 0;
   right: 0;
   display: flex;
`;

const AppCover = styled.div`
   z-index: 98;
   position: fixed;
   display: ${props => props.isOpen ? 'block' : 'none'};
   top: 0;
   bottom: 0;
   left: 0;
   right: 0;
   background: rgba(0,0,0,0.25);
   animation: ${animation.fadeIn} 0.25s;
`;

const ViewContainer = styled.div`
   margin-top: 3.5em;
   overflow: auto;
   transition: all 0.3s;
`;

const views = {
   flowchart: <Flowchart />,
};

const mapDispatchToProps = dispatch => {
   return {
      fetchUserConfig: prevConfig => dispatch(fetchUserConfig(prevConfig)),
   }
}

class FlowChamp extends Component {
   state = {
      currentView: 'flowchart',
   };

   getCurrentView = () => {
      const { currentView } = this.state;
      const view = views[currentView];
      const props = {
      };

      try {
         return React.cloneElement(view, props);
      } catch (e) {
         console.error('Error: This view is empty');
      }
   };

   componentDidMount() {
      let prevConfig = localStorage.flowchampConfig;
      prevConfig = prevConfig ? JSON.parse(prevConfig) : null;

      if (prevConfig) {
         this.props.fetchUserConfig(prevConfig);
      }
   }

   render() {
      const { sidebar } = this.props;

      return (
         <AppContainer>
            <Header />
            <Sidebar />
            <AppCover isOpen={sidebar.isOpen} />
            <ViewContainer sidebarOpen={sidebar.isOpen}>{this.getCurrentView()}</ViewContainer>
         </AppContainer>
      );
   }
}

const mapStateToProps = state => ({
   sidebar: state.sidebar
});

export default connect(mapStateToProps, mapDispatchToProps)(FlowChamp);
