import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';
import { updateCourse } from '../../../user/actions';
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

const mapStateToProps = state => {
   return {
      user: state.user,
      flowchart: state.flowchart,
   };
};

const mapDispatchToProps = dispatch => {
   return {
      updateCourse: payload => dispatch(updateCourse(payload)),
   };
};

class ColorPicker extends Component {
   handleClick = type => {
      const { user, flowchart, year, quarter, blockIndex } = this.props;
      const { config } = user;
      let data = flowchart.chartData[year].quarters[quarter][blockIndex];

      const newCourse = data;
      newCourse.block_metadata.course_type = type;

      this.props.updateCourse({
         config,
         course: newCourse,
         year,
         quarter,
         index: blockIndex,
      });
   };

   render() {
      const { year, quarter, blockIndex, flowchart } = this.props;
      const data = flowchart.chartData[year].quarters[quarter][blockIndex];
      if (!data) {
         return <Container />;
      }
      const { block_metadata } = data;

      return (
         <Container>
            {courseTypes.map((type, index) => (
               <Circle
                  key={`course-type-${type}`}
                  type={type}
                  selected={block_metadata.course_type === type}
                  onClick={() => this.handleClick(type)}
               />
            ))}
         </Container>
      );
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(ColorPicker);
