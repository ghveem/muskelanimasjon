/* eslint-disable no-restricted-globals */
import React, { useState, useEffect, useContext } from 'react';
import styled from '@emotion/styled';
import MuscleSelector from './MuscleSelector';
import MuscleInfo from './MuscleInfo';
import Exercises from './Exercises';
import ButtonGroup from './ButtonGroup';
import {
  getAllMuscleGroups,
  getMuscleGroup,
  getMuscleGroupByName,
} from './MuscleGroupsInfo';
import { ReactComponent as MusclePerson } from './svg/muskelpersonv5.svg';
import useIsMobile from './utils/useIsMobile.js';
import { languageContext } from './utils/context';

const MuscleGroupsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: auto;
  padding: 1rem;
  background-color: white;
  max-width: ${(props) => (props.width > 2561 ? '2560px' : '100%')};
  @media only screen and (min-width: 2561px) {
    display: flex;
    flex-direction: column;
    align-items: ${(props) => (props.isFullscreen ? 'center' : 'auto')};
    justify-content: ${(props) => (props.isFullscreen ? 'center' : 'auto')};
  }
`;

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Header = styled.h1`
  display: flex;
  width: 100%auto;
  justify-content: flex-start;
  flex: 1;
  margin-top: 0;
  @media only screen and (max-width: 800px) {
    font-size: 30px;
  }
  @media only screen and (max-width: 600px) {
    font-size: 20px;
  }
  @media only screen and (max-width: 418px) {
    font-size: 18px;
  }
  @media only screen and (max-width: 333px) {
    font-size: 16px;
  }
`;

const Button = styled.button`
  background-color: white;
  border: none;
  text-decoration: underline;
  color: #20588f;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    text-decoration: none;
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 2px #20588f;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  @media only screen and (max-width: 800px) {
    flex-direction: column;
  }
`;

const InteractiveSvgWrapper = styled.div`
  display: flex;
  align-items: baseline;
  flex: 1;
  margin-right: 1.4rem;
  @media only screen and (max-width: 800px) {
    margin: 0;
  }
`;

const InformationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const StyledMuscleperson = styled(MusclePerson)`
  & > g#muskelpersonv3 > g#muskelperson > g,
  > g#muskelpersonv3
    > g#MaskGroup
    > g
    > g#muskelperson_2
    > g#transversus-abdominis,
  > g#muskelpersonv3
    > g#MaskGroup
    > g
    > g#muskelperson_2
    > g#transversus-abdominis-click {
    color: #20588f;
    &:hover {
      cursor: pointer;
      color: black;
    }
  }

  &
    > g#muskelpersonv3
    > g#muskelperson
    > g#${(props) => props.active},
    > g#muskelpersonv3
    > g#MaskGroup
    > g
    > g#muskelperson_2
    > g#${(props) => props.active} {
    color: red;
    opacity: 0.8;
    &:hover {
      color: red;
    }
  }
`;
const App = () => {
  const { newNorwegianLanguage, setNewNorwegianLanguage } = useContext(
    languageContext,
  );

  // Safari 3.0+ "[object HTMLElementConstructor]"
  const isSafari =
    /constructor/i.test(window.HTMLElement) ||
    (function (p) {
      return p.toString() === '[object SafariRemoteNotification]';
    })(!window['safari'] || typeof safari !== 'undefined');

  const width = screen.width;
  const height = screen.height;

  const [activeMuscleId, setActiveMuscleId] = useState(1);
  const [activeGroup, setActiveGroup] = useState('triceps');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isFullscreenFromButton, setIsFullscreenFromButton] = useState(false);
  const mobile = useIsMobile();

  const allMuscleGroups = getAllMuscleGroups();
  const activeMuscle = getMuscleGroup(activeMuscleId);

  useEffect(() => {
    getMuscleGroup(activeMuscleId);
    setActiveGroup(activeMuscle.name1);
  }, [activeMuscleId, activeMuscle]);

  const handleLanguageChanged = () => {
    if (!newNorwegianLanguage) {
      setNewNorwegianLanguage(true);
    } else if (newNorwegianLanguage) {
      setNewNorwegianLanguage(false);
    } else {
      return;
    }
  };

  const handleSvgOnClick = (e) => {
    const activeMuscleGroup = getMuscleGroupByName(e.target.parentElement.id);
    if (activeMuscleGroup) {
      setActiveMuscleId(activeMuscleGroup.id);
      setActiveGroup(activeMuscleGroup.name1);
    }
  };
  return (
    <Wrapper>
      <MuscleGroupsWrapper
        id="app"
        isFullscreen={isFullscreen}
        width={width}
        height={height}
      >
        <HeaderWrapper>
          <Header>
            {!newNorwegianLanguage
              ? 'Øvelser for forskjellige muskelgrupper'
              : 'Øvingar for ulike muskelgrupper'}
          </Header>
          <Button onClick={handleLanguageChanged}>
            {newNorwegianLanguage ? 'Bokmål' : 'Nynorsk'}
          </Button>
        </HeaderWrapper>

        <ContentWrapper isFullscreen={isFullscreen}>
          <InteractiveSvgWrapper>
            <StyledMuscleperson
              onClick={handleSvgOnClick}
              active={activeGroup}
            />
          </InteractiveSvgWrapper>
          <InformationWrapper>
            <ButtonGroup
              index={activeMuscle.id}
              setActiveMuscle={(newActiveMuscle) =>
                setActiveMuscleId(newActiveMuscle)
              }
              length={allMuscleGroups.length}
              setIsFullscreen={(newIsFullscreen) =>
                setIsFullscreen(newIsFullscreen)
              }
              isFullscreen={isFullscreen}
              isMobile={mobile}
              setIsFullscreenFromButton={(newIsFullscreenButtonPressed) =>
                setIsFullscreenFromButton(newIsFullscreenButtonPressed)
              }
              isFullscreenFromButton={isFullscreenFromButton}
              isSafari={isSafari}
            />
            <MuscleSelector
              index={activeMuscle.id}
              allMuscleGroups={allMuscleGroups}
              setActiveMuscle={(newActiveMuscle) =>
                setActiveMuscleId(newActiveMuscle)
              }
            />
            <MuscleInfo
              activeMuscle={activeMuscle}
              isFullscreen={isFullscreen}
              isMobile={mobile}
            />
            {isFullscreenFromButton && isFullscreen && (
              <Exercises
                excercises={activeMuscle.excersises}
                allowFullscreenVideo={false}
              />
            )}
          </InformationWrapper>
        </ContentWrapper>
        {!isFullscreenFromButton && (
          <Exercises
            excercises={activeMuscle.excersises}
            isMobile={mobile}
            allowFullscreenVideo={true}
          />
        )}
      </MuscleGroupsWrapper>
    </Wrapper>
  );
};

export default App;
