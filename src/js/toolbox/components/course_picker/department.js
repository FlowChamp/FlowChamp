import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';
import { updateCourse } from '../../../user/actions';
import { fetchDepartments } from '../../../apps/flowchart/actions';
import { Button, Loader } from '../..';
import constants from '../../constants';

const { animation, color } = constants;
const { fadeIn } = animation;

const Container = styled.div`
   padding-bottom: 16px;
`;

const ButtonContainer = styled.div`
   background: ${props => props.selected && color.grayAlpha[2]};
   ${props =>
      props.selected &&
      css`
         background: ${color.blue[4]};
         h2,
         h3,
         h4,
         h5 {
            color: white;
         }
      `};
`;

const LoadingContainer = styled.div`
   width: 100%;
   display: flex;
   justify-content: center;
   padding-top: 4px;
   animation: ${fadeIn} 0.15s ease;
`;

const mapStateToProps = state => {
   return {
      user: state.user,
      flowchart: state.flowchart,
   };
};

const mapDispatchToProps = dispatch => {
   return {
      updateCourse: payload => dispatch(updateCourse(payload)),
      fetchDepartments: () => dispatch(fetchDepartments()),
   };
};

class DepartmentSelector extends Component {
   state = {
      fetching: false,
   };

   handleClick = department => {
      this.props.onEvent({
         type: 'set-field',
         value: {
            department,
            course: null,
         },
      });
   };

   componentDidMount() {
      const { flowchart } = this.props;
      const { departmentData } = flowchart;

      if (!departmentData.length) {
         this.setState({ fetching: true });
         this.props.fetchDepartments().then(() => {
            setTimeout(() => {
               this.setState({ fetching: false });
            }, 350);
         });
      }
   }

   render() {
      const { flowchart, department } = this.props;
      const { departmentData } = flowchart;
      const { fetching } = this.state;

      return (
         <Container>
            {fetching ? (
               <LoadingContainer>
                  <Loader />
               </LoadingContainer>
            ) : (
               departmentData &&
               departmentData.map((dept, index) => (
                  <ButtonContainer
                     key={`${dept.name}-button`}
                     selected={department === dept.name}>
                     <Button
                        label={dept.name}
                        chevron
                        hideBorder
                        padding="0.5rem 0.5rem 0.5rem 1rem;"
                        onClick={() => this.handleClick(dept.name)}
                     />
                  </ButtonContainer>
               ))
            )}
         </Container>
      );
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentSelector);
