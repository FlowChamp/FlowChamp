import React, { Component } from 'react';
import { connect } from 'react-redux';
import Quarter from './quarter';
import styled from 'styled-components';

const Container = styled.div`
   margin: 0 24px;
   font-family: 'SF Pro Display';

   @keyframes slideAppear {
      0% {
         opacity: 0;
         transform: translateX(10%);
      }
   }
`;

const TitleContainer = styled.div`
   display: flex;
   align-items: flex-end;
   margin: 8px 0;
`;

const Title = styled.h2`
   font-weight: 200;
   font-size: 1.8em;
   margin: 0;
   margin-right: 8px;
   padding-left: 8px;
   color: #4f4f4f;
`;

const Subtitle = styled.h4`
   font-weight: 100;
   margin: 5px;
`;

const QuartersContainer = styled.div`
   display: flex;
`;

class Year extends Component {
   getQuarters = () => {
      const seasons = ['Fall', 'Winter', 'Spring', 'Summer'];
      const { year, index } = this.props;
      const { quarters } = year;

      return quarters.map((blocks, quarterIndex) => (
         <Quarter
            year={year._id}
            season={quarterIndex}
            index={index}
            key={`${seasons[quarterIndex]}-${year._id}`}
            quarterId={`${index}-${quarterIndex}`}
            blocks={blocks}
         />
      ));
   };

   render = () => {
      const { year, index } = this.props;
      const { user } = this.props;
      const { config } = user;
      const { start_year } = config;
      const end_year = start_year + index + 1;
      const endYearAbbr = end_year.toString().substr(-2);
      const yearRange = `${start_year + index}-${endYearAbbr}`;

      return (
         <Container>
            <TitleContainer>
               <Title>{year._id}</Title>
               <Subtitle>
                  ({yearRange})
               </Subtitle>
            </TitleContainer>
            <QuartersContainer>{this.getQuarters()}</QuartersContainer>
         </Container>
      );
   };
}

const mapStateToProps = state => ({
   user: state.user,
});

export default connect(mapStateToProps)(Year);

/*
             <div>
               <div>
                  <div>
                     <Cards listId={quarters._id} blocks={list} />
                  </div>
               </div>
               <CardAdder listId={quarters._id} />
               </div>
               */
