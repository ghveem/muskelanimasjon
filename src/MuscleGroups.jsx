import React, {useState, useEffect} from 'react';
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
const Button = styled.button`
border-radius: 25px;
border: 2px solid #20588F;
color: #20588F;
background-color: white;
height: 40px;
margin-left: 0.5rem;
font-weight: bold;
padding: 10px 18px;
`
const ContentWrapper = styled.div`
display:flex;
flex-direction: row;
flex:1;
`
const InteractiveImageWrapper = styled.div`
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
function MuscleGroups() {
  const [activeMuscle, setActiveMuscle] = useState(1);
  const activeMuscleInfo = 
    MuscleGroupsInfo.find(muscleGroup => muscleGroup.id === activeMuscle
     
    );
  console.log('musclegroupinfo', activeMuscleInfo);
  console.log('activeMuscle', activeMuscle);
    return (
      <MuscleGroupsWrapper>
        <Header>Øvelser for forskjellige muskelgrupper</Header>
        <ContentWrapper>
          <InteractiveImageWrapper>
          <SvgFront />
          <SvgBack />
          </InteractiveImageWrapper>
          <InformationWrapper>
            <ButtonWrapper  >
              <ButtonGroup index={activeMuscle} setActiveMuscle={(newActiveMuscle) => setActiveMuscle(newActiveMuscle)} length={MuscleGroupsInfo.length}  />
            </ButtonWrapper>
            <MuscleSelector activeMuscle={activeMuscleInfo} />
            <MuscleInfo info={activeMuscleInfo.info} />
          </InformationWrapper>
        </ContentWrapper>
          <Exercises excercises={activeMuscleInfo.excersises} />
        </MuscleGroupsWrapper>
    );
  };

export default MuscleGroups;
