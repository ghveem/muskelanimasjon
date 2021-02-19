import React, { useEffect } from 'react';
import styled from '@emotion/styled';

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 85%;
  &:fullscreen {
    display: none;
  }
  @media only screen and (max-width: 800px) {
    margin-top: 1rem;
    width: 100%;
    justify-content: center;
  }
`;
const FullscreenButton = styled.button`
  border-radius: 1.38rem;
  border: 2px solid #20588f;
  color: #20588f;
  background-color: white;
  height: 2.2rem;
  margin-right: 1rem;
  font-weight: bold;
  padding: 0rem 1rem;
  &:hover {
    background-color: #20588f;
    color: white;
    cursor: pointer;
  }
  &:disabled {
    opacity: 50%;
    cursor: not-allowed;
    border: 2px solid #20588f;
    color: #20588f;
    background-color: white;
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 2px #20588f;
  }
  @media only screen and (max-width: 1235px) {
    font-size: 14px;
  }
  @media only screen and (max-width: 800px) {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
  @media only screen and (max-width: 500px) {
    font-size: 12px;
  }
  @media only screen and (max-width: 360px) {
    font-size: 12px;
    margin-left: 0.2rem;
  }
`;
const Text = styled.p`
  margin: 0;
  font-weight: bold;
  color: #757575;
  @media only screen and (max-width: 360px) {
    font-size: 16px;
  }
`;
const Button = styled.button`
  border-radius: 1.38rem;
  border: 2px solid #20588f;
  color: #20588f;
  background-color: white;
  height: 2.2rem;
  margin-left: 0.5rem;
  font-weight: bold;
  padding: 0rem 1rem;
  &:hover {
    background-color: #20588f;
    color: white;
    cursor: pointer;
  }
  &:disabled {
    opacity: 50%;
    cursor: not-allowed;
    border: 2px solid #20588f;
    color: #20588f;
    background-color: white;
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 2px #2222cc;
  }
  @media only screen and (max-width: 1235px) {
    font-size: 14px;
  }
  @media only screen and (max-width: 800px) {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
  @media only screen and (max-width: 500px) {
    font-size: 12px;
  }
  @media only screen and (max-width: 360px) {
    font-size: 12px;
    margin-left: 0.2rem;
  }
`;
const ButtonGroup = ({
  index,
  setActiveMuscle,
  length,
  setIsFullscreen,
  isFullscreen,
  isMobile,
}) => {
  const handleFullscreenOnClick = () => {
    let elem = document.documentElement;
    if (!isFullscreen) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        /* Firefox */
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        /* Chrome, Safari & Opera */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        /* IE/Edge */
        elem = window.top.document.body; //To break out of frame in IE
        elem.msRequestFullscreen();
      }
    } else {
      if (elem.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        window.top.document.msExitFullscreen();
      }
    }
  };

  //Add eventlistener for fullscreen API
  useEffect(() => {
    const handleResize = () => {
      setIsFullscreen((prev) => !prev);
      console.log('fullscreen', isFullscreen);
    };

    // Add event listener
    document.documentElement.addEventListener('fullscreenchange', handleResize);

    // Remove event listener on cleanup
    return () =>
      document.documentElement.removeEventListener(
        'fullscreenchange',
        handleResize,
      );
  }, [isFullscreen, setIsFullscreen]); // Empty array ensures that effect is only run on mount

  return (
    <>
      {!isMobile && (
        <ButtonWrapper>
          <FullscreenButton onClick={handleFullscreenOnClick}>
            {isFullscreen ? 'Lukk fullskjerm' : 'Fullskjerm'}
          </FullscreenButton>
          <Text>
            {index}/{length}
          </Text>
          <Button
            onClick={() => (index >= 1 ? setActiveMuscle(index - 1) : null)}
            disabled={index === 1}
          >
            Forrige muskel
          </Button>
          <Button
            onClick={() =>
              index <= length - 1 ? setActiveMuscle(index + 1) : null
            }
            disabled={index === length}
          >
            Neste muskel
          </Button>
        </ButtonWrapper>
      )}
      {isMobile && (
        <ButtonWrapper>
          <Button
            onClick={() => (index >= 1 ? setActiveMuscle(index - 1) : null)}
            disabled={index === 1}
          >
            Forrige muskel
          </Button>
          <Text>
            {index}/{length}
          </Text>
          <Button
            onClick={() =>
              index <= length - 1 ? setActiveMuscle(index + 1) : null
            }
            disabled={index === length}
          >
            Neste muskel
          </Button>
        </ButtonWrapper>
      )}
    </>
  );
};

export default ButtonGroup;
