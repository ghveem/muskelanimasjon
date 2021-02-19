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
import { ReactComponent as MusclePerson } from './svg/muskelperson.svg';
import useIsMobile from './utils/useIsMobile.js';
import useFullscreen from './utils/useFullscreen.js';

const MuscleGroupsWrapper = styled.article`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: auto;
  padding: 1rem;
  background-color: white;
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

  & > g#muskelpersonv2 > g#muskelperson > g,
  > g#muskelpersonv2
    > g#MaskGroup
    > g
    > g#muskelperson_2
    > g#Transversus-abdominis {
    color: #20588f;
    &:hover {
      cursor: pointer;
      color: black;
    }
  }

  &
    > g#muskelpersonv2
    > g#muskelperson
    > g#${(props) => props.active},
    > g#muskelpersonv2
    > g#MaskGroup
    > g
    > g#muskelperson_2
    > g#${(props) => props.active} {
    color: red;
  }

  /* & > g > g > #${(props) => props.active} {
    color: red;
  } */
`;
const App = () => {
  const [activeMuscleId, setActiveMuscleId] = useState(1);
  const [activeGroup, setActiveGroup] = useState('Triceps');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const mobile = useIsMobile();
  const fullScreen = useFullscreen();

  const allMuscleGroups = getAllMuscleGroups();
  const activeMuscle = getMuscleGroup(activeMuscleId);

  useEffect(() => {
    getMuscleGroup(activeMuscleId);
    setActiveGroup(activeMuscle.name);
  }, [activeMuscleId, activeMuscle]);

  const handleSvgOnClick = (e) => {
    const activeMuscleGroup = getMuscleGroupByName(e.target.parentElement.id);
    if (activeMuscleGroup) {
      console.log('active', activeMuscleGroup);
      setActiveMuscleId(activeMuscleGroup.id);
      setActiveGroup(activeMuscleGroup.name);
    }
  };
  console.log('fullscreen', fullScreen[0]);
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
            isFullscreen={fullScreen[0]}
            isMobile={mobile}
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
            isFullscreen={fullScreen[0]}
            isMobile={mobile}
          />
          {fullScreen[0] && <Exercises excercises={activeMuscle.excersises} />}
        </InformationWrapper>
      </ContentWrapper>
      {!fullScreen[0] && (
        <Exercises excercises={activeMuscle.excersises} isMobile={mobile} />
      )}
    </MuscleGroupsWrapper>
  );
};

export default App;
