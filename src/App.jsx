import React, {useState, useEffect} from 'react';
import styled from '@emotion/styled'
import MuscleSelector from './MuscleSelector';
import MuscleInfo from './MuscleInfo';
import Exercises from './Exercises';
import ButtonGroup from './ButtonGroup';
import {getAllMuscleGroups, getMuscleGroup, getMuscleGroupByName} from './MuscleGroupsInfo';
import {ReactComponent as MusclePerson} from './svg/Muskelperson.svg';

const MuscleGroupsWrapper = styled.article`
display: flex;
flex-direction: column;
flex: 1;
height: auto;
margin: 1rem;
`
const Header = styled.h1`
display: flex;
width: 100%auto;
justify-content: flex-start;
flex: 1;
`
const ContentWrapper = styled.div`
display:flex;
flex-direction: row;
flex:1;
`
const InteractiveSvgWrapper = styled.div`
display: flex;
flex: 1;
margin-right: 1.4rem;
height: 29rem;
width: 19rem;
`

const InformationWrapper = styled.div`
display:flex;
flex-direction: column;
width: 23.1rem;
height: 13.9rem;
`
const StyledMuscleperson = styled(MusclePerson)`
height: auto;
width: auto;
&>g>g{
  color: #20588F;
  &:hover{
  cursor: pointer;
  color: black;
  }
}
&>g>#${props => props.active}{
  color: red;
}
`
const App = () => {
  const [activeMuscleId, setActiveMuscleId] = useState(1);
  const [showExercises, setShowExercises] = useState(false);
  const [activeGroup, setActiveGroup] = useState('triceps')

  const allMuscleGroups = getAllMuscleGroups();
  const activeMuscle = getMuscleGroup(activeMuscleId);

  useEffect(() => {
    setShowExercises(null)
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
      <MuscleGroupsWrapper>
        <Header>Øvelser for forskjellige muskelgrupper</Header>
        <ContentWrapper>
          <InteractiveSvgWrapper>
            <StyledMuscleperson onClick={handleSvgOnClick} active={activeGroup} />
          </InteractiveSvgWrapper>
          <InformationWrapper>
              <ButtonGroup index={activeMuscle.id} setActiveMuscle={(newActiveMuscle) => setActiveMuscleId(newActiveMuscle)} length={allMuscleGroups.length}  />
            <MuscleSelector activeMuscle={activeMuscle} allMuscleGroups={allMuscleGroups} />
            <MuscleInfo info={activeMuscle.info} setShowExercises={(bool) => setShowExercises(bool)} />
          </InformationWrapper>
        </ContentWrapper>
        {showExercises && (
          <Exercises excercises={activeMuscle.excersises} />
        )}
      </MuscleGroupsWrapper>
    );
  };

export default App;
