import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';
import { fetchCourses } from '../../../apps/flowchart/actions';
import { Button, Loader, Icon } from '../..';
import constants from '../../constants';

const { animation, color } = constants;
const { fadeIn } = animation;

const Container = styled.div`
   position: relative;
   padding-bottom: 16px;
`;

const LoadingContainer = styled.div`
   width: 100%;
   display: flex;
   justify-content: center;
   padding-top: 4px;
   animation: ${fadeIn} 0.15s ease;
`;

const ButtonContainer = styled.div`
   position: relative;
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
   ${props =>
      props.disabled &&
      css`
         h2, h3, h4 {
            color: ${color.gray[4]};
         }
         pointer-events: none;
         h3 {
            font-weight: 300;
            margin: 16px 0;
         }
         h4 {
            opacity: 0;
         }
      `};
`;

const DisabledLabel = styled.div`
   position: absolute;
   display: flex;
   align-items: flex-end;
   width: 100%;
   margin-top: 34px;

   h3 {
      font-size: 16px;
      font-weight: 300;
      margin: 0 0 5px 0;
   }

   svg {
      height: 20px;
      width: 20px;
      margin: 0 8px 0 16px;
      color: ${color.green[4]};
   }
`;

const mapStateToProps = state => {
   return {
      user: state.user,
      flowchart: state.flowchart,
   };
};

const mapDispatchToProps = dispatch => {
   return {
      fetchCourses: department => dispatch(fetchCourses(department)),
   };
};

class CourseSelector extends Component {
   constructor(props) {
      super(props);
      this.state = {
         department: props.department,
         newDepartment: props.department,
      };
   }

   static getDerivedStateFromProps(nextProps) {
      return {
         newDepartment: nextProps.department,
      };
   }

   handleClick = course => {
      this.props.onEvent({
         type: 'set-field',
         value: {
            course,
         },
      });
   };

   checkDepartmentData() {
      const { flowchart } = this.props;
      const { departmentData } = flowchart;
      const { department } = this.state;

      for (let dept of departmentData) {
         if (dept.name === department && !dept.courses.length) {
            this.setState({ fetching: true });
            this.props.fetchCourses(department).then(() => {
               this.setState({ fetching: false });
            });
         }
      }
   }

   componentDidMount() {
      this.checkDepartmentData();
   }

   componentDidUpdate(nextProps) {
      const { newDepartment, department, fetching } = this.state;
      if (newDepartment !== department && !fetching) {
         this.setState({ department: newDepartment }, () => {
            this.checkDepartmentData();
         });
      }
   }

   render() {
      const { flowchart, course } = this.props;
      const { departmentData, idList } = flowchart;
      const { department, fetching } = this.state;

      return (
         <Container key={`course-list-for-${department}`}>
            {fetching ? (
               <LoadingContainer>
                  <Loader />
               </LoadingContainer>
            ) : (
               departmentData.map((deptItem, i) => {
                  return deptItem.name === department
                     ? deptItem.courses &&
                          deptItem.courses.map((item, j) => {
                             const disabled = !!idList[item._id];
                             return (
                                <ButtonContainer
                                   key={`${item._id}-selector-button`}
                                   selected={
                                      !disabled &&
                                      course &&
                                      item._id === course._id
                                   }
                                   disabled={disabled}>
                                   {disabled && (
                                      <DisabledLabel>
                                          <Icon name="check-circle" />
                                          <h3>Added</h3>
                                      </DisabledLabel>
                                   )}
                                   <Button
                                      label={item.course_number}
                                      sublabel={item.title}
                                      padding="0.5rem 0.5rem 0.5rem 1rem;"
                                      hideBorder
                                      onClick={() => this.handleClick(item)}
                                   />
                                </ButtonContainer>
                             );
                          })
                     : null;
               })
            )}
         </Container>
      );
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseSelector);
