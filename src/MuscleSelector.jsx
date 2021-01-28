import React from 'react';
import styled from '@emotion/styled'

const MuscleSelectorWrapper = styled.select`
display: flex;
flex-direction: column;
height: 3.1rem;
justify-content: center;
border: none;
border-top: 1px solid #20588F;
border-bottom: 1px solid #20588F;
margin-top: 1rem;
width: 100%auto;
flex: 1;
cursor: pointer;
`
const Description = styled.optgroup`
color: #20588F;
margin: 0;
`
const Header = styled.option`
color: #20588F;
margin: 0;
`

function MuscleSelector(activeMuscleInfo) {
  return (
   <MuscleSelectorWrapper>
       <Description label="Skulder">Overkropp</Description>
       <Header value="muskelnavn_1">
            Muskelnavn 1 (Latin Navn)
       </Header>
       <Header value="muskelnavn_2">
            Muskelnavn 2 (Latin Navn)
       </Header>
       <Description label="Bryst" />
       <Header value="muskelnavn_3">
            Muskelnavn 1 (Latin Navn)
       </Header>
       <Header value="muskelnavn_4">
            Muskelnavn 2 (Latin Navn)
       </Header>
       <Description label="Rygg" />
       <Header value="muskelnavn_4">
            Muskelnavn 1 (Latin Navn)
       </Header>
       <Header value="muskelnavn_5">
            Muskelnavn 2 (Latin Navn)
       </Header>
       <Header value="muskelnavn_6">
            Muskelnavn 3 (Latin Navn)
       </Header>
   </MuscleSelectorWrapper>
  );
}

export default MuscleSelector;
