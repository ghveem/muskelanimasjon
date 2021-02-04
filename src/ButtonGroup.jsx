import React from 'react';
import styled from '@emotion/styled'

const Button = styled.button`
border-radius: 25px;
border: 2px solid #20588F;
color: #20588F;
background-color: white;
height: 40px;
margin-left: 0.5rem;
font-weight: bold;
padding: 0px 18px;
&:hover {
    background-color: #20588F;
    color: white;
    cursor: pointer;
}
&:disabled {
  opacity: 50%;
  cursor: not-allowed;
  border: 2px solid #20588F;
  color: #20588F;
  background-color: white;
}
&:focus{
  outline: none;
  box-shadow: 0 0 2px #2222cc;
}
`
const ButtonWrapper = styled.div`
display: flex;
flex-direction: row;
align-items: center;
flex: 1;
justify-content: flex-end;
&:fullscreen{
  display: none;
}
`
const Text = styled.p`
  margin: 0;
  font-weight: bold;
  color: #757575;
`

const ButtonGroup = ({index, setActiveMuscle, length}) => {
  return (
      <ButtonWrapper>
        <Text>{index}/{length}</Text>
        <Button onClick={() => index >= 1 ? setActiveMuscle(index - 1) : null} disabled={index === 1}>Forrige muskel</Button>
        <Button onClick={() => index <= length - 1 ? setActiveMuscle(index + 1) : null} disabled={index === length}>Neste muskel</Button>
      </ButtonWrapper>
  );
}

export default ButtonGroup;
