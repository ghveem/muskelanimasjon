import React, {useState, useEffect} from 'react';
import styled from '@emotion/styled'

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
    cursor: pointer;
}
`
const ExerciseTitleWrapper = styled.div`
display: flex;
flex-direction: row;
border-bottom: 1px solid #dbdbdb;
`
const IframeWrapper = styled.div`
position: relative;
overflow: hidden;
padding-top: 56.25%;
margin-top: 1rem;
`
const Iframe = styled.iframe`
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
border: 0;
`


function Exercises({excercises}) {
    const [activeExcercise, setActiveExcercise] = useState(null)

    // useEffect(() => {
    //     setActiveExcercise(null)
    // }, [excercises])

    const video = excercises.find((excercise) => excercise.id === activeExcercise)
    console.log('videoSrc', video)
    console.log('activeExcercise', activeExcercise)

  return (
      <>
        <ExerciseTitleWrapper>
            {excercises.map((excercise, key) => {
                console.log('excercise', excercise.id)
                return(
                    <Text 
                        key={key} 
                        active={activeExcercise === excercise.id} 
                        onClick={() => setActiveExcercise(excercise.id)}>
                        {excercise.name}
                    </Text>
                )
            })}
        </ExerciseTitleWrapper>
        {activeExcercise && video && (
            <IframeWrapper>
                <Iframe title={video.name} src={video.iframeSrc} allowfullscreen frameborder={0} />
            </IframeWrapper>
        )}
      </>
  );
}

export default Exercises;
