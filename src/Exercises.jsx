import React, {useState} from 'react';
import styled from '@emotion/styled'
import Video from './video';

const Text = styled.h3`
margin-top: 2.5rem;
margin-left: 0.5rem;
margin-right: 1.5rem;
margin-bottom: 0rem;
display: flex;
flex-direction: row;
border-bottom: ${props =>
props.active ? '4px solid #20588F' : 'none'};
color: ${props =>
props.active ? '4px solid #20588F' : 'none'};
&:hover {
    border-bottom: 4px solid #20588F;
    color:  #20588F;
}
`
const ExerciseTitleWrapper = styled.div`
display: flex;
flex-direction: row;
border-bottom: 1px solid #dbdbdb;
`


function Exercises({excercises}) {
    const [activeExcercise, setActiveExcercise] = useState()
  return (
      <>
      <ExerciseTitleWrapper>
          {excercises.map((excercise, id) => {
          return(
              <>
                <Text 
                    key={id} 
                    active={activeExcercise === id} 
                    onClick={() => setActiveExcercise(id)}>
                    {excercise.name}
                </Text>
                {/* <Video excercise={excercise} activeExcercise={activeExcercise} id={id} /> */}
              </>
          )})}
      </ExerciseTitleWrapper>
      </>
  );
}

export default Exercises;
