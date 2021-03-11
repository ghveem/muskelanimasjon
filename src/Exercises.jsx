import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';

const Button = styled.button`
  border: none;
  background-color: white;
  font-weight: bold;
  margin-top: 2.5rem;
  margin-left: 0.5rem;
  margin-right: 1.5rem;
  padding: 0.2rem;
  text-align: left;
  border-bottom: ${(props) => (props.active ? '4px solid #20588F' : 'none')};
  color: ${(props) => (props.active ? '#20588F' : 'none')};
  margin-bottom: ${(props) => (props.active ? 'none' : '4px')};
  &:hover {
    border-bottom: 4px solid #20588f;
    margin-bottom: 0;
    color: #20588f;
    cursor: pointer;
    z-index: 999;
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 2px #20588f;
  }
  @media only screen and (max-width: 800px) {
    border-bottom: none;
    margin-bottom: 0;
    margin-bottom: 0;
    color: black;
  }
`;

const ExerciseTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: auto;
  align-items: flex-end;
  border-bottom: 1px solid #dbdbdb;
  @media only screen and (max-width: 800px) {
    flex-direction: column;
    border-bottom: none;
  }
`;

const IframeWrapper = styled.div`
  position: relative;
  overflow: hidden;
  padding-top: 56.25%;
  margin-top: 1rem;
`;

const Iframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 99.5%;
  height: 99.5%;
  border: 0;
`;

const VideoTextWrapper = styled.div`
  width: 100%;
`;

const Exercises = ({ excercises, isMobile, allowFullscreenVideo }) => {
  const [activeExcercise, setActiveExcercise] = useState(0);
  const [video, setVideo] = useState(null);

  useEffect(() => {
    if (activeExcercise !== null) {
      const activeVideo = excercises[activeExcercise];
      setVideo(activeVideo);
    } else {
      return;
    }
  }, [activeExcercise, excercises]);
  return (
    <>
      {!isMobile && (
        <>
          <ExerciseTitleWrapper id="excercises">
            {excercises.map((excercise, key) => {
              return (
                <Button
                  key={key}
                  active={activeExcercise === key}
                  onClick={() => setActiveExcercise(key)}
                >
                  {excercise.name}
                </Button>
              );
            })}
          </ExerciseTitleWrapper>
          {activeExcercise !== null && video && (
            <IframeWrapper>
              {allowFullscreenVideo && (
                <Iframe
                  title={video.name}
                  src={video.iframeSrc}
                  frameborder={0}
                  allowFullScreen
                />
              )}
              {!allowFullscreenVideo && (
                <Iframe
                  title={video.name}
                  src={video.iframeSrc}
                  frameborder={0}
                />
              )}
            </IframeWrapper>
          )}
        </>
      )}
      {isMobile && (
        <>
          <ExerciseTitleWrapper id="excercises">
            {excercises.map((excercise, key) => {
              return (
                <VideoTextWrapper key={key}>
                  <Button disabled>{excercise.name}</Button>
                  <IframeWrapper>
                    <Iframe
                      title={excercise.name}
                      src={excercise.iframeSrc}
                      allowFullScreen
                      autoPlay
                      webkitAllowFullScreen
                      mozAllowFullScreen
                      frameborder={0}
                      scrolling="no"
                      width="100vh"
                      height="100vw"
                    />
                  </IframeWrapper>
                </VideoTextWrapper>
              );
            })}
          </ExerciseTitleWrapper>
        </>
      )}
    </>
  );
};

export default Exercises;
