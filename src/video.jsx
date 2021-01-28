import React from 'react';
import styled from '@emotion/styled'

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
function Video({excercise, activeExcercise, id}) {
  return (
      <>
      {activeExcercise === id && (
    <IframeWrapper key={id}>
        <Iframe key={id} title={excercise.name} src={excercise.iframSrc} allowfullscreen frameborder={0} />
    </IframeWrapper>
)}
      </>
  );
}

export default Video;
