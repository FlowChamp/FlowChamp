import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { constants } from '../../../toolbox';

const { color } = constants;

const courseTypes = [
   'General Ed',
   'Major',
   'Support',
   'Minor',
   'Concentration',
   'Free',
   'Blank',
];

const Container = styled.div`
   display: flex;
   padding: 0 16px;
`;

const Circle = styled.div`
   height: 2.5em;
   width: 2.5em;
   max-height: 8vw;
   max-width: 8vw;
   margin: 8px;
   background-color: ${props => color[props.type]};
   border: 1px solid ${color.grayAlpha[2]};
   border-radius: 50%;
   box-sizing: border-box;
   transition: border 0.15s ease;

   ${props =>
      props.selected &&
      css`
         border: 3px solid rgba(0, 0, 0, 0.3);
      `};
`;

export default class ColorPicker extends Component {
   constructor(props) {
      super(props);
      this.state = {
         course_type: props.course_type
      }
   }

   static getDerivedStateFromProps(nextProps) {
      return {
         course_type: nextProps.course_type
      }
   }

   handleClick = course_type => {
      this.props.onEvent({
         type: 'change-course-type',
         course_type
      });
   };

   render() {
      const { course_type } = this.state;

      return (
         <Container>
            {courseTypes.map((type, index) => (
               <Circle
                  key={`course-type-${type}`}
                  type={type}
                  selected={course_type === type}
                  onClick={() => this.handleClick(type)}
                  />
            ))}
         </Container>
      );
   }
}
