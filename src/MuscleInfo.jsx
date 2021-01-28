import React from 'react';
import styled from '@emotion/styled'

const Text = styled.p`
margin: 0;
margin-top: 0.5rem;
`
const LinkWrapper = styled.div`
display: flex;
flex-direction: row;
`
const LinkToExercise = styled.a`
color: #20588F;
margin-top: 0.5rem;
`
const Img = styled.img`
margin-top: 0.7rem;
margin-left: 0.5rem;
`

function MuscleInfo({info}) {
  return (
      <>
      <Text>
          {info}
      </Text>
      <LinkWrapper>
      <LinkToExercise href="#">
      Gå til øvelser
      </LinkToExercise>
      <Img alt="" src="https://i.pinimg.com/originals/f9/2d/65/f92d65acd97e9b5f02ca0e1da93fbe06.png" height="20px" width="20px" />
      </LinkWrapper>
      </>
  );
}

export default MuscleInfo;
