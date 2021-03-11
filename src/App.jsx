import React, { useState, useEffect } from 'react';
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

const MuscleGroupsWrapper = styled.article`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: auto;
  padding: 1rem;
  background-color: white;
  @media only screen and (min-width: 1920px) {
    display: flex;
    max-width: 1920px;
    justify-content: center;
    align-content: center;
  }
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
  height: auto;
  width: auto;

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
  const [activeMuscleId, setActiveMuscleId] = useState(1);
  const [activeGroup, setActiveGroup] = useState('triceps');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isFullscreenFromButton, setIsFullscreenFromButton] = useState(false);
  const mobile = useIsMobile();

  const allMuscleGroups = getAllMuscleGroups();
  const activeMuscle = getMuscleGroup(activeMuscleId);

  useEffect(() => {
    getMuscleGroup(activeMuscleId);
    setActiveGroup(activeMuscle.name);
  }, [activeMuscleId, activeMuscle]);

  const handleSvgOnClick = (e) => {
    const activeMuscleGroup = getMuscleGroupByName(e.target.parentElement.id);
    if (activeMuscleGroup) {
      setActiveMuscleId(activeMuscleGroup.id);
      setActiveGroup(activeMuscleGroup.name);
    }
  };
  return (
    <MuscleGroupsWrapper id="app">
      <Header>Øvelser for forskjellige muskelgrupper</Header>
      <ContentWrapper>
        <InteractiveSvgWrapper>
          <StyledMuscleperson onClick={handleSvgOnClick} active={activeGroup} />
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
          />
          <MuscleSelector
            index={activeMuscle.id}
            allMuscleGroups={allMuscleGroups}
            setActiveMuscle={(newActiveMuscle) =>
              setActiveMuscleId(newActiveMuscle)
            }
          />
          <MuscleInfo
            info={activeMuscle.info}
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
  );
};

export default App;
