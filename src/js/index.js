import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Header from './components/header';
import Sidebar from './components/sidebar/index';
import Flowchart from './apps/flowchart';
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
   };
};

class FlowChamp extends Component {
   state = {
      currentView: 'flowchart',
   };

   getCurrentView = () => {
      const { currentView } = this.state;
      const view = views[currentView];
      const props = {};

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
            <ViewContainer sidebarOpen={sidebar.isOpen}>
               {this.getCurrentView()}
            </ViewContainer>
         </AppContainer>
      );
   }
}

const mapStateToProps = state => ({
   sidebar: state.sidebar,
});

export default connect(mapStateToProps, mapDispatchToProps)(FlowChamp);
