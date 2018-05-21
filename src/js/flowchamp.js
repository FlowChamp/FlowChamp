import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Header from './header/index';
import Sidebar from './sidebar/index';
import Flowchart from './apps/flowchart/index';
import { fetchUserConfig } from './user/actions';

const AppContainer = styled.div`
   position: fixed;
   top: 0;
   bottom: 0;
   left: 0;
   right: 0;
   display: flex;
`;

const ViewContainer = styled.div`
   display: flex;
   flex: 1;
   margin-top: 3em;
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
         onEvent: this.handleEvent,
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
      return (
         <AppContainer>
            <Header />
            <Sidebar />
            <ViewContainer>{this.getCurrentView()}</ViewContainer>
         </AppContainer>
      );
   }
}

export default connect(null, mapDispatchToProps)(FlowChamp);
