import React, {useState, useEffect} from 'react';
import styled from '@emotion/styled'

const Text = styled.h3`
margin-top: 2.5rem;
margin-left: 0.5rem;
margin-right: 1.5rem;
margin-bottom: 0rem;
border-bottom: ${props =>
props.active ? '4px solid #20588F' : 'none'};
color: ${props =>
props.active ? '#20588F' : 'none'};
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
width: auto;
align-items: flex-end;
@media only screen and (max-width: 800px) {
  flex-direction: column;
}
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

const Exercises = ({ excercises }) => {
    const [activeExcercise, setActiveExcercise] = useState(0);
    const [video, setVideo] = useState(null);

    useEffect(() => {
        if (activeExcercise !== null) {
            const activeVideo = excercises[activeExcercise];
            setVideo(activeVideo);
        } else {
            console.log("activeExcersise er null");
        }
    }, [activeExcercise, excercises])

  return (
      <>
        <ExerciseTitleWrapper id="excercises">
            {excercises.map((excercise, key) => {
                return(
                    <Text 
                        key={key} 
                        active={activeExcercise === key} 
                        onClick={() => setActiveExcercise(key)}>
                        {excercise.name}
                    </Text>
                )
            })}
        </ExerciseTitleWrapper>
        {activeExcercise !== null && video && (
            <IframeWrapper>
                <Iframe title={video.name} src={video.iframeSrc} allowFullScreen frameborder={0} />
            </IframeWrapper>
        )}
      </>
  );
}

export default Exercises;
