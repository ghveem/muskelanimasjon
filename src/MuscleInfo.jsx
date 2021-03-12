import React, { useContext } from 'react';
import styled from '@emotion/styled';
import arrow from './img/arrow.png';

import { languageContext } from './utils/context';

const Text = styled.span`
  display: flex;
  flex-grow: 0;
  margin: 0;
  margin-top: 0.5rem;
`;
const LinkWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;
const LinkToExercise = styled.a`
  color: #20588f;
  margin-top: 0.5rem;
  padding: 4px;
  &:focus {
    outline: none;
    box-shadow: 0 0 2px #20588f;
  }
`;
const Img = styled.img`
  margin-left: 0.2rem;
`;

const MuscleInfo = ({ info, isFullscreen, isMobile }) => {
  const { newNorwegianLanguage } = useContext(languageContext);
  return (
    <>
      <Text>{info}</Text>
      {!isFullscreen && !isMobile && (
        <LinkWrapper>
          <LinkToExercise href="#excercises">
            {newNorwegianLanguage ? 'Gå til øvingar' : 'Gå til øvelser'}
          </LinkToExercise>
          <Img alt="arrow" src={arrow} height="25px" width="30px" />
        </LinkWrapper>
      )}
    </>
  );
};

export default MuscleInfo;
