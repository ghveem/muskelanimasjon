import React, {useState, useEffect} from 'react';
import styled from '@emotion/styled'
import MuscleSelector from './MuscleSelector';
import MuscleInfo from './MuscleInfo';
import Exercises from './Exercises';
import ButtonGroup from './ButtonGroup';
import {getAllMuscleGroups, getMuscleGroup, getMuscleGroupByName} from './MuscleGroupsInfo';
import {ReactComponent as MusclePerson} from './svg/muskelperson.svg';

const MuscleGroupsWrapper = styled.article`
display: flex;
flex-direction: column;
flex: 1;
height: auto;
padding: 1rem;
background-color: white;
`
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
`
const ContentWrapper = styled.div`
display:flex;
flex-direction: row;
flex:1;
@media only screen and (max-width: 800px) {
  flex-direction: column;
}
`
const InteractiveSvgWrapper = styled.div`
display: flex;
flex: 1;
margin-right: 1.4rem;
@media only screen and (max-width: 800px) {
  margin: 0;
}
`

const InformationWrapper = styled.div`
display:flex;
flex-direction: column;
flex: 1;
`
const StyledMuscleperson = styled(MusclePerson)`
height: auto;
width: auto;
&>g>g>g{
  color: #20588F;
  &:hover{
  cursor: pointer;
  color: black;
  }
}
&>g>g>#${props => props.active}{
  color: red;
}
`
const App = () => {
  const [activeMuscleId, setActiveMuscleId] = useState(1);
  const [activeGroup, setActiveGroup] = useState('Triceps')
  const [isFullscreen, setIsFullscreen] = useState(false)

  const allMuscleGroups = getAllMuscleGroups();
  const activeMuscle = getMuscleGroup(activeMuscleId);

  useEffect(() => {
    getMuscleGroup(activeMuscleId)
    setActiveGroup(activeMuscle.name)
  }, [activeMuscleId, activeMuscle])

  const handleSvgOnClick = (e) => {
   const activeMuscleGroup = getMuscleGroupByName(e.target.parentElement.id)
    if(activeMuscleGroup){
      setActiveMuscleId(activeMuscleGroup.id)
      setActiveGroup(activeMuscleGroup.name)
    }
  }

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
              setActiveMuscle={(newActiveMuscle) => setActiveMuscleId(newActiveMuscle)}
              length={allMuscleGroups.length} setIsFullscreen={(newIsFullscreen) => setIsFullscreen(newIsFullscreen)}
              isFullscreen={isFullscreen}
              />
            <MuscleSelector
              index={activeMuscle.id}
              allMuscleGroups={allMuscleGroups} 
              setActiveMuscle={(newActiveMuscle) => setActiveMuscleId(newActiveMuscle)}
            />
            <MuscleInfo info={activeMuscle.info} />
            {isFullscreen && (
              <Exercises excercises={activeMuscle.excersises} />
            )}
          </InformationWrapper>
        </ContentWrapper>
        {!isFullscreen && (
            <Exercises excercises={activeMuscle.excersises} />
        )}
      </MuscleGroupsWrapper>
    );
  };

export default App;
