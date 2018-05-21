import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Menu } from 'react-feather';
import { toggleSidebar } from '../sidebar/actions';
import { constants } from '../toolbox';

const { color } = constants;

const Container = styled.div`
   position: fixed;
   top: 0;
   left: 0;
   right: 0;
   display: flex;
   align-items: center;
   height: 3.5em;
   background: ${color.gray[0]};
   border-bottom: 1px solid ${color.gray[3]};
`;

const SectionContainer = styled.div`
   display: flex;
   justify-content: ${props => props.justify || 'flex-start'}
   align-items: center;
   flex: 1;
   padding: 0 1em;
`;

const mapDispatchToProps = dispatch => {
   return {
      toggleSidebar: value => dispatch(toggleSidebar(value)),
   };
};

class Header extends Component {
   handleEvent = options => {
      switch (options.type) {
         default:
            this.props.onEvent(options);
            break;
      }
   };

   openSidebar = () => {
      this.props.onEvent({
         type: 'toggle-sidebar',
      });
   };

   render() {
      return (
         <Container>
            <SectionContainer>
               <Menu size={30} onClick={() => this.props.toggleSidebar(true)} />
            </SectionContainer>
         </Container>
      );
   }
}

export default connect(null, mapDispatchToProps)(Header);
