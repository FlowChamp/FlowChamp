import React, { Component } from 'react';
import { connect } from 'react-redux';
import Quarter from './quarter';
import styled from 'styled-components';

const YearContainer = styled.div`
   margin: 0 24px;
   animation: slideAppear 0.5s;
   font-family: 'SF Pro Display';

   @keyframes slideAppear {
      0% {
         opacity: 0;
         transform: translateX(10%);
      }
   }
`;

const Title = styled.h2`
   font-weight: 200;
   font-size: 1.8em;
   margin: 8px 4px;
   color: #4f4f4f;
`;

const QuartersContainer = styled.div`
   display: flex;
`;

class Year extends Component {
   getQuarters = () => {
      const seasons = ['Fall', 'Winter', 'Spring', 'Summer'];
      const { year } = this.props;
      const { quarters } = year;

      return quarters.map((blocks, index) => (
         <Quarter
            key={`${seasons[index]}-${year._id}`}
            quarterId={`${seasons[index]}-${year._id}`}
            blocks={blocks}
         />
      ));
   };

   render = () => {
      const { year } = this.props;

      return (
         <YearContainer>
            <Title>{year._id}</Title>
            <QuartersContainer>{this.getQuarters()}</QuartersContainer>
         </YearContainer>
      );
   };
}

export default connect()(Year);

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
