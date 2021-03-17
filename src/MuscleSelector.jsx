import React, { useState, useEffect, useContext } from 'react';
import styled from '@emotion/styled';

import { languageContext } from './utils/context';

const MuscleSelectorWrapper = styled.select`
  display: flex;
  width: 100%;
  border: none;
  border-top: 1px solid #20588f;
  border-bottom: 1px solid #20588f;
  margin-top: 1rem;
  cursor: pointer;
  padding: 0;
  white-space: unset;
  color: #20588f;
  font-size: 1.5rem;
  font-weight: bold;
  word-wrap: break-word;
  height: 6rem;
  @media only screen and (max-width: 1022px) {
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
  @media only screen and (max-width: 800px) {
    font-size: 0.7rem;
  }
`;
const Header = styled.option`
  color: #20588f;
  padding: 2rem;
  font-size: 1.2rem;
  width: 100%;
  word-wrap: break-word;
  @media only screen and (max-width: 800px) {
    font-size: 0.7rem;
  }
`;

const MuscleSelector = ({ index, allMuscleGroups, setActiveMuscle }) => {
  const { newNorwegianLanguage } = useContext(languageContext);

  const [Arms, setArms] = useState([]);
  const [Shoulder, setShoulder] = useState([]);
  const [Back, setBack] = useState([]);
  const [Chest, setChest] = useState([]);
  const [Stomach, setStomach] = useState([]);
  const [Legs, setLegs] = useState([]);

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

    let chest = allMuscleGroups.filter(
      (muscles) => muscles.muscleGroup === 'Bryst',
    );
    setChest(chest);

    let stomach = allMuscleGroups.filter(
      (muscles) => muscles.muscleGroup === 'Mage',
    );
    setStomach(stomach);

    let legs = allMuscleGroups.filter(
      (muscles) => muscles.muscleGroup === 'Bein',
    );
    setLegs(legs);
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
      <Description label={newNorwegianLanguage ? 'Armar' : 'Armer'} />
      {Arms.map((muscle, key) => {
        return (
          <Header key={key} value={muscle.id}>
            {newNorwegianLanguage && muscle.newNorwegianName1
              ? muscle.newNorwegianName1
              : muscle.norwegianName1}{' '}
            ({muscle.name1 && muscle.name1.replace(/-/g, ' ')})
            {newNorwegianLanguage && muscle.newNorwegianName2
              ? muscle.newNorwegianName2
              : muscle.norwegianName2}{' '}
            {muscle.name2 && <>({muscle.name2.replace(/-/g, ' ')})</>}
          </Header>
        );
      })}
      <Description label={newNorwegianLanguage ? 'Skulder' : 'Skulder'} />
      {Shoulder.map((muscle, key) => {
        return (
          <Header key={key} value={muscle.id}>
            {newNorwegianLanguage && muscle.newNorwegianName1
              ? muscle.newNorwegianName1
              : muscle.norwegianName1}{' '}
            (
            {muscle.name1 &&
              muscle.name1.replace(/-/g, ' ').replace(' bak', '')}
            )
            {newNorwegianLanguage && muscle.newNorwegianName2
              ? muscle.newNorwegianName2
              : muscle.norwegianName2}{' '}
            {muscle.name2 &&
              `(${muscle.name2.replace(/-/g, ' ').replace(' bak', '')})`}
          </Header>
        );
      })}
      <Description label="Rygg" />
      {Back.map((muscle, key) => {
        return (
          <Header key={key} value={muscle.id}>
            {newNorwegianLanguage && muscle.newNorwegianName1
              ? muscle.newNorwegianName1
              : muscle.norwegianName1}{' '}
            ({muscle.name1 && muscle.name1.replace(/-/g, ' ').replace(/1/g, '')}
            )
            {newNorwegianLanguage && muscle.newNorwegianName2
              ? muscle.newNorwegianName2
              : muscle.norwegianName2}{' '}
            {muscle.name2 &&
              `(${muscle.name2.replace(/-/g, ' ').replace(' bak', '')})`}
          </Header>
        );
      })}
      <Description label="Bryst" />
      {Chest.map((muscle, key) => {
        return (
          <Header key={key} value={muscle.id}>
            {newNorwegianLanguage && muscle.newNorwegianName1
              ? muscle.newNorwegianName1
              : muscle.norwegianName1}{' '}
            ({muscle.name1 && muscle.name1.replace(/-/g, ' ')})
            {newNorwegianLanguage && muscle.newNorwegianName2
              ? muscle.newNorwegianName2
              : muscle.norwegianName2}{' '}
            {muscle.name2 && `(${muscle.name2.replace(/-/g, ' ')})`}
          </Header>
        );
      })}
      <Description label="Mage" />
      {Stomach.map((muscle, key) => {
        return (
          <Header key={key} value={muscle.id}>
            {newNorwegianLanguage && muscle.newNorwegianName1
              ? muscle.newNorwegianName1
              : muscle.norwegianName1}{' '}
            (
            {muscle.name1 &&
              muscle.name1
                .toLowerCase()
                .replace(/-/g, ' ')
                .replace('1', '/')
                .replace(/3 /g, ', ')
                .replace(' click', '')}
            )
            {newNorwegianLanguage && muscle.newNorwegianName2
              ? muscle.newNorwegianName2
              : muscle.norwegianName2}{' '}
            {muscle.name2 &&
              `(${muscle.name2
                .toLowerCase()
                .replace(/-/g, ' ')
                .replace('1', '/')
                .replace(/3 /g, ', ')
                .replace(' click', '')})`}
          </Header>
        );
      })}
      <Description label="Bein" />
      {Legs.map((muscle, key) => {
        return (
          <Header key={key} value={muscle.id}>
            {newNorwegianLanguage && muscle.newNorwegianName1
              ? muscle.newNorwegianName1
              : muscle.norwegianName1}{' '}
            (
            {muscle.name1 && muscle.name1.replace(/-/g, ' ').replace(/2/g, ',')}
            )
            {newNorwegianLanguage && muscle.newNorwegianName2
              ? muscle.newNorwegianName2
              : muscle.norwegianName2}{' '}
            {muscle.name2 &&
              `(${muscle.name2.replace(/-/g, ' ').replace(/2/g, ',')})`}
          </Header>
        );
      })}
    </MuscleSelectorWrapper>
  );
};

export default MuscleSelector;
