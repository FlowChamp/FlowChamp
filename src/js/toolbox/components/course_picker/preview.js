import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { fetchCourses } from '../../../apps/flowchart/actions';
import constants from '../../constants';
import BlockContents from '../../components/block/contents';
import '../../components/block/index.css';

const { color } = constants;

const Container = styled.div`
   padding: 16px 0;
`;

const BlockContainer = styled.div`
   height: 10em;
   width: 10em;
   margin: 24px auto;
`;

const DescriptionContainer = styled.div`
   padding: 0 8px 8px 24px;
`;

const Text = styled.h3`
   font-weight: 300;
   margin: 0;
   color: ${color.gray[6]};
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

class CoursePreview extends Component {
   render() {
      const { course, course_type } = this.props;

      return (
         <Container key={`course-preview-for-${course._id}`}>
            <BlockContainer>
               <div className="card-title">
                  <BlockContents
                     data={{
                        block_metadata: { course_type },
                        course_data: course,
                     }}
                  />
               </div>
            </BlockContainer>
            <DescriptionContainer>
               <Text>{course.description}</Text>
            </DescriptionContainer>
         </Container>
      );
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursePreview);
