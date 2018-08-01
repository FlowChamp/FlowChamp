import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';
import { fetchCourses } from '../../../../apps/flowchart/actions';
import { Button, Loader, constants } from '../../../../toolbox';

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
         newDepartment: props.department
      }
   }

   static getDerivedStateFromProps(nextProps) {
      return {
         newDepartment: nextProps.department
      }
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
      const { departmentData } = flowchart;
      const { department, fetching } = this.state;

      return (
         <Container key={`course-list-for-${department}`}>
         {fetching ? (
            <LoadingContainer>
               <Loader />
            </LoadingContainer>
         ) : departmentData.map((deptItem, i) => {
               return deptItem.name === department
                  ? deptItem.courses &&
                       deptItem.courses.map((item, j) => (
                          <ButtonContainer
                             key={`${item._id}-selector-button`}
                             selected={course && (item._id === course._id)}>
                             <Button
                                label={item.course_number}
                                sublabel={item.title}
                                hideBorder
                                padding="0.5rem 0.5rem 0.5rem 1rem;"
                                onClick={() => this.handleClick(item)}
                             />
                          </ButtonContainer>
                       ))
                  : null;
            })}
         </Container>
      );
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseSelector);
