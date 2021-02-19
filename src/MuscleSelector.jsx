import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';

const MuscleSelectorWrapper = styled.select`
  display: flex;
  width: 100%;
  border: none;
  border-top: 1px solid #20588f;
  border-bottom: 1px solid #20588f;
  margin-top: 1rem;
  cursor: pointer;
  padding: 0.7rem;
  white-space: unset;
  color: #20588f;
  font-size: 1.5rem;
  font-weight: bold;
  padding-left: 0;
  word-wrap: break-word;
  height: 5.2rem;
  @media only screen and (max-width: 800px) {
    font-size: 1rem;
  }
  @media only screen and (max-width: 374px) {
    height: 5.5rem;
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 2px #20588f;
  }
`;
const Description = styled.optgroup`
  font-size: 1rem;
  color: #20588f;
  margin: 1;
  padding: 1rem;
  width: 100%;
  word-wrap: break-word;
`;
const Header = styled.option`
  color: #20588f;
  padding: 2rem;
  text-transform: capitalize;
  font-size: 1.2rem;
  width: 100%;
  word-wrap: break-word;
`;

const MuscleSelector = ({ index, allMuscleGroups, setActiveMuscle }) => {
  const [Arms, setArms] = useState([]);
  const [Shoulder, setShoulder] = useState([]);
  const [Back, setBack] = useState([]);
  const [Bryst, setBryst] = useState([]);
  const [Mage, setMage] = useState([]);
  const [Bein, setBein] = useState([]);

  useEffect(() => {
    let arms = allMuscleGroups.filter(
      (muscles) => muscles.muscleGroup === 'Armer',
    );
    setArms(arms);
    let shoulder = allMuscleGroups.filter(
      (muscles) => muscles.muscleGroup === 'Skulder',
    );
    setShoulder(shoulder);
    let back = allMuscleGroups.filter(
      (muscles) => muscles.muscleGroup === 'Rygg',
    );
    setBack(back);
    let bryst = allMuscleGroups.filter(
      (muscles) => muscles.muscleGroup === 'Bryst',
    );
    setBryst(bryst);
    let mage = allMuscleGroups.filter(
      (muscles) => muscles.muscleGroup === 'Mage',
    );
    setMage(mage);
    let bein = allMuscleGroups.filter(
      (muscles) => muscles.muscleGroup === 'Bein',
    );
    setBein(bein);
  }, [allMuscleGroups]);

  const handleOptionOnChange = (e) => {
    const id = document.getElementById('select').value;
    const number = parseInt(id);
    setActiveMuscle(number);
  };

  return (
    <MuscleSelectorWrapper
      id="select"
      aria-label="Muscle selector"
      onChange={() => handleOptionOnChange()}
      value={index}
    >
      <Description label="Armer" />
      {Arms.map((muscle, key) => {
        return (
          <Header key={key} value={muscle.id}>
            {muscle.norwegianName} ({muscle.name.replace('-', ' ')})
          </Header>
        );
      })}
      <Description label="Skulder" />
      {Shoulder.map((muscle, key) => {
        return (
          <Header key={key} value={muscle.id}>
            {muscle.norwegianName} ({muscle.name.replace('-', ' ')})
          </Header>
        );
      })}
      <Description label="Rygg" />
      {Back.map((muscle, key) => {
        return (
          <Header key={key} value={muscle.id}>
            {muscle.norwegianName} ({muscle.name.replace('-', ' ')})
          </Header>
        );
      })}
      <Description label="Bryst" />
      {Bryst.map((muscle, key) => {
        return (
          <Header key={key} value={muscle.id}>
            {muscle.norwegianName} ({muscle.name.replace('-', ' ')})
          </Header>
        );
      })}
      <Description label="Mage" />
      {Mage.map((muscle, key) => {
        return (
          <Header key={key} value={muscle.id}>
            {muscle.norwegianName} ({muscle.name.replace('-', ' ')})
          </Header>
        );
      })}
      <Description label="Bein" />
      {Bein.map((muscle, key) => {
        return (
          <Header key={key} value={muscle.id}>
            {muscle.norwegianName} ({muscle.name.replace('-', ' ')})
          </Header>
        );
      })}
    </MuscleSelectorWrapper>
  );
};

export default MuscleSelector;
