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
`
const Text = styled.p`
margin: 0;
font-weight: bold;
color: #757575;
`

function ButtonGroup({index, setActiveMuscle, length}) {
  const handleDecrementButton = () => {
    if(index > 1){
      setActiveMuscle(index -1)
    }
  }
  const handleIncrementButton = () => {
    if(index < length){
      setActiveMuscle(index +1)
    }
  }
  return (
    <>
        <Text>{index}/{length}</Text>
        <Button onClick={handleDecrementButton} disabled={index === 1} >Forrige muskel</Button>
        <Button onClick={handleIncrementButton} disabled={index === length} >Neste muskel</Button>
          
      </>
  );
}

export default ButtonGroup;
