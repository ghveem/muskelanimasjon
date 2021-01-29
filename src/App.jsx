import React, {useState} from 'react';
import styled from '@emotion/styled'
import MuscleSelector from './MuscleSelector';
import MuscleInfo from './MuscleInfo';
import Exercises from './Exercises';
import ButtonGroup from './ButtonGroup';
import MuscleGroupsInfo from './MuscleGroupsInfo';
import { ReactComponent as SvgFront } from './svg/MuscleGroupsFront.svg';
import { ReactComponent as SvgBack } from './svg/MuscleGroupsBack.svg';


const MuscleGroupsWrapper = styled.article`
display: flex;
padding-top: 10rem;
padding-left:9.2rem;
flex: 1;
flex-direction: column;
padding-right:17rem;
`
const Header = styled.h1`
display: flex;
width: 100%auto;
justify-content: flex-start;
flex: 1;
`

const ButtonWrapper = styled.div`
display: flex;
flex-direction: row;
align-items: center;
flex: 1;
justify-content: flex-end;
`
const ContentWrapper = styled.div`
display:flex;
flex-direction: row;
flex:1;
`
const InteractiveSvgWrapper = styled.div`
display: flex;
width: 22rem;
height:20.25rem;
margin-right: 1.4rem;
`

const InformationWrapper = styled.div`
display:flex;
flex-direction: column;
width: 21.1rem;
height: 13.9rem;
`
const StyledSvgFront = styled(SvgFront)`
margin-right: 1rem;
`
function App() {
  const [activeMuscleIndex, setActiveMuscle] = useState(1);
  const activeMuscle = 
    MuscleGroupsInfo.find(muscleGroup => muscleGroup.id === activeMuscleIndex
     
    );
    return (
      <MuscleGroupsWrapper>
        <Header>Øvelser for forskjellige muskelgrupper</Header>
        <ContentWrapper>
          <InteractiveSvgWrapper>
          <StyledSvgFront />
          <SvgBack />
          </InteractiveSvgWrapper>
          <InformationWrapper>
            <ButtonWrapper  >
              <ButtonGroup index={activeMuscleIndex} setActiveMuscle={(newActiveMuscleIndex) => setActiveMuscle(newActiveMuscleIndex)} length={MuscleGroupsInfo.length}  />
            </ButtonWrapper>
            <MuscleSelector activeMuscle={activeMuscle} />
            <MuscleInfo info={activeMuscle.info} />
          </InformationWrapper>
        </ContentWrapper>
          <Exercises excercises={activeMuscle.excersises} />
        </MuscleGroupsWrapper>
    );
  };

export default App;
