import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { popPopup } from '../actions';
import { Icon, constants } from '../../../toolbox';

const { color, breakpoint } = constants;

const Container = styled.div`
   position: relative;
   min-height: 6em;
   display: flex;
   background: ${props => color[props.courseType]};
`;

const TitleContainer = styled.div`
   flex: 1;
`;

const Title = styled.h1`
   margin: 24px 0 16px 24px;
   font-weight: bold;

   ${breakpoint.mobile} {
      font-size: 1.25rem;
   }
`;

const Subtitle = styled.h3`
   margin: 0 16px 8px 24px;
   font-weight: 300;
   color: rgba(0, 0, 0, 0.8);
`;

const Units = styled.h3`
   margin: 0 16px 16px 0;
   font-weight: 200;
`;

const CourseType = styled.h3`
   margin: 0 16px 0 0;
   font-weight: 200;
`;

const ActionContainer = styled.div`
   max-width: 10em;
   text-align: right;

   svg {
      height: 32px;
      width: 32px;
      margin: 4px;
      padding: 8px;
      cursor: pointer;
      border-radius: 50%;
      transition: background 0.15s ease;

      &:hover {
         background: ${color.grayAlpha[2]};
      }
   }
`;

const mapStateToProps = state => {
   return {
      flowchart: state.flowchart,
   };
};

const mapDispatchToProps = dispatch => {
   return {
      popPopup: () => dispatch(popPopup()),
   };
};

class Header extends Component {
   constructor(props) {
      super(props);
      this.state = {
         course_type: props.course_type,
      };
   }

   static getDerivedStateFromProps(nextProps) {
      return {
         course_type: nextProps.course_type
      }
   }

   close = () => {
      this.props.popPopup();
   };

   render() {
      const { course_type } = this.state;

      return (
         <Container courseType={course_type}>
            <TitleContainer>
               <Title>Add a Course</Title>
               <Subtitle>Select a course from below</Subtitle>
            </TitleContainer>
            <ActionContainer>
               <Icon name="x" onClick={this.props.popPopup} />
               <CourseType>{course_type}</CourseType>
               <Units>? Units</Units>
            </ActionContainer>
         </Container>
      );
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
