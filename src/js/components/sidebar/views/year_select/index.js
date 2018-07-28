import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { pushView } from '../../actions';
import { setStartYear } from '../../../../user/actions';
import Button from '../../components/button';
import Header from '../../components/header';

const Container = styled.div`
   flex: 1;
   overflow: auto;
`;

const getYears = () => {
   const years = [];
   const currentYear = new Date().getFullYear();
   for (let i = currentYear; i >= currentYear - 7; i--) {
      years.push(i);
   }
   return years;
};

class YearSelectView extends Component {
   selectYear = year => {
      const { route } = this.props;
      const { config } = this.props.user;

      this.props.setStartYear(config, year);
      this.props.pushView({
         name: route,
         props: {},
      });
   };

   getGrade = year => {
      const statuses = [
         'Freshman',
         'Sophomore',
         'Junior',
         'Senior',
         'SuperSenior',
      ];
      const currentYear = new Date().getFullYear();
      const n = currentYear - year;
      if (n > statuses.length - 1) {
         return `${n + 1}th-year`;
      }
      return statuses[n];
   };

   getYearButtons = () => {
      const years = getYears();

      return years.map((year, index) => {
         return (
            <Button
               key={`year-${year}`}
               label={this.getGrade(year)}
               subLabel={`Starting year: ${year}`}
               icon="ChevronRight"
               onClick={() => this.selectYear(year)}
            />
         );
      });
   };

   handleClick = options => {};

   render() {
      return (
         <Container>
            <Header label="Select Current Grade" />
            {this.getYearButtons()}
         </Container>
      );
   }
}

const mapStateToProps = state => {
   return {
      user: state.user,
      flowchart: state.flowchart,
   };
};

const mapDispatchToProps = dispatch => {
   return {
      setStartYear: (config, year) => dispatch(setStartYear(config, year)),
      pushView: view => dispatch(pushView(view)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(YearSelectView);
