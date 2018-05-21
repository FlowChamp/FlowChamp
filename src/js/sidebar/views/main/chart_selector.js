import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Plus, X } from 'react-feather';
import { newSidebarView } from '../../actions';
import { setActiveChart } from '../../../user/actions';
import { constants } from '../../../toolbox';

const { color } = constants;

const Container = styled.div`
   display: flex;
   flex-direction: column;
   flex: 1;
   overflow: auto;
`;

const Header = styled.div`
   font-family: "SF Pro Display";
   font-weight: normal;
   font-size: 1.25rem;
   padding: 1em;
   border-bottom: 1px solid ${color.gray[3]};
   color: ${color.gray[6]}
   letter-spacing: 1px;
   text-transform: uppercase;
`;

const ChartButtonContainer = styled.div`
   display: flex;
   flex-direction: column;
`;

const ButtonContainer = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
   height: 4em;
   transition: all 0.15s ease;
   border-left: 8px solid
      ${props => (props.isActive ? color.blue[3] : 'transparent')};
   border-bottom: ${props =>
      props.noBorder ? 'none' : '1px solid ' + color.gray[3]};
   cursor: pointer;

   svg {
      margin: auto;
      color: ${color.gray[6]};
   }

   &:hover {
      background: ${color.gray[1]};
   }
`;

const TextContainer = styled.div`
   display: flex;
   flex-direction: column;
   padding-left: 1em;
`;

const Title = styled.h3`
   font-family: 'SF Pro Display';
   font-weight: 500;
   margin: 0;
`;

const Subtitle = styled.h4`
   font-family: 'SF Pro Display';
   font-weight: 300;
   margin: 0;
   color: ${color.gray[6]};
`;

const DeleteContainer = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   height: 100%;
   padding: 0 4px;
   transition: all 0.15s ease;

   &:hover {
      background: ${color.gray[3]};

      svg {
         color: red;
      }
   }
`;

const mapStateToProps = state => {
   return { auth: state.auth };
};

const mapDispatchToProps = dispatch => {
   return {
      newSidebarView: view => dispatch(newSidebarView(view)),
      setActiveChart: (config, name) => dispatch(setActiveChart(config, name)),
   };
};

class ChartSelector extends Component {
   newChart = () => {
      const { auth } = this.props;
      const { loggedIn } = auth;

      this.props.newSidebarView({
         name: loggedIn ? 'chartSelect' : 'login',
         props: {},
         route: loggedIn ? null : 'chartSelect',
      });
   };

   deleteChart(e, name) {
      e.stopPropagation();
      const { auth } = this.props;
      const { config } = auth;


   }

   getUserCharts = () => {
      const { auth } = this.props;
      const { config } = auth;
      if (!config) return;
      const { charts, active_chart } = config;
      const chartButtons = [];

      for (let name in charts) {
         const _dept = charts[name];
         const subtitle = _dept.split('_').join(' ');

         chartButtons.push(
            <ButtonContainer
               key={name}
               isActive={name === active_chart}
               onClick={() => this.props.setActiveChart(config, name)}>
               <TextContainer>
                  <Title>{name}</Title>
                  <Subtitle>{subtitle}</Subtitle>
               </TextContainer>
               <DeleteContainer onClick={e => this.deleteChart(e, name)}>
                  <X />
               </DeleteContainer>
            </ButtonContainer>,
         );
      }
      return chartButtons;
   };

   render() {
      return (
         <Container>
            <Header>Flowcharts</Header>
            <ChartButtonContainer>{this.getUserCharts()}</ChartButtonContainer>
            <ButtonContainer noBorder onClick={this.newChart}>
               <Plus size={30} />
            </ButtonContainer>
         </Container>
      );
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChartSelector);
